import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Available Items — Swatches',
  description: 'All items currently available to buy on Tradera.',
};

export default async function AvailablePage() {
  const products = await getProducts();
  const available = products.filter((p) => p.status === 'available');

  return (
    <div>
      <div className="relative bg-gradient-to-r from-emerald-800 to-emerald-950 text-white py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=2064&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 to-emerald-950/90" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-emerald-300 text-sm uppercase tracking-widest mb-2">Category</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            Available Items
          </h1>
          <p className="text-emerald-200 text-lg">
            {available.length} items ready to buy on Tradera
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ProductGrid
          products={available}
          emptyMessage="No available items right now. Check back soon!"
        />
      </div>
    </div>
  );
}
