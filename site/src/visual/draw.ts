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
  ctx.font = "500 13px IBM Plex Sans, system-ui, sans-serif";
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
    { x: 0.52, y: 0.78, w: 0.1, h: 0.14, name: "Sede" },
    { x: 0.66, y: 0.82, w: 0.07, h: 0.1, name: "Sucursal" },
    { x: 0.76, y: 0.84, w: 0.06, h: 0.08, name: "Sucursal" },
    { x: 0.86, y: 0.8, w: 0.08, h: 0.12, name: "Campus" },
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
    { id: "infra", x: 0.56, y: 0.58, l: "Infraestructura", at: 0.05 },
    { id: "net", x: 0.68, y: 0.34, l: "Redes", at: 0.18 },
    { id: "cloud", x: 0.82, y: 0.2, l: "Nube", at: 0.32 },
    { id: "app", x: 0.9, y: 0.4, l: "Software", at: 0.42 },
    { id: "sec", x: 0.74, y: 0.5, l: "Seguridad", at: 0.55 },
    { id: "ops", x: 0.6, y: 0.7, l: "Operación", at: 0.68 },
    { id: "sup", x: 0.84, y: 0.68, l: "Soporte", at: 0.78 },
    { id: "data", x: 0.93, y: 0.56, l: "Datos", at: 0.48 },
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
    ctx.fillText("JUSTECH · hilo de operación", Math.max(24, s.w * 0.52), 28);
  }
  ctx.globalAlpha = 1;
}

export function drawNetwork(ctx: CanvasRenderingContext2D, s: DrawState) {
  const failed = s.story < 0.4;
  const lanOnly = s.story >= 0.4 && s.story < 0.75;
  const hq = px(s, 0.18, 0.58);
  const sw = px(s, 0.18, 0.34);
  const rt = px(s, 0.34, 0.28);
  const fw = px(s, 0.5, 0.28);
  const cloud = px(s, 0.78, 0.16);
  const s1 = px(s, 0.58, 0.58);
  const s2 = px(s, 0.82, 0.5);
  const remote = px(s, 0.86, 0.76);
  const ap = px(s, 0.12, 0.78);
  const srv = px(s, 0.34, 0.62);

  function box(p: readonly [number, number], w: number, h: number, name: string, on = true) {
    ctx.strokeStyle = on ? pal.signal : pal.metal;
    ctx.fillStyle = "rgba(12, 35, 64, 0.72)";
    ctx.fillRect(p[0] - w / 2, p[1] - h / 2, w, h);
    ctx.strokeRect(p[0] - w / 2, p[1] - h / 2, w, h);
    ctx.fillStyle = pal.paper;
    ctx.font = "500 12px IBM Plex Sans, sans-serif";
    ctx.fillText(name, p[0] - w / 2 + 8, p[1] + 4);
  }

  function link(a: readonly [number, number], b: readonly [number, number], primary: boolean, live: boolean) {
    ctx.setLineDash(primary && failed ? [6, 6] : []);
    line(ctx, a, b, primary && failed ? pal.alert : live ? pal.signal : pal.metal, primary ? 1.8 : 1.1);
    ctx.setLineDash([]);
    if (live && !s.reduce && !(primary && failed)) packet(ctx, a, b, (s.t * 0.1) % 1);
  }

  box(hq, 88, 36, "Sede");
  box(sw, 72, 28, "Switch");
  box(rt, 72, 28, "Router");
  box(fw, 78, 28, "Firewall");
  box(s1, 92, 32, "Sucursal 1");
  box(s2, 92, 32, "Sucursal 2");
  box(srv, 88, 32, "Servidores");
  box(ap, 70, 28, "APs");
  box(remote, 96, 32, "Remotos");
  if (!lanOnly) box(cloud, 70, 32, "Nube");

  link(hq, sw, false, true);
  link(sw, rt, false, true);
  link(rt, fw, false, true);
  link(hq, srv, false, true);
  link(hq, ap, false, true);
  link(fw, s1, true, !failed);
  link(fw, s2, false, true);
  if (failed) link(hq, s1, false, true);
  if (!lanOnly) {
    link(fw, cloud, true, !failed);
    link(cloud, remote, false, true);
  }

  const focus = [hq, s1, s2, remote, cloud][s.layer % 5];
  ctx.strokeStyle = pal.signal;
  ctx.beginPath();
  ctx.arc(focus[0], focus[1], 28, 0, Math.PI * 2);
  ctx.stroke();
}

