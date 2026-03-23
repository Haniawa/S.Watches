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
      <div className="relative bg-gradient-to-r from-amber-700 to-amber-950 text-white py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-700/90 to-amber-950/90" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-amber-200 text-sm uppercase tracking-widest mb-2">Category</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            Stones & Amber
          </h1>
          <p className="text-amber-200 text-lg">
            {stoneProducts.length} items total · {available.length} available
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
