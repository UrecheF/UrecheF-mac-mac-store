# Preview composition

`PreviewStorefrontExpansion.jsx` assembles the new promotional carousel and approved storefront expansion without changing the live application entry point.

This lets the branch hold a coherent implementation while `main` and the currently deployed storefront remain unchanged. Mounting/replacing the legacy lower area is a separate integration step after validation.
