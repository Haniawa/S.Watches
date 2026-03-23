/**
 * Tradera SOAP API client
 * Uses the SearchAdvanced operation (http://api.tradera.com/SearchAdvanced)
 * to fetch all listings for a given seller alias.
 *
 * WSDL: https://api.tradera.com/v3/searchservice.asmx?WSDL
 * Namespace: http://api.tradera.com
 */

const APP_ID  = process.env.TRADERA_APP_ID  ?? '5799';
const APP_KEY = process.env.TRADERA_APP_KEY ?? '';
const NS      = 'http://api.tradera.com';
const XSI     = 'http://www.w3.org/2001/XMLSchema-instance';
const SEARCH_URL = 'https://api.tradera.com/v3/searchservice.asmx';

// ── SOAP envelope ─────────────────────────────────────────────────────────────

function soapEnvelope(body: string): string {
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"`,
    `               xmlns:tns="${NS}"`,
    `               xmlns:i="${XSI}">`,
    '  <soap:Header>',
    '    <tns:AuthenticationHeader>',
    `      <tns:AppId>${APP_ID}</tns:AppId>`,
    `      <tns:AppKey>${APP_KEY}</tns:AppKey>`,
    '    </tns:AuthenticationHeader>',
    '  </soap:Header>',
    `  <soap:Body>${body}</soap:Body>`,
    '</soap:Envelope>',
  ].join('\n');
}

