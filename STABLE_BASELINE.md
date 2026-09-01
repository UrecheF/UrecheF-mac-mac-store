# Mac & Mac Store — Stable v1 baseline

## Source
- Base: `automation/catalog-search-ux`
- Commit: `1ff968b5a81ea81dfb06c65badfe3636ccc51bf7`
- At creation this base was 29 commits ahead of `main` and 0 behind.

## Stabilization priorities
1. Preserve storefront behavior while decomposing `web/src/App.jsx` into stable components.
2. Improve first paint and hero loading; useful UI must not wait for the commerce API.
3. Keep the local catalog immediately available and hydrate the live catalog asynchronously.
4. Reduce blocking work and defer non-critical UI/assets.
5. Measure performance before production promotion.

## Safety
Do not point production to this branch until build, functional and visual checks pass.
