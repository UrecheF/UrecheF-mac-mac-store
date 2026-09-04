# Integration point

`LowerStorefront` composes the approved lower half of the storefront in this order:

Accessories → Benefits → Technical service → Customer care → Testimonials → Social → Newsletter → Legal footer.

It is not mounted in `App.jsx` yet. This keeps the existing storefront unchanged while the component layer is reviewed. The next integration commit should replace the legacy lower sections/footer rather than append to them, preventing duplicate content.
