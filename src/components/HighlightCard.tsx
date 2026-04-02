import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface HighlightCardProps {
  product: Product;
}

export function HighlightCard({ product }: HighlightCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
    >
      <article className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-2xl overflow-hidden shadow-lg ring-1 ring-amber-500/20 hover:ring-amber-400/50 hover:shadow-amber-500/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-800">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 grayscale-[20%]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <svg className="w-20 h-20 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          {/* SOLD badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/90 text-stone-900 backdrop-blur-sm shadow-lg">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sold
            </span>
          </div>

          {/* Price ribbon */}
          <div className="absolute bottom-4 right-4">
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-bold text-white leading-snug mb-2 group-hover:text-amber-400 transition-colors duration-300">
            {product.title}
          </h3>
          {product.soldDate && (
            <p className="text-stone-500 text-xs uppercase tracking-wider">
              Sold {new Date(product.soldDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          )}
        </div>

        {/* Subtle amber shimmer line at bottom */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      </article>
    </Link>
  );
}
