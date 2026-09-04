import { ArrowRight, Mail } from 'lucide-react';

export default function Newsletter() {
  const submit = (event) => event.preventDefault();

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div>
        <span className="section-label">MAC & MAC CLUB</span>
        <h2 id="newsletter-title">Ofertas que vale la pena abrir.</h2>
        <p>Novedades, lanzamientos y promociones seleccionadas. Sin ruido.</p>
      </div>
      <form className="newsletter-form" onSubmit={submit}>
        <Mail size={18} aria-hidden="true" />
        <label className="sr-only" htmlFor="newsletter-email">Correo electrónico</label>
        <input id="newsletter-email" type="email" placeholder="Tu correo electrónico" required />
        <button type="submit" aria-label="Suscribirme"><ArrowRight size={18} /></button>
      </form>
    </section>
  );
}
