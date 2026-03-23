import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getProducts, getProductById } from '@/lib/products';
import { formatPrice, conditionLabel, categoryLabel } from '@/lib/utils';
import { StatusBadge } from '@/components/StatusBadge';

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: 'Produkt hittades inte — Swatches' };
  return {
    title: `${product.title} — Swatches`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-600 text-sm font-medium mb-10 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Tillbaka
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* ── Images ─────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 ring-1 ring-stone-200">
            {product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <svg className="w-20 h-20 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          {product.images.slice(1).map((img, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 ring-1 ring-stone-200"
            >
              <Image
                src={img}
                alt={`${product.title} bild ${i + 2}`}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* ── Details ────────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">
                {categoryLabel(product.category)}
              </p>
              <h1 className="font-display text-3xl font-bold text-stone-800 leading-snug">
                {product.title}
              </h1>
            </div>
            <StatusBadge status={product.status} className="shrink-0 mt-1" />
          </div>

          <p className="text-4xl font-bold text-stone-900 mb-6">
            {formatPrice(product.price)}
          </p>

          <p className="text-stone-600 leading-relaxed mb-8">{product.description}</p>

          {/* Specs table */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 p-5 bg-stone-50 rounded-xl ring-1 ring-stone-200 mb-8 text-sm">
            {product.material && (
              <>
                <dt className="text-stone-500 font-medium">Material</dt>
                <dd className="text-stone-800">{product.material}</dd>
              </>
            )}
            {product.year && (
              <>
                <dt className="text-stone-500 font-medium">Tillverkat ca</dt>
                <dd className="text-stone-800">{product.year}-tal</dd>
              </>
            )}
            {product.condition && (
              <>
                <dt className="text-stone-500 font-medium">Skick</dt>
                <dd className="text-stone-800">{conditionLabel(product.condition)}</dd>
              </>
            )}
            {product.soldDate && (
              <>
                <dt className="text-stone-500 font-medium">Såldes</dt>
                <dd className="text-stone-800">
                  {new Date(product.soldDate).toLocaleDateString('sv-SE')}
                </dd>
              </>
            )}
          </dl>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          {product.status === 'available' ? (
            <a
              href={product.traderaUrl ?? 'https://www.tradera.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-900 font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-amber-200 text-lg"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Köp på Tradera
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <div className="w-full text-center bg-stone-100 text-stone-400 font-medium py-4 px-6 rounded-xl">
              Detta objekt är sålt
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
