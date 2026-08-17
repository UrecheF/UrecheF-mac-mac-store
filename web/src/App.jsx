import { useMemo, useState } from "react";
import { Search, Menu, X, MessageCircle, MapPin, ChevronRight, Star } from "lucide-react";
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