export function drawSecurity(ctx: CanvasRenderingContext2D, s: DrawState) {
  const c = px(s, 0.42, 0.52);
  const layers = [
    "Personas",
    "Identidad",
    "Dispositivos",
    "Correo",
    "Red",
    "Perímetro",
    "Aplicaciones",
    "Nube",
    "Datos",
    "Respaldo",
  ];
  layers.forEach((name, i) => {
    const r = 22 + i * 14;
    const on = s.layer === i || s.story > (i + 1) / 12;
    ctx.strokeStyle = on ? `rgba(94,234,212,${0.22 + (on ? 0.35 : 0)})` : pal.metal;
    ctx.lineWidth = s.layer === i ? 2.4 : 1;
    ctx.beginPath();
    ctx.arc(c[0], c[1], r, 0, Math.PI * 2);
    ctx.stroke();
  });
  const focus = layers[s.layer % layers.length];
  ctx.fillStyle = pal.paper;
  ctx.font = "600 14px IBM Plex Sans, sans-serif";
  ctx.fillText("Empresa", c[0] - 32, c[1] + 4);
  ctx.fillStyle = pal.signal;
  ctx.font = "500 13px IBM Plex Sans, sans-serif";
  ctx.fillText(focus, c[0] + 148, c[1] - 8);
  const phase = ["Normal", "Señal", "Detección", "Aislamiento", "Continuidad", "Revisión"][
    Math.min(5, Math.floor(s.story * 6))
  ];
  ctx.fillStyle = pal.dim;
  ctx.fillText(phase, c[0] + 148, c[1] + 16);
}

export function drawLicense(ctx: CanvasRenderingContext2D, s: DrawState) {
  const depts = ["Dirección", "Finanzas", "Ventas", "Operaciones", "Tecnología", "Móviles", "Externos"];
  depts.forEach((d, i) => {
    const p = px(s, 0.08, 0.12 + i * 0.11);
    ctx.fillStyle = "rgba(12, 35, 64, 0.8)";
    ctx.fillRect(p[0], p[1], 124, 30);
    ctx.strokeStyle = i === s.layer % depts.length ? pal.signal : pal.metal;
    ctx.strokeRect(p[0], p[1], 124, 30);
    ctx.fillStyle = pal.paper;
    ctx.font = "500 12px IBM Plex Sans, sans-serif";
    ctx.fillText(d, p[0] + 10, p[1] + 20);
    const hub = px(s, 0.62, 0.48);
    line(ctx, [p[0] + 124, p[1] + 15], hub, "rgba(94,234,212,0.32)");
    if (!s.reduce) packet(ctx, [p[0] + 124, p[1] + 15], hub, (s.t * 0.09 + i * 0.12) % 1);
  });
  const hub = px(s, 0.62, 0.48);
  ctx.fillStyle = "rgba(8, 24, 40, 0.9)";
  ctx.fillRect(hub[0] - 70, hub[1] - 54, 180, 108);
  ctx.strokeStyle = pal.signal;
  ctx.strokeRect(hub[0] - 70, hub[1] - 54, 180, 108);
  ctx.fillStyle = pal.signal;
  ctx.font = "500 13px IBM Plex Mono, monospace";
  ctx.fillText("TENANT", hub[0] - 54, hub[1] - 28);
  ctx.fillStyle = pal.paper;
  ctx.font = "400 13px IBM Plex Sans, sans-serif";
  ctx.fillText("Identidad · Correo · Archivos", hub[0] - 54, hub[1]);
  ctx.fillText("Colaboración · Admin", hub[0] - 54, hub[1] + 20);
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
  const local = px(s, 0.2, 0.58);
  const id = px(s, 0.48, 0.32);
  const cloud = px(s, 0.78, 0.42);
  const items = [
    { p: px(s, 0.18, 0.28), l: "Usuarios" },
    { p: px(s, 0.18, 0.42), l: "Correo" },
    { p: px(s, 0.34, 0.72), l: "Archivos" },
    { p: px(s, 0.5, 0.72), l: "Apps" },
    { p: px(s, 0.66, 0.72), l: "Servidores" },
  ];
  ctx.strokeStyle = pal.metal;
  ctx.strokeRect(local[0] - 54, local[1] - 36, 108, 72);
  ctx.fillStyle = pal.paper;
  ctx.font = "500 13px IBM Plex Sans, sans-serif";
  ctx.fillText("Sitio", local[0] - 18, local[1] + 4);
  ctx.beginPath();
  ctx.ellipse(cloud[0], cloud[1], 78, 40, 0, 0, Math.PI * 2);
  ctx.strokeStyle = pal.teal;
  ctx.stroke();
  ctx.fillStyle = pal.signal;
  ctx.fillText("Nube", cloud[0] - 18, cloud[1] + 4);
  ctx.strokeRect(id[0] - 48, id[1] - 20, 96, 40);
  ctx.fillStyle = pal.paper;
  ctx.fillText("Identidad", id[0] - 32, id[1] + 4);
  items.forEach((it, i) => {
    dot(ctx, it.p, 4, i === s.layer ? pal.signal : pal.teal);
    label(ctx, it.p, it.l);
    line(ctx, it.p, id, "rgba(94,234,212,0.28)");
    if (!s.reduce) packet(ctx, it.p, id, (s.t * 0.08 + i * 0.12) % 1);
  });
  line(ctx, id, cloud, pal.signal, 1.6);
  if (!s.reduce) packet(ctx, id, cloud, (s.t * 0.07) % 1);
  ctx.fillStyle = pal.dim;
  ctx.font = "500 13px IBM Plex Sans, sans-serif";
  ctx.fillText("Evaluación → sincronización → validación → operación", 20, s.h - 20);
}

