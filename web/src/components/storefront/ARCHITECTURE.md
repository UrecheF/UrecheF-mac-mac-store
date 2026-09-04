# Storefront architecture

The storefront expansion is split into three independent layers:

1. **PromotionalCarousel** — data-driven promotional banners. The data model already supports `active`, `order`, `href`, `image`, and `productId`, so a future admin UI/API can manage banners without changing the presentation component.
2. **AssistantTeaser** — entry point for Mac Advisor. It currently falls back safely to WhatsApp; the AI endpoint is intentionally not exposed client-side.
3. **LowerStorefront** — accessories, benefits, technical service, customer care, testimonials, social community, newsletter, and legal footer.

The current production `App.jsx` is intentionally unchanged until these components pass build/lint and visual review.
