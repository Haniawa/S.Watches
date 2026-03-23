import { ProductCondition, ProductCategory } from './types';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(price);
}

export function conditionLabel(condition: ProductCondition): string {
  const labels: Record<ProductCondition, string> = {
    'new': 'Ny',
    'like-new': 'Som ny',
    'good': 'Mycket bra skick',
    'fair': 'Bra skick',
  };
  return labels[condition];
}

export function categoryLabel(category: ProductCategory): string {
  const labels: Record<ProductCategory, string> = {
    'stones': 'Stenar & Bärnsten',
    'watches': 'Klockor',
    'jewelry': 'Smycken',
    'other': 'Övrigt',
  };
  return labels[category];
}
