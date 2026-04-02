import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ProductCondition, ProductCategory } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(price);
}

export function conditionLabel(condition: ProductCondition): string {
  const labels: Record<ProductCondition, string> = {
    'new': 'New',
    'like-new': 'Like new',
    'good': 'Very good condition',
    'fair': 'Good condition',
  };
  return labels[condition];
}

export function categoryLabel(category: ProductCategory): string {
  const labels: Record<ProductCategory, string> = {
    'stones': 'Stones & Amber',
    'watches': 'Watches',
    'jewelry': 'Jewelry',
    'parts': 'Parts',
    'other': 'Other',
  };
  return labels[category];
}
