import type { SceneName } from "./motion";

export type V6State = {
  w: number;
  h: number;
  t: number;
  chapter: number;
  view: string;
  reduce: boolean;
  scene: SceneName | "operation" | "campus" | "assign";
};

const TEAL = "#0d7377";
const CYAN = "#3ecfcf";
const WARM = "#c9784a";
const METAL = "#8b97a3";
const PAPER = "#f4f1ea";
const GRAPHITE = "#1c2430";
const DEEP = "#101826";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function iso(s: V6State, x: number, y: number, z = 0) {
  const ox = s.w * 0.52;
  const oy = s.h * 0.72;
  const sc = Math.min(s.w, s.h) * 0.046;
  return {
    x: ox + (x - y) * 0.9 * sc,
    y: oy + (x + y) * 0.42 * sc - z * sc * 0.7,
  };
}

function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r = 3,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function packet(
  ctx: CanvasRenderingContext2D,
  a: { x: number; y: number },
  b: { x: number; y: number },
  u: number,
  color = CYAN,
) {
  const t = ((u % 1) + 1) % 1;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, 2.4, 0, Math.PI * 2);
  ctx.fill();
}

function link(
  ctx: CanvasRenderingContext2D,
  a: { x: number; y: number },
  b: { x: number; y: number },
  on: boolean,
  fail = false,
  dash = false,
) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.strokeStyle = fail ? WARM : on ? CYAN : "rgba(139,151,163,0.35)";
  ctx.lineWidth = on ? 1.8 : 1.1;
  ctx.setLineDash(dash || fail ? [5, 5] : []);
  ctx.stroke();
  ctx.setLineDash([]);
}

