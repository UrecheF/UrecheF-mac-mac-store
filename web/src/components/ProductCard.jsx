import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const escapeXml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

function fallbackProductImage(product, color) {
  const body = color?.hex || "#2b2b2b";
  const brand = product.brand === "Samsung" ? "SAMSUNG" : "MAC & MAC";
  const label = escapeXml(color?.name || "Color disponible");
  const isSamsung = product.brand === "Samsung";
  const cameraMarkup = isSamsung
    ? `
      <circle cx="84" cy="72" r="13" fill="#101010" stroke="#676767" stroke-width="3"/>
      <circle cx="84" cy="108" r="13" fill="#101010" stroke="#676767" stroke-width="3"/>
      <circle cx="84" cy="144" r="13" fill="#101010" stroke="#676767" stroke-width="3"/>
      <circle cx="116" cy="91" r="9" fill="#171717" stroke="#777" stroke-width="2"/>
    `
    : `
      <rect x="66" y="52" width="78" height="78" rx="23" fill="rgba(20,20,20,.32)"/>
      <circle cx="88" cy="76" r="14" fill="#101010" stroke="#626262" stroke-width="3"/>
      <circle cx="121" cy="76" r="14" fill="#101010" stroke="#626262" stroke-width="3"/>
      <circle cx="104" cy="108" r="14" fill="#101010" stroke="#626262" stroke-width="3"/>
    `;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="520" height="620" viewBox="0 0 520 620">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fbfbfb"/>
          <stop offset="1" stop-color="#ecebe8"/>
        </linearGradient>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".38"/>
          <stop offset=".28" stop-color="${body}"/>
          <stop offset="1" stop-color="#111111" stop-opacity=".3"/>
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#000" flood-opacity=".24"/>
        </filter>
      </defs>
      <rect width="520" height="620" rx="38" fill="url(#bg)"/>
      <ellipse cx="260" cy="530" rx="126" ry="28" fill="#000" opacity=".08"/>
      <g transform="translate(146 54) rotate(5 114 245)" filter="url(#shadow)">
        <rect x="0" y="0" width="228" height="490" rx="48" fill="url(#body)" stroke="#ffffff" stroke-opacity=".38" stroke-width="3"/>
        ${cameraMarkup}
        <text x="114" y="266" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#111" opacity=".58">${brand}</text>
      </g>
      <text x="260" y="578" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#222">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function normalizeVariants(product) {
  if (Array.isArray(product.variants) && product.variants.length) return product.variants;
  return [
    {
      id: product.id,
      capacity: product.capacity || "",
      price: Number(product.price) || 0,
      available: product.available !== false,
      colors: product.colors || [],
    },
  ];
}

export default function ProductCard({ product, index, money, onConsult }) {
  const variants = useMemo(() => normalizeVariants(product), [product]);
  const [variantId, setVariantId] = useState(variants[0]?.id || "");
  const selectedVariant = variants.find((variant) => variant.id === variantId) || variants[0];
  const colors = selectedVariant?.colors?.length ? selectedVariant.colors : product.colors || [];
  const [colorName, setColorName] = useState(colors[0]?.name || "");
  const selectedColor = colors.find((color) => color.name === colorName) || colors[0];
  const price = Number(selectedColor?.price ?? selectedVariant?.price ?? product.price) || 0;
  const image = selectedColor?.image || fallbackProductImage(product, selectedColor);

  const selectVariant = (nextVariantId) => {
    const nextVariant = variants.find((variant) => variant.id === nextVariantId) || variants[0];
    const nextColors = nextVariant?.colors?.length ? nextVariant.colors : product.colors || [];
    setVariantId(nextVariantId);
    setColorName((currentColor) =>
      nextColors.some((color) => color.name === currentColor)
        ? currentColor
        : nextColors[0]?.name || ""
    );
  };

  return (
    <motion.article
      className="product-card product-card-variants"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      viewport={{ once: true }}
    >
      <div className="product-image variant-product-image">
        <img
          className="variant-product-photo"
          src={image}
          alt={`${product.name}${selectedColor?.name ? ` en ${selectedColor.name}` : ""}`}
          loading="lazy"
        />
        {product.featured && <div className="product-badge">DESTACADO</div>}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>

        <div className="variant-group">
          <div className="variant-heading">
            <span>Capacidad</span>
            <strong>{selectedVariant?.capacity || "Única"}</strong>
          </div>
          <div className="capacity-options" role="group" aria-label={`Capacidad para ${product.name}`}>
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                className={variant.id === selectedVariant?.id ? "capacity-chip active" : "capacity-chip"}
                onClick={() => selectVariant(variant.id)}
                disabled={variant.available === false}
              >
                {variant.capacity || "Única"}
              </button>
            ))}
          </div>
        </div>

        {colors.length > 0 && (
          <div className="variant-group color-group">
            <div className="variant-heading">
              <span>Color</span>
              <strong>{selectedColor?.name}</strong>
            </div>
            <div className="color-options" role="group" aria-label={`Color para ${product.name}`}>
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  className={color.name === selectedColor?.name ? "color-swatch active" : "color-swatch"}
                  onClick={() => setColorName(color.name)}
                  aria-label={color.name}
                  title={color.name}
                >
                  <span style={{ background: color.hex || "#ddd" }} />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="product-bottom variant-product-bottom">
          <div>
            <small>Precio</small>
            <strong>{money(price)}</strong>
          </div>
          <button
            type="button"
            onClick={() =>
              onConsult(product, {
                variantId: selectedVariant?.id,
                capacity: selectedVariant?.capacity || "",
                color: selectedColor?.name || "",
                price,
              })
            }
            aria-label={`Consultar ${product.name}`}
          >
            <MessageCircle size={17} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
