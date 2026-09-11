const API_BASE_URL = (import.meta.env.VITE_COMMERCE_API_URL || "https://mac-mac-social-ai-api.onrender.com").replace(/\/$/, "");

const categoryMap = {
  phone: "Telefonía",
  tablet: "Tablets",
  laptop: "Computadores",
  audio: "Audio",
  watch: "Smartwatch",
  scooter: "Movilidad",
};

function cleanText(value) {
  return String(value ?? "").trim();
}

function normalizeCapacityPart(value) {
  const raw = cleanText(value);
  if (!raw) return "";

  if (/^\d+(?:\.\d+)?$/.test(raw)) {
    const numeric = Number(raw);
    return numeric >= 1024 ? `${numeric / 1024} TB` : `${numeric} GB`;
  }

  return raw
    .replace(/(\d)\s*(tb|gb)\b/gi, (_, amount, unit) => `${amount} ${unit.toUpperCase()}`)
    .replace(/\s+/g, " ");
}

function capacityFromProduct(product) {
  const ram = normalizeCapacityPart(product.ramGb ?? product.ramGB ?? product.ram);
  const storage = normalizeCapacityPart(product.storageGb ?? product.storageGB ?? product.storage);

  if (ram && storage) return `${ram} RAM · ${storage}`;
  if (storage) return storage;
  if (ram) return `${ram} RAM`;

  const name = cleanText(product.name);
  const match = name.match(/\b(?:128|256|512|1024|2048)\s?GB\b|\b(?:1|2)\s?TB\b/i);
  return match ? normalizeCapacityPart(match[0]) : normalizeCapacityPart(product.capacity);
}

