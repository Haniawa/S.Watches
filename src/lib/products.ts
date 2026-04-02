import fs from 'fs';
import path from 'path';
import { Product, ProductCategory, ProductStatus, ProductCondition } from './types';
import { fetchSellerItems, TraderaItem } from './tradera-api';

const SELLER_ALIAS = process.env.TRADERA_SELLER ?? 's.watches';

// ── Category helpers ───────────────────────────────────────────────────────────────

function guessCategory(categoryId: number, headline: string, description: string): ProductCategory {
  const h = headline.toLowerCase();
  const full = (headline + ' ' + description).toLowerCase();

  // Watch parts — headline only to avoid false positives from watches described with part terms
  if (/reservdel|urfjäder|urtavla|urrörelse|klockdel|kronsten|klockreservdel/i.test(h))
    return 'parts';

  // Stones/amber — check headline + description so amber lots get properly categorized
  if (/bärnsten|bernsten|amber|\bsten\b|mineral|fossil|kristall|agat|jade|kvarts|turmalin|korall|pärla|opal/i.test(full))
    return 'stones';

  // Tradera watch-related category IDs
  const watchCategories = new Set([1902, 1903, 1904, 1905, 1906, 191502, 191503]);
  if (watchCategories.has(categoryId)) return 'watches';

  if (/klocka|armbandsur|fickur|watch|seiko|omega|longines|rolex|tissot|citizen|junghans|breitling|certina|zenith|klockarmband/i.test(h))
    return 'watches';
  if (/smycke|halsband|ring|armband|brosch|örhänge|berlock|pendant|bijou|silver|guld|platina/i.test(h))
    return 'jewelry';
  return 'other';
}

function mapStatus(item: TraderaItem): ProductStatus {
  return item.isEnded ? 'sold' : 'available';
}

function mapCondition(swedish: string): ProductCondition | undefined {
  if (!swedish) return undefined;
  const s = swedish.toLowerCase();
  if (/nytt|ny\b|oanvänd/i.test(s)) return 'new';
  if (/som ny|nyskick|mint/i.test(s)) return 'like-new';
  if (/gott skick|good|bra skick/i.test(s)) return 'good';
  if (/acceptabelt|begagnat|okänt|fair/i.test(s)) return 'fair';
  return undefined;
}

function buildTags(item: TraderaItem): string[] {
  const tags: string[] = [];
  if (item.condition) tags.push(item.condition.toLowerCase());
  return tags;
}

// ── Transform ────────────────────────────────────────────────────────────────────

function toProduct(item: TraderaItem): Product {
  const status = mapStatus(item);
  const price  = item.buyItNowPrice ?? item.maxBid ?? item.nextBid ?? 0;
  const images = item.images.length ? item.images : (item.thumbnailLink ? [item.thumbnailLink] : []);

  return {
    id:          String(item.id),
    title:       item.headline,
    description: item.longDescription,
    price,
    category:    guessCategory(item.categoryId, item.headline, item.longDescription),
    status,
    images,
    traderaUrl:  item.itemUrl || undefined,
    material:    item.material || undefined,
    condition:   mapCondition(item.condition),
    tags:        buildTags(item),
    soldDate:    status === 'sold' && item.endDate ? item.endDate.split('T')[0] : undefined,
  };
}

// ── globalThis cache + static JSON fallback ───────────────────────────────────
// globalThis survives Turbopack hot-reloads (module-level variables do NOT).
// Additionally, successful API responses are persisted to a JSON file so the
// site always shows products even when Tradera is rate-limiting or unavailable.

const CACHE_TTL_MS = 10 * 60 * 1000;      // 10 minutes
const RATE_LIMIT_COOLDOWN = 15 * 60_000;   // 15 min cooldown after a 429
const FALLBACK_FILE = path.join(process.cwd(), 'src', 'lib', 'products-fallback.json');

interface CacheEntry {
  timestamp: number;
  products: Product[];
}

