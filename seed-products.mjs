/**
 * Seed script: waits for Tradera rate limit to clear (making ZERO API calls
 * during the wait), then fetches once and saves to products-fallback.json.
 *
 * Usage: node seed-products.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FALLBACK = path.join(__dirname, 'src', 'lib', 'products-fallback.json');

const NS = 'http://api.tradera.com';

function soapEnvelope() {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="${NS}"
               xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Header>
    <tns:AuthenticationHeader>
      <tns:AppId>5799</tns:AppId>
      <tns:AppKey>0a518cc7-0510-4064-be73-5d7265c62d81</tns:AppKey>
    </tns:AuthenticationHeader>
  </soap:Header>
  <soap:Body>
    <tns:SearchAdvanced>
      <tns:request>
        <tns:SearchWords/>
        <tns:CategoryId>0</tns:CategoryId>
        <tns:Alias>s.watches</tns:Alias>
        <tns:ItemsPerPage>100</tns:ItemsPerPage>
        <tns:PageNumber>1</tns:PageNumber>
      </tns:request>
    </tns:SearchAdvanced>
  </soap:Body>
</soap:Envelope>`;
}

function xmlGet(xml, tag) {
  const m = xml.match(new RegExp(`<(?:[\\w]+:)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:[\\w]+:)?${tag}>`, 'i'));
  if (!m) return '';
  return m[1].trim();
}

function xmlGetAll(xml, tag) {
  const re = new RegExp(`<(?:[\\w]+:)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</(?:[\\w]+:)?${tag}>`, 'gi');
  const out = [];
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1].trim());
  return out;
}

function stripHtml(html) {
  return html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"')
    .replace(/[ \t]{2,}/g, ' ').trim();
}

function parseImages(itemXml) {
  const linksXml = xmlGet(itemXml, 'ImageLinks');
  if (!linksXml) return [];
  const blocks = xmlGetAll(linksXml, 'ImageLink');
  const byFormat = {};
  for (const b of blocks) {
    const fmt = xmlGet(b, 'Format').toLowerCase();
    const url = xmlGet(b, 'Url');
    if (url) (byFormat[fmt] ??= []).push(url);
  }
  return byFormat['normal'] ?? byFormat['gallery'] ?? byFormat['thumb'] ?? [];
}

function guessCategory(headline) {
  const t = headline.toLowerCase();
  if (/reservdel|urfjäder|urtavla|urrörelse|klockdel|kronsten|klockreservdel/i.test(t)) return 'parts';
  if (/klocka|armbandsur|fickur|watch|seiko|omega|longines|rolex|tissot|citizen|junghans|breitling|certina|zenith|klockarmband/i.test(t)) return 'watches';
  if (/bärnsten|bernsten|amber|\bsten\b|mineral|fossil|kristall|agat|jade|kvarts|turmalin|korall|pärla|opal/i.test(t)) return 'stones';
  if (/smycke|halsband|ring|armband|brosch|örhänge|berlock|pendant|bijou|silver|guld|platina/i.test(t)) return 'jewelry';
  return 'other';
}

function isNil(xml, tag) {
  return new RegExp(`<(?:[\\w]+:)?${tag}[^>]*nil\\s*=\\s*"true"`, 'i').test(xml);
}

function parseItems(xml) {
  return xmlGetAll(xml, 'Items').map(b => {
    const id = parseInt(xmlGet(b, 'Id'), 10);
    if (!id) return null;
    const headline = xmlGet(b, 'ShortDescription');
    const isEnded = xmlGet(b, 'IsEnded').toLowerCase() === 'true';
    const images = parseImages(b);
    const thumb = xmlGet(b, 'ThumbnailLink');
    return {
      id: String(id),
      title: headline,
      description: stripHtml(xmlGet(b, 'LongDescription')),
      price: (!isNil(b, 'BuyItNowPrice') && parseFloat(xmlGet(b, 'BuyItNowPrice'))) ||
             (!isNil(b, 'MaxBid') && parseFloat(xmlGet(b, 'MaxBid'))) ||
             (!isNil(b, 'NextBid') && parseFloat(xmlGet(b, 'NextBid'))) || 0,
      category: guessCategory(headline),
      status: isEnded ? 'sold' : 'available',
      images: images.length ? images : (thumb ? [thumb] : []),
      traderaUrl: xmlGet(b, 'ItemUrl') || undefined,
      tags: [],
      soldDate: isEnded && xmlGet(b, 'EndDate') ? xmlGet(b, 'EndDate').split('T')[0] : undefined,
    };
  }).filter(Boolean);
}

async function tryFetch() {
  const res = await fetch('https://api.tradera.com/v3/searchservice.asmx', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      SOAPAction: `"${NS}/SearchAdvanced"`,
    },
    body: soapEnvelope(),
  });
  return res;
}

async function main() {
  const WAIT_MINUTES = 15;
  console.log(`⏳ Waiting ${WAIT_MINUTES} minutes (ZERO API calls) to let rate limit fully clear...`);
  
  for (let i = WAIT_MINUTES; i > 0; i--) {
    process.stdout.write(`   ${i} min remaining...\r`);
    await new Promise(r => setTimeout(r, 60_000));
  }
  console.log('\n🔄 Trying API now...');
  
  const res = await tryFetch();
  console.log(`   HTTP ${res.status}`);
  
  if (res.status === 429) {
    console.log('❌ Still rate-limited. Wait longer and try again.');
    process.exit(1);
  }
  
  if (!res.ok) {
    console.log('❌ Unexpected error:', (await res.text()).slice(0, 300));
    process.exit(1);
  }
  
  const xml = await res.text();
  const products = parseItems(xml);
  console.log(`✅ Got ${products.length} products`);
  
  fs.writeFileSync(FALLBACK, JSON.stringify(products, null, 2));
  console.log(`✅ Saved to ${FALLBACK}`);
}

main().catch(err => { console.error(err); process.exit(1); });
