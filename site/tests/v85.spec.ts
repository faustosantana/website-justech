import { expect, test } from "@playwright/test";

const home = "/concepto-v8/";

const internal = [
  "No es un dibujo escolar",
  "rack genérico",
  "plataforma propia",
  "sello de partner",
  "Sin precios ni datos reales",
  "No inventadas",
  "No afirmamos",
  "No prometemos",
  "comprar ahora",
  "SOC 24/7",
  "NOC 24/7",
  "sin identificar organizaciones",
];

test("V8.7 home has one H1, needs, unified demo and v87 shell", async ({ page }) => {
  await page.goto(home);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Integramos la tecnología que mantiene operando su empresa");
  await expect(page.getByRole("tab", { name: "Abrir o renovar una sede" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Actualizar tecnología y plataformas" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Mantener la operación funcionando" })).toBeVisible();
  await expect(page.locator("[data-v='87']").first()).toBeVisible();
  await expect(page.locator("[data-lcp='87']")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Así se conecta una operación." })).toBeVisible();
  await expect(page.locator("[data-demo='ops-87']")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("PENDIENTE_VALIDACION");
  for (const phrase of internal) {
    await expect(page.locator("body")).not.toContainText(phrase);
  }
  await expect(page.locator("head meta[name='robots']")).toHaveAttribute("content", /noindex/i);
  await expect(page.locator("head meta[property='og:image']")).toHaveCount(1);
  await expect(page.locator("head link[rel='canonical']")).toHaveAttribute("href", /\/$/);
  await expect(page.locator("head link[rel='canonical']")).not.toHaveAttribute("href", /concepto-v8/);
});

test("V8.7 six internal pages have visual hero, one H1 and SEO", async ({ page }) => {
  const routes: [string, string][] = [
    ["/concepto-v8/cableado-estructurado/", "Cableado estructurado preparado para crecer"],
    ["/concepto-v8/redes-empresariales/", "Redes empresariales diseñadas"],
    ["/concepto-v8/equipos-empresariales/", "Equipos listos para trabajar"],
    ["/concepto-v8/licenciamiento/", "Licencias organizadas"],
    ["/concepto-v8/soporte-tecnico-empresarial/", "Soporte que entiende la operación"],
    ["/concepto-v8/contacto/", "Cuente el problema"],
  ];
  for (const [path, h1] of routes) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(h1);
    await expect(page.locator("head meta[name='robots']")).toHaveAttribute("content", /noindex/i);
    await expect(page.locator("head meta[property='og:image']")).toHaveCount(1);
    await expect(page.locator("script[type='application/ld+json']").first()).toBeAttached();
    await expect(page.locator("head link[rel='canonical']")).not.toHaveAttribute("href", /concepto-v8/);
  }
});

test("V8.7 cableado inner page keeps six stages", async ({ page }) => {
  await page.goto("/concepto-v8/cableado-estructurado/");
  await page.locator("#cableado").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "De un plano a una infraestructura documentada." })).toBeVisible();
  await expect(page.locator("[data-demo='cable-87']")).toBeVisible();
  await expect(page.getByRole("button", { name: /Levantamiento y diseño/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Documentación y entrega/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Qué recibe el cliente" })).toBeVisible();
});

test("V8.7 home does not mount the full cable laboratory", async ({ page }) => {
  await page.goto(home);
  await expect(page.locator("[data-demo='cable-87']")).toHaveCount(0);
  await expect(page.locator("#seguridad-demo")).toHaveCount(0);
  await expect(page.locator("#nube-demo")).toHaveCount(0);
});

test("V8.7 form is simulated and cases are professional", async ({ page }) => {
  await page.goto("/concepto-v8/contacto/");
  await expect(page.locator("form")).toBeVisible();
  await expect(page.locator("form[action^='http']")).toHaveCount(0);
  await page.goto(home);
  await expect(page.getByRole("heading", { name: "Experiencia aplicada a escenarios empresariales." })).toBeVisible();
});

test("V8.7 resources are original articles", async ({ page }) => {
  await page.goto("/concepto-v8/recursos/cableado/");
  await expect(page.locator("h1")).toContainText("Qué debe entregar un proyecto de cableado estructurado");
  await expect(page.getByRole("heading", { name: "Lista de verificación" })).toBeVisible();
  await page.goto("/concepto-v8/recursos/wifi/");
  await expect(page.locator("h1")).toContainText("Cómo evaluar el Wi-Fi de una oficina");
  await page.goto("/concepto-v8/recursos/equipos/");
  await expect(page.locator("h1")).toContainText("Cuándo renovar los equipos de una empresa");
});
