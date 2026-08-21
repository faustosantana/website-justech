#!/usr/bin/env node
/**
 * Capturas y recorridos de las seis páginas insignia.
 * Requiere site/out servido en 127.0.0.1:4173.
 */
import { mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "@playwright/test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const shots = join(root, "docs/fase-c/captures");
const artShots = "/opt/cursor/artifacts/screenshots";
const artVids = "/opt/cursor/artifacts/videos";
const base = process.env.QA_BASE || "http://127.0.0.1:4173";

const pages = [
  { path: "/", name: "home" },
  { path: "/redes/", name: "redes" },
  { path: "/seguridad/", name: "seguridad" },
  { path: "/licenciamiento/", name: "licenciamiento" },
  { path: "/soporte/", name: "soporte" },
  { path: "/servicios/servicios-administrados/", name: "msp" },
  { path: "/infraestructura-fisica/", name: "cableado" },
  { path: "/productos/laptops/", name: "laptops" },
  { path: "/productos/servidores/", name: "servidores" },
  { path: "/nube/", name: "nube" },
  { path: "/resolver/", name: "resolver" },
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

function ensure(dir) {
  mkdirSync(dir, { recursive: true });
}

function saveBoth(src, filename) {
  const dest = join(shots, filename);
  copyFileSync(src, dest);
  copyFileSync(src, join(artShots, filename));
}

async function paintPage(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(2200);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 520) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(280);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

async function shoot() {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.name === "mobile" ? 2 : 1,
      locale: "es-DO",
    });
    const page = await context.newPage();
    for (const route of pages) {
      if (vp.name === "mobile" && !["home", "laptops", "redes", "seguridad"].includes(route.name)) continue;
      if (vp.name === "tablet" && route.name !== "home") continue;
      await page.goto(base + route.path, { waitUntil: "networkidle" });
      await paintPage(page);
      const tmp = join(artShots, `tmp-${route.name}-${vp.name}.png`);
      await page.screenshot({ path: tmp, fullPage: false });
      saveBoth(tmp, `justech-${route.name}-${vp.name}.png`);
      if (route.name === "home") {
        const full = join(artShots, `tmp-${route.name}-${vp.name}-full.png`);
        await page.screenshot({ path: full, fullPage: true });
        saveBoth(full, `justech-${route.name}-${vp.name}-full.png`);
      }
    }
    await context.close();
  }
  await browser.close();
}

async function tour(kind) {
  const isMobile = kind === "mobile";
  const viewport = isMobile
    ? { width: 390, height: 844 }
    : { width: 1440, height: 900 };
  const videoDir = join(artVids, `${kind}-raw`);
  ensure(videoDir);
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
  const tourRoutes = pages.map((p) => p.path);
  for (const path of tourRoutes) {
    await page.goto(base + path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(isMobile ? 1400 : 2400);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = isMobile ? 380 : 480;
    for (let y = 0; y < Math.min(height, 4200); y += step) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(isMobile ? 220 : 320);
    }
    if (path === "/") {
      const tabs = page.getByRole("tab");
      const n = await tabs.count();
      for (let i = 0; i < Math.min(n, 6); i++) {
        await tabs.nth(i).click();
        await page.waitForTimeout(500);
      }
    }
  }
  await context.close();
  await browser.close();
  return videoDir;
}

async function convert(videoDir, outName) {
  const { readdirSync, statSync } = await import("node:fs");
  const { spawnSync } = await import("node:child_process");
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
  const ffmpeg =
    [
      "/usr/bin/ffmpeg",
      "/usr/local/bin/ffmpeg",
      join(process.env.HOME || "", ".cache/ms-playwright/ffmpeg-1011/ffmpeg-linux"),
    ].find((p) => existsSync(p)) || "ffmpeg";
  const r = spawnSync(
    ffmpeg,
    ["-y", "-i", src, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", mp4],
    { stdio: "inherit" },
  );
  if (r.status !== 0) {
    copyFileSync(src, join(artVids, outName.replace(".mp4", ".webm")));
    copyFileSync(src, join(shots, outName.replace(".mp4", ".webm")));
    console.warn("ffmpeg falló; se conserva webm");
    return;
  }
  copyFileSync(mp4, join(shots, outName));
}

async function productionBefore() {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  try {
    await page.goto("https://www.justech.do/", { waitUntil: "domcontentloaded", timeout: 20000 });
    await page.waitForTimeout(1500);
    const tmp = join(artShots, "tmp-prod-desktop.png");
    await page.screenshot({ path: tmp, fullPage: false });
    saveBoth(tmp, "justech-produccion-desktop.png");
  } catch (e) {
    console.warn("No se pudo capturar producción:", e.message);
  }
  await browser.close();
}

ensure(shots);
ensure(artShots);
ensure(artVids);

const mode = process.argv[2] || "all";
if (mode === "shots" || mode === "all") await shoot();
if (mode === "prod" || mode === "all") await productionBefore();
if (mode === "video" || mode === "all") {
  const desk = await tour("desktop");
  await convert(desk, "justech-recorrido-desktop.mp4");
  const mob = await tour("mobile");
  await convert(mob, "justech-recorrido-mobile.mp4");
}
console.log("QA capture listo.");
