import { Instagram, Play, Youtube } from 'lucide-react';
import { SOCIAL_LINKS } from '../../config/store';

const icons = { Instagram, TikTok: Play, YouTube: Youtube, Facebook: Instagram };

export default function SocialCommunity() {
  return (
    <section className="social-community">
      <div className="section-heading social-heading">
        <div><span className="section-label">SÍGUENOS</span><h2>Somos más que una tienda.</h2><p>Únete a la comunidad Mac & Mac.</p></div>
      </div>
      <div className="social-grid">
        {SOCIAL_LINKS.map((social) => {
          const Icon = icons[social.name] || Instagram;
          return <a key={social.name} href={social.href} className="social-card" aria-label={social.name}><Icon size={25} /><strong>{social.name}</strong><span>{social.handle}</span></a>;
        })}
      </div>
    </section>
  );
}
