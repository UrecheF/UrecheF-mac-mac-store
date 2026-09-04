# Mac Advisor security gate

The current Mac Advisor component intentionally uses a WhatsApp fallback. Before enabling generative AI in the storefront, the server-side endpoint must enforce rate limiting, request-size limits, timeouts, safe model/tool permissions, per-session quotas, logging without sensitive payload leakage, and a controlled product/inventory retrieval layer. No model API key belongs in Vite client environment variables.
