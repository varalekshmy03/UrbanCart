export interface Product {
  id: number; title: string; description: string; category: string; price: number;
  discountPercentage: number; rating: number; stock: number; brand?: string;
  thumbnail: string; images: string[];
}
export type SortOrder = 'none' | 'asc' | 'desc' | 'rating';
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
