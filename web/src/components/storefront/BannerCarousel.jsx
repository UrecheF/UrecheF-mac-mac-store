import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function BannerCarousel({ banners = [] }) {
  const activeBanners = banners.filter((banner) => banner.active !== false);
  const [index, setIndex] = useState(0);
  if (!activeBanners.length) return null;
  const banner = activeBanners[index % activeBanners.length];
  const move = (direction) => setIndex((current) => (current + direction + activeBanners.length) % activeBanners.length);

  return (
    <section className="banner-carousel" aria-label="Promociones destacadas">
      <article className="banner-slide" style={banner.image ? { backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.12)),url(${banner.image})` } : undefined}>
        <div><span>{banner.eyebrow || 'MAC & MAC STORE'}</span><h2>{banner.title}</h2>{banner.description && <p>{banner.description}</p>}{banner.href && <a className="button gold-button" href={banner.href}>{banner.cta || 'Comprar'}</a>}</div>
      </article>
      {activeBanners.length > 1 && <div className="banner-controls"><button onClick={() => move(-1)} aria-label="Banner anterior"><ArrowLeft size={17} /></button><span>{index + 1} / {activeBanners.length}</span><button onClick={() => move(1)} aria-label="Banner siguiente"><ArrowRight size={17} /></button></div>}
    </section>
  );
}
