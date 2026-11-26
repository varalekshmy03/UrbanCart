import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useCart } from '../../hooks/useCart';
import { useDebounce } from '../../hooks/useDebounce';
import ProductCard from '../../shared/components/ProductCard';
import { EmptyState, ErrorMessage, Loading } from '../../shared/components/StateViews';
import { DEBOUNCE_MS, SORT_OPTIONS } from '../../shared/utils/constants';
import { sortProducts } from '../../shared/utils/sortProducts';
import { fetchProductsRequest, setCategory, setSearch, setSort } from './productsSlice';
import type { SortOrder } from './types';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, status, error, category, sort } = useSelector((s: RootState) => s.products);
  const { add } = useCart();
  const [text, setText] = useState('');
  const debounced = useDebounce(text, DEBOUNCE_MS);

  useEffect(() => { if (status === 'idle') dispatch(fetchProductsRequest()); }, [status, dispatch]);
  useEffect(() => { dispatch(setSearch(debounced)); }, [debounced, dispatch]);

  const categories = useMemo(() => ['all', ...new Set(items.map((p) => p.category))], [items]);
  const visible = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    const filtered = items.filter((p) => (category === 'all' || p.category === category) && p.title.toLowerCase().includes(q));
    return sortProducts(filtered, sort);
  }, [items, debounced, category, sort]);
  const retry = useCallback(() => dispatch(fetchProductsRequest()), [dispatch]);

  return (
    <section>
      <h1>All products</h1>
      <div className="toolbar">
        <input type="search" placeholder="Search products" aria-label="Search products" value={text} onChange={(e) => setText(e.target.value)} />
        <select aria-label="Category" value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select aria-label="Sort products" value={sort} onChange={(e) => dispatch(setSort(e.target.value as SortOrder))}>
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      {status === 'loading' && <Loading />}
      {status === 'failed' && <ErrorMessage message={error ?? 'Unknown error'} onRetry={retry} />}
      {status === 'succeeded' && visible.length === 0 && <EmptyState text="No products match your search. Try a different name or category." />}
      <div className="grid">{visible.map((p) => <ProductCard key={p.id} product={p} onAdd={add} />)}</div>
    </section>
  );
}
