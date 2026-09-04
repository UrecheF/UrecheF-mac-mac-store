import { Headphones, ShieldCheck, Truck, WalletCards } from 'lucide-react';

const benefits = [
  { icon: Truck, title: 'Envíos a toda Colombia', text: 'Entrega segura y seguimiento de tu pedido.' },
  { icon: WalletCards, title: 'Pago seguro', text: 'Opciones de pago claras y acompañamiento.' },
  { icon: ShieldCheck, title: 'Garantía', text: 'Productos seleccionados y respaldo postventa.' },
  { icon: Headphones, title: 'Soporte', text: 'Atención antes, durante y después de tu compra.' },
];

export default function StoreBenefits() {
  return (
    <section className="store-benefits" aria-label="Beneficios Mac & Mac Store">
      {benefits.map(({ icon: Icon, title, text }) => (
        <article key={title} className="store-benefit">
          <Icon size={22} aria-hidden="true" />
          <div><strong>{title}</strong><span>{text}</span></div>
        </article>
      ))}
    </section>
  );
}
