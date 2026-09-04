# Verification plan

Before mounting into `App.jsx`:

1. Run `npm ci`, `npm run lint`, and `npm run build` from `web/`.
2. Verify desktop at 1440px and mobile at 390px.
3. Confirm no duplicate contact/footer sections after integration.
4. Verify all WhatsApp CTAs encode their intended message and use the configured number.
5. Verify keyboard focus and accessible labels for newsletter and external actions.
6. Replace placeholder social URLs only with verified official profiles.
7. Do not merge until visual comparison against the approved storefront reference is complete.
