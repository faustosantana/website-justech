import { chromium } from "@playwright/test";
import { join } from "node:path";
import { writeFileSync } from "node:fs";

const axePath = join(process.cwd(), "node_modules/axe-core/axe.min.js");
const base = "http://127.0.0.1:4173";
const routes = [
  "/concepto-v8/",
  "/concepto-v8/cableado-estructurado/",
  "/concepto-v8/redes-empresariales/",
  "/concepto-v8/equipos-empresariales/",
  "/concepto-v8/licenciamiento/",
  "/concepto-v8/soporte-tecnico-empresarial/",
  "/concepto-v8/contacto/",
];

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
const serious = [];
const broken = [];

for (const route of routes) {
  const res = await page.goto(base + route, { waitUntil: "domcontentloaded" });
  if (!res || res.status() !== 200) broken.push(`${route} HTTP ${res?.status()}`);
  await page.addScriptTag({ path: axePath });
  const results = await page.evaluate(async () => {
    const r = await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
    });
    return r.violations
      .filter((v) => v.impact === "critical" || v.impact === "serious")
      .map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length }));
  });
  for (const v of results) serious.push(`${route} · ${v.id} (${v.impact}, ${v.nodes}): ${v.help}`);

  const hrefs = await page.$$eval("a[href]", (as) =>
    as.map((a) => a.getAttribute("href")).filter(Boolean),
  );
  for (const href of hrefs) {
    if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) continue;
    if (href.startsWith("http") && !href.includes("127.0.0.1") && !href.includes("localhost")) continue;
    const url = href.startsWith("http") ? href : new URL(href, base + route).toString();
    const r = await page.request.get(url, { maxRedirects: 5 });
    if (r.status() >= 400) broken.push(`${route} → ${href} (${r.status()})`);
  }
}

await browser.close();
const report = { serious, broken, ok: !serious.length && !broken.length };
writeFileSync("/tmp/v85-axe-links.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exit(1);
