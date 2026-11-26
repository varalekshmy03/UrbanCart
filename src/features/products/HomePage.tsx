import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../../app/store';
import { useCart } from '../../hooks/useCart';
import ProductCard from '../../shared/components/ProductCard';
import { ErrorMessage, Loading } from '../../shared/components/StateViews';
import { FEATURED_COUNT } from '../../shared/utils/constants';
import { fetchProductsRequest, setCategory } from './productsSlice';
import type { Product } from './types';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status, error } = useSelector((s: RootState) => s.products);
  const { add } = useCart();
  useEffect(() => { if (status === 'idle') dispatch(fetchProductsRequest()); }, [status, dispatch]);

  const featured = useMemo(() => [...items].slice(0, FEATURED_COUNT), [items]);
  const deals = useMemo(() =>
      [...items]
        .filter((product) => product.discountPercentage > 0)
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 4),
    [items]);
  const recommended = useMemo(() => [...items].sort((a, b) => b.rating - a.rating).slice(0, 4), [items]);
  const categories = useMemo(() => [...new Set(items.map((p) => p.category))].slice(0, 8), [items]);

  if (status === 'loading' || status === 'idle') return <Loading />;
  if (status === 'failed') return <ErrorMessage message={error ?? 'Unknown error'} onRetry={() => dispatch(fetchProductsRequest())} />;
  const grid = (list: Product[], showDiscount = false) =>
    <div className="grid">
      {list.map((p) => <ProductCard key={p.id} product={p} onAdd={add} showDiscount={showDiscount} />)}
    </div>;
  return (
    <>
      <section className="hero"><p className="eyebrow">Welcome to UrbanCart</p><h1>UrbanCart</h1><p>Everyday essentials. Exceptional finds.</p><Link className="btn" to="/products">Shop all products</Link></section>
      <h2>Featured products</h2>{grid(featured)}
      <h2>Deals of the day</h2>{grid(deals, true)}
      <h2>Shop by category</h2>
      <div className="chips">{categories.map((c) => <button key={c} className="chip" onClick={() => { dispatch(setCategory(c)); navigate('/products'); }}>{c}</button>)}</div>
      <h2>Recommended for you</h2>{grid(recommended)}
      <h2>Quick links</h2>
      <ul className="links">{featured.map((p) => <li key={p.id}><Link to={`/products/${p.id}`}>{p.title}</Link></li>)}</ul>
    </>
  );
}
