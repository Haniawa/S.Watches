import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Klockor — Swatches',
  description: 'Vintage och antika klockor — Longines, Omega, Seiko och mer.',
};

export default async function WatchesPage() {
  const products = await getProducts();
  const watchProducts = products.filter((p) => p.category === 'watches');
  const available = watchProducts.filter((p) => p.status === 'available');
  const sold = watchProducts.filter((p) => p.status === 'sold');

  return (
    <div>
      <div className="bg-gradient-to-r from-stone-700 to-stone-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-stone-300 text-sm uppercase tracking-widest mb-2">Kategori</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Klockor</h1>
          <p className="text-stone-300 text-lg">
            {watchProducts.length} objekt totalt · {available.length} tillgängliga
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {available.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-stone-800 mb-6 pb-2 border-b border-stone-200">
              Tillgängliga
            </h2>
            <ProductGrid products={available} />
          </section>
        )}
        {sold.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-bold text-stone-400 mb-6 pb-2 border-b border-stone-200">
              Sålda
            </h2>
            <ProductGrid products={sold} />
          </section>
        )}
        {watchProducts.length === 0 && (
          <p className="text-stone-400 text-center py-16">Inga klockor just nu.</p>
        )}
      </div>
    </div>
  );
}
