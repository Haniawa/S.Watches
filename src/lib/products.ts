import { Product, ProductCategory, ProductStatus, ProductCondition } from './types';
import { fetchSellerItems, TraderaItem } from './tradera-api';

const SELLER_ALIAS = process.env.TRADERA_SELLER ?? 's.watches';

// ── Category helpers ───────────────────────────────────────────────────────────────

function guessCategory(categoryId: number, headline: string): ProductCategory {
  const t = headline.toLowerCase();

  // Tradera watch-related category IDs
  const watchCategories = new Set([1902, 1903, 1904, 1905, 1906, 191502, 191503]);
  if (watchCategories.has(categoryId)) return 'watches';

  if (/klocka|armbandsur|fickur|watch|seiko|omega|longines|rolex|tissot|citizen|junghans|breitling|certina|zenith|klockarmband/i.test(t))
    return 'watches';
  if (/bärnsten|bernsten|amber|\bsten\b|mineral|fossil|kristall|agat|jade|kvarts|turmalin|korall|pärla|opal/i.test(t))
    return 'stones';
  if (/smycke|halsband|ring|armband|brosch|örhänge|berlock|pendant|bijou|silver|guld|platina/i.test(t))
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
    category:    guessCategory(item.categoryId, item.headline),
    status,
    images,
    traderaUrl:  item.itemUrl || undefined,
    material:    item.material || undefined,
    condition:   mapCondition(item.condition),
    tags:        buildTags(item),
    soldDate:    status === 'sold' && item.endDate ? item.endDate.split('T')[0] : undefined,
  };
}

// ── Module-level cache (shared within a single Next.js build worker) ─────────────

let _cache: Product[] | null = null;

// ── Public API ───────────────────────────────────────────────────────────────────

/**
 * Fetch all products from the Tradera seller.
 * Module-cached so repeated calls in the same build hit Tradera only once.
 */
export async function getProducts(): Promise<Product[]> {
  if (_cache) return _cache;
  try {
    const items = await fetchSellerItems(SELLER_ALIAS);
    _cache = items.map(toProduct);
    return _cache;
  } catch (err) {
    console.error('[Swatches] Tradera fetch failed:', err);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}
