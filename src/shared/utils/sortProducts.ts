import type { Product, SortOrder } from '../../features/products/types';

export const sortProducts = (products: Product[], order: SortOrder): Product[] => {
  if (order === 'none') {
    return [...products];
  }

  if (order === 'rating') {
    return [...products].sort((a, b) => b.rating - a.rating);
  }

  return [...products].sort((a, b) =>
    order === 'asc' ? a.price - b.price : b.price - a.price,
  );
};
