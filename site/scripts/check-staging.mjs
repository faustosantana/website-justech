#!/usr/bin/env node
/**
 * Guardas de staging: el export estático no debe indexarse ni cargar
 * analítica/ads de producción, ni contenido del incidente /legal/.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const root = join(process.cwd(), "out");
const errors = [];

function fail(msg) {
  errors.push(msg);
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

if (!existsSync(root)) {
  console.error("No existe site/out. Ejecute npm run build primero.");
  process.exit(1);
}

const robots = readFileSync(join(root, "robots.txt"), "utf8");
if (!/User-agent:\s*\*/i.test(robots) || !/Disallow:\s*\/\s*$/m.test(robots)) {
  fail("robots.txt debe Disallow: / para todo user-agent.");
}

const forbidden = [
  "G-3QER18Q85V",
  "GTM-P6XLSFFZ",
  "4128864347396906",
  "G-0LSM1YJSPZ",
  "plazaitco",
  "OK88",
  "SLOT88",
  "googletagmanager.com",
  "google-analytics.com",
  "connect.facebook.net",
  "googleads",
  "doubleclick.net",
  "PENDIENTE_VALIDACION",
  "Capacidades en validación",
  "catálogo de humo",
  "cifras infladas",
];

const hrefLegalProd = /href=["']https:\/\/www\.justech\.do\/legal/i;

const files = walk(root).filter((f) =>
  [".html", ".js", ".css", ".txt", ".xml", ".json"].includes(extname(f).toLowerCase()),
);

let htmlCount = 0;
let bannerCount = 0;
let noindexCount = 0;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = file.slice(root.length);
  for (const token of forbidden) {
    if (text.includes(token)) fail(`${rel} contiene token prohibido en staging: ${token}`);
  }
  if (hrefLegalProd.test(text)) {
    fail(`${rel} enlaza la /legal/ de producción (comprometida).`);
  }
  if (extname(file) === ".html") {
    htmlCount += 1;
    if (text.includes("Entorno de previsualización Justech")) bannerCount += 1;
    if (/noindex/i.test(text)) noindexCount += 1;
    if (/<form[^>]+action=["']https?:\/\//i.test(text)) {
      fail(`${rel} tiene formulario con action absoluto (riesgo de leads reales).`);
    }
    if (/rel=["']canonical["'][^>]*www\.justech\.do/i.test(text)) {
      fail(`${rel} canónica apunta a producción.`);
    }
  }
}

if (htmlCount < 10) fail(`Se esperaban varias páginas HTML, hay ${htmlCount}.`);
if (bannerCount < htmlCount) {
  fail(`Banner de staging ausente en ${htmlCount - bannerCount} HTML (de ${htmlCount}).`);
}
if (noindexCount < htmlCount) {
  fail(`noindex ausente en ${htmlCount - noindexCount} HTML (de ${htmlCount}).`);
}

const requiredRoutes = [
  "/index.html",
  "/contacto/index.html",
  "/contacto/cotizacion/index.html",
  "/legal/index.html",
  "/soluciones/index.html",
  "/servicios/index.html",
  "/productos/index.html",
  "/infraestructura-fisica/index.html",
  "/nosotros/index.html",
  "/recursos/faqs/index.html",
  "/l/consulta/index.html",
  "/l/cableado-estructurado/index.html",
  "/redes/index.html",
  "/seguridad/index.html",
  "/licenciamiento/index.html",
  "/resolver/index.html",
  "/robots.txt",
];
for (const route of requiredRoutes) {
  if (!existsSync(join(root, route.replace(/^\//, "")))) fail(`Falta ruta exportada: ${route}`);
}

if (errors.length) {
  console.error(`check-staging: ${errors.length} error(es)`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `check-staging OK · ${htmlCount} HTML · banner y noindex en todas · robots Disallow:/`,
);
