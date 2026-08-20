const API_BASE_URL = (import.meta.env.VITE_COMMERCE_API_URL || "https://mac-mac-social-ai-api.onrender.com").replace(/\/$/, "");

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

  return {
    ...product,
    id: String(product.id),
    name: product.name || "Producto Mac & Mac",
    category: categoryMap[product.category] || product.category || "Otros",
    capacity: specs.join(" · ") || "",
    price: Number(product.price) || 0,
    available: product.active !== false && Number(product.stock ?? 1) > 0,
    featured: false,
  };
}

export async function fetchCommerceCatalog(signal) {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Commerce API respondió ${response.status}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("Formato de catálogo inválido");
  }

  return payload.map(normalizeProduct);
}

export function buildCommerceCategories(products) {
  const names = [...new Set(products.map((product) => product.category).filter(Boolean))];
  return [{ name: "Todos" }, ...names.sort().map((name) => ({ name }))];
}

export { API_BASE_URL };
