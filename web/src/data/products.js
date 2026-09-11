export const categories = [
  { name: "Todos" },
  { name: "iPhone" },
  { name: "Samsung" },
  { name: "Computadores" },
  { name: "Smartwatch" },
  { name: "Audio" },
  { name: "Accesorios" },
];

const iphoneProColors = [
  { name: "Plata", hex: "#d9d6d1" },
  { name: "Naranja cósmico", hex: "#d96f45" },
  { name: "Azul profundo", hex: "#304b68" },
];

const iphone17Colors = [
  { name: "Negro", hex: "#202124" },
  { name: "Blanco", hex: "#f3f2ed" },
  { name: "Azul neblina", hex: "#b8d5e6" },
  { name: "Salvia", hex: "#aab7a1" },
  { name: "Lavanda", hex: "#c9bfdc" },
];

const iphoneAirColors = [
  { name: "Negro espacial", hex: "#2f3033" },
  { name: "Blanco nube", hex: "#f2f0e9" },
  { name: "Oro claro", hex: "#e1d2b5" },
  { name: "Azul cielo", hex: "#b9d6e7" },
];

const s25UltraColors = [
  { name: "GrisAzulado Titanio", hex: "#8797a3" },
  { name: "Negro Titanio", hex: "#343538" },
  { name: "Gris Titanio", hex: "#aaa8a3" },
  { name: "Blanco Plata Titanio", hex: "#deddd8" },
];

export const products = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    category: "iPhone",
    featured: true,
    available: true,
    colors: iphoneProColors,
    variants: [
      { id: "iphone-17-pro-max-256gb", capacity: "256 GB", price: 4289000, available: true },
      { id: "iphone-17-pro-max-512gb", capacity: "512 GB", price: 5489000, available: true },
      { id: "iphone-17-pro-max-1tb", capacity: "1 TB", price: 6239000, available: true },
    ],
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    category: "iPhone",
    featured: true,
    available: true,
    colors: iphoneProColors,
    variants: [
      { id: "iphone-17-pro-256gb", capacity: "256 GB", price: 4039000, available: true },
    ],
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    brand: "Apple",
    category: "iPhone",
    featured: false,
    available: true,
    colors: iphone17Colors,
    variants: [
      { id: "iphone-17-256gb-sim", capacity: "256 GB · SIM", price: 3175000, available: true },
    ],
  },
  {
    id: "iphone-17-air",
    name: "iPhone 17 Air",
    brand: "Apple",
    category: "iPhone",
    featured: true,
    available: true,
    colors: iphoneAirColors,
    variants: [
      { id: "iphone-17-air-256gb", capacity: "256 GB", price: 3475000, available: true },
    ],
  },
  {
    id: "samsung-s25-ultra",
    name: "Samsung S25 Ultra",
    brand: "Samsung",
    category: "Samsung",
    featured: true,
    available: true,
    colors: s25UltraColors,
    variants: [
      { id: "samsung-s25-ultra-256gb", capacity: "256 GB", price: 3425000, available: true },
      { id: "samsung-s25-ultra-512gb", capacity: "512 GB", price: 3839000, available: true },
    ],
  },
];
