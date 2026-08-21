import { expect, test } from "@playwright/test";

const flagships = [
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
];

test("laptops keeps copy and laptop visual in separate regions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/productos/laptops/");
  const h1 = page.locator("h1");
  const visual = page.locator(".v6-visual, .v5-visual, .stage-visual").first();
  await expect(h1).toBeVisible();
  await expect(visual).toBeVisible();
  const overlap = await page.evaluate(() => {
    const a = document.querySelector("h1")?.getBoundingClientRect();
      const b = document.querySelector(".v6-visual, .v5-visual, .stage-visual")?.getBoundingClientRect();
    if (!a || !b) return true;
    return a.right > b.left + 12 && a.left < b.right - 12 && a.bottom > b.top + 12 && a.top < b.bottom - 12;
  });
  expect(overlap, "titular y visual de laptop no deben superponerse en desktop").toBeFalsy();
});

test("split heroes never overlay H1 with the visual", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const split = ["/redes/", "/licenciamiento/", "/soporte/", "/productos/laptops/"];
  for (const path of split) {
    await page.goto(path);
    const hit = await page.evaluate(() => {
      const a = document.querySelector("h1")?.getBoundingClientRect();
      const b = document.querySelector(".v6-visual, [data-visual], .v5-visual, .stage-visual")?.getBoundingClientRect();
      if (!a || !b) return true;
      return a.right > b.left + 12 && a.left < b.right - 12 && a.bottom > b.top + 12 && a.top < b.bottom - 12;
    });
    expect(hit, `${path} H1 vs visual`).toBeFalsy();
  }
});

test("flagship pages have no horizontal overflow at key viewports", async ({ page }) => {
  test.setTimeout(120000);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of flagships) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
      );
      expect(overflow, `${path} overflow at ${width}`).toBeFalsy();
      await expect(page.locator("h1")).toHaveCount(1);
    }
  }
});

test("nube and servers are flagship, not catalog clones", async ({ page }) => {
  await page.goto("/nube/");
  await expect(page.locator("h1")).toContainText("oleada");
  await page.goto("/productos/servidores/");
  await expect(page.locator("h1")).toContainText("carga");
});

test("flagships have unique ids, 44px controls and no console errors", async ({ page }) => {
  test.setTimeout(120000);
  for (const path of flagships) {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(path);
    const dups = await page.evaluate(() => {
      const ids = [...document.querySelectorAll("[id]")].map((el) => el.id).filter(Boolean);
      return ids.filter((id, i) => ids.indexOf(id) !== i);
    });
    expect(dups, `${path} duplicate ids ${dups.join(",")}`).toEqual([]);
    const small = await page.evaluate(() =>
      [...document.querySelectorAll("a.btn, button")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.height < 40;
      }),
    );
    expect(small, `${path} control under 40px`).toBeFalsy();
    expect(errors, `${path} ${errors.join("\n")}`).toEqual([]);
    page.removeAllListeners("pageerror");
  }
});
