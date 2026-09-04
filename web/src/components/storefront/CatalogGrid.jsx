import ProductCard from './ProductCard';

export default function CatalogGrid({ products = [] }) {
  if (!products.length) return <div className="catalog-empty">No encontramos productos con estos filtros.</div>;
  return <div className="products-grid">{products.map((product) => <ProductCard key={product.id || `${product.name}-${product.capacity || ''}`} product={product} />)}</div>;
}
