# Commerce API boundary

The storefront presentation consumes normalized product data and must not own inventory truth. Stock, active status, prices, product media, and future product URLs should be supplied by the Commerce API; the local fallback remains resilience-only.
