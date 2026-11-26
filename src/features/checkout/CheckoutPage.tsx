import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { EmptyState } from '../../shared/components/StateViews';
import { formatCurrency } from '../../shared/utils/formatCurrency';

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const signedInUser = sessionStorage.getItem('shopwise_user');

  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrder({ id: `ORD-${Date.now().toString(36).toUpperCase()}`, total });
    clear();
  };

  if (order) return (
    <section role="status">
      <h1>Order placed</h1>
      <p>Thanks, <strong>{fullName}</strong>! Your order <strong>{order.id}</strong> for {formatCurrency(order.total)} is confirmed.</p>
      <Link className="btn" to="/products">Continue shopping</Link>
    </section>
  );

  if (items.length === 0) return <><h1>Checkout</h1><EmptyState text="Nothing to check out yet." /></>;

  if (!signedInUser) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>Please <Link to="/signup">sign up</Link> to proceed with your order.</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="form" onSubmit={placeOrder}>
          <h2>Delivery details</h2>
          <label htmlFor="full-name">Full name</label>
          <input id="full-name" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required />

          <label htmlFor="phone">Contact number</label>
          <input id="phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required />

          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

          <label htmlFor="address">Address</label>
          <textarea id="address" autoComplete="street-address" value={address} onChange={(event) => setAddress(event.target.value)} required />

          <div className="form-row">
            <div>
              <label htmlFor="city">City</label>
              <input id="city" autoComplete="address-level2" value={city} onChange={(event) => setCity(event.target.value)} required />
            </div>
            <div>
              <label htmlFor="postal-code">Postal code</label>
              <input id="postal-code" autoComplete="postal-code" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} required />
            </div>
          </div>

          <button className="btn" type="submit">Place order</button>
        </form>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <ul>{items.map((i) => <li key={i.id}>{i.title} × {i.quantity} — {formatCurrency(i.price * i.quantity)}</li>)}</ul>
          <p className="total">Total amount: <strong>{formatCurrency(total)}</strong></p>
        </aside>
      </div>
    </section>
  );
}
