import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import { makeStore, type RootState } from '../app/store';
import type { Product } from '../features/products/types';

export const mockProducts: Product[] = [
  { id: 1, title: 'Red Lipstick', description: 'd', category: 'beauty', price: 20, discountPercentage: 5, rating: 4.5, stock: 9, thumbnail: 't1', images: ['i1'] },
  { id: 2, title: 'Laptop Pro', description: 'd', category: 'laptops', price: 900, discountPercentage: 10, rating: 4.8, stock: 3, thumbnail: 't2', images: ['i2'] },
  { id: 3, title: 'Mouse', description: 'd', category: 'laptops', price: 15, discountPercentage: 2, rating: 4, stock: 20, thumbnail: 't3', images: ['i3'] },
];
export const mockFetchOk = () => (global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ products: mockProducts }) }) as any);
export const mockFetchFail = () => (global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }) as any);

export function renderWithProviders(ui: ReactElement, preloaded?: Partial<RootState>) {
  const store = makeStore(preloaded);
  return { store, ...render(<Provider store={store}><MemoryRouter>{ui}</MemoryRouter></Provider>) };
}
