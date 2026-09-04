export default function ProductMedia({ product, className = '' }) {
  const image = product?.image || product?.imageUrl || product?.media?.[0]?.url;
  if (image) {
    return <img className={`product-media ${className}`.trim()} src={image} alt={product?.name || 'Producto Mac & Mac Store'} loading="lazy" decoding="async" />;
  }

  return <div className={`product-media-placeholder ${className}`.trim()} aria-label={product?.name || 'Producto sin imagen'}><span>{product?.brand === 'Samsung' ? 'S' : 'M&M'}</span></div>;
}
