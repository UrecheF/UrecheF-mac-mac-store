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
  { name: "Gris azulado titanio", hex: "#8797a3" },
  { name: "Negro titanio", hex: "#343538" },
  { name: "Gris titanio", hex: "#aaa8a3" },
  { name: "Blanco plata titanio", hex: "#deddd8" },
];

export const variantProfiles = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    colors: iphoneProColors,
    variants: [
      { capacity: "256 GB" },
      { capacity: "512 GB" },
      { capacity: "1 TB" },
    ],
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    colors: iphoneProColors,
    variants: [{ capacity: "256 GB" }],
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    colors: iphone17Colors,
    variants: [{ capacity: "256 GB · SIM" }],
  },
  {
    id: "iphone-17-air",
    name: "iPhone 17 Air",
    colors: iphoneAirColors,
    variants: [{ capacity: "256 GB" }],
  },
  {
    id: "samsung-s25-ultra",
    name: "Samsung S25 Ultra",
    colors: s25UltraColors,
    variants: [
      { capacity: "256 GB" },
      { capacity: "512 GB" },
    ],
  },
];
