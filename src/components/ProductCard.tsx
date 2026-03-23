import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-200 hover:shadow-xl hover:ring-amber-300/60 transition-all duration-300 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                product.status === 'sold' ? 'grayscale-[30%]' : ''
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg className="w-16 h-16 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {product.material && (
            <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider mb-1">
              {product.material.split(',')[0]}
            </p>
          )}
          <h3 className="font-semibold text-stone-800 text-sm leading-snug line-clamp-2 mb-3 group-hover:text-amber-700 transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-stone-900 font-bold text-lg">{formatPrice(product.price)}</p>
            {product.year && (
              <span className="text-stone-400 text-xs">{product.year}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
