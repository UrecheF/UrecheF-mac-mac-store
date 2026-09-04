import { ArrowRight, Headphones, Smartphone, Watch } from 'lucide-react';

const accessories = [
  { name: 'Cases & Protección', text: 'Protección con estilo para tu equipo.', icon: Smartphone },
  { name: 'Audio', text: 'Sonido premium para todos los días.', icon: Headphones },
  { name: 'Smartwatch', text: 'Accesorios y wearables seleccionados.', icon: Watch },
];

export default function AccessoriesSection() {
  return (
    <section className="accessories-section" id="accesorios">
      <div className="section-heading"><div><span className="section-label">ACCESORIOS</span><h2>Completa tu experiencia.</h2><p>Accesorios seleccionados para proteger, conectar y disfrutar más tu tecnología.</p></div><a className="accessories-link" href="#catalogo">Ver catálogo <ArrowRight size={15} /></a></div>
      <div className="accessories-grid">{accessories.map(({ name, text, icon: Icon }) => <a key={name} href="#catalogo" className="accessory-card"><div className="accessory-icon"><Icon size={42} /></div><strong>{name}</strong><span>{text}</span><small>Explorar <ArrowRight size={13} /></small></a>)}</div>
    </section>
  );
}
