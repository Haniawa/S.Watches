import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Sold Items — Swatches',
  description: 'History of previously sold items.',
};

export default async function SoldPage() {
  const products = await getProducts();
  const sold = products.filter((p) => p.status === 'sold');

  return (
    <div>
      <div className="relative bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1587836374228-4c8c34898e85?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/90 to-slate-900/90" />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-slate-300 text-sm uppercase tracking-widest mb-2">Category</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Sold Items</h1>
          <p className="text-slate-300 text-lg">{sold.length} items sold</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ProductGrid products={sold} emptyMessage="No sold items yet." />
      </div>
    </div>
  );
}
