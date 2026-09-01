const API_BASE_URL = (import.meta.env.VITE_COMMERCE_API_URL || "https://mac-mac-social-ai-api.onrender.com").replace(/\/$/, "");
const CATALOG_TIMEOUT_MS = 3500;

const categoryMap = {
  phone: "Telefonía",
  tablet: "Tablets",
  laptop: "Computadores",
  audio: "Audio",
  watch: "Smartwatch",
  scooter: "Movilidad",
};

function normalizeProduct(product) {
  const specs = [
    product.ramGb ? `${product.ramGb}GB RAM` : null,
    product.storageGb ? `${product.storageGb}GB` : null,
  ].filter(Boolean);

  let category = categoryMap[product.category] || product.category || "Otros";
  if (product.category === "phone" && product.brand === "Apple") category = "iPhone";
  if (product.category === "phone" && product.brand === "Samsung") category = "Samsung";

  return {
    ...product,
    id: String(product.id),
    name: product.name || "Producto Mac & Mac",
    category,
    capacity: specs.join(" · ") || "",
    price: Number(product.price) || 0,
    available: product.active !== false && Number(product.stock ?? 1) > 0,
    featured: [
      "iPhone 17 Pro Max 1TB",
      "iPhone 17 Pro Max 512GB",
      "iPhone 17 Pro Max 256GB",
      "Samsung S25 Ultra 256GB",
      "Samsung S25 Ultra 512GB",
    ].includes(product.name),
  };
}

export async function fetchCommerceCatalog(signal) {
  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(() => timeoutController.abort(), CATALOG_TIMEOUT_MS);
  const abortFromCaller = () => timeoutController.abort();

  signal?.addEventListener("abort", abortFromCaller, { once: true });

  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: timeoutController.signal,
    });

    if (!response.ok) {
      throw new Error(`Commerce API respondió ${response.status}`);
    }

    const payload = await response.json();
    if (!Array.isArray(payload)) {
      throw new Error("Formato de catálogo inválido");
    }

    return payload.map(normalizeProduct);
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromCaller);
  }
}

export function buildCommerceCategories(products) {
  const names = [...new Set(products.map((product) => product.category).filter(Boolean))];
  return [{ name: "Todos" }, ...names.sort().map((name) => ({ name }))];
}

export { API_BASE_URL, CATALOG_TIMEOUT_MS };
