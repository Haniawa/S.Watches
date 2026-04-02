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
      <div className="relative bg-emerald-950 text-white overflow-hidden min-h-[480px] flex items-center">
        {/* Wallpaper */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/available.png')",
          }}
        />
        {/* Left-heavy overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-emerald-900/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 w-full">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Category</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
            Available Items
          </h1>
          <p className="text-emerald-200 text-xl max-w-lg">
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
