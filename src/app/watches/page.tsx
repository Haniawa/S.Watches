import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Watches — Swatches',
  description: 'Vintage and antique watches — Longines, Omega, Seiko and more.',
};

export default async function WatchesPage() {
  const products = await getProducts();
  const watchProducts = products.filter((p) => p.category === 'watches');
  const available = watchProducts.filter((p) => p.status === 'available');
  const sold = watchProducts.filter((p) => p.status === 'sold');

  return (
    <div>
      <div className="relative bg-stone-950 text-white overflow-hidden min-h-[480px] flex items-center">
        {/* Wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/omega.png')",
          }}
        />
        {/* Left-heavy overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-800/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <p className="text-stone-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Category</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">Watches</h1>
          <p className="text-stone-300 text-xl max-w-lg">
            {watchProducts.length} items total &middot; {available.length} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {available.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-stone-800 mb-6 pb-2 border-b border-stone-200">
              Available
            </h2>
            <ProductGrid products={available} />
          </section>
        )}
        {sold.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-stone-400 mb-6 pb-2 border-b border-stone-200">
              Sold
            </h2>
            <ProductGrid products={sold} />
          </section>
        )}
        {watchProducts.length === 0 && (
          <p className="text-stone-400 text-center py-16">No watches right now.</p>
        )}
      </div>
    </div>
  );
}
