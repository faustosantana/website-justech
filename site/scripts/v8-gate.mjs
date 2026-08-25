import { mkdirSync, copyFileSync, existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { chromium, devices } from "@playwright/test";

const origin = "http://127.0.0.1:4173";
const base = `${origin}/concepto-v8/`;
const artShots = "/opt/cursor/artifacts/screenshots";
const artVids = "/opt/cursor/artifacts/videos";
const shots = "/workspace/docs/fase-c/captures";
mkdirSync(artShots, { recursive: true });
mkdirSync(artVids, { recursive: true });
mkdirSync(shots, { recursive: true });

function ffmpegBin() {
  return [
    "/usr/bin/ffmpeg",
    "/usr/local/bin/ffmpeg",
    join(process.env.HOME || "", ".cache/ms-playwright/ffmpeg-1011/ffmpeg-linux"),
  ].find((f) => existsSync(f)) || "ffmpeg";
}

async function convert(videoDir, outName) {
  const files = readdirSync(videoDir)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => join(videoDir, f))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
  if (!files.length) {
    console.warn("Sin webm en", videoDir);
    return;
  }
  const src = files[0];
  const mp4 = join(artVids, outName);
  const r = spawnSync(ffmpegBin(), ["-y", "-i", src, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4], { stdio: "inherit" });
  const dest = r.status === 0 ? mp4 : src;
  const name = r.status === 0 ? outName : outName.replace(".mp4", ".webm");
  copyFileSync(dest, join(artVids, name));
  copyFileSync(dest, join(shots, name));
  console.log("video", name);
}

async function interact(page, mobile) {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("h1").waitFor();
  await page.waitForTimeout(mobile ? 3000 : 8000);
  if (mobile) {
    await page.getByRole("button", { name: "Menú" }).click().catch(() => {});
    await page.waitForTimeout(700);
    await page.getByRole("button", { name: "Cerrar" }).click().catch(() => {});
  }
  await page.getByRole("link", { name: "Explorar capacidades" }).click();
  await page.waitForTimeout(1000);
  for (const name of ["Abrir o renovar una sede", "Actualizar tecnología y plataformas", "Mantener la operación funcionando"]) {
    await page.getByRole("tab", { name }).click();
    await page.waitForTimeout(1600);
  }
  await page.locator("#operacion").scrollIntoViewIfNeeded();
  await page.waitForTimeout(mobile ? 1800 : 4000);
  for (const name of ["Sede", "Red", "Puestos", "Plataformas", "Seguridad", "Nube", "Soporte"]) {
    await page.getByRole("tab", { name, exact: true }).click();
    await page.waitForTimeout(900);
  }
  await page.locator("#casos-title").scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(800);
  await page.locator("#conversar").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
}

async function shot(page, name) {
  const tmp = join(artShots, `tmp-${name}.png`);
  await page.screenshot({ path: tmp, fullPage: false });
  copyFileSync(tmp, join(artShots, name));
  copyFileSync(tmp, join(shots, name));
}

