import reducer, { initialState, fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure, setSearch, setCategory, setSort } from '../features/products/productsSlice';
import cart, { addToCart, removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { calculateCartTotal } from '../shared/utils/calculateCartTotal';
import { sortProducts } from '../shared/utils/sortProducts';
import { mockProducts } from './testUtils';

describe('productsSlice', () => {
  it('handles request/success/failure', () => {
    expect(reducer(initialState, fetchProductsRequest()).status).toBe('loading');
    expect(reducer(initialState, fetchProductsSuccess(mockProducts))).toMatchObject({ status: 'succeeded', items: mockProducts });
    expect(reducer(initialState, fetchProductsFailure('boom'))).toMatchObject({ status: 'failed', error: 'boom' });
  });
  it('stores search, category, sort', () => {
    let s = reducer(initialState, setSearch('abc')); s = reducer(s, setCategory('beauty')); s = reducer(s, setSort('asc'));
    expect(s).toMatchObject({ search: 'abc', category: 'beauty', sort: 'asc' });
  });
});
describe('cartSlice', () => {
  const withItem = cart({ items: [] }, addToCart(mockProducts[0]));
  it('adds and increments', () => {
    expect(cart(withItem, addToCart(mockProducts[0])).items[0].quantity).toBe(2);
  });
  it('updates, removes, clears', () => {
    expect(cart(withItem, updateQuantity({ id: 1, quantity: 5 })).items[0].quantity).toBe(5);
    expect(cart(withItem, updateQuantity({ id: 1, quantity: 0 })).items).toHaveLength(0);
    expect(cart(withItem, removeFromCart(1)).items).toHaveLength(0);
    expect(cart(withItem, clearCart()).items).toHaveLength(0);
  });
  it('recalculates total', () => {
    expect(calculateCartTotal(cart(withItem, updateQuantity({ id: 1, quantity: 3 })).items)).toBe(60);
  });
});
describe('sortProducts', () => {
  it('sorts by relevance, rating and price', () => {
    expect(sortProducts(mockProducts, 'none').map((p) => p.id)).toEqual([1, 2, 3]);
    expect(sortProducts(mockProducts, 'rating').map((p) => p.id)).toEqual([2, 1, 3]);
    expect(sortProducts(mockProducts, 'asc').map((p) => p.id)).toEqual([3, 1, 2]);
    expect(sortProducts(mockProducts, 'desc').map((p) => p.id)).toEqual([2, 1, 3]);
  });
});
