import { pal, type SceneName } from "./motion";

export type DrawState = {
  w: number;
  h: number;
  t: number;
  ptr: { x: number; y: number };
  story: number;
  layer: number;
  reduce: boolean;
  scene: SceneName;
};

function px(s: DrawState, x: number, y: number) {
  const p = s.reduce ? 0 : 10;
  return [x * s.w + (s.ptr.x - 0.5) * p, y * s.h + (s.ptr.y - 0.5) * p * 0.6] as const;
}

function line(ctx: CanvasRenderingContext2D, a: readonly [number, number], b: readonly [number, number], c: string, w = 1) {
  ctx.strokeStyle = c;
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.moveTo(a[0], a[1]);
  ctx.lineTo(b[0], b[1]);
  ctx.stroke();
}

function dot(ctx: CanvasRenderingContext2D, p: readonly [number, number], r: number, c: string) {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
  ctx.fill();
}

function label(ctx: CanvasRenderingContext2D, p: readonly [number, number], text: string, dim = false) {
  ctx.font = "500 11px IBM Plex Sans, system-ui, sans-serif";
  ctx.fillStyle = dim ? pal.dim : pal.paper;
  ctx.fillText(text, p[0] + 8, p[1] + 4);
}

function packet(ctx: CanvasRenderingContext2D, a: readonly [number, number], b: readonly [number, number], u: number) {
  const x = a[0] + (b[0] - a[0]) * u;
  const y = a[1] + (b[1] - a[1]) * u;
  dot(ctx, [x, y], 2.1, pal.signal);
}

/** Historia 0–1: infra → red → apps → seguridad → monitoreo. */
export function drawHero(ctx: CanvasRenderingContext2D, s: DrawState) {
  const st = s.reduce ? 1 : Math.min(1, s.story);
  const buildings = [
    { x: 0.18, y: 0.78, w: 0.1, h: 0.14, name: "Sede" },
    { x: 0.36, y: 0.82, w: 0.07, h: 0.1, name: "Sucursal" },
    { x: 0.5, y: 0.84, w: 0.06, h: 0.08, name: "Sucursal" },
    { x: 0.68, y: 0.8, w: 0.08, h: 0.12, name: "Campus" },
  ];
  ctx.globalAlpha = Math.min(1, st * 3);
  buildings.forEach((b) => {
    ctx.fillStyle = "rgba(12, 35, 64, 0.85)";
    ctx.strokeStyle = pal.metal;
    ctx.lineWidth = 1;
    ctx.fillRect(b.x * s.w, b.y * s.h, b.w * s.w, b.h * s.h);
    ctx.strokeRect(b.x * s.w, b.y * s.h, b.w * s.w, b.h * s.h);
  });

  const nodes = [
    { id: "infra", x: 0.22, y: 0.58, l: "Infraestructura", at: 0.05 },
    { id: "net", x: 0.42, y: 0.36, l: "Redes", at: 0.18 },
    { id: "cloud", x: 0.62, y: 0.2, l: "Nube", at: 0.32 },
    { id: "app", x: 0.78, y: 0.38, l: "Software", at: 0.42 },
    { id: "sec", x: 0.52, y: 0.5, l: "Seguridad", at: 0.55 },
    { id: "ops", x: 0.34, y: 0.68, l: "Operación", at: 0.68 },
    { id: "sup", x: 0.7, y: 0.68, l: "Soporte", at: 0.78 },
    { id: "data", x: 0.86, y: 0.58, l: "Datos", at: 0.48 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 4],
    [4, 3],
    [0, 5],
    [5, 6],
    [4, 6],
    [3, 7],
    [6, 7],
  ];
  const pos = nodes.map((n) => px(s, n.x, n.y));

  edges.forEach(([ia, ib], i) => {
    const appear = nodes[Math.max(ia, ib)].at;
    if (st < appear) return;
    line(ctx, pos[ia], pos[ib], "rgba(94,234,212,0.28)", 1.2);
    if (!s.reduce) packet(ctx, pos[ia], pos[ib], (s.t * 0.08 + i * 0.17) % 1);
  });

  nodes.forEach((n, i) => {
    if (st < n.at) return;
    const p = pos[i];
    const glow = 0.5 + Math.sin(s.t * 1.6 + i) * 0.2;
    ctx.fillStyle = `rgba(94,234,212,${0.08 + glow * 0.08})`;
    ctx.beginPath();
    ctx.arc(p[0], p[1], 16, 0, Math.PI * 2);
    ctx.fill();
    dot(ctx, p, 4.2, pal.signal);
    label(ctx, p, n.l);
  });

  if (st > 0.85) {
    ctx.globalAlpha = Math.min(1, (st - 0.85) * 8);
    ctx.font = "500 12px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillStyle = pal.signal;
    ctx.fillText("JUSTECH · hilo de operación", 24, 28);
  }
  ctx.globalAlpha = 1;
}

