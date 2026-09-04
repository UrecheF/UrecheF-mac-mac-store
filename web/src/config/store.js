export const STORE = {
  name: 'Mac & Mac Store',
  tagline: 'Tecnología que eleva tu estilo',
  whatsapp: '573202781315',
  whatsappDisplay: '+57 320 278 1315',
  instagram: '@macstore0',
  location: 'Magangué, Bolívar - Colombia',
  hours: 'Lunes a sábado · 8:00 a.m. – 12:00 m. · 2:00 p.m. – 6:00 p.m.',
};

export const SOCIAL_LINKS = [
  { name: 'Instagram', handle: '@macstore0', href: '#' },
  { name: 'Facebook', handle: 'Mac & Mac Store', href: '#' },
  { name: 'TikTok', handle: '@macstore0', href: '#' },
  { name: 'YouTube', handle: 'Mac & Mac Store', href: '#' },
];

export const createWhatsAppUrl = (message) =>
  `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