export function drawRack(ctx: CanvasRenderingContext2D, s: DrawState) {
  const x = s.w * 0.28;
  ctx.strokeStyle = pal.teal;
  ctx.strokeRect(x, 24, 150, s.h - 48);
  const n = 10;
  const focus = s.layer % 6;
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = i === focus + 2 ? "rgba(94,234,212,0.45)" : "rgba(94,234,212,0.16)";
    ctx.fillRect(x + 10, 36 + i * ((s.h - 80) / n), 130, Math.max(10, (s.h - 90) / n - 4));
  }
  const tags = ["Cómputo", "Memoria", "Almacenamiento", "Red", "Energía", "Respaldo"];
  tags.forEach((t, i) => {
    ctx.fillStyle = i === focus ? pal.signal : pal.dim;
    ctx.font = "500 12px IBM Plex Sans, sans-serif";
    ctx.fillText(t, x + 168, 56 + i * 28);
  });
}

export function drawLaptop(ctx: CanvasRenderingContext2D, s: DrawState) {
  const cx = s.w * 0.58;
  const cy = s.h * 0.48;
  const w = Math.min(s.w * 0.62, 380);
  const h = w * 0.64;
  ctx.fillStyle = "#101820";
  ctx.strokeStyle = "#8ea0ae";
  ctx.lineWidth = 2;
  roundRect(ctx, cx - w / 2, cy - h / 2, w, h * 0.7, 12);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#071018";
  roundRect(ctx, cx - w / 2 + 12, cy - h / 2 + 14, w - 24, h * 0.56, 4);
  ctx.fill();
  ctx.fillStyle = "#0e2436";
  ctx.fillRect(cx - w / 2 + 22, cy - h / 2 + 24, w - 44, h * 0.44);
  ctx.fillStyle = pal.signal;
  ctx.globalAlpha = 0.85;
  ctx.font = "600 13px IBM Plex Sans, sans-serif";
  ctx.fillText("Puesto empresarial", cx - w / 2 + 32, cy - h / 2 + 48);
  ctx.globalAlpha = 1;
  ctx.fillStyle = pal.paper;
  ctx.font = "400 12px IBM Plex Sans, sans-serif";
  ctx.fillText("Imagen · cifrado · inventario", cx - w / 2 + 32, cy - h / 2 + 70);
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = i === s.layer % 4 ? "rgba(94,234,212,0.55)" : "rgba(94,234,212,0.16)";
    ctx.fillRect(cx - w / 2 + 32, cy - h / 2 + 88 + i * 14, 90 + i * 18, 8);
  }
  ctx.fillStyle = "#1a2836";
  ctx.beginPath();
  ctx.moveTo(cx - w / 2 - 22, cy + h * 0.2);
  ctx.lineTo(cx + w / 2 + 22, cy + h * 0.2);
  ctx.lineTo(cx + w / 2 + 10, cy + h * 0.4);
  ctx.lineTo(cx - w / 2 - 10, cy + h * 0.4);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#8ea0ae";
  ctx.stroke();
  ctx.fillStyle = "rgba(186,198,208,0.35)";
  ctx.fillRect(cx - 34, cy + h * 0.25, 68, 8);
  const specs = ["Rendimiento", "Movilidad", "Pantalla", "Autonomía", "Seguridad"];
  specs.forEach((t, i) => {
    ctx.fillStyle = i === s.layer % specs.length ? pal.signal : pal.dim;
    ctx.font = "500 13px IBM Plex Sans, sans-serif";
    ctx.fillText(t, 16, 32 + i * 24);
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
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
    case "laptop":
      return drawLaptop(ctx, s);
    default:
      return drawHero(ctx, s);
  }
}
