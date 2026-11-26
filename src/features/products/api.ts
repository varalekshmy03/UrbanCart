import { API_BASE_URL, isExcludedProductCategory } from '../../shared/utils/constants';
import type { Product } from './types';

const get = async <T,>(path: string): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
};
export const api = {
  getProducts: async (): Promise<Product[]> => {
    const response = await get<{ products: Product[] }>('/products?limit=0');
    return response.products.filter((product) => !isExcludedProductCategory(product.category));
  },
  getProduct: async (id: number): Promise<Product> => {
    const product = await get<Product>(`/products/${id}`);
    if (isExcludedProductCategory(product.category)) {
      throw new Error('This product is unavailable');
    }
    return product;
  },
};
