import { expect, test } from "@playwright/test";

const home = "/concepto-v8/";

test("V8.6 home has one H1, needs and v86 shell", async ({ page }) => {
  await page.goto(home);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Integramos la tecnología que mantiene operando su empresa");
  await expect(page.getByRole("tab", { name: "Abrir o renovar una sede" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Actualizar tecnología y plataformas" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Mantener la operación funcionando" })).toBeVisible();
  await expect(page.locator("[data-v='86']")).toBeVisible();
  await expect(page.locator("[data-lcp='86']")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("PENDIENTE_VALIDACION");
  await expect(page.locator("body")).not.toContainText("Comprar ahora");
  await expect(page.locator("head meta[name='robots']")).toHaveAttribute("content", /noindex/i);
  await expect(page.locator("head meta[property='og:image']")).toHaveCount(1);
});

test("V8.6 six internal pages have visual hero, one H1 and SEO", async ({ page }) => {
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
  }
});

test("V8.6 cableado has six stages and dual scene", async ({ page }) => {
  await page.goto(home);
  await page.locator("#cableado").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "De un plano a una infraestructura documentada." })).toBeVisible();
  await expect(page.locator("[data-demo='cable-86']")).toBeVisible();
  await page.getByRole("button", { name: "Siguiente" }).first().click();
  await expect(page.getByText("Diseñamos recorridos mantenibles")).toBeVisible();
  await expect(page.locator("#cableado")).not.toContainText("Certificado");
});

test("V8.6 security and cloud scenes exist", async ({ page }) => {
  await page.goto(home);
  await page.locator("#seguridad-demo").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-demo='sec-86']")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bloquear un dispositivo no conforme sin detener la empresa." })).toBeVisible();
  await page.locator("#nube-demo").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-demo='cloud-86']")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Proteger y recuperar información empresarial." })).toBeVisible();
});

test("V8.6 form is simulated and cases are anonymized", async ({ page }) => {
  await page.goto("/concepto-v8/contacto/");
  await expect(page.locator("form")).toBeVisible();
  await expect(page.locator("form[action^='http']")).toHaveCount(0);
  await page.goto(home);
  await expect(page.getByRole("heading", { name: "Ejemplos de alcance, sin identificar organizaciones." })).toBeVisible();
});
