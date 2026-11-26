import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, SortOrder, Status } from './types';

export interface ProductsState {
  items: Product[]; selected: Product | null; status: Status; error: string | null;
  search: string; category: string; sort: SortOrder;
}
export const initialState: ProductsState = { items: [], selected: null, status: 'idle', error: null, search: '', category: 'all', sort: 'none' };

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (s) => { s.status = 'loading'; s.error = null; },
    fetchProductsSuccess: (s, a: PayloadAction<Product[]>) => { s.status = 'succeeded'; s.items = a.payload; },
    fetchProductsFailure: (s, a: PayloadAction<string>) => { s.status = 'failed'; s.error = a.payload; },
    fetchProductRequest: (s, _a: PayloadAction<number>) => { s.status = 'loading'; s.error = null; s.selected = null; },
    fetchProductSuccess: (s, a: PayloadAction<Product>) => { s.status = 'succeeded'; s.selected = a.payload; },
    setSearch: (s, a: PayloadAction<string>) => { s.search = a.payload; },
    setCategory: (s, a: PayloadAction<string>) => { s.category = a.payload; },
    setSort: (s, a: PayloadAction<SortOrder>) => { s.sort = a.payload; },
  },
});
export const { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure, fetchProductRequest, fetchProductSuccess, setSearch, setCategory, setSort } = slice.actions;
export default slice.reducer;
