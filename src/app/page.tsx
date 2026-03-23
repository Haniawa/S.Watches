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
  const featuredProducts = products
    .filter((p) => p.status === 'available')
    .slice(0, 4);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-5">
            Handplockade antikviteter
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
            Tidlösa skatter
            <br />
            <span className="text-amber-400">från Tradera</span>
          </h1>
          <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Unika stenar, bärnsten, antika klockor och samlarsaker. Varje objekt är
            noggrant utvalt för sin historia och skönhet.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/available"
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              Se tillgängliga objekt
            </Link>
            <Link
              href="/stones"
              className="border border-stone-500 hover:border-amber-400 hover:text-amber-400 text-stone-300 font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Utforska bärnsten
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: availableCount, label: 'Tillgängliga', color: 'text-emerald-400' },
              { value: soldCount, label: 'Sålda', color: 'text-stone-400' },
              { value: stonesCount, label: 'Stenar', color: 'text-amber-400' },
              { value: watchesCount, label: 'Klockor', color: 'text-stone-300' },
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
              Kategorier
            </h2>
            <p className="text-stone-500">Utforska vår samling efter kategori</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCard
              title="Tillgängligt"
              description="Objekt till salu just nu"
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
              title="Sålda"
              description="Tidigare sålda objekt"
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
              title="Stenar & Bärnsten"
              description="Naturliga stenar & ädelstenar"
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
              title="Klockor"
              description="Vintage & antika klockor"
              href="/watches"
              count={watchesCount}
              gradient="bg-gradient-to-br from-stone-600 to-stone-900"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ── Featured products ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-stone-100/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-800 mb-1">
                Tillgängliga objekt
              </h2>
              <p className="text-stone-500">Redo att köpas på Tradera</p>
            </div>
            <Link
              href="/available"
              className="text-amber-700 hover:text-amber-600 font-semibold text-sm transition-colors flex items-center gap-1"
            >
              Se alla
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
