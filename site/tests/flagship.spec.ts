import { expect, test } from "@playwright/test";

test("home has a single H1 and no internal labels", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toContainText("capa que mantiene el negocio");
  await expect(page.locator("body")).not.toContainText("PENDIENTE_VALIDACION");
  expect(errors, errors.join("\n")).toEqual([]);
});

test("flagship pages are distinct and keyboard reachable", async ({ page }) => {
  await page.goto("/redes/");
  await expect(page.locator("h1")).toContainText("Redes diseñadas");
  await page.keyboard.press("Tab");
  await page.goto("/seguridad/");
  await expect(page.locator("h1")).toContainText("Proteger");
  await page.goto("/licenciamiento/");
  await expect(page.locator("h1")).toContainText("licencia");
  await page.goto("/soporte/");
  await expect(page.locator("h1")).toContainText("trazabilidad");
  await page.goto("/servicios/servicios-administrados/");
  await expect(page.locator("h1")).toContainText("Operar la tecnología");
  await page.goto("/infraestructura-fisica/");
  await expect(page.locator("h1")).toContainText("obra");
  await page.goto("/productos/laptops/");
  await expect(page.locator("h1")).toContainText("puesto");
  await page.goto("/resolver/");
  await expect(page.getByRole("button", { name: "Renovar equipos" })).toBeVisible();
});

test("reduced motion still shows the system", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("img").first()).toBeVisible();
});

test("home does not require WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const proto = HTMLCanvasElement.prototype;
    const original = proto.getContext;
    proto.getContext = function (this: HTMLCanvasElement, type: string, attrs?: unknown) {
      if (String(type).toLowerCase().includes("webgl")) return null;
      return original.call(this, type as "2d", attrs as CanvasRenderingContext2DSettings);
    } as typeof proto.getContext;
  });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  expect(errors, errors.join("\n")).toEqual([]);
});