const G = globalThis as unknown as {
  __swatchesCache?: CacheEntry;
  __swatchesInflight?: Promise<Product[]>;
  __swatchesRateLimitUntil?: number;   // don't call API until this timestamp
};

/** Read the static fallback JSON file (last known good products). */
function readFallback(): Product[] {
  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      return JSON.parse(fs.readFileSync(FALLBACK_FILE, 'utf-8')) as Product[];
    }
  } catch { /* ignore */ }
  return [];
}

/** Persist products to the fallback file for next time. */
function writeFallback(products: Product[]): void {
  try {
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch { /* non-critical */ }
}

// ── Public API ───────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  // 1. Fresh globalThis cache — return immediately, zero API calls.
  if (G.__swatchesCache && Date.now() - G.__swatchesCache.timestamp < CACHE_TTL_MS) {
    return G.__swatchesCache.products;
  }

  // 2. Rate-limited — skip API and serve fallback for the cooldown period.
  if (G.__swatchesRateLimitUntil && Date.now() < G.__swatchesRateLimitUntil) {
    return G.__swatchesCache?.products ?? readFallback();
  }

  // 3. A fetch is already running — join it.
  if (G.__swatchesInflight) return G.__swatchesInflight;

  // 4. Start a fresh fetch and deduplicate concurrent callers.
  G.__swatchesInflight = fetchSellerItems(SELLER_ALIAS)
    .then((items) => {
      const products = items.map(toProduct);
      G.__swatchesCache = { timestamp: Date.now(), products };
      G.__swatchesRateLimitUntil = undefined; // clear any previous cooldown
      writeFallback(products);  // persist for next cold start
      return products;
    })
    .catch((err) => {
      console.error('[Swatches] Tradera fetch failed:', err);
      // If it's a 429, set a long cooldown so we don't keep hitting the API.
      if (String(err).includes('429')) {
        G.__swatchesRateLimitUntil = Date.now() + RATE_LIMIT_COOLDOWN;
        console.warn(`[Swatches] Rate-limited — will not retry for ${RATE_LIMIT_COOLDOWN / 60_000} min`);
      }
      // Return stale in-memory cache, or static fallback file, or empty array.
      const stale = G.__swatchesCache?.products;
      if (stale && stale.length > 0) return stale;
      return readFallback();
    })
    .finally(() => {
      G.__swatchesInflight = undefined;
    });

  return G.__swatchesInflight;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id)
    ?? HIGHLIGHT_ARCHIVE_ITEMS.find((p) => p.id === id);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

// ── Homepage highlights ───────────────────────────────────────────────────────
// Hand-curated items to showcase on the homepage. Archive items that are too old
// for the Tradera API are stored here; live items are pulled from getProducts().

export const HIGHLIGHT_ARCHIVE_ITEMS: Product[] = [
  {
    id: '666742215',
    title: 'Certina DS-2 Chronolympic Chronograph Vintage Klocka',
    description: 'Certina DS-2 Chronolympic Chronograph vintage watch.',
    price: 19000,
    category: 'watches',
    status: 'sold',
    images: ['/Certina DS-2 ChronolympicChronographVintageKlocka.png'],
    soldDate: '2025-03-16',
  },
  {
    id: '667416499',
    title: 'Omega Seamaster Ranchero vintage',
    description: 'Rare Omega Seamaster Ranchero vintage watch.',
    price: 5744,
    category: 'watches',
    status: 'sold',
    images: ['/OmegaSeamasterRancherovintage.png'],
    soldDate: '2025-04-17',
  },
];

/** IDs of live products to include in homepage highlights. */
const HIGHLIGHT_LIVE_IDS = ['723698197']; // Tudor Oyster Prince

/**
 * Returns the curated homepage highlights — a mix of archive sold items
 * and specific live products pulled from the current catalogue.
 */
export async function getHighlightProducts(): Promise<Product[]> {
  const products = await getProducts();
  const liveHighlights = HIGHLIGHT_LIVE_IDS
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== null && p !== undefined);
  return [...HIGHLIGHT_ARCHIVE_ITEMS, ...liveHighlights];
}
