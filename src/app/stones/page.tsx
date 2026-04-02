import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Stones & Amber — Swatches',
  description: 'Natural stones, amber and gemstones from the Baltic Sea and around the world.',
};

export default async function StonesPage() {
  const products = await getProducts();
  const stoneProducts = products.filter((p) => p.category === 'stones');
  const available = stoneProducts.filter((p) => p.status === 'available');
  const sold = stoneProducts.filter((p) => p.status === 'sold');

  return (
    <div>
      <div className="relative bg-amber-950 text-white overflow-hidden min-h-[480px] flex items-center">
        {/* Wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/amber.png')",
          }}
        />
        {/* Left-heavy overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-amber-950/80 to-amber-800/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <p className="text-amber-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Category</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
            Stones &amp; Amber
          </h1>
          <p className="text-amber-200 text-xl max-w-lg">
            {stoneProducts.length} items total &middot; {available.length} available
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
        {stoneProducts.length === 0 && (
          <p className="text-stone-400 text-center py-16">No stone items right now.</p>
        )}
      </div>
    </div>
  );
}
