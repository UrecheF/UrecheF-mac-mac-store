import { MessageCircle, Sparkles } from 'lucide-react';
import { createWhatsAppUrl } from '../../config/store';

export default function AssistantTeaser() {
  return (
    <section className="assistant-teaser" id="asesor-mac">
      <div><span className="section-label">ASESOR MAC · IA</span><h2>¿No sabes cuál elegir?</h2><p>Cuéntanos qué necesitas y te ayudamos a encontrar el equipo ideal según uso, presupuesto y disponibilidad.</p></div>
      <a className="button gold-button" href={createWhatsAppUrl('Hola Mac & Mac Store 👋 Quiero ayuda para elegir el equipo ideal para mí.')} target="_blank" rel="noreferrer"><Sparkles size={16} /> Hablar con Asesor Mac <MessageCircle size={16} /></a>
    </section>
  );
}
