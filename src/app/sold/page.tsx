import { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Sålda Objekt — Swatches',
  description: 'Historik över tidigare sålda objekt.',
};

export default async function SoldPage() {
  const products = await getProducts();
  const sold = products.filter((p) => p.status === 'sold');

  return (
    <div>
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-300 text-sm uppercase tracking-widest mb-2">Kategori</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Sålda Objekt</h1>
          <p className="text-slate-300 text-lg">{sold.length} objekt sålda</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ProductGrid products={sold} emptyMessage="Inga sålda objekt ännu." />
      </div>
    </div>
  );
}