async function soapPost(operation: string, body: string): Promise<string> {
  const res = await fetch(SEARCH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: `"${NS}/${operation}"`,
    },
    body: soapEnvelope(body),
    cache: 'force-cache',
  });
  if (!res.ok) {
    throw new Error(`Tradera SOAP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return res.text();
}

// ── XML helpers ───────────────────────────────────────────────────────────────

/** First text content of a tag (handles optional namespace prefix + CDATA) */
function xmlGet(xml: string, tag: string): string {
  const m = xml.match(
    new RegExp(`<(?:[\\w]+:)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:[\\w]+:)?${tag}>`, 'i'),
  );
  if (!m) return '';
  const v = m[1].trim();
  const cd = v.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return cd ? cd[1] : v;
}

/** All text contents of a repeated tag */
function xmlGetAll(xml: string, tag: string): string[] {
  const re = new RegExp(
    `<(?:[\\w]+:)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:[\\w]+:)?${tag}>`,
    'gi',
  );
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const v = m[1].trim();
    const cd = v.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
    out.push(cd ? cd[1] : v);
  }
  return out;
}

/** Check if a tag has xsi:nil="true" */
function isNil(xml: string, tag: string): boolean {
  return new RegExp(`<(?:[\\w]+:)?${tag}[^>]*nil\\s*=\\s*"true"`, 'i').test(xml);
}

/** Strip HTML, expand entities, collapse whitespace */
function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

// ── Image parsing ─────────────────────────────────────────────────────────────

/**
 * Extract the full-size ('normal') image URLs from an item block.
 * Falls back to 'gallery', then 'thumb' if normal is unavailable.
 */
function parseImages(itemXml: string): string[] {
  const linksXml = xmlGet(itemXml, 'ImageLinks');
  if (!linksXml) return [];
  const blocks = xmlGetAll(linksXml, 'ImageLink');
  const byFormat: Record<string, string[]> = {};
  for (const b of blocks) {
    const fmt = xmlGet(b, 'Format').toLowerCase();
    const url = xmlGet(b, 'Url');
    if (url) (byFormat[fmt] ??= []).push(url);
  }
  return byFormat['normal'] ?? byFormat['gallery'] ?? byFormat['thumb'] ?? [];
}

// ── Attribute parsing ─────────────────────────────────────────────────────────

function getAttributeValue(itemXml: string, nameMatch: RegExp): string {
  const avXml = xmlGet(itemXml, 'TermAttributeValues');
  if (!avXml) return '';
  for (const attr of xmlGetAll(avXml, 'TermAttributeValue')) {
    if (nameMatch.test(xmlGet(attr, 'Name'))) {
      return xmlGetAll(xmlGet(attr, 'Values'), 'string')[0] ?? '';
    }
  }
  return '';
}

// ── Public types ──────────────────────────────────────────────────────────────

export interface TraderaItem {
  id: number;
  headline: string;
  longDescription: string;
  buyItNowPrice: number | null;
  maxBid: number | null;
  nextBid: number | null;
  thumbnailLink: string;
  images: string[];
  itemUrl: string;
  categoryId: number;
  isEnded: boolean;
  endDate: string;
  itemType: string;
  condition: string;
  material: string;
}

// ── Item parsing ──────────────────────────────────────────────────────────────

function parseItems(xml: string): TraderaItem[] {
  return xmlGetAll(xml, 'Items')
    .map((b) => {
      const id = parseInt(xmlGet(b, 'Id'), 10);
      if (!id) return null;
      return {
        id,
        headline:        xmlGet(b, 'ShortDescription'),
        longDescription: stripHtml(xmlGet(b, 'LongDescription')),
        buyItNowPrice:   isNil(b, 'BuyItNowPrice') ? null : parseFloat(xmlGet(b, 'BuyItNowPrice')) || null,
        maxBid:          isNil(b, 'MaxBid')        ? null : parseFloat(xmlGet(b, 'MaxBid')) || null,
        nextBid:         isNil(b, 'NextBid')       ? null : parseFloat(xmlGet(b, 'NextBid')) || null,
        thumbnailLink:   xmlGet(b, 'ThumbnailLink'),
        images:          parseImages(b),
        itemUrl:         xmlGet(b, 'ItemUrl'),
        categoryId:      parseInt(xmlGet(b, 'CategoryId'), 10) || 0,
        isEnded:         xmlGet(b, 'IsEnded').toLowerCase() === 'true',
        endDate:         xmlGet(b, 'EndDate'),
        itemType:        xmlGet(b, 'ItemType'),
        condition:       getAttributeValue(b, /^condition$/i),
        material:        getAttributeValue(b, /material|metall|metal/i),
      } satisfies TraderaItem;
    })
    .filter((i): i is TraderaItem => i !== null);
}

// ── Search body builder ───────────────────────────────────────────────────────

function searchAdvancedBody(alias: string, itemStatus?: string): string {
  const statusEl = itemStatus ? `    <tns:ItemStatus>${itemStatus}</tns:ItemStatus>` : '';
  return [
    '<tns:SearchAdvanced>',
    '  <tns:request>',
    '    <tns:SearchWords/>',
    '    <tns:CategoryId>0</tns:CategoryId>',
    '    <tns:SearchInDescription>false</tns:SearchInDescription>',
    '    <tns:PriceMinimum i:nil="true"/>',
    '    <tns:PriceMaximum i:nil="true"/>',
    '    <tns:BidsMinimum i:nil="true"/>',
    '    <tns:BidsMaximum i:nil="true"/>',
    '    <tns:CountyId>0</tns:CountyId>',
    `    <tns:Alias>${alias}</tns:Alias>`,
    '    <tns:OnlyAuctionsWithBuyNow>false</tns:OnlyAuctionsWithBuyNow>',
    '    <tns:OnlyItemsWithThumbnail>false</tns:OnlyItemsWithThumbnail>',
    '    <tns:ItemsPerPage>100</tns:ItemsPerPage>',
    '    <tns:PageNumber>1</tns:PageNumber>',
    statusEl,
    '  </tns:request>',
    '</tns:SearchAdvanced>',
  ].join('\n');
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetch all items (active + recently ended) for a seller alias.
 * Results are deduplicated by ID.
 */
export async function fetchSellerItems(sellerAlias: string): Promise<TraderaItem[]> {
  // Active/upcoming listings
  const activeXml = await soapPost('SearchAdvanced', searchAdvancedBody(sellerAlias));
  const active = parseItems(activeXml);

  // Ended/sold listings (best-effort)
  let ended: TraderaItem[] = [];
  try {
    const endedXml = await soapPost('SearchAdvanced', searchAdvancedBody(sellerAlias, 'Ended'));
    ended = parseItems(endedXml);
  } catch {
    // Ended listings are optional; suppress the error
  }

  // Merge and deduplicate by ID
  const seen = new Set<number>();
  return [...active, ...ended].filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}
