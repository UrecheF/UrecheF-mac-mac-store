import { Quote, Star } from 'lucide-react';

const testimonials = [
  { name: 'Cliente Mac & Mac', city: 'Bolívar', text: 'Atención rápida, clara y acompañamiento durante toda la compra.' },
  { name: 'Cliente verificado', city: 'Colombia', text: 'Excelente servicio y comunicación. Mi pedido llegó correctamente.' },
  { name: 'Comunidad Mac & Mac', city: 'Magangué', text: 'Se nota el respaldo después de comprar. Eso hace la diferencia.' },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-heading"><div><span className="section-label">CLIENTES</span><h2>Experiencias que hablan por nosotros.</h2><p>Confianza construida compra a compra.</p></div></div>
      <div className="testimonial-grid">
        {testimonials.map((item) => <article key={item.text} className="testimonial-card"><Quote size={22} /><div className="testimonial-stars" aria-label="5 estrellas">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}</div><p>“{item.text}”</p><strong>{item.name}</strong><span>{item.city}</span></article>)}
      </div>
    </section>
  );
}
