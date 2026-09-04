import { MessageCircle } from 'lucide-react';
import './product-media.css';
import ProductMedia from './ProductMedia';
import { createWhatsAppUrl } from '../../config/store';

const formatCOP = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value || 0);

export default function ProductCard({ product }) {
  const message = `Hola Mac & Mac Store 👋 Estoy interesado en: ${product.name}${product.capacity ? ` ${product.capacity}` : ''}. ¿Me pueden confirmar disponibilidad y precio?`;
  return (
    <article className="product-card">
      <div className="product-image">{product.featured && <span className="product-badge">DESTACADO</span>}<ProductMedia product={product} /></div>
      <div className="product-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.capacity || product.description || 'Disponible'}</p><div className="product-bottom"><strong>{formatCOP(product.price)}</strong><a href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer" aria-label={`Consultar ${product.name} por WhatsApp`}><MessageCircle size={16} /></a></div></div>
    </article>
  );
}
