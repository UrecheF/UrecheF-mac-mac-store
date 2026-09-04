import { ArrowRight, MessageCircle, PackageCheck, ReceiptText, Wrench } from 'lucide-react';
import { createWhatsAppUrl, STORE } from '../../config/store';

const actions = [
  { label: 'Ventas', icon: MessageCircle, message: 'Hola Mac & Mac Store 👋 Quiero asesoría para comprar un producto.' },
  { label: 'Cotizaciones', icon: ReceiptText, message: 'Hola Mac & Mac Store 👋 Quiero solicitar una cotización.' },
  { label: 'Soporte', icon: Wrench, message: 'Hola Mac & Mac Store 👋 Necesito soporte con mi equipo.' },
  { label: 'Postventa', icon: PackageCheck, message: 'Hola Mac & Mac Store 👋 Necesito ayuda con una compra realizada.' },
];

export default function CustomerCare() {
  return (
    <section className="customer-care" id="atencion">
      <div className="customer-care-copy"><span className="section-label">CONTACTO</span><h2>Estamos para ayudarte.</h2><p>Habla directamente con nuestro equipo. Te acompañamos desde la elección de tu equipo hasta la postventa.</p><a className="button gold-button" href={createWhatsAppUrl('Hola Mac & Mac Store 👋 Quiero hablar con un asesor.')} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Hablar por WhatsApp <ArrowRight size={15} /></a><small>{STORE.whatsappDisplay} · {STORE.location}</small></div>
      <div className="customer-care-actions">{actions.map(({ label, icon: Icon, message }) => <a key={label} href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer"><Icon size={22} /><strong>{label}</strong><ArrowRight size={15} /></a>)}</div>
    </section>
  );
}
