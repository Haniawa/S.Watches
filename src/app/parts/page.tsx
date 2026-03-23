import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Parts — Swatches',
  description: 'Watch parts and components for vintage and antique timepieces.',
};

export default async function PartsPage() {
  const products = await getProducts();
  const partsProducts = products.filter((p) => p.category === 'parts');
  const available = partsProducts.filter((p) => p.status === 'available');
  const sold = partsProducts.filter((p) => p.status === 'sold');

  return (
    <div>
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-950 text-white py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=2088&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-blue-950/90" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-blue-300 text-sm uppercase tracking-widest mb-2">Category</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Parts</h1>
          <p className="text-blue-300 text-lg">
            {partsProducts.length} items total · {available.length} available
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
        {partsProducts.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-stone-500 text-lg">No parts available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
