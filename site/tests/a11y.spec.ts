import { expect, test } from "@playwright/test";
import { join } from "node:path";

const axePath = join(process.cwd(), "node_modules/axe-core/axe.min.js");

const routes = [
  "/",
  "/redes/",
  "/seguridad/",
  "/licenciamiento/",
  "/soporte/",
  "/servicios/servicios-administrados/",
  "/infraestructura-fisica/",
  "/productos/laptops/",
  "/productos/servidores/",
  "/nube/",
  "/resolver/",
];

test("keyboard reaches skip link then primary CTA", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Saltar al contenido" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenido/);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => document.activeElement?.tagName);
  expect(focused).toMatch(/A|BUTTON|INPUT/);
});

test("axe WCAG A/AA on flagship routes", async ({ page }) => {
  const serious: string[] = [];
  for (const route of routes) {
    await page.goto(route);
    await page.addScriptTag({ path: axePath });
    const results = await page.evaluate(async () => {
      // @ts-expect-error injected
      const r = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      });
      return r.violations.map((v: { id: string; impact: string; nodes: unknown[]; help: string }) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.length,
      }));
    });
    for (const v of results) {
      if (v.impact === "critical" || v.impact === "serious") {
        serious.push(`${route} · ${v.id} (${v.impact}, ${v.nodes} nodos): ${v.help}`);
      }
    }
  }
  expect(serious, serious.join("\n")).toEqual([]);
});
