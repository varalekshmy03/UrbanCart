import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '../../app/store';
import { useCart } from '../../hooks/useCart';
import { ErrorMessage, Loading } from '../../shared/components/StateViews';
import { fetchProductRequest } from './productsSlice';
import { formatCurrency } from '../../shared/utils/formatCurrency';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected: p, status, error } = useSelector((s: RootState) => s.products);
  const { add } = useCart();
  const [img, setImg] = useState(0);
  useEffect(() => { dispatch(fetchProductRequest(Number(id))); setImg(0); }, [id, dispatch]);

  if (status === 'failed') return <ErrorMessage message={error ?? 'Unknown error'} />;
  if (!p) return <Loading />;
  return (
    <section className="details">
      <div>
        <img className="hero-img" src={p.images[img] ?? p.thumbnail} alt={p.title} />
        <div className="thumbs">{p.images.map((src, i) => (
          <button key={src} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`} aria-pressed={i === img} className={i === img ? 'active' : ''}><img src={src} alt="" /></button>
        ))}</div>
      </div>
      <div>
        <h1>{p.title}</h1>
        <p className="muted">{p.brand ?? 'Unbranded'} · {p.category}</p>
        <p>{p.description}</p>
        <p><strong>{formatCurrency(p.price)}</strong></p>
        <p>★ {p.rating.toFixed(1)} · {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</p>
        <button className="btn" disabled={p.stock === 0} onClick={() => add(p)}>Add to cart</button>
      </div>
    </section>
  );
}
