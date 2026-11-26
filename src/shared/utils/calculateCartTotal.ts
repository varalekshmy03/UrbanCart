import type { CartItem } from '../../features/cart/cartSlice';
export const calculateCartTotal = (items: CartItem[]): number =>
  Math.round(items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100) / 100;
