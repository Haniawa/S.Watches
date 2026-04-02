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
      <div className="relative bg-slate-950 text-white overflow-hidden min-h-[480px] flex items-center">
        {/* Wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/soldout.png')",
          }}
        />
        {/* Left-heavy overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-800/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <p className="text-slate-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Category</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">Sold Items</h1>
          <p className="text-slate-300 text-xl max-w-lg">{sold.length} previously sold items</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ProductGrid products={sold} emptyMessage="No sold items yet." />
      </div>
    </div>
  );
}
