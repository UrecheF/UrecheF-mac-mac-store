import { products as variantProfiles } from "../data/products";

const API_BASE_URL = (import.meta.env.VITE_COMMERCE_API_URL || "https://mac-mac-social-ai-api.onrender.com").replace(/\/$/, "");

const categoryMap = {
  phone: "Telefonía",
  tablet: "Tablets",
  laptop: "Computadores",
  audio: "Audio",
  watch: "Smartwatch",
  scooter: "Movilidad",
};

const colorHexMap = {
  negro: "#202124",
  black: "#202124",
  blanco: "#f1f0eb",
  white: "#f1f0eb",
  plata: "#d7d5d0",
  silver: "#d7d5d0",
  naranja: "#d96f45",
  orange: "#d96f45",
  azul: "#6f91a9",
  blue: "#6f91a9",
  gris: "#9b9b98",
  gray: "#9b9b98",
  grey: "#9b9b98",
  lavanda: "#c9bfdc",
  lavender: "#c9bfdc",
  salvia: "#aab7a1",
  sage: "#aab7a1",
  oro: "#e1d2b5",
  gold: "#e1d2b5",
};

function capacityFromProduct(product) {
  const parts = [];
  const ram = Number(product.ramGb ?? product.ramGB ?? product.ram);
  const storage = Number(product.storageGb ?? product.storageGB ?? product.storage);

  if (ram) parts.push(`${ram} GB RAM`);
  if (storage) parts.push(storage >= 1024 ? `${storage / 1024} TB` : `${storage} GB`);

  if (parts.length) return parts.join(" · ");

  const name = String(product.name || "");
  const match = name.match(/\b(128|256|512)\s?GB\b|\b(1|2)\s?TB\b/i);
  return match?.[0]?.replace(/\s+/g, " ") || product.capacity || "";
}

function canonicalName(value) {
  return String(value || "Producto Mac & Mac")
    .replace(/\b\d+\s?GB\s+RAM\b/gi, "")
    .replace(/\b(?:128|256|512)\s?GB\b/gi, "")
    .replace(/\b(?:1|2)\s?TB\b/gi, "")
    .replace(/[·|/-]\s*(?:SIM|eSIM)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function profileKey(value) {
  return canonicalName(value)
    .toLowerCase()
    .replace(/iphone 17 air/g, "iphone air")
    .replace(/[^a-z0-9áéíóúñ]+/g, " ")
    .trim();
}

function inferredHex(name) {
  const normalized = String(name || "").toLowerCase();
  const key = Object.keys(colorHexMap).find((item) => normalized.includes(item));
  return key ? colorHexMap[key] : "#c9c9c9";
}

function normalizeColor(color, fallbackImage) {
  if (!color) return null;

  if (typeof color === "string") {
    return { name: color, hex: inferredHex(color), image: fallbackImage || undefined };
  }

  const name = color.name || color.label || color.color || color.finish;
  if (!name) return null;

  return {
    name,
    hex: color.hex || color.hexCode || color.value || inferredHex(name),
    image: color.image || color.imageUrl || color.thumbnail || fallbackImage || undefined,
    price: color.price != null ? Number(color.price) : undefined,
  };
}

function productImage(product) {
  if (typeof product.image === "string") return product.image;
  if (typeof product.imageUrl === "string") return product.imageUrl;
  if (typeof product.thumbnail === "string") return product.thumbnail;
  if (Array.isArray(product.images) && product.images.length) {
    const first = product.images[0];
    return typeof first === "string" ? first : first?.url || first?.imageUrl;
  }
  return undefined;
}

function colorsFromProduct(product) {
  const image = productImage(product);
  const source = Array.isArray(product.colors)
    ? product.colors
    : [product.colorName || product.color || product.finish].filter(Boolean);

  return source.map((color) => normalizeColor(color, image)).filter(Boolean);
}

function normalizeProduct(product) {
  let category = categoryMap[product.category] || product.category || "Otros";
  if (product.category === "phone" && product.brand === "Apple") category = "iPhone";
  if (product.category === "phone" && product.brand === "Samsung") category = "Samsung";

  const name = canonicalName(product.name);
  const capacity = capacityFromProduct(product);
  const colors = colorsFromProduct(product);
  const available = product.active !== false && Number(product.stock ?? 1) > 0;
  const price = Number(product.price) || 0;

  return {
    id: String(product.id),
    sourceId: String(product.id),
    name,
    brand: product.brand || "",
    category,
    available,
    featured: false,
    colors,
    variants: [
      {
        id: String(product.id),
        capacity,
        price,
        available,
        colors,
      },
    ],
  };
}

function mergeColors(current = [], incoming = []) {
  const merged = new Map();
  [...current, ...incoming].forEach((color) => {
    if (!color?.name) return;
    const key = color.name.toLowerCase();
    merged.set(key, { ...merged.get(key), ...color });
  });
  return [...merged.values()];
}

function mergeCatalogProducts(products) {
  const groups = new Map();

  products.forEach((product) => {
    const key = `${product.category}|${product.brand}|${profileKey(product.name)}`;
    const existing = groups.get(key);

    if (!existing) {
      groups.set(key, { ...product, variants: [...product.variants] });
      return;
    }

    product.variants.forEach((variant) => {
      const capacityKey = String(variant.capacity || "Única").toLowerCase();
      const same = existing.variants.find(
        (item) => String(item.capacity || "Única").toLowerCase() === capacityKey
      );

      if (same) {
        same.colors = mergeColors(same.colors, variant.colors);
        same.available = same.available || variant.available;
        if (!same.price && variant.price) same.price = variant.price;
      } else {
        existing.variants.push(variant);
      }
    });

    existing.colors = mergeColors(existing.colors, product.colors);
    existing.available = existing.available || product.available;
  });

  return [...groups.values()];
}

function applyVariantProfiles(products) {
  const profiles = new Map(variantProfiles.map((product) => [profileKey(product.name), product]));

  return products.map((product) => {
    const profile = profiles.get(profileKey(product.name));
    if (!profile) return product;

    const profileVariants = new Map(
      (profile.variants || []).map((variant) => [String(variant.capacity || "").toLowerCase(), variant])
    );

    const variants = product.variants.map((variant) => {
      const matchingProfile = profileVariants.get(String(variant.capacity || "").toLowerCase());
      const profileColors = matchingProfile?.colors?.length
        ? matchingProfile.colors
        : profile.colors || [];

      return {
        ...variant,
        colors: variant.colors?.length ? variant.colors : profileColors,
      };
    });

    return {
      ...product,
      id: profile.id || product.id,
      featured: profile.featured ?? product.featured,
      colors: product.colors?.length ? product.colors : profile.colors || [],
      variants,
    };
  });
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

  return applyVariantProfiles(mergeCatalogProducts(payload.map(normalizeProduct)));
}

export function buildCommerceCategories(products) {
  const names = [...new Set(products.map((product) => product.category).filter(Boolean))];
  return [{ name: "Todos" }, ...names.sort().map((name) => ({ name }))];
}

export { API_BASE_URL };
