import { mkdirSync, copyFileSync, existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { chromium, devices } from "@playwright/test";

const base = "http://127.0.0.1:4173/concepto-v8/";
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
  await page.waitForTimeout(3500);
  if (mobile) {
    await page.getByRole("button", { name: "Menú" }).click().catch(() => {});
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Cerrar" }).click().catch(() => {});
  }
  await page.getByRole("link", { name: "Explorar capacidades" }).click();
  await page.waitForTimeout(900);
  for (const name of ["Construir", "Modernizar", "Operar"]) {
    await page.getByRole("tab", { name, exact: true }).click();
    await page.waitForTimeout(1600);
  }
  await page.getByRole("button", { name: "Ver la red" }).click();
  await page.waitForTimeout(2500);
  await page.getByRole("button", { name: "Fallar enlace" }).click().catch(() => {});
  await page.waitForTimeout(900);
  await page.getByRole("button", { name: "Activar respaldo" }).click().catch(() => {});
  await page.waitForTimeout(900);
  await page.getByRole("button", { name: "Abrir caso" }).click().catch(() => {});
  await page.waitForTimeout(1200);
  await page.locator("#equipos").scrollIntoViewIfNeeded();
  await page.getByRole("tab", { name: "Ejecutivo" }).click().catch(() => {});
  await page.waitForTimeout(600);
  await page.getByRole("tab", { name: "Ingeniería" }).click().catch(() => {});
  await page.waitForTimeout(600);
  await page.locator("#licencias").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Finanzas" }).click().catch(() => {});
  await page.getByLabel("Añadir usuario").click().catch(() => {});
  await page.getByRole("button", { name: "Archivos" }).click().catch(() => {});
  await page.waitForTimeout(500);
  await page.locator("#soporte-demo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.locator("#cableado").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Rutas" }).click().catch(() => {});
  await page.getByRole("button", { name: "Rack" }).click().catch(() => {});
  await page.waitForTimeout(500);
  await page.locator("#conversar").scrollIntoViewIfNeeded();
  await page.getByText("Redes", { exact: true }).click().catch(() => {});
  await page.waitForTimeout(400);
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
  await shot(page, "v84-hero-desktop.png");
  await page.evaluate(() => document.getElementById("capacidades")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(800);
  await page.getByRole("tab", { name: "Construir", exact: true }).click();
  await page.waitForTimeout(1000);
  await shot(page, "v84-construir-desktop.png");
  await page.getByRole("tab", { name: "Modernizar", exact: true }).click();
  await page.waitForTimeout(1000);
  await shot(page, "v84-modernizar-desktop.png");
  await page.getByRole("tab", { name: "Operar", exact: true }).click();
  await page.waitForTimeout(1000);
  await shot(page, "v84-operar-desktop.png");
  await page.getByRole("button", { name: "Ver la red" }).click();
  await page.waitForTimeout(1800);
  await shot(page, "v84-red-desktop.png");
  await page.getByRole("button", { name: "Fallar enlace" }).click();
  await page.waitForTimeout(600);
  await shot(page, "v84-red-falla-desktop.png");
  await page.locator("#equipos").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(page, "v84-equipos-desktop.png");
  await page.locator("#licencias").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(page, "v84-licencias-desktop.png");
  await page.locator("#soporte-demo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(page, "v84-soporte-desktop.png");
  await page.locator("#cableado").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await shot(page, "v84-cableado-desktop.png");
  await page.locator("#conversar").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, "v84-form-desktop.png");

  const tablet = await browser.newContext({ viewport: { width: 768, height: 1024 }, locale: "es-DO" });
  const t = await tablet.newPage();
  await t.goto(base, { waitUntil: "networkidle" });
  await t.waitForTimeout(800);
  await shot(t, "v84-hero-tablet.png");
  await t.locator("#red").scrollIntoViewIfNeeded();
  await t.waitForTimeout(400);
  await shot(t, "v84-red-tablet.png");

  const mob = await browser.newContext({ ...devices["Pixel 7"], locale: "es-DO" });
  const m = await mob.newPage();
  await m.goto(base, { waitUntil: "networkidle" });
  await m.waitForTimeout(1000);
  await shot(m, "v84-hero-mobile.png");
  await m.getByRole("link", { name: "Explorar capacidades" }).click();
  await m.waitForTimeout(800);
  await shot(m, "v84-experiencias-mobile.png");
  await m.getByRole("tab", { name: "Operar", exact: true }).click();
  await m.getByRole("button", { name: "Ver la red" }).click();
  await m.waitForTimeout(1500);
  await shot(m, "v84-red-mobile.png");
  await m.locator("#equipos").scrollIntoViewIfNeeded();
  await m.waitForTimeout(400);
  await shot(m, "v84-equipos-mobile.png");
  await m.locator("#conversar").scrollIntoViewIfNeeded();
  await m.waitForTimeout(300);
  await shot(m, "v84-form-mobile.png");
  await browser.close();
}

async function demo(name, run) {
  const videoDir = join(artVids, `v84-${name}-raw`);
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
  await convert(videoDir, `v84-${name}.mp4`);
}

async function video(kind) {
  const isMobile = kind === "mobile";
  const viewport = isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const videoDir = join(artVids, `v84-${kind}-raw`);
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
  await convert(videoDir, `v84-experience-${kind}.mp4`);
}

await stills();
await video("desktop");
await video("mobile");
await demo("red", async (page) => {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#red").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Reproducir", exact: true }).click();
  await page.waitForTimeout(8000);
  await page.getByRole("button", { name: "Fallar enlace" }).click();
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: "Activar respaldo" }).click();
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: "Abrir caso" }).click();
  await page.waitForTimeout(1200);
});
await demo("equipos", async (page) => {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#equipos").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  for (const name of ["Ejecutivo", "Ingeniería", "Administrativo"]) {
    await page.getByRole("tab", { name }).click();
    await page.waitForTimeout(900);
  }
  await page.getByRole("button", { name: "Configuración" }).click();
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: "Garantía" }).click();
  await page.waitForTimeout(800);
});
await demo("licencias", async (page) => {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#licencias").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Finanzas" }).click();
  await page.getByLabel("Añadir usuario").click();
  await page.getByLabel("Añadir usuario").click();
  await page.getByRole("button", { name: "Identidad" }).click();
  await page.getByRole("button", { name: "Archivos" }).click();
  await page.getByRole("button", { name: "Reuniones" }).click();
  await page.getByRole("button", { name: /Política de acceso/ }).click();
  await page.waitForTimeout(1200);
});
await demo("soporte", async (page) => {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator("#red").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Fallar enlace" }).click();
  await page.waitForTimeout(800);
  await page.getByRole("button", { name: "Activar respaldo" }).click();
  await page.waitForTimeout(800);
  await page.getByRole("button", { name: "Abrir caso" }).click();
  await page.waitForTimeout(2000);
});
writeFileSync(join(artShots, "v84-gate.txt"), "V8.4 captures listos\n");
console.log("V8.4 gate capture listo.");
