export type ProductCategory = 'stones' | 'watches' | 'jewelry' | 'other';
export type ProductStatus = 'available' | 'sold';
export type ProductCondition = 'new' | 'like-new' | 'good' | 'fair';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  status: ProductStatus;
  images: string[];
  traderaUrl?: string;
  material?: string;
  year?: string;
  condition?: ProductCondition;
  tags?: string[];
  soldDate?: string;
}
