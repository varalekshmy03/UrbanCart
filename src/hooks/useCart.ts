import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { addToCart, clearCart, removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import type { Product } from '../features/products/types';
import { calculateCartTotal } from '../shared/utils/calculateCartTotal';

export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector((s: RootState) => s.cart.items);
  const total = useMemo(() => calculateCartTotal(items), [items]);
  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const add = useCallback((p: Product) => {
    dispatch(addToCart(p));
    window.alert(`${p.title} added to cart`);
  }, [dispatch]);
  const remove = useCallback((id: number) => dispatch(removeFromCart(id)), [dispatch]);
  const update = useCallback((id: number, quantity: number) => dispatch(updateQuantity({ id, quantity })), [dispatch]);
  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);
  return { items, total, count, add, remove, update, clear };
}
