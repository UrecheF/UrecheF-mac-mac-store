#!/usr/bin/env bash
set -e

echo "🚀 Configurando Mac & Mac Store..."

cd "$(dirname "$0")/web"

echo "📦 Instalando dependencias..."
npm install react-router-dom lucide-react framer-motion tailwindcss @tailwindcss/vite

echo "📁 Creando estructura..."
mkdir -p src/data src/components src/pages src/assets

echo "🧹 Limpiando archivos iniciales..."
rm -f src/App.jsx src/App.css src/index.css

cat > src/data/products.js <<'PRODUCTS'
export const products = [
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    category: "iPhone",
    capacity: "256GB",
    price: 4289000,
    image: "/products/iphone-17-pro-max.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "iPhone 17 Pro Max",
    category: "iPhone",
    capacity: "512GB",
    price: 5489000,
    image: "/products/iphone-17-pro-max.jpg",
    featured: true,
  },
  {
    id: 3,
    name: "iPhone 17 Pro Max",
    category: "iPhone",
    capacity: "1TB",
    price: 6239000,
    image: "/products/iphone-17-pro-max.jpg",
    featured: true,
  },
  {
    id: 4,
    name: "iPhone 17 Pro",
    category: "iPhone",
    capacity: "256GB",
    price: 4039000,
    image: "/products/iphone-17-pro.jpg",
    featured: true,
  },
  {
    id: 5,
    name: "iPhone 17",
    category: "iPhone",
    capacity: "256GB SIM",
    price: 3175000,
    image: "/products/iphone-17.jpg",
    featured: false,
  },
  {
    id: 6,
    name: "iPhone 17 Air",
    category: "iPhone",
    capacity: "256GB",
    price: 3475000,
    image: "/products/iphone-17-air.jpg",
    featured: true,
  },
  {
    id: 7,
    name: "Samsung S25 Ultra",
    category: "Samsung",
    capacity: "256GB",
    price: 3425000,
    image: "/products/samsung-s25-ultra.jpg",
    featured: true,
  },
  {
    id: 8,
    name: "Samsung S25 Ultra",
    category: "Samsung",
    capacity: "512GB",
    price: 3839000,
    image: "/products/samsung-s25-ultra.jpg",
    featured: true,
  },
];

export const categories = [
  { name: "Todos", icon: "✨" },
  { name: "iPhone", icon: "" },
  { name: "Samsung", icon: "📱" },
  { name: "Computadores", icon: "💻" },
  { name: "Smartwatch", icon: "⌚" },
  { name: "Audio", icon: "🎧" },
  { name: "Accesorios", icon: "🔌" },
];
PRODUCTS

