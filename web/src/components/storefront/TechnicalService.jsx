import { ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import { createWhatsAppUrl } from '../../config/store';

export default function TechnicalService() {
  const requestUrl = createWhatsAppUrl('Hola Mac & Mac Store 👋 Quiero solicitar servicio técnico para mi equipo.');
  const statusUrl = createWhatsAppUrl('Hola Mac & Mac Store 👋 Quiero consultar el estado de mi servicio técnico.');

  return (
    <section className="technical-service" id="servicio-tecnico">
      <div className="technical-service-copy">
        <span className="section-label">SERVICIO TÉCNICO</span>
        <h2>Tu tecnología, en buenas manos.</h2>
        <p>Diagnóstico, mantenimiento y reparación con atención personalizada y seguimiento directo.</p>
        <div className="technical-points">
          <span><CheckCircle2 size={16} /> Diagnóstico profesional</span>
          <span><CheckCircle2 size={16} /> Seguimiento del servicio</span>
          <span><CheckCircle2 size={16} /> Soporte postventa</span>
        </div>
        <div className="technical-actions">
          <a className="button gold-button" href={requestUrl} target="_blank" rel="noreferrer">Solicitar servicio <ArrowRight size={15} /></a>
          <a className="button dark-button" href={statusUrl} target="_blank" rel="noreferrer">Consultar estado</a>
        </div>
      </div>
      <div className="technical-service-visual" aria-hidden="true"><Wrench size={72} /></div>
    </section>
  );
}
