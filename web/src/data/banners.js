export const promotionalBanners = [
  {
    id: 'store-premium',
    active: true,
    order: 1,
    eyebrow: 'MAC & MAC STORE',
    title: 'Tecnología que eleva tu estilo.',
    description: 'Equipos seleccionados, atención premium y envíos a toda Colombia.',
    cta: 'Explorar catálogo',
    href: '#catalogo',
    image: '',
    productId: null,
  },
];

export const getActiveBanners = () =>
  promotionalBanners.filter((banner) => banner.active).sort((a, b) => a.order - b.order);
