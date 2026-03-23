import { ProductStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
        status === 'available'
          ? 'bg-emerald-100 text-emerald-800'
          : 'bg-red-100 text-red-700'
      } ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'available' ? 'bg-emerald-500' : 'bg-red-500'
        }`}
      />
      {status === 'available' ? 'Available' : 'Sold'}
    </span>
  );
}