cat > src/App.jsx <<'APP'
import { useMemo, useState } from "react";
import { Search, ShoppingBag, Menu, X, MessageCircle, MapPin, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { products, categories } from "./data/products";
import "./index.css";

const WHATSAPP = "573000000000";

const money = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

function App() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "Todos" || product.category === category;

      const text =
        `${product.name} ${product.category} ${product.capacity}`.toLowerCase();

      return matchesCategory && text.includes(search.toLowerCase());
    });
  }, [category, search]);

  const whatsapp = (product) => {
    const text = encodeURIComponent(
      `Hola Mac & Mac Store 👋 Estoy interesado en ${product.name} ${product.capacity}. ¿Está disponible?`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <div className="app">
      <div className="topbar">
        Envíos a toda Colombia · Atención personalizada · Productos con garantía
      </div>

      <header className="header">
        <a className="brand" href="#">
          <span className="brand-mark">M</span>
          <span>
            <strong>MAC & MAC</strong>
            <small>STORE</small>
          </span>
        </a>

        <nav className={menu ? "nav open" : "nav"}>
          <a href="#inicio" onClick={() => setMenu(false)}>Inicio</a>
          <a href="#catalogo" onClick={() => setMenu(false)}>Catálogo</a>
          <a href="#servicios" onClick={() => setMenu(false)}>Servicios</a>
          <a href="#contacto" onClick={() => setMenu(false)}>Contacto</a>
        </nav>

        <div className="header-actions">
          <a
            className="whatsapp-small"
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <button className="menu-button" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-content">
            <span className="eyebrow">TECNOLOGÍA · CONFIANZA · SERVICIO</span>
            <h1>
              La tecnología que
              <span> quieres.</span>
            </h1>
            <p>
              Encuentra celulares, computadores, audio, accesorios y mucho más
              en Mac & Mac Store.
            </p>

            <div className="hero-buttons">
              <a href="#catalogo" className="button primary">
                Ver catálogo <ChevronRight size={19} />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="button secondary"
              >
                <MessageCircle size={19} />
                Comprar por WhatsApp
              </a>
            </div>

            <div className="hero-info">
              <span><Star size={16} fill="currentColor" /> Atención personalizada</span>
              <span><Star size={16} fill="currentColor" /> Productos seleccionados</span>
            </div>
          </div>

          <div className="hero-device">
            <div className="device-card">
              <div className="device-screen">
                <span>MAC & MAC</span>
                <strong>TECNOLOGÍA</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="catalog">
          <div className="section-heading">
            <div>
              <span className="eyebrow">NUESTROS PRODUCTOS</span>
              <h2>Catálogo</h2>
            </div>

            <div className="search">
              <Search size={19} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar producto..."
              />
            </div>
          </div>

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item.name}
                className={category === item.name ? "category active" : "category"}
                onClick={() => setCategory(item.name)}
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>

          <div className="products-grid">
            {filtered.map((product) => (
              <motion.article
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="product-image">
                  <div className="placeholder-device">
                    <span>{product.category === "Samsung" ? "S" : ""}</span>
                  </div>
                  {product.featured && <span className="badge">Destacado</span>}
                </div>

                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.capacity}</p>

                  <strong className="price">{money(product.price)}</strong>

                  <button
                    className="buy-button"
                    onClick={() => whatsapp(product)}
                  >
                    <MessageCircle size={17} />
                    Consultar disponibilidad
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty">
              No encontramos productos con esa búsqueda.
            </div>
          )}
        </section>

        <section id="servicios" className="services">
          <div>
            <span className="eyebrow">MUCHO MÁS QUE UNA TIENDA</span>
            <h2>Servicios Mac & Mac</h2>
            <p>
              También compramos tecnología y metales preciosos y ofrecemos
              soluciones de empeño.
            </p>
          </div>

          <div className="service-grid">
            <div className="service">
              <span>💎</span>
              <h3>Compra de oro y joyas</h3>
              <p>Valoramos tus piezas de manera profesional.</p>
            </div>

            <div className="service">
              <span>♻️</span>
              <h3>Empeños</h3>
              <p>Convierte tus bienes en liquidez de forma rápida.</p>
            </div>

            <div className="service">
              <span>📱</span>
              <h3>Compra de tecnología</h3>
              <p>Evaluamos celulares, computadores y otros equipos.</p>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact">
          <div>
            <span className="eyebrow">VISÍTANOS</span>
            <h2>Estamos para ayudarte.</h2>
            <p>
              Escríbenos por WhatsApp para consultar disponibilidad, precios o
              cualquier producto que estés buscando.
            </p>

            <a
              className="button primary"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={19} />
              Hablar por WhatsApp
            </a>
          </div>

          <div className="location">
            <MapPin size={25} />
            <div>
              <strong>Talaigua Nuevo, Bolívar</strong>
              <p>Cl. 14 # 7-94</p>
              <p>Lunes a sábado · 8:00 a. m. – 12:00 p. m. / 2:00 p. m. – 6:00 p. m.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <strong>MAC & MAC STORE</strong>
          <span>Tecnología, valor y confianza.</span>
        </div>

        <div className="footer-links">
          <a href="#catalogo">Catálogo</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </div>

        <p>© 2026 Mac & Mac Store. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
APP

cat > src/main.jsx <<'MAIN'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
MAIN

cat > src/index.css <<'CSS'
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  font-family: Inter, system-ui, sans-serif;
  color: #111;
  background: #fff;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
}

