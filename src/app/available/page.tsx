import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Tillgängliga Objekt — Swatches',
  description: 'Alla objekt som för tillfället är tillgängliga att köpa på Tradera.',
};

export default async function AvailablePage() {
  const products = await getProducts();
  const available = products.filter((p) => p.status === 'available');

  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-emerald-300 text-sm uppercase tracking-widest mb-2">Kategori</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
            Tillgängliga Objekt
          </h1>
          <p className="text-emerald-200 text-lg">
            {available.length} objekt redo att köpas på Tradera
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ProductGrid
          products={available}
          emptyMessage="Inga tillgängliga objekt just nu. Återkom snart!"
        />
      </div>
    </div>
  );
}