function switchFace(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  ports: number,
  lit: number,
  t: number,
) {
  ctx.fillStyle = "#141a22";
  ctx.strokeStyle = "#2a3340";
  rr(ctx, x, y, w, h, 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = TEAL;
  ctx.fillRect(x + 4, y + 4, 6, 6);
  const pw = (w - 18) / ports;
  for (let i = 0; i < ports; i++) {
    const px = x + 12 + i * pw;
    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(px, y + h * 0.42, Math.max(3, pw - 1.5), h * 0.38);
    if (i < lit) {
      ctx.fillStyle = (Math.sin(t * 4 + i) > 0.15 ? "#3ecf6a" : "#1f6b38");
      ctx.fillRect(px + 0.5, y + h * 0.42, 2, 2);
    }
  }
}

function rack(ctx: CanvasRenderingContext2D, s: V6State, ch: number) {
  const p = iso(s, 9.2, 1.2, 0);
  const w = 54;
  const h = 168;
  const x = p.x - w / 2;
  const y = p.y - h;
  ctx.fillStyle = "#0a0d12";
  ctx.fillRect(x - 6, y - 8, w + 12, h + 16);
  ctx.strokeStyle = "#3a4450";
  ctx.strokeRect(x - 6, y - 8, w + 12, h + 16);
  if (ch >= 1) {
    ctx.fillStyle = "#6b1c1c";
    ctx.fillRect(x - 14, y + 20, 8, h - 36);
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 ? "#c9784a" : "#3d2a22";
      ctx.fillRect(x - 12, y + 28 + i * 14, 4, 6);
    }
  }
  const units = [
    { y: 8, h: 12, kind: "patch", at: 1 },
    { y: 22, h: 10, kind: "patch", at: 1 },
    { y: 36, h: 16, kind: "sw", at: 2 },
    { y: 54, h: 16, kind: "fw", at: 2 },
    { y: 74, h: 22, kind: "srv", at: 1 },
    { y: 98, h: 22, kind: "srv", at: 1 },
    { y: 122, h: 18, kind: "sto", at: 1 },
    { y: 144, h: 14, kind: "ups", at: 1 },
  ];
  units.forEach((u) => {
    if (ch < u.at) return;
    const uy = y + u.y;
    if (u.kind === "sw" || u.kind === "fw") {
      switchFace(ctx, x, uy, w, u.h, u.kind === "fw" ? 8 : 16, ch >= 2 ? 10 : 0, s.t);
      if (u.kind === "fw") {
        ctx.fillStyle = WARM;
        ctx.fillRect(x + w - 10, uy + 4, 6, 6);
      }
    } else {
      ctx.fillStyle = u.kind === "ups" ? "#15202c" : "#1a222c";
      ctx.fillRect(x, uy, w, u.h - 2);
      ctx.strokeStyle = "#2c3642";
      ctx.strokeRect(x, uy, w, u.h - 2);
      if (u.kind === "patch" && ch >= 2) {
        for (let i = 0; i < 10; i++) {
          ctx.fillStyle = i % 3 ? "#1d6b8a" : "#c45a1a";
          ctx.fillRect(x + 6 + i * 4.4, uy + 3, 3, u.h - 8);
        }
      }
      if ((u.kind === "srv" || u.kind === "sto") && ch >= 1) {
        ctx.fillStyle = ch >= 9 ? CYAN : "#3ecf6a";
        ctx.beginPath();
        ctx.arc(x + 10, uy + u.h / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
}

function desks(ctx: CanvasRenderingContext2D, s: V6State, ch: number) {
  const spots = [
    { x: 1.6, y: 4.8 },
    { x: 3.4, y: 6.2 },
    { x: 5.4, y: 5.1 },
  ];
  spots.forEach((sp, i) => {
    const p = iso(s, sp.x, sp.y, 0);
    ctx.fillStyle = "#3c3228";
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, 28, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c4b49a";
    ctx.fillRect(p.x - 22, p.y - 10, 44, 8);
    if (ch >= 3) {
      ctx.fillStyle = "#1a1f26";
      ctx.fillRect(p.x - 14, p.y - 32, 28, 18);
      ctx.fillStyle = ch === 7 && i === 1 ? "rgba(201,120,74,0.85)" : "rgba(62,207,207,0.35)";
      ctx.fillRect(p.x - 12, p.y - 30, 24, 14);
      if (ch >= 4) {
        ctx.fillStyle = PAPER;
        ctx.font = "500 8px IBM Plex Sans, sans-serif";
        ctx.fillText(ch >= 5 ? "ID" : "UI", p.x - 8, p.y - 20);
      }
    }
    if (ch >= 0) {
      ctx.fillStyle = "rgba(20,26,34,0.9)";
      ctx.beginPath();
      ctx.ellipse(p.x + 18, p.y + 6, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function aps(ctx: CanvasRenderingContext2D, s: V6State, ch: number) {
  if (ch < 2) return;
  [
    [2.2, 3.1],
    [6.4, 3.6],
  ].forEach(([x, y], i) => {
    const p = iso(s, x, y, 6.2);
    ctx.strokeStyle = CYAN;
    ctx.globalAlpha = 0.25 + (s.reduce ? 0 : Math.sin(s.t * 2 + i) * 0.08);
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, 16, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#e8eef3";
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, 7, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
  });
}

function cloudPanel(ctx: CanvasRenderingContext2D, s: V6State, ch: number) {
  if (ch < 6) return;
  const p = iso(s, 11.5, 8.4, 5);
  ctx.fillStyle = "rgba(16,24,38,0.88)";
  ctx.strokeStyle = CYAN;
  rr(ctx, p.x - 46, p.y - 28, 92, 40, 4);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = PAPER;
  ctx.font = "500 11px IBM Plex Sans, sans-serif";
  ctx.fillText("Nube · datos", p.x - 34, p.y - 6);
  ctx.fillStyle = METAL;
  ctx.font = "400 10px IBM Plex Sans, sans-serif";
  ctx.fillText("Respaldo e identidad", p.x - 34, p.y + 10);
}

function ticket(ctx: CanvasRenderingContext2D, s: V6State, ch: number) {
  if (ch < 7) return;
  const x = s.w * 0.72;
  const y = s.h * 0.14;
  ctx.fillStyle = "rgba(246,243,236,0.96)";
  rr(ctx, x, y, 168, 72, 4);
  ctx.fill();
  ctx.fillStyle = ch >= 8 ? TEAL : WARM;
  ctx.fillRect(x, y, 4, 72);
  ctx.fillStyle = "#141a22";
  ctx.font = "600 12px Outfit, IBM Plex Sans, sans-serif";
  ctx.fillText(ch >= 8 ? "Caso cerrado" : "Sucursal sin enlace", x + 14, y + 24);
  ctx.fillStyle = "#3d4a57";
  ctx.font = "400 11px IBM Plex Sans, sans-serif";
  ctx.fillText(ch >= 8 ? "Respaldo activo · documentado" : "Señal → N1 → red", x + 14, y + 44);
}

/** Home: una escena que ensambla el ciclo Justech. */
export function drawOperation(ctx: CanvasRenderingContext2D, s: V6State) {
  ctx.clearRect(0, 0, s.w, s.h);
  const g = ctx.createLinearGradient(0, 0, s.w, s.h);
  g.addColorStop(0, "rgba(11,18,32,0.18)");
  g.addColorStop(1, "rgba(11,18,32,0.55)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s.w, s.h);

  const ch = s.chapter;
  ctx.fillStyle = "rgba(28,36,48,0.35)";
  ctx.beginPath();
  ctx.moveTo(iso(s, -1, -1).x, iso(s, -1, -1).y);
  ctx.lineTo(iso(s, 13, -1).x, iso(s, 13, -1).y);
  ctx.lineTo(iso(s, 13, 10).x, iso(s, 13, 10).y);
  ctx.lineTo(iso(s, -1, 10).x, iso(s, -1, 10).y);
  ctx.closePath();
  ctx.fill();

  if (ch >= 2) {
    const a = iso(s, 0.4, 1.2, 5.4);
    const b = iso(s, 9.2, 1.2, 5.4);
    ctx.strokeStyle = "rgba(62,207,207,0.45)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  rack(ctx, s, ch);
  desks(ctx, s, ch);
  aps(ctx, s, ch);
  cloudPanel(ctx, s, ch);

  const edge = iso(s, 12.2, 1.2, 3);
  const fw = iso(s, 9.2, 1.2, 3.6);
  const core = iso(s, 9.2, 1.2, 4.2);
  const desk = iso(s, 3.4, 6.2, 1.4);
  const ap = iso(s, 2.2, 3.1, 6.2);
  const cloud = iso(s, 11.5, 8.4, 5);
  const fail = ch === 7;

  if (ch >= 2) {
    link(ctx, edge, fw, true, fail);
    link(ctx, fw, core, true);
    link(ctx, core, ap, true);
    link(ctx, ap, desk, ch >= 3);
    if (ch >= 6) link(ctx, fw, cloud, !fail, fail);
    if (ch >= 7) link(ctx, iso(s, 12.6, 3.2, 3), fw, true, false, true);
    if (!s.reduce && ch >= 2 && !fail) {
      packet(ctx, edge, fw, s.t * 0.35);
      packet(ctx, core, ap, s.t * 0.28 + 0.4);
    }
    if (!s.reduce && ch >= 3) packet(ctx, ap, desk, s.t * 0.32 + 0.2, ch >= 4 ? TEAL : CYAN);
    if (!s.reduce && ch >= 6 && !fail) packet(ctx, fw, cloud, s.t * 0.22 + 0.6);
  }

  ticket(ctx, s, ch);

  if (ch >= 5 && ch !== 7) {
    const c = iso(s, 5, 4, 2);
    ctx.strokeStyle = "rgba(13,115,119,0.45)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, 120, 52, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = PAPER;
  ctx.font = "600 12px Outfit, IBM Plex Sans, sans-serif";
  const labels = [
    "Operación",
    "Planta",
    "Conectividad",
    "Equipos",
    "Software",
    "Seguridad",
    "Nube y datos",
    "Soporte",
    "Resultado",
  ];
  ctx.fillText(labels[clamp(ch, 0, 8)], 24, s.h - 22);
}

export function drawCampus(ctx: CanvasRenderingContext2D, s: V6State) {
  ctx.clearRect(0, 0, s.w, s.h);
  ctx.fillStyle = "#070b12";
  ctx.fillRect(0, 0, s.w, s.h);
  const view = s.view;
  const y = 110;
  const nodes = [
    { id: "isp", x: 70, l: "ISP", kind: "isp" },
    { id: "rtr", x: 190, l: "Borde", kind: "rtr" },
    { id: "fw", x: 310, l: "Firewall", kind: "fw" },
    { id: "core", x: 440, l: "Core", kind: "sw" },
    { id: "acc", x: 580, l: "Acceso", kind: "sw" },
    { id: "ap", x: 720, l: "APs", kind: "ap" },
    { id: "usr", x: 840, l: "Puestos", kind: "usr" },
  ];
  const scale = s.w / 920;
  ctx.save();
  ctx.scale(scale, scale);

  nodes.forEach((n, i) => {
    if (n.kind === "sw" || n.kind === "fw" || n.kind === "rtr") {
      switchFace(ctx, n.x - 48, y, n.kind === "fw" ? 92 : 88, 36, n.kind === "fw" ? 8 : 18, 12, s.t);
    } else if (n.kind === "ap") {
      ctx.fillStyle = "#e8eef3";
      ctx.beginPath();
      ctx.ellipse(n.x, y + 18, 22, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = CYAN;
      ctx.beginPath();
      ctx.ellipse(n.x, y + 18, 30, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (n.kind === "usr") {
      ctx.fillStyle = GRAPHITE;
      rr(ctx, n.x - 40, y, 80, 40, 3);
      ctx.fill();
      ctx.fillStyle = "rgba(62,207,207,0.3)";
      ctx.fillRect(n.x - 28, y + 8, 24, 16);
      ctx.fillRect(n.x + 4, y + 8, 24, 16);
    } else {
      ctx.fillStyle = DEEP;
      rr(ctx, n.x - 40, y, 80, 36, 3);
      ctx.fill();
    }
    ctx.fillStyle = PAPER;
    ctx.font = "500 12px IBM Plex Sans, sans-serif";
    ctx.fillText(n.l, n.x - 28, y + 58);
    if (i < nodes.length - 1) {
      const a = { x: n.x + 44, y: y + 18 };
      const b = { x: nodes[i + 1].x - 44, y: y + 18 };
      const fail = view === "seguridad" ? false : s.chapter === 7 && n.id === "isp";
      link(ctx, a, b, true, fail);
      if (!s.reduce && !fail) packet(ctx, a, b, s.t * 0.3 + i * 0.12);
    }
  });

  switchFace(ctx, 400, 240, 100, 34, 16, 8, s.t);
  ctx.fillStyle = PAPER;
  ctx.fillText("Servidores", 412, 292);
  switchFace(ctx, 540, 240, 100, 34, 12, 6, s.t);
  ctx.fillText("Almacenamiento", 542, 292);
  link(ctx, { x: 440, y: 146 }, { x: 450, y: 240 }, true);
  link(ctx, { x: 580, y: 146 }, { x: 590, y: 240 }, true);

  if (view !== "seguridad") {
    ctx.fillStyle = DEEP;
    rr(ctx, 70, 240, 90, 40, 3);
    ctx.fill();
    ctx.fillStyle = PAPER;
    ctx.fillText("Nube", 96, 264);
    link(ctx, { x: 310, y: 146 }, { x: 115, y: 240 }, true, false, true);
  }

  if (view === "multi" || view === "seguridad") {
    ctx.fillStyle = DEEP;
    rr(ctx, 70, 330, 120, 40, 3);
    ctx.fill();
    ctx.fillStyle = PAPER;
    ctx.fillText(view === "multi" ? "Sucursal" : "VLAN piso", 86, 354);
    link(ctx, { x: 115, y: 280 }, { x: 130, y: 330 }, true, false, view === "multi");
    if (view === "multi") {
      ctx.fillStyle = METAL;
      ctx.fillText("Enlace secundario en espera", 210, 354);
    }
  }

  if (view === "seguridad") {
    ctx.strokeStyle = CYAN;
    ctx.strokeRect(262, 96, 96, 86);
    ctx.fillStyle = CYAN;
    ctx.font = "500 11px IBM Plex Mono, monospace";
    ctx.fillText("control", 286, 90);
  }

  ctx.restore();
}

export function drawRackBuild(ctx: CanvasRenderingContext2D, s: V6State) {
  ctx.clearRect(0, 0, s.w, s.h);
  ctx.fillStyle = "#070b12";
  ctx.fillRect(0, 0, s.w, s.h);
  const fake: V6State = { ...s, w: s.w, h: s.h, chapter: Math.min(9, 1 + Math.floor(s.t % 10)) };
  rack(ctx, { ...fake, w: s.w * 1.15, h: s.h * 1.2 }, fake.chapter);
}

export function drawAssign(ctx: CanvasRenderingContext2D, s: V6State) {
  ctx.clearRect(0, 0, s.w, s.h);
  ctx.fillStyle = "#101826";
  ctx.fillRect(0, 0, s.w, s.h);
  const step = s.chapter % 5;
  const people = ["Dirección", "Finanzas", "Ventas", "Operaciones"];
  people.forEach((name, i) => {
    const y = 48 + i * 52;
    ctx.fillStyle = i <= step ? "rgba(13,115,119,0.18)" : GRAPHITE;
    rr(ctx, 28, y, 200, 40, 3);
    ctx.fill();
    ctx.fillStyle = PAPER;
    ctx.font = "500 13px IBM Plex Sans, sans-serif";
    ctx.fillText(name, 44, y + 25);
    const hub = { x: s.w * 0.62, y: s.h * 0.42 };
    const a = { x: 228, y: y + 20 };
    link(ctx, a, hub, i <= step);
    if (!s.reduce && i <= step) packet(ctx, a, hub, s.t * 0.25 + i * 0.2, TEAL);
  });
  ctx.fillStyle = "#0b1220";
  rr(ctx, s.w * 0.5, s.h * 0.28, 200, 120, 6);
  ctx.fill();
  ctx.strokeStyle = CYAN;
  ctx.stroke();
  ctx.fillStyle = PAPER;
  ctx.font = "600 14px Outfit, sans-serif";
  ctx.fillText("Tenant", s.w * 0.5 + 24, s.h * 0.28 + 36);
  ctx.font = "400 12px IBM Plex Sans, sans-serif";
  ctx.fillStyle = METAL;
  ctx.fillText("Identidad · correo · archivos", s.w * 0.5 + 24, s.h * 0.28 + 60);
  ctx.fillText("Sin precios en esta vista", s.w * 0.5 + 24, s.h * 0.28 + 82);
}
