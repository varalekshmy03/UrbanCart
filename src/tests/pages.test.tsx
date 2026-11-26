import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartPage from '../features/cart/CartPage';
import CheckoutPage from '../features/checkout/CheckoutPage';
import ProductsPage from '../features/products/ProductsPage';
import { mockFetchFail, mockFetchOk, renderWithProviders } from './testUtils';

describe('ProductsPage', () => {
  it('shows loading then products', async () => {
    mockFetchOk(); renderWithProviders(<ProductsPage />);
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
    expect(await screen.findAllByTestId('product-card')).toHaveLength(3);
  });
  it('shows error state', async () => {
    mockFetchFail(); renderWithProviders(<ProductsPage />);
    expect(await screen.findByRole('alert')).toHaveTextContent(/500/);
  });
  it('searches by name (debounced) and shows empty state', async () => {
    mockFetchOk(); renderWithProviders(<ProductsPage />);
    await screen.findAllByTestId('product-card');
    const box = screen.getByLabelText(/search products/i);
    await userEvent.type(box, 'laptop');
    await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(1));
    await userEvent.clear(box); await userEvent.type(box, 'zzz');
    expect(await screen.findByText(/no products match/i)).toBeInTheDocument();
  });
  it('filters by category and sorts by price', async () => {
    mockFetchOk(); renderWithProviders(<ProductsPage />);
    await screen.findAllByTestId('product-card');
    await userEvent.selectOptions(screen.getByLabelText('Category'), 'laptops');
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    await userEvent.selectOptions(screen.getByLabelText(/sort products/i), 'asc');
    expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(['Mouse', 'Laptop Pro']);
  });
  it('adds to cart', async () => {
    mockFetchOk(); const { store } = renderWithProviders(<ProductsPage />);
    const cards = await screen.findAllByTestId('product-card');
    await userEvent.click(within(cards[0]).getByRole('button', { name: /add to cart/i }));
    expect(store.getState().cart.items).toHaveLength(1);
    expect(window.alert).toHaveBeenCalledWith('Red Lipstick added to cart');
  });
});
const cartState = { cart: { items: [{ id: 1, title: 'Red Lipstick', price: 20, thumbnail: 't', quantity: 1 }] } };
describe('CartPage', () => {
  it('updates quantity and recalculates total', async () => {
    renderWithProviders(<CartPage />, cartState);
    await userEvent.click(screen.getByLabelText(/increase red lipstick/i));
    expect(screen.getByTestId('total')).toHaveTextContent('₹3,680.00');
  });
  it('removes items', async () => {
    renderWithProviders(<CartPage />, cartState);
    await userEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });
});
describe('CheckoutPage', () => {
  it('requires signup before checkout', () => {
    renderWithProviders(<CheckoutPage />, cartState);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('places order and clears cart', async () => {
    sessionStorage.setItem('shopwise_user', JSON.stringify({ name: 'Test User', email: 'test@example.com' }));
    const { store } = renderWithProviders(<CheckoutPage />, cartState);
    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/contact number/i), '9876543210');
    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/^address$/i), '123 Test Street');
    await userEvent.type(screen.getByLabelText(/city/i), 'Chennai');
    await userEvent.type(screen.getByLabelText(/postal code/i), '600001');
    await userEvent.click(screen.getByRole('button', { name: /place order/i }));
    expect(screen.getByText(/order placed/i)).toBeInTheDocument();
    expect(store.getState().cart.items).toHaveLength(0);
  });
});