export function drawNetwork(ctx: CanvasRenderingContext2D, s: DrawState) {
  const sites = [
    { x: 0.2, y: 0.45, l: "Sede" },
    { x: 0.5, y: 0.28, l: "Sucursal A" },
    { x: 0.78, y: 0.4, l: "Sucursal B" },
    { x: 0.55, y: 0.7, l: "Almacén" },
  ];
  const core = px(s, 0.48, 0.48);
  sites.forEach((site, i) => {
    const p = px(s, site.x, site.y);
    line(ctx, core, p, i === s.layer ? pal.signal : "rgba(62,196,208,0.28)", i === s.layer ? 1.8 : 1);
    if (!s.reduce) packet(ctx, core, p, (s.t * 0.1 + i * 0.2) % 1);
    dot(ctx, p, 5, pal.teal);
    label(ctx, p, site.l);
    for (let u = 0; u < 4; u++) {
      const a = (u / 4) * Math.PI * 2 + s.t * 0.15;
      dot(ctx, [p[0] + Math.cos(a) * 22, p[1] + Math.sin(a) * 14], 2, pal.paper);
    }
  });
  ctx.strokeStyle = pal.metal;
  ctx.strokeRect(core[0] - 18, core[1] - 14, 36, 28);
  label(ctx, [core[0] - 6, core[1]], "Core");
}

