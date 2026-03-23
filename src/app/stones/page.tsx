import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Stenar & Bärnsten — Swatches',
  description: 'Naturliga stenar, bärnsten och ädelstenar från Östersjön och världen.',
};

export default async function StonesPage() {
  const products = await getProducts();
  const stoneProducts = products.filter((p) => p.category === 'stones');
  const available = stoneProducts.filter((p) => p.status === 'available');
  const sold = stoneProducts.filter((p) => p.status === 'sold');

  return (
    <div>
      <div className="bg-gradient-to-r from-amber-700 to-amber-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-200 text-sm uppercase tracking-widest mb-2">Kategori</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            Stenar & Bärnsten
          </h1>
          <p className="text-amber-200 text-lg">
            {stoneProducts.length} objekt totalt · {available.length} tillgängliga
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
        {stoneProducts.length === 0 && (
          <p className="text-stone-400 text-center py-16">Inga sten-objekt just nu.</p>
        )}
      </div>
    </div>
  );
}
