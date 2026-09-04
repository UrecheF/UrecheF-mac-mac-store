import { MapPin } from 'lucide-react';
import { STORE } from '../../config/store';

export default function StoreFooter() {
  return (
    <footer className="store-footer" id="footer">
      <div className="footer-main">
        <div className="footer-brand"><img src="/mac-mac-logo.png" alt="Mac & Mac Store" /><p>{STORE.tagline}.</p><span><MapPin size={14} /> {STORE.location}</span></div>
        <div><strong>Tienda</strong><a href="#catalogo">Catálogo</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a></div>
        <div><strong>Ayuda</strong><a href="#servicio-tecnico">Servicio técnico</a><a href="#contacto">Soporte</a><a href="#contacto">Garantías</a></div>
        <div><strong>Legal</strong><a href="#footer">Términos y condiciones</a><a href="#footer">Política de privacidad</a><a href="#footer">Tratamiento de datos</a><a href="https://www.sic.gov.co/" target="_blank" rel="noreferrer">Superintendencia de Industria y Comercio</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Mac & Mac Store. Todos los derechos reservados.</span><span>Magangué · Bolívar · Colombia</span></div>
    </footer>
  );
}