export function drawSecurity(ctx: CanvasRenderingContext2D, s: DrawState) {
  const c = px(s, 0.5, 0.5);
  const layers = ["Perímetro", "Identidad", "Endpoints", "Datos", "Respaldo"];
  layers.forEach((name, i) => {
    const r = 38 + i * 28;
    const on = s.story > 0.15 * (i + 1) || s.layer === i;
    ctx.strokeStyle = on ? `rgba(94,234,212,${0.25 + i * 0.08})` : pal.metal;
    ctx.lineWidth = on ? 1.6 : 1;
    ctx.beginPath();
    ctx.arc(c[0], c[1], r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = "500 11px IBM Plex Sans, sans-serif";
    ctx.fillStyle = on ? pal.signal : pal.dim;
    ctx.fillText(name, c[0] + r * 0.72, c[1] - r * 0.2);
  });
  const threatU = s.reduce ? 0.35 : (s.t * 0.07) % 1;
  const threat: [number, number] = [c[0] + 210 - threatU * 260, c[1] - 40];
  if (s.story > 0.2) {
    dot(ctx, threat, 4, pal.alert);
    if (s.story > 0.55) {
      ctx.strokeStyle = pal.warn;
      ctx.beginPath();
      ctx.arc(threat[0], threat[1], 16, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  dot(ctx, c, 6, pal.signal);
  label(ctx, c, "Operación");
}

export function drawLicense(ctx: CanvasRenderingContext2D, s: DrawState) {
  const depts = ["Finanzas", "Operaciones", "Dirección", "Sucursales"];
  depts.forEach((d, i) => {
    const p = px(s, 0.18, 0.22 + i * 0.18);
    ctx.strokeStyle = pal.metal;
    ctx.strokeRect(p[0], p[1], 110, 36);
    ctx.fillStyle = pal.paper;
    ctx.font = "500 12px IBM Plex Sans, sans-serif";
    ctx.fillText(d, p[0] + 10, p[1] + 22);
    const hub = px(s, 0.62, 0.48);
    line(ctx, [p[0] + 110, p[1] + 18], hub, "rgba(94,234,212,0.3)");
    if (!s.reduce) packet(ctx, [p[0] + 110, p[1] + 18], hub, (s.t * 0.09 + i * 0.2) % 1);
  });
  const hub = px(s, 0.62, 0.48);
  ctx.strokeStyle = pal.signal;
  ctx.strokeRect(hub[0] - 70, hub[1] - 50, 168, 100);
  ctx.fillStyle = pal.signal;
  ctx.font = "500 12px IBM Plex Mono, monospace";
  ctx.fillText("TENANT", hub[0] - 54, hub[1] - 28);
  ctx.fillStyle = pal.dim;
  ctx.font = "400 11px IBM Plex Sans, sans-serif";
  ctx.fillText("Identidad · Correo · Archivos", hub[0] - 54, hub[1]);
  ctx.fillText("Colaboración · Admin", hub[0] - 54, hub[1] + 18);
}

export function drawSupport(ctx: CanvasRenderingContext2D, s: DrawState) {
  const steps = ["Usuario", "Portal", "N1", "N2/N3", "Cierre"];
  steps.forEach((name, i) => {
    const p = px(s, 0.1 + i * 0.18, 0.42);
    const on = s.story > i / 6 || s.layer === i;
    ctx.strokeStyle = on ? pal.signal : pal.metal;
    ctx.strokeRect(p[0], p[1], 88, 48);
    ctx.fillStyle = on ? pal.paper : pal.dim;
    ctx.font = "500 11px IBM Plex Mono, monospace";
    ctx.fillText(name, p[0] + 10, p[1] + 28);
    if (i < steps.length - 1) {
      const n = px(s, 0.1 + (i + 1) * 0.18, 0.42);
      line(ctx, [p[0] + 88, p[1] + 24], [n[0], n[1] + 24], pal.metal);
      if (!s.reduce && on) packet(ctx, [p[0] + 88, p[1] + 24], [n[0], n[1] + 24], (s.t * 0.12) % 1);
    }
  });
  ctx.font = "400 12px IBM Plex Sans, sans-serif";
  ctx.fillStyle = pal.dim;
  ctx.fillText("Simulación · sin datos de clientes · horario publicado", 28, s.h - 24);
}

export function drawCabling(ctx: CanvasRenderingContext2D, s: DrawState) {
  const step = Math.min(11, Math.floor(s.story * 12));
  ctx.strokeStyle = pal.metal;
  ctx.strokeRect(40, 40, s.w * 0.42, s.h * 0.7);
  ctx.font = "500 11px IBM Plex Mono, monospace";
  ctx.fillStyle = pal.dim;
  ctx.fillText("PLANO", 52, 58);
  const routes = 4 + Math.min(step, 6);
  for (let i = 0; i < routes; i++) {
    const y = 90 + i * 28;
    ctx.strokeStyle = step >= 4 ? pal.signal : pal.metal;
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(60 + s.w * 0.32, y + (i % 2) * 10);
    ctx.stroke();
    if (step >= 8) {
      ctx.fillStyle = pal.signal;
      ctx.fillText(`P${String(i + 1).padStart(2, "0")}`, 60 + s.w * 0.32 + 6, y + 4);
    }
  }
  const rackX = s.w * 0.62;
  ctx.strokeStyle = pal.teal;
  ctx.strokeRect(rackX, 50, 120, s.h * 0.72);
  const u = Math.min(12, 2 + step);
  for (let i = 0; i < u; i++) {
    ctx.fillStyle = i % 3 === 0 ? "rgba(62,196,208,0.35)" : "rgba(94,234,212,0.12)";
    ctx.fillRect(rackX + 8, 60 + i * 18, 104, 14);
  }
  if (step >= 9) {
    ctx.fillStyle = pal.signal;
    ctx.font = "500 12px IBM Plex Mono, monospace";
    ctx.fillText("CERT · PASS", rackX + 18, 60 + u * 18 + 20);
  }
}

export function drawMsp(ctx: CanvasRenderingContext2D, s: DrawState) {
  const cards = [
    ["Inventario", "activos"],
    ["Red", "enlaces"],
    ["Copias", "ciclo"],
    ["Casos", "cola"],
    ["Mantenimiento", "ronda"],
    ["Licencias", "puestos"],
  ];
  cards.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 36 + col * (s.w / 3.2);
    const y = 48 + row * (s.h / 2.4);
    ctx.strokeStyle = pal.metal;
    ctx.strokeRect(x, y, s.w / 3.6, s.h / 2.8);
    ctx.fillStyle = pal.signal;
    ctx.font = "500 12px IBM Plex Mono, monospace";
    ctx.fillText(c[0].toUpperCase(), x + 14, y + 28);
    ctx.fillStyle = pal.dim;
    ctx.font = "400 12px IBM Plex Sans, sans-serif";
    ctx.fillText(c[1], x + 14, y + 50);
    if (!s.reduce) {
      const hgt = 20 + ((Math.sin(s.t * 0.9 + i) + 1) * 18);
      ctx.fillStyle = "rgba(94,234,212,0.25)";
      ctx.fillRect(x + 14, y + s.h / 3.6, hgt, 6);
    }
  });
}

export function drawCloud(ctx: CanvasRenderingContext2D, s: DrawState) {
  const local = px(s, 0.22, 0.55);
  const cloud = px(s, 0.78, 0.38);
  ctx.strokeRect(local[0] - 50, local[1] - 40, 100, 80);
  ctx.beginPath();
  ctx.ellipse(cloud[0], cloud[1], 70, 36, 0, 0, Math.PI * 2);
  ctx.strokeStyle = pal.teal;
  ctx.stroke();
  label(ctx, [local[0] - 48, local[1] - 48], "On-prem");
  label(ctx, [cloud[0] - 20, cloud[1] - 48], "Nube");
  line(ctx, [local[0] + 50, local[1]], [cloud[0] - 70, cloud[1]], pal.signal, 1.4);
  if (!s.reduce) packet(ctx, [local[0] + 50, local[1]], [cloud[0] - 70, cloud[1]], (s.t * 0.08) % 1);
  ctx.fillStyle = pal.dim;
  ctx.font = "400 12px IBM Plex Sans, sans-serif";
  ctx.fillText("Evaluación → oleadas → validación → operación", 28, s.h - 28);
}

export function drawRack(ctx: CanvasRenderingContext2D, s: DrawState) {
  const x = s.w * 0.38;
  ctx.strokeStyle = pal.teal;
  ctx.strokeRect(x, 30, 160, s.h - 60);
  const n = 8 + Math.floor((s.reduce ? 1 : (Math.sin(s.t * 0.4) + 1) * 2));
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = i === 3 ? "rgba(212,163,115,0.35)" : "rgba(94,234,212,0.2)";
    ctx.fillRect(x + 10, 42 + i * 22, 140, 16);
  }
  label(ctx, [x + 170, 80], "Cómputo");
  label(ctx, [x + 170, 140], "Almacenamiento");
  label(ctx, [x + 170, 200], "Red / UPS");
}

export function drawScene(ctx: CanvasRenderingContext2D, s: DrawState) {
  ctx.clearRect(0, 0, s.w, s.h);
  switch (s.scene) {
    case "network":
      return drawNetwork(ctx, s);
    case "security":
      return drawSecurity(ctx, s);
    case "license":
      return drawLicense(ctx, s);
    case "support":
      return drawSupport(ctx, s);
    case "cabling":
      return drawCabling(ctx, s);
    case "msp":
      return drawMsp(ctx, s);
    case "cloud":
      return drawCloud(ctx, s);
    case "rack":
      return drawRack(ctx, s);
    default:
      return drawHero(ctx, s);
  }
}
