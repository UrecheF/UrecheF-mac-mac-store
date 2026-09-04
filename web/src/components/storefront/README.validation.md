# Validation command sequence

From `web/`:

```sh
npm ci
npm run lint
npm run build
```

A successful build is required before mounting these components into the existing application. Visual validation follows integration because the current branch intentionally leaves `App.jsx` unchanged.
