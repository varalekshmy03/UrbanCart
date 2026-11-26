import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import CartPage from '../features/cart/CartPage';
import CheckoutPage from '../features/checkout/CheckoutPage';
import HomePage from '../features/products/HomePage';
import ProductDetailsPage from '../features/products/ProductDetailsPage';
import ProductsPage from '../features/products/ProductsPage';
import { useCart } from '../hooks/useCart';
import SignupPage from '../features/auth/SignupPage';

export default function AppRoutes() {
  const { count } = useCart();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const syncUser = () => {
      const stored = sessionStorage.getItem('shopwise_user');
      setUserName(stored ? (JSON.parse(stored).name as string) : '');
    };

    syncUser();
    window.addEventListener('shopwise-auth-change', syncUser);
    return () => window.removeEventListener('shopwise-auth-change', syncUser);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="nav">
        <Link to="/" className="brand" aria-label="UrbanCart home">
          <svg className="brand-icon" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M14 16v-3a10 10 0 0 1 20 0v3" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M9 16h30l3 24H6l3-24Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          </svg>
          <span className="brand-urban">Urban</span><span>Cart</span>
        </Link>
        <nav aria-label="Main navigation">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({count})</NavLink>
          {userName ? (
            <span className="muted">Hi, {userName}</span>
          ) : (
            <NavLink to="/signup">Sign up</NavLink>
          )}
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<p className="state">Page not found.</p>} />
        </Routes>
      </main>
      <footer className="site-footer">UrbanCart · Everyday essentials. Exceptional finds.</footer>
    </>
  );
}
