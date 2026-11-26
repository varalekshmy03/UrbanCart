import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../features/products/types';
import { calculateSalePrice, formatCurrency } from '../utils/formatCurrency';

interface Props { product: Product; onAdd: (p: Product) => void; showDiscount?: boolean }

const ProductCard = ({ product, onAdd, showDiscount = false }: Props) => (
  <article className="card" data-testid="product-card">
    {showDiscount && product.discountPercentage > 0 && (
      <span className="discount-tag">
        {product.discountPercentage >= 20 && product.discountPercentage <= 30
          ? `Crazy discount · ${product.discountPercentage}% off`
          : `${product.discountPercentage}% off`}
      </span>
    )}
    <img src={product.thumbnail} alt={product.title} loading="lazy" />
    <div className="card-body">
      <span className="muted">{product.category}</span>
      <h3>{product.title}</h3>
      <div className="row">
        {showDiscount && product.discountPercentage > 0 ? (
          <span className="price-block">
            <strong>{formatCurrency(calculateSalePrice(product.price, product.discountPercentage))}</strong>
            <del>{formatCurrency(product.price)}</del>
          </span>
        ) : (
          <strong>{formatCurrency(product.price)}</strong>
        )}
        <span aria-label="rating">★ {product.rating.toFixed(1)}</span>
      </div>
      <div className="row">
        <button className="btn" onClick={() => onAdd(product)}>Add to cart</button>
        <Link className="btn ghost" to={`/products/${product.id}`}>View details</Link>
      </div>
    </div>
  </article>
);
export default memo(ProductCard);