async function stills() {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "es-DO" });
  const page = await desk.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await shot(page, "v87-hero-desktop.png");
  await page.evaluate(() => document.getElementById("necesidades")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(800);
  await page.getByRole("tab", { name: "Abrir o renovar una sede" }).click();
  await page.waitForTimeout(800);
  await shot(page, "v87-sede-desktop.png");
  await page.getByRole("tab", { name: "Actualizar tecnología y plataformas" }).click();
  await page.waitForTimeout(800);
  await shot(page, "v87-modernizar-desktop.png");
  await page.getByRole("tab", { name: "Mantener la operación funcionando" }).click();
  await page.waitForTimeout(800);
  await shot(page, "v87-operar-desktop.png");
  await page.locator("#operacion").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await shot(page, "v87-ops-desktop.png");
  await page.getByRole("tab", { name: "Red", exact: true }).click();
  await page.waitForTimeout(700);
  await shot(page, "v87-ops-red-desktop.png");
  await page.locator("#conversar").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, "v87-form-desktop.png");
  for (const [path, name] of [
    ["/concepto-v8/cableado-estructurado/", "v87-page-cableado.png"],
    ["/concepto-v8/redes-empresariales/", "v87-page-redes.png"],
    ["/concepto-v8/equipos-empresariales/", "v87-page-equipos.png"],
    ["/concepto-v8/licenciamiento/", "v87-page-licencias.png"],
    ["/concepto-v8/soporte-tecnico-empresarial/", "v87-page-soporte.png"],
    ["/concepto-v8/contacto/", "v87-page-contacto.png"],
    ["/concepto-v8/recursos/cableado/", "v87-page-recurso-cableado.png"],
  ]) {
    await page.goto(origin + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await shot(page, name);
  }

  const tablet = await browser.newContext({ viewport: { width: 768, height: 1024 }, locale: "es-DO" });
  const t = await tablet.newPage();
  await t.goto(base, { waitUntil: "networkidle" });
  await t.waitForTimeout(800);
  await shot(t, "v87-hero-tablet.png");
  await t.locator("#operacion").scrollIntoViewIfNeeded();
  await t.waitForTimeout(400);
  await shot(t, "v87-ops-tablet.png");

  const mob = await browser.newContext({ ...devices["Pixel 7"], locale: "es-DO" });
  const m = await mob.newPage();
  await m.goto(base, { waitUntil: "networkidle" });
  await m.waitForTimeout(1000);
  await shot(m, "v87-hero-mobile.png");
  await m.getByRole("link", { name: "Explorar capacidades" }).click();
  await m.waitForTimeout(800);
  await shot(m, "v87-experiencias-mobile.png");
  await m.locator("#operacion").scrollIntoViewIfNeeded();
  await m.waitForTimeout(800);
  await shot(m, "v87-ops-mobile.png");
  await m.locator("#conversar").scrollIntoViewIfNeeded();
  await m.waitForTimeout(300);
  await shot(m, "v87-form-mobile.png");
  await browser.close();
}

async function demo(name, run) {
  const videoDir = join(artVids, `v87-${name}-raw`);
  mkdirSync(videoDir, { recursive: true });
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "es-DO",
    recordVideo: { dir: videoDir, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();
  await run(page);
  await context.close();
  await browser.close();
  await convert(videoDir, `v87-${name}.mp4`);
}

async function video(kind) {
  const isMobile = kind === "mobile";
  const viewport = isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const videoDir = join(artVids, `v87-${kind}-raw`);
  mkdirSync(videoDir, { recursive: true });
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: isMobile ? 2 : 1,
    locale: "es-DO",
    recordVideo: { dir: videoDir, size: viewport },
    ...(isMobile ? devices["Pixel 7"] : {}),
    viewport,
  });
  const page = await context.newPage();
  await interact(page, isMobile);
  await context.close();
  await browser.close();
  await convert(videoDir, `v87-experience-${kind}.mp4`);
}

await stills();
await video("desktop");
await video("mobile");
await demo("ops", async (page) => {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#operacion").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Reproducir" }).click().catch(() => {});
  await page.waitForTimeout(6000);
  await page.getByRole("tab", { name: "Soporte", exact: true }).click();
  await page.waitForTimeout(1600);
});
await demo("pages", async (page) => {
  for (const path of [
    "/concepto-v8/cableado-estructurado/",
    "/concepto-v8/redes-empresariales/",
    "/concepto-v8/equipos-empresariales/",
    "/concepto-v8/licenciamiento/",
    "/concepto-v8/soporte-tecnico-empresarial/",
  ]) {
    await page.goto(origin + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1400);
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(700);
  }
});
writeFileSync(join(artShots, "v87-gate.txt"), "V8.7 captures listos\n");
console.log("V8.7 gate capture listo.");
