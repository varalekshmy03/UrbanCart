import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { EmptyState } from '../../shared/components/StateViews';
import { formatCurrency } from '../../shared/utils/formatCurrency';

export default function CartPage() {
  const { items, total, update, remove } = useCart();
  if (items.length === 0) return <><h1>Your cart</h1><EmptyState text="Your cart is empty. Browse products to add some." /><Link className="btn" to="/products">Browse products</Link></>;
  return (
    <section>
      <h1>Your cart</h1>
      {items.map((i) => (
        <div className="cart-row" key={i.id} data-testid="cart-item">
          <img src={i.thumbnail} alt={i.title} /><span className="grow">{i.title}</span>
          <span>{formatCurrency(i.price)}</span>
          <button aria-label={`Decrease ${i.title}`} onClick={() => update(i.id, i.quantity - 1)}>−</button>
          <span data-testid="qty">{i.quantity}</span>
          <button aria-label={`Increase ${i.title}`} onClick={() => update(i.id, i.quantity + 1)}>+</button>
          <button className="btn ghost" onClick={() => remove(i.id)}>Remove</button>
        </div>
      ))}
      <p className="total">Total: <strong data-testid="total">{formatCurrency(total)}</strong></p>
      <Link className="btn" to={sessionStorage.getItem('shopwise_user') ? '/checkout' : '/signup'}>
        {sessionStorage.getItem('shopwise_user') ? 'Checkout' : 'Sign up to checkout'}
      </Link>
    </section>
  );
}
