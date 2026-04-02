import Link from 'next/link';
import { getProducts, getHighlightProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';
import { HighlightCard } from '@/components/HighlightCard';
import { CategoriesCarousel } from '@/components/CategoriesCarousel';
import { ShuffleTestimonials } from '@/components/ui/testimonial-cards';

export default async function HomePage() {
  const products = await getProducts();
  const availableCount = products.filter((p) => p.status === 'available').length;
  const soldCount = products.filter((p) => p.status === 'sold').length;
  const stonesCount = products.filter((p) => p.category === 'stones').length;
  const watchesCount = products.filter((p) => p.category === 'watches').length;
  const partsCount = products.filter((p) => p.category === 'parts').length;
  const highlightProducts = await getHighlightProducts();

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
          <div className="mb-0">
            <h2 className="max-w-7xl pl-4 mx-auto font-display text-3xl md:text-5xl font-bold text-stone-800 mb-2">
              Categories
            </h2>
            <p className="max-w-7xl pl-4 mx-auto text-stone-500">Explore our collection by category</p>
          </div>
          <CategoriesCarousel
            availableCount={availableCount}
            soldCount={soldCount}
            stonesCount={stonesCount}
            watchesCount={watchesCount}
            partsCount={partsCount}
          />
        </div>
      </section>

      {/* ── Expertise ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 to-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">

            {/* Photo */}
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="relative">
                {/* Decorative amber ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 opacity-30 blur-sm" />
                <img
                  src="/s.png"
                  alt="Samir — watch and amber expert"
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-[center_20%] shadow-xl border-4 border-white"
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-stone-800 text-sm">Samir</p>
                <p className="text-amber-700 text-xs">Watch &amp; Amber Expert</p>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-800">
                  40+ Years of Expertise
                </h2>
              </div>

              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                Samir brings over four decades of professional experience in vintage watches and natural amber stones.
                With deep knowledge of Baltic amber and antique timepieces from renowned makers like Rolex, Longines, Omega, and Seiko.
              </p>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-200">
                <p className="text-stone-700 font-medium mb-3">
                  Interested in buying or selling watches and amber stones?
                </p>
                <p className="text-stone-500 text-sm mb-5 leading-relaxed">
                  We&apos;re always open to proposals. Whether you&apos;re looking to acquire a specific piece or sell from your collection,
                  reach out to discuss opportunities.
                </p>
                <a
                  href="mailto:samirwatches80@gmail.com"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Samir
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Left: heading */}
          <div>
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
              Customer reviews
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              What buyers say
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-6">
              Real feedback from verified Tradera buyers. Drag the card to the left to see the next review.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-5 h-5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-stone-300 font-semibold">5.0</span>
              <span className="text-stone-500 text-sm">· 4 reviews on Tradera</span>
            </div>
          </div>

          {/* Right: shuffle cards */}
          <div className="grid place-content-center py-8">
            <ShuffleTestimonials />
          </div>
        </div>
      </section>

      {/* ── Sold highlights ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                Our track record
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Sold Highlights
              </h2>
              <p className="text-stone-400">Premium pieces that found their new owners</p>
            </div>
            <Link
              href="/sold"
              className="text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors flex items-center gap-1"
            >
              View all sold
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlightProducts.map((product) => (
              <HighlightCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
