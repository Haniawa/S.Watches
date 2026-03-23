import Link from 'next/link';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryCard } from '@/components/CategoryCard';

export default async function HomePage() {
  const products = await getProducts();
  const availableCount = products.filter((p) => p.status === 'available').length;
  const soldCount = products.filter((p) => p.status === 'sold').length;
  const stonesCount = products.filter((p) => p.category === 'stones').length;
  const watchesCount = products.filter((p) => p.category === 'watches').length;
  const partsCount = products.filter((p) => p.category === 'parts').length;
  const featuredProducts = products
    .filter((p) => p.status === 'available')
    .slice(0, 4);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white overflow-hidden min-h-[600px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-60 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/enicar.png')",
          }}
        />
        {/* Overlay gradient - lighter on the left for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/70 to-transparent" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center min-h-[600px]">
          <div className="max-w-xl">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-5">
              Hand-picked antiques
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Timeless treasures
              <br />
              <span className="text-amber-400">from Tradera</span>
            </h1>
            <p className="text-stone-200 text-lg mb-10 leading-relaxed">
              Unique stones, amber, antique watches and collectibles. Each item is
              carefully selected for its history and beauty.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/available"
                className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg"
              >
                Browse available items
              </Link>
              <Link
                href="/stones"
                className="border-2 border-amber-400 hover:bg-amber-400 hover:text-stone-900 text-amber-400 font-semibold px-8 py-3.5 rounded-xl transition-colors"
              >
                Explore amber
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: availableCount, label: 'Available', color: 'text-emerald-400' },
              { value: soldCount, label: 'Sold', color: 'text-stone-400' },
              { value: stonesCount, label: 'Stones', color: 'text-amber-400' },
              { value: watchesCount, label: 'Watches', color: 'text-stone-300' },
            ].map((stat) => (
              <div key={stat.label}>
                <dd className={`text-3xl font-bold ${stat.color}`}>{stat.value}</dd>
                <dt className="text-stone-500 text-sm mt-1">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-800 mb-2">
              Categories
            </h2>
            <p className="text-stone-500">Explore our collection by category</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <CategoryCard
              title="Available"
              description="Items for sale right now"
              href="/available"
              count={availableCount}
              gradient="bg-gradient-to-br from-emerald-700 to-emerald-900"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
            />
            <CategoryCard
              title="Sold"
              description="Previously sold items"
              href="/sold"
              count={soldCount}
              gradient="bg-gradient-to-br from-slate-600 to-slate-800"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <CategoryCard
              title="Stones & Amber"
              description="Natural stones & gemstones"
              href="/stones"
              count={stonesCount}
              gradient="bg-gradient-to-br from-amber-600 to-amber-900"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
            />
            <CategoryCard
              title="Watches"
              description="Vintage & antique watches"
              href="/watches"
              count={watchesCount}
              gradient="bg-gradient-to-br from-stone-600 to-stone-900"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <CategoryCard
              title="Parts"
              description="Watch parts & components"
              href="/parts"
              count={partsCount}
              gradient="bg-gradient-to-br from-blue-600 to-blue-900"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ── Expertise ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
            <svg className="w-8 h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-800 mb-4">
            40+ Years of Expertise
          </h2>
          <p className="text-stone-600 text-lg mb-6 leading-relaxed">
            Samir brings over four decades of professional experience in vintage watches and natural amber stones. 
            With deep knowledge of Baltic amber and antique timepieces from renowned makers like Rolex, Longines, Omega, and Seiko.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200">
            <p className="text-stone-700 font-medium mb-4">
              Interested in buying or selling watches and amber stones?
            </p>
            <p className="text-stone-600 mb-6">
              We're always open to proposals. Whether you're looking to acquire a specific piece or sell from your collection, 
              reach out to discuss opportunities.
            </p>
            <a
              href="mailto:samirwatches80@gmail.com"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Samir
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured products ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-stone-100/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-800 mb-1">
                Available items
              </h2>
              <p className="text-stone-500">Ready to buy on Tradera</p>
            </div>
            <Link
              href="/available"
              className="text-amber-700 hover:text-amber-600 font-semibold text-sm transition-colors flex items-center gap-1"
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  );
}