function canonicalName(value) {
  return cleanText(value)
    .replace(/\b\d+(?:\.\d+)?\s?(?:GB|TB)\s+RAM\b/gi, "")
    .replace(/\b(?:128|256|512|1024|2048)\s?GB\b/gi, "")
    .replace(/\b(?:1|2)\s?TB\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function productKey(product) {
  return [
    product.category,
    product.brand,
    product.condition || "NEW",
    canonicalName(product.name).toLowerCase(),
  ].join("|");
}

function capacityKey(value) {
  return normalizeCapacityPart(value).toLowerCase().replace(/\s+/g, "");
}

function absoluteMediaUrl(value) {
  const url = cleanText(value);
  if (!url) return "";
  if (/^https:\/\//i.test(url) || /^data:image\//i.test(url)) return url;
  if (url.startsWith("/")) return `${API_BASE_URL}${url}`;
  return url;
}

function productImage(product) {
  if (typeof product.image === "string" && product.image) return absoluteMediaUrl(product.image);
  if (typeof product.imageUrl === "string" && product.imageUrl) return absoluteMediaUrl(product.imageUrl);
  if (typeof product.thumbnail === "string" && product.thumbnail) return absoluteMediaUrl(product.thumbnail);

  if (Array.isArray(product.images) && product.images.length) {
    const first = product.images[0];
    return absoluteMediaUrl(typeof first === "string" ? first : first?.url || first?.imageUrl);
  }

  const sku = cleanText(product.sku);
  if (product.hasMedia === false) return "";
  return sku ? `${API_BASE_URL}/api/media/public/${encodeURIComponent(sku)}` : "";
}

function normalizeColor(color) {
  if (!color) return null;

  if (typeof color === "string") {
    return { name: color, hex: "#c9c9c9", image: "", availability: "AVAILABLE" };
  }

  const name = cleanText(color.name || color.label || color.color || color.finish);
  if (!name) return null;

  return {
    key: cleanText(color.key),
    name,
    hex: cleanText(color.swatch || color.hex || color.hexCode || color.value) || "#c9c9c9",
    image: absoluteMediaUrl(color.imageUrl || color.image || color.thumbnail),
    availability: cleanText(color.availability || "AVAILABLE").toUpperCase(),
  };
}

function normalizeProduct(product, colorMap) {
  let category = categoryMap[product.category] || product.category || "Otros";
  if (product.category === "phone" && product.brand === "Apple") category = "iPhone";
  if (product.category === "phone" && product.brand === "Samsung") category = "Samsung";

  const sku = cleanText(product.sku);
  const apiColors = sku && Array.isArray(colorMap?.[sku]) ? colorMap[sku] : [];
  const embeddedColors = Array.isArray(product.colors) ? product.colors : [];
  const colors = (apiColors.length ? apiColors : embeddedColors)
    .map(normalizeColor)
    .filter((color) => color && ["AVAILABLE", "LOW"].includes(color.availability));

  const image = productImage(product);
  const available = product.active !== false && Number(product.stock ?? 1) > 0;

  return {
    id: String(product.id),
    sourceId: String(product.id),
    sku,
    name: canonicalName(product.name) || "Producto Mac & Mac",
    brand: cleanText(product.brand),
    category,
    condition: cleanText(product.condition || "NEW"),
    image,
    hasMedia: product.hasMedia,
    available,
    featured: Boolean(product.featured),
    featuredPriority: Number(product.featuredPriority ?? 100),
    variants: [
      {
        id: String(product.id),
        sku,
        capacity: capacityFromProduct(product),
        price: Number(product.price) || 0,
        stock: Number(product.stock ?? 0),
        available,
        image,
        colors,
      },
    ],
  };
}

function mergeColors(current = [], incoming = []) {
  const merged = new Map();

  for (const color of [...current, ...incoming]) {
    if (!color?.name) continue;
    const key = (color.key || color.name).toLowerCase();
    const previous = merged.get(key) || {};
    merged.set(key, {
      ...previous,
      ...color,
      image: color.image || previous.image || "",
    });
  }

  return [...merged.values()];
}

function mergeCatalogProducts(products) {
  const groups = new Map();

  for (const product of products) {
    const key = productKey(product);
    const existing = groups.get(key);

    if (!existing) {
      groups.set(key, { ...product, variants: [...product.variants] });
      continue;
    }

    for (const variant of product.variants) {
      const same = existing.variants.find(
        (item) => capacityKey(item.capacity) === capacityKey(variant.capacity)
      );

      if (!same) {
        existing.variants.push(variant);
        continue;
      }

      same.colors = mergeColors(same.colors, variant.colors);
      same.available = same.available || variant.available;
      same.stock = Math.max(Number(same.stock || 0), Number(variant.stock || 0));
      same.image = same.image || variant.image;
      if (!same.price && variant.price) same.price = variant.price;
    }

    existing.image = existing.image || product.image;
    existing.available = existing.available || product.available;
    existing.featured = existing.featured || product.featured;
    existing.featuredPriority = Math.min(existing.featuredPriority, product.featuredPriority);
  }

  return [...groups.values()]
    .map((product) => ({
      ...product,
      variants: [...product.variants].sort((a, b) => Number(a.price || 0) - Number(b.price || 0)),
    }))
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        Number(a.featuredPriority || 100) - Number(b.featuredPriority || 100)
    );
}

async function fetchJson(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) throw new Error(`${path} respondió ${response.status}`);
  return response.json();
}

async function fetchProducts(signal) {
  try {
    const optimized = await fetchJson("/api/storefront-products", signal);
    if (Array.isArray(optimized)) return optimized;
  } catch (error) {
    if (error?.name === "AbortError") throw error;
  }

  return fetchJson("/api/products", signal);
}

export async function fetchCommerceCatalog(signal) {
  const [productsResult, colorsResult] = await Promise.allSettled([
    fetchProducts(signal),
    fetchJson("/api/product-colors", signal),
  ]);

  if (productsResult.status !== "fulfilled" || !Array.isArray(productsResult.value)) {
    throw productsResult.reason || new Error("Formato de catálogo inválido");
  }

  const colorMap =
    colorsResult.status === "fulfilled" && colorsResult.value?.colors
      ? colorsResult.value.colors
      : {};

  return mergeCatalogProducts(
    productsResult.value.map((product) => normalizeProduct(product, colorMap))
  );
}

export function buildCommerceCategories(products) {
  const names = [...new Set(products.map((product) => product.category).filter(Boolean))];
  return [{ name: "Todos" }, ...names.sort().map((name) => ({ name }))];
}

export { API_BASE_URL };
