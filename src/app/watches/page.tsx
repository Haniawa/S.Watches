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
      <div className="relative bg-gradient-to-r from-stone-700 to-stone-950 text-white py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-700/90 to-stone-950/90" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-stone-300 text-sm uppercase tracking-widest mb-2">Category</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Watches</h1>
          <p className="text-stone-300 text-lg">
            {watchProducts.length} items total · {available.length} available
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
