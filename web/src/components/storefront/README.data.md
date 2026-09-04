# Data contracts

## Product media
`ProductMedia` accepts, in priority order, `product.image`, `product.imageUrl`, or `product.media[0].url`. This lets the Commerce API migrate to CDN-hosted media without rewriting presentation components.

## Promotional banners
Banner records support `id`, `active`, `order`, `eyebrow`, `title`, `description`, `cta`, `href`, `image`, and `productId`. This is the frontend contract for the future banner administration interface.
