import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

function normalizeVariants(product) {
  if (Array.isArray(product.variants) && product.variants.length) return product.variants;

  return [
    {
      id: product.id,
      capacity: product.capacity || "",
      price: Number(product.price) || 0,
      available: product.available !== false,
      image: product.image || "",
      colors: product.colors || [],
    },
  ];
}

function LegacyProductVisual({ product }) {
  const samsung = product.brand === "Samsung" || product.category === "Samsung";

  return (
    <div className={`product-device ${samsung ? "samsung" : ""}`}>
      <div className="device-camera"><i /><i /><i /></div>
      <span>{samsung ? "S" : ""}</span>
    </div>
  );
}

export default function ProductCard({ product, index, money, onConsult }) {
  const variants = useMemo(() => normalizeVariants(product), [product]);
  const [variantId, setVariantId] = useState(variants[0]?.id || "");
  const [colorName, setColorName] = useState("");
  const [failedImages, setFailedImages] = useState([]);

  const selectedVariant = variants.find((variant) => variant.id === variantId) || variants[0];
  const colors = selectedVariant?.colors?.length ? selectedVariant.colors : product.colors || [];
  const selectedColor = colors.find((color) => color.name === colorName) || colors[0];
  const price = Number(selectedColor?.price ?? selectedVariant?.price ?? product.price) || 0;
  const capacityLabel = selectedVariant?.capacity || product.capacity || "";

  const imageCandidates = [selectedColor?.image, selectedVariant?.image, product.image]
    .filter(Boolean)
    .filter((image, position, all) => all.indexOf(image) === position);
  const preferredImage = imageCandidates.find((image) => !failedImages.includes(image)) || "";

  const selectVariant = (nextVariantId) => {
    const nextVariant = variants.find((variant) => variant.id === nextVariantId) || variants[0];
    const nextColors = nextVariant?.colors?.length ? nextVariant.colors : product.colors || [];

    setVariantId(nextVariantId);
    setColorName((currentColor) =>
      nextColors.some((color) => color.name === currentColor) ? currentColor : ""
    );
  };

  const markImageFailed = () => {
    if (!preferredImage) return;
    setFailedImages((current) =>
      current.includes(preferredImage) ? current : [...current, preferredImage]
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
        {preferredImage ? (
          <img
            className="variant-product-photo"
            src={preferredImage}
            alt={`${product.name}${selectedColor?.name ? ` en ${selectedColor.name}` : ""}`}
            loading="lazy"
            decoding="async"
            onError={markImageFailed}
          />
        ) : (
          <LegacyProductVisual product={product} />
        )}
        {product.featured && <div className="product-badge">DESTACADO</div>}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>

        {variants.length > 1 ? (
          <div className="variant-group">
            <div className="variant-heading">
              <span>Capacidad</span>
              <strong>{capacityLabel}</strong>
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
        ) : (
          capacityLabel && <p className="single-capacity">{capacityLabel}</p>
        )}

        {colors.length > 0 && (
          <div className="variant-group color-group">
            <div className="variant-heading">
              <span>Color</span>
              <strong>{selectedColor?.name}</strong>
            </div>
            <div className="color-options" role="group" aria-label={`Color para ${product.name}`}>
              {colors.map((color) => (
                <button
                  key={color.key || color.name}
                  type="button"
                  className={color.name === selectedColor?.name ? "color-swatch active" : "color-swatch"}
                  onClick={() => setColorName(color.name)}
                  disabled={color.availability === "UNAVAILABLE"}
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
                capacity: capacityLabel,
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
