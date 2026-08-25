import { expect, test } from "@playwright/test";

const home = "/concepto-v8/";

test("V8.5 home has one H1, new needs and no C/M/O as doors", async ({ page }) => {
  await page.goto(home);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("Integramos la tecnología que mantiene operando su empresa");
  await expect(page.getByRole("tab", { name: "Abrir o renovar una sede" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Actualizar tecnología y plataformas" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Mantener la operación funcionando" })).toBeVisible();
  await expect(page.locator("[data-v='85']")).toBeVisible();
  await expect(page.locator("body")).not.toContainText("PENDIENTE_VALIDACION");
  await expect(page.locator("body")).not.toContainText("Comprar ahora");
});

test("V8.5 service pages answer the brief", async ({ page }) => {
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
  }
});

test("V8.5 cableado has six stages not ten ID buttons", async ({ page }) => {
  await page.goto(home);
  await page.locator("#cableado").scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "De un plano a una infraestructura documentada." })).toBeVisible();
  await page.getByRole("button", { name: "Siguiente" }).first().click();
  await expect(page.getByText("Diseñamos recorridos mantenibles")).toBeVisible();
  await expect(page.locator("#cableado")).not.toContainText("Certificado");
});

test("V8.5 form is simulated", async ({ page }) => {
  await page.goto("/concepto-v8/contacto/");
  await expect(page.locator("form")).toBeVisible();
  await expect(page.locator("form[action^='http']")).toHaveCount(0);
});
