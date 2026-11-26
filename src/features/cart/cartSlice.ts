import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../products/types';

export interface CartItem { id: number; title: string; price: number; thumbnail: string; quantity: number }
export interface CartState { items: CartItem[] }
const initialState: CartState = { items: [] };

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (s, a: PayloadAction<Product>) => {
      const found = s.items.find((i) => i.id === a.payload.id);
      if (found) found.quantity += 1;
      else {
        const { id, title, price, thumbnail } = a.payload;
        s.items.push({ id, title, price, thumbnail, quantity: 1 });
      }
    },
    removeFromCart: (s, a: PayloadAction<number>) => { s.items = s.items.filter((i) => i.id !== a.payload); },
    updateQuantity: (s, a: PayloadAction<{ id: number; quantity: number }>) => {
      if (a.payload.quantity <= 0) { s.items = s.items.filter((i) => i.id !== a.payload.id); return; }
      const found = s.items.find((i) => i.id === a.payload.id);
      if (found) found.quantity = a.payload.quantity;
    },
    clearCart: (s) => { s.items = []; },
  },
});
export const { addToCart, removeFromCart, updateQuantity, clearCart } = slice.actions;
export default slice.reducer;
