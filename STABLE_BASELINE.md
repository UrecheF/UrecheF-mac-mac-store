# Mac & Mac Store — Stable v1 baseline

This branch is the stabilization baseline for Mac & Mac Store.

## Source
- Base branch: `automation/catalog-search-ux`
- Base commit: `1ff968b5a81ea81dfb06c65badfe3636ccc51bf7`
- Relationship to `main`: 29 commits ahead, 0 behind at baseline creation.

## Stabilization priorities
1. Preserve current storefront behavior while decomposing `web/src/App.jsx` into stable components.
2. Improve first paint and hero loading; the storefront must render useful UI without waiting for the commerce API.
3. Keep the local catalog as an immediate fallback and hydrate live catalog asynchronously.
4. Reduce blocking work and defer non-critical UI/assets.
5. Measure before/after performance before production promotion.

## Production safety
This branch must be tested before being merged or configured as the production deployment branch. Do not point production at this branch until build and visual checks pass.
