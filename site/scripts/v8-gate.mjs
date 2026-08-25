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
  await page.waitForTimeout(2800);
  if (mobile) {
    await page.getByRole("button", { name: "Menú" }).click().catch(() => {});
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: "Cerrar" }).click().catch(() => {});
  }
  await page.getByRole("link", { name: "Explorar lo que hacemos" }).click();
  await page.waitForTimeout(900);
  for (const name of ["Construir", "Modernizar", "Operar"]) {
    await page.getByRole("tab", { name, exact: true }).click();
    await page.waitForTimeout(1600);
  }
  await page.getByRole("button", { name: "Ver falla y respaldo" }).click();
  await page.waitForTimeout(12000);
  await page.getByRole("button", { name: "Siguiente" }).click().catch(() => {});
  await page.waitForTimeout(600);
  await page.getByRole("button", { name: /Cerrar/ }).click();
  await page.waitForTimeout(400);
  await page.locator("#conversar").scrollIntoViewIfNeeded();
  await page.getByText("Construir una sede.").click();
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
  await shot(page, "v82-hero-desktop.png");
  await page.evaluate(() => document.getElementById("experiencias")?.scrollIntoView({ block: "start" }));
  await page.waitForTimeout(800);
  await page.getByRole("tab", { name: "Construir", exact: true }).click();
  await page.waitForTimeout(1400);
  await shot(page, "v82-construir-desktop.png");
  await page.getByRole("tab", { name: "Modernizar", exact: true }).click();
  await page.waitForTimeout(1400);
  await shot(page, "v82-modernizar-desktop.png");
  await page.getByRole("tab", { name: "Operar", exact: true }).click();
  await page.waitForTimeout(1400);
  await shot(page, "v82-operar-desktop.png");
  await page.getByRole("button", { name: "Ver falla y respaldo" }).click();
  await page.waitForTimeout(5500);
  await shot(page, "v82-falla-desktop.png");
  await page.getByRole("button", { name: /Cerrar/ }).click();
  await page.locator("#conversar").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, "v82-form-desktop.png");

  const mob = await browser.newContext({ ...devices["Pixel 7"], locale: "es-DO" });
  const m = await mob.newPage();
  await m.goto(base, { waitUntil: "networkidle" });
  await m.waitForTimeout(1000);
  await shot(m, "v82-hero-mobile.png");
  await m.getByRole("link", { name: "Explorar lo que hacemos" }).click();
  await m.waitForTimeout(800);
  await shot(m, "v82-experiencias-mobile.png");
  await m.getByRole("tab", { name: "Operar", exact: true }).click();
  await m.getByRole("button", { name: "Ver falla y respaldo" }).click();
  await m.waitForTimeout(2000);
  await shot(m, "v82-falla-mobile.png");
  await browser.close();
}

async function video(kind) {
  const isMobile = kind === "mobile";
  const viewport = isMobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };
  const videoDir = join(artVids, `v82-${kind}-raw`);
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
  await convert(videoDir, `v82-experience-${kind}.mp4`);
}

await stills();
await video("desktop");
await video("mobile");
writeFileSync(join(artShots, "v82-gate.txt"), "V8.2 captures listos\n");
console.log("V8.2 gate capture listo.");
