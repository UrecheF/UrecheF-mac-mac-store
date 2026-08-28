import { useEffect, useMemo, useState } from "react";
import {
  Search, Menu, X, MessageCircle, MapPin, ChevronRight,
  Star, Smartphone, Laptop, Watch, Headphones, Cable,
  Gem, RefreshCcw, ShieldCheck, Truck, Camera, Tablet
} from "lucide-react";
import { motion } from "framer-motion";
import { products as fallbackProducts } from "./data/products";
import { buildCommerceCategories, fetchCommerceCatalog } from "./lib/commerceApi";
import "./index.css";

const WHATSAPP = "573202781315";

const money = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

const normalizeSearch = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

const categoryIcons = {
  Todos: Star,
  iPhone: Smartphone,
  Samsung: Smartphone,
  Telefonía: Smartphone,
  Tablets: Tablet,
  Computadores: Laptop,
  Smartwatch: Watch,
  Audio: Headphones,
  Accesorios: Cable,
  Movilidad: Smartphone,
};

function App() {
  const [products, setProducts] = useState(fallbackProducts);
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const [catalogStatus, setCatalogStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetchCommerceCatalog(controller.signal)
      .then((catalog) => {
        if (catalog.length) {
          setProducts(catalog);
          setCatalogStatus("live");
        } else {
          setCatalogStatus("fallback");
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.warn("Commerce API no disponible; usando catálogo local.", error);
          setCatalogStatus("fallback");
        }
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!menu) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenu(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menu]);

  const categories = useMemo(() => buildCommerceCategories(products), [products]);

  const filtered = useMemo(() => {
    const query = normalizeSearch(search);

    return products.filter((product) => {
      const matchesCategory =
        category === "Todos" || product.category === category;

      const text = normalizeSearch(
        `${product.name} ${product.category} ${product.capacity} ${product.brand || ""}`
      );

      return matchesCategory && text.includes(query);
    });
  }, [products, category, search]);

  const openWhatsApp = (message) => {
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const whatsapp = (product) => {
    openWhatsApp(
      `Hola Mac & Mac Store 👋\n\nEstoy interesado en:\n${product.name} ${product.capacity}\n\n¿Me pueden confirmar disponibilidad y precio?`
    );
  };

  const generalWhatsApp = () => {
    openWhatsApp("Hola Mac & Mac Store 👋 Quiero información sobre sus productos.");
  };

  return (
    <div className="app">
      <a className="skip-link" href="#catalogo">Saltar al catálogo</a>
      <div className="announcement">
        <span>✦</span> Envíos a toda Colombia <span>•</span> Atención personalizada <span>•</span> Productos seleccionados
      </div>

      <header className="header">
        <a className="brand" href="#inicio">
          <div className="brand-logo real-logo">
            <img src="/mac-mac-logo.png" alt="Mac & Mac Store" decoding="async" />
          </div>
          <div className="brand-text">
            <strong>MAC & MAC</strong>
            <small>STORE</small>
          </div>
        </a>

        <nav id="main-navigation" aria-label="Navegación principal" className={menu ? "nav open" : "nav"}>
          <a href="#inicio" onClick={() => setMenu(false)}>Inicio</a>
          <a href="#catalogo" onClick={() => setMenu(false)}>Catálogo</a>
          <a href="#servicios" onClick={() => setMenu(false)}>Servicios</a>
          <a href="#contacto" onClick={() => setMenu(false)}>Contacto</a>
        </nav>

        <div className="header-actions">
          <button className="header-whatsapp" onClick={generalWhatsApp}>
            <MessageCircle size={18} />
            WhatsApp
          </button>
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="main-navigation"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
          >
            {menu ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-content">
            <div className="hero-label"><span className="gold-dot" />TECNOLOGÍA QUE ELEVA TU ESTILO</div>
            <h1> Tecnología.<br /><span>Valor.</span><br />Confianza.</h1>
            <p>Descubre celulares, computadores, accesorios y dispositivos inteligentes seleccionados para ti.</p>
            <div className="hero-buttons">
              <a href="#catalogo" className="button gold-button">Explorar catálogo <ChevronRight size={18} /></a>
              <button className="button dark-button" onClick={generalWhatsApp}><MessageCircle size={18} />Comprar por WhatsApp</button>
            </div>
            <div className="hero-features">
              <span><ShieldCheck size={17} /> Productos seleccionados</span>
              <span><Truck size={17} /> Envíos a Colombia</span>
              <span><Star size={17} /> Atención premium</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="gold-ring ring-one" /><div className="gold-ring ring-two" />
            <div className="hero-phone">
              <div className="phone-camera"><i /><i /><i /></div>
              <div className="phone-screen"><small>MAC & MAC</small><strong>STORE</strong><span>TECNOLOGÍA QUE<br />ELEVA TU ESTILO</span></div>
            </div>
            <div className="floating-card"><span>MAC & MAC</span><strong>PREMIUM</strong></div>
          </div>
        </section>

        <section className="trust-strip">
          <div><ShieldCheck /><span><strong>Compra segura</strong>Productos seleccionados</span></div>
          <div><Truck /><span><strong>Envíos nacionales</strong>A toda Colombia</span></div>
          <div><Star /><span><strong>Atención premium</strong>Siempre para ti</span></div>
          <div><MessageCircle /><span><strong>Asesoría directa</strong>Por WhatsApp</span></div>
        </section>

        <section id="catalogo" className="catalog">
          <div className="section-heading">
            <div>
              <span className="section-label">NUESTRO CATÁLOGO</span>
              <h2>Encuentra lo que buscas.</h2>
              <p>Productos de tecnología seleccionados para ti.</p>
            </div>
            <div className="search-box">
              <Search size={19} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar producto..."
                aria-label="Buscar productos"
              />
              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="categories">
            {categories.map((item) => {
              const Icon = categoryIcons[item.name] || Smartphone;
              return (
                <button
                  key={item.name}
                  className={category === item.name ? "category active" : "category"}
                  onClick={() => setCategory(item.name)}
                  aria-pressed={category === item.name}
                >
                  <Icon size={17} />{item.name}
                </button>
              );
            })}
          </div>

          <div className="catalog-meta">
            <span role="status" aria-live="polite" aria-atomic="true">
              {filtered.length} productos disponibles
            </span>
            <span className="gold-line" aria-hidden="true" />
            <span>{catalogStatus === "live" ? "Catálogo en tiempo real" : catalogStatus === "loading" ? "Conectando catálogo…" : "Catálogo local"}</span>
            {(search || category !== "Todos") && (
              <button
                type="button"
                className="reset-filters"
                onClick={() => { setSearch(""); setCategory("Todos"); }}
              >
                <X size={14} aria-hidden="true" /> Restablecer filtros
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-catalog" role="status" aria-live="polite">
              <Search size={28} />
              <h3>No encontramos ese producto</h3>
              <p>Prueba otra marca, modelo o capacidad. También podemos ayudarte directamente.</p>
              <div className="empty-actions">
                <button type="button" onClick={() => { setSearch(""); setCategory("Todos"); }}>
                  Ver todo el catálogo
                </button>
                <button type="button" onClick={generalWhatsApp}>
                  <MessageCircle size={16} /> Consultar por WhatsApp
                </button>
              </div>
            </div>
          ) : (
          <div className="products-grid">
            {filtered.map((product, index) => (
              <motion.article key={product.id} className="product-card" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index, 8) * 0.04 }} viewport={{ once: true }}>
                <div className="product-image">
                  <div className={`product-device ${product.brand === "Samsung" ? "samsung" : ""}`}>
                    <div className="device-camera"><i /><i /><i /></div>
                    <span>{product.brand === "Samsung" ? "S" : ""}</span>
                  </div>
                  {product.featured && <div className="product-badge">DESTACADO</div>}
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.capacity || product.condition || ""}</p>
                  <div className="product-bottom">
                    <strong>{money(product.price)}</strong>
                    <button className="product-whatsapp" onClick={() => whatsapp(product)} aria-label={`Comprar ${product.name} por WhatsApp`}><MessageCircle size={17} /><span>Comprar por WhatsApp</span></button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          )}
        </section>

        <section className="premium-banner">
          <div><span className="section-label">MAC & MAC STORE</span><h2>Tu próxima tecnología<br /><span>empieza aquí.</span></h2><p>Compra con confianza y recibe atención personalizada.</p></div>
          <button className="button gold-button" onClick={generalWhatsApp}>Hablar con un asesor <ChevronRight size={18} /></button>
        </section>

        <section id="servicios" className="services">
          <div className="section-heading service-heading"><div><span className="section-label">SERVICIOS</span><h2>Mucho más que tecnología.</h2><p>Soluciones para tus equipos y tus bienes.</p></div></div>
          <div className="service-grid">
            <div className="service-card"><div className="service-icon"><Gem /></div><span>01</span><h3>Compra de oro y joyas</h3><p>Evaluamos oro, plata, joyas y metales preciosos.</p><button onClick={generalWhatsApp}>Consultar <ChevronRight size={16} /></button></div>
            <div className="service-card"><div className="service-icon"><RefreshCcw /></div><span>02</span><h3>Empeños</h3><p>Obtén liquidez utilizando tus bienes como respaldo.</p><button onClick={generalWhatsApp}>Consultar <ChevronRight size={16} /></button></div>
            <div className="service-card"><div className="service-icon"><Smartphone /></div><span>03</span><h3>Compra de tecnología</h3><p>Compramos celulares, computadores y dispositivos.</p><button onClick={generalWhatsApp}>Consultar <ChevronRight size={16} /></button></div>
          </div>
        </section>

        <section id="contacto" className="contact">
          <div className="contact-content"><span className="section-label">CONTACTO</span><h2>Estamos cerca de ti.</h2><p>¿Buscas un equipo específico? Escríbenos y uno de nuestros asesores te ayudará.</p><button className="button gold-button" onClick={generalWhatsApp}><MessageCircle size={19} />+57 320 278 1315</button></div>
          <div className="contact-card">
            <div className="contact-row"><MapPin /><div><small>VISÍTANOS</small><strong>Cl. 14 # 7-94</strong><span>Talaigua Nuevo, Bolívar, Colombia</span></div></div>
            <div className="contact-row"><Watch /><div><small>HORARIO</small><strong>Lunes a sábado</strong><span>8:00 a. m. – 12:00 p. m.</span><span>2:00 p. m. – 6:00 p. m.</span></div></div>
            <div className="contact-row"><Camera /><div><small>INSTAGRAM</small><strong>@macstore0</strong><span>Encuéntranos en redes sociales</span></div></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><div className="brand-logo real-logo"><img src="/mac-mac-logo.png" alt="Mac & Mac Store" loading="lazy" decoding="async" /></div><div><strong>MAC & MAC STORE</strong><span>Tecnología que eleva tu estilo.</span></div></div>
        <div className="footer-links"><a href="#inicio">Inicio</a><a href="#catalogo">Catálogo</a><a href="#servicios">Servicios</a><a href="#contacto">Contacto</a></div>
        <p>© 2026 Mac & Mac Store</p>
      </footer>
    </div>
  );
}

export default App;