button,
input {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: inherit;
  text-decoration: none;
}

.topbar {
  background: #111;
  color: #fff;
  text-align: center;
  padding: 9px 20px;
  font-size: 12px;
  font-weight: 500;
}

.header {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  border-bottom: 1px solid #eee;
  background: rgba(255,255,255,.95);
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(12px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: #111;
  color: #fff;
  font-weight: 800;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 14px;
  letter-spacing: -.4px;
}

.brand small {
  font-size: 9px;
  letter-spacing: 3px;
  margin-top: 2px;
  color: #777;
}

.nav {
  display: flex;
  gap: 32px;
  font-size: 14px;
  font-weight: 500;
}

.nav a:hover {
  color: #777;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.whatsapp-small {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  font-weight: 600;
}

.menu-button {
  display: none;
  border: 0;
  background: transparent;
}

.hero {
  min-height: 650px;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  align-items: center;
  padding: 80px 8%;
  background: linear-gradient(135deg, #f5f8f7 0%, #fff 55%, #eef6f2 100%);
  overflow: hidden;
}

.hero-content {
  max-width: 680px;
}

.eyebrow {
  display: inline-block;
  color: #16794c;
  font-size: 11px;
  letter-spacing: 2px;
  font-weight: 800;
  margin-bottom: 15px;
}

.hero h1 {
  margin: 0;
  font-size: clamp(48px, 6vw, 82px);
  line-height: .98;
  letter-spacing: -5px;
}

.hero h1 span {
  color: #16824f;
}

.hero p {
  max-width: 570px;
  color: #666;
  line-height: 1.7;
  font-size: 17px;
  margin: 26px 0;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  transition: .2s;
}

.button:hover {
  transform: translateY(-2px);
}

.primary {
  background: #111;
  color: white;
}

.secondary {
  background: white;
  border: 1px solid #ddd;
}

.hero-info {
  display: flex;
  gap: 22px;
  margin-top: 30px;
  color: #555;
  font-size: 12px;
}

.hero-info span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.hero-device {
  display: flex;
  justify-content: center;
  align-items: center;
}

.device-card {
  width: 280px;
  height: 540px;
  border-radius: 42px;
  padding: 9px;
  background: #151515;
  box-shadow: 0 40px 70px rgba(0,0,0,.2);
  transform: rotate(6deg);
}

.device-screen {
  height: 100%;
  border-radius: 35px;
  background: linear-gradient(145deg, #111, #16794c);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.device-screen span {
  font-size: 12px;
  letter-spacing: 3px;
}

.device-screen strong {
  font-size: 34px;
  margin-top: 10px;
}

.catalog,
.services,
.contact {
  padding: 100px 8%;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 35px;
}

h2 {
  font-size: clamp(35px, 4vw, 52px);
  letter-spacing: -2px;
  margin: 0;
}

.search {
  width: min(330px, 100%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px 15px;
  border: 1px solid #ddd;
  border-radius: 12px;
}

.search input {
  border: 0;
  outline: 0;
  width: 100%;
}

.categories {
  display: flex;
  gap: 9px;
  overflow-x: auto;
  padding-bottom: 10px;
  margin-bottom: 30px;
}

.category {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  background: white;
  cursor: pointer;
  font-size: 13px;
}

.category.active {
  background: #111;
  color: white;
  border-color: #111;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.product-card {
  overflow: hidden;
  border: 1px solid #eee;
  border-radius: 20px;
  background: white;
  transition: .25s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0,0,0,.08);
}

.product-image {
  height: 280px;
  background: #f6f6f6;
  position: relative;
  display: grid;
  place-items: center;
}

.placeholder-device {
  width: 105px;
  height: 190px;
  border-radius: 25px;
  background: #111;
  color: white;
  display: grid;
  place-items: center;
  font-size: 46px;
  box-shadow: 0 20px 35px rgba(0,0,0,.18);
}

.badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #16794c;
  color: white;
  padding: 6px 9px;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 700;
}

.product-info {
  padding: 18px;
}

.product-category {
  color: #16824f;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 800;
}

.product-info h3 {
  margin: 7px 0 3px;
  font-size: 17px;
}

.product-info p {
  margin: 0 0 13px;
  color: #777;
  font-size: 12px;
}

.price {
  display: block;
  font-size: 18px;
  margin-bottom: 14px;
}

.buy-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 0;
  border-radius: 10px;
  padding: 11px;
  background: #111;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}

.empty {
  text-align: center;
  padding: 70px;
  color: #777;
}

.services {
  background: #111;
  color: white;
}

.services > div:first-child {
  max-width: 650px;
  margin-bottom: 45px;
}

.services p {
  color: #aaa;
  line-height: 1.7;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.service {
  padding: 30px;
  border: 1px solid #333;
  border-radius: 18px;
}

.service > span {
  font-size: 28px;
}

.service h3 {
  margin: 22px 0 5px;
}

.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  align-items: center;
}

.contact p {
  color: #666;
  line-height: 1.7;
  max-width: 600px;
}

.location {
  padding: 30px;
  background: #f5f5f5;
  border-radius: 20px;
  display: flex;
  gap: 15px;
}

.location p {
  margin: 7px 0 0;
  font-size: 13px;
}

footer {
  padding: 35px 8%;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  font-size: 12px;
}

.footer-brand strong,
.footer-brand span {
  display: block;
}

.footer-brand span {
  color: #777;
  margin-top: 5px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

footer > p {
  color: #888;
}

@media (max-width: 1000px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .hero-device {
    display: none;
  }
}

@media (max-width: 700px) {
  .header {
    padding: 0 5%;
  }

  .nav {
    display: none;
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    padding: 20px;
    background: white;
    flex-direction: column;
    gap: 20px;
    border-bottom: 1px solid #eee;
  }

  .nav.open {
    display: flex;
  }

  .menu-button {
    display: block;
  }

  .whatsapp-small {
    display: none;
  }

  .hero {
    min-height: 620px;
    padding: 70px 6%;
  }

  .hero h1 {
    letter-spacing: -3px;
  }

  .hero-info {
    flex-direction: column;
    gap: 10px;
  }

  .catalog,
  .services,
  .contact {
    padding: 70px 6%;
  }

  .section-heading {
    align-items: stretch;
    flex-direction: column;
  }

  .search {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .product-image {
    height: 210px;
  }

  .placeholder-device {
    width: 75px;
    height: 140px;
    font-size: 32px;
  }

  .product-info {
    padding: 13px;
  }

  .product-info h3 {
    font-size: 14px;
  }

  .price {
    font-size: 15px;
  }

  .service-grid,
  .contact {
    grid-template-columns: 1fr;
  }

  footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
CSS

cat > vite.config.js <<'VITE'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
VITE

mkdir -p public/products

echo "🔎 Ejecutando lint..."
npm run lint

echo "🏗️ Generando build..."
npm run build

cd ..

git add .
git commit -m "feat: crea primera version del sitio Mac & Mac Store" || true
git push origin main

echo ""
echo "=========================================="
echo "✅ MAC & MAC STORE CONFIGURADO"
echo "=========================================="
echo "🌐 Para iniciar:"
echo "cd ~/Proyectos/mac-mac-store/web && npm run dev"
echo ""
echo "Luego abre:"
echo "http://localhost:5173"
echo "=========================================="
