"use client";

import { useEffect, useRef } from "react";

type Node = { id: string; label: string; x: number; y: number };
type Edge = [string, string];

const NODES: Node[] = [
  { id: "infra", label: "Infraestructura", x: 0.16, y: 0.52 },
  { id: "net", label: "Redes", x: 0.36, y: 0.26 },
  { id: "cloud", label: "Nube", x: 0.62, y: 0.16 },
  { id: "data", label: "Datos", x: 0.84, y: 0.3 },
  { id: "sec", label: "Seguridad", x: 0.52, y: 0.46 },
  { id: "users", label: "Usuarios", x: 0.8, y: 0.62 },
  { id: "ops", label: "Operación", x: 0.3, y: 0.74 },
  { id: "sup", label: "Soporte", x: 0.58, y: 0.82 },
];

const EDGES: Edge[] = [
  ["infra", "net"],
  ["infra", "ops"],
  ["net", "cloud"],
  ["net", "sec"],
  ["cloud", "data"],
  ["data", "users"],
  ["sec", "users"],
  ["sec", "ops"],
  ["ops", "sup"],
  ["users", "sup"],
  ["infra", "sec"],
];

function StaticMesh() {
  return (
    <svg className="hero-field-static" viewBox="0 0 640 520" fill="none" aria-hidden>
      <defs>
        <linearGradient id="mesh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3ec4d0" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {EDGES.map(([a, b]) => {
        const na = NODES.find((n) => n.id === a)!;
        const nb = NODES.find((n) => n.id === b)!;
        return (
          <line
            key={`${a}-${b}`}
            x1={na.x * 640}
            y1={na.y * 520}
            x2={nb.x * 640}
            y2={nb.y * 520}
            stroke="url(#mesh)"
            strokeWidth="1.2"
          />
        );
      })}
      {NODES.map((n) => (
        <g key={n.id}>
          <circle cx={n.x * 640} cy={n.y * 520} r="5.5" fill="#5eead4" />
          <text
            x={n.x * 640 + 10}
            y={n.y * 520 + 4}
            fill="#d7f8f3"
            fontSize="12"
            fontFamily="IBM Plex Sans, sans-serif"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Red operativa: infraestructura, nube, usuarios, datos, seguridad y soporte. */
export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const hostEl = wrapRef.current;
    if (!canvasEl || !hostEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const host: HTMLDivElement = hostEl;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    host.classList.add("has-canvas");

    let raf = 0;
    let visible = true;
    const packets = EDGES.map((_, i) => ({ e: i, t: (i * 0.13) % 1 }));

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(host);

    function size() {
      return host.getBoundingClientRect();
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const { width, height } = size();
      const w = Math.max(320, width);
      const h = Math.max(240, height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(ts: number) {
      if (!visible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const { width, height } = size();
      const w = Math.max(320, width);
      const h = Math.max(240, height);
      ctx.clearRect(0, 0, w, h);

      const pos = Object.fromEntries(
        NODES.map((n) => [n.id, { x: n.x * w, y: n.y * h, label: n.label }]),
      );

      ctx.lineWidth = 1.15;
      EDGES.forEach(([a, b]) => {
        const pa = pos[a];
        const pb = pos[b];
        const g = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        g.addColorStop(0, "rgba(94, 234, 212, 0.12)");
        g.addColorStop(1, "rgba(62, 196, 208, 0.38)");
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      });

      packets.forEach((p) => {
        p.t = (p.t + 0.0024) % 1;
        const [a, b] = EDGES[p.e];
        const pa = pos[a];
        const pb = pos[b];
        const x = pa.x + (pb.x - pa.x) * p.t;
        const y = pa.y + (pb.y - pa.y) * p.t;
        ctx.fillStyle = "rgba(94, 234, 212, 0.9)";
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      const pulse = 0.55 + Math.sin(ts / 900) * 0.2;
      NODES.forEach((n) => {
        const p = pos[n.id];
        ctx.beginPath();
        ctx.fillStyle = `rgba(94, 234, 212, ${0.12 + pulse * 0.08})`;
        ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#5eead4";
        ctx.arc(p.x, p.y, 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "600 12px IBM Plex Sans, system-ui, sans-serif";
        ctx.fillStyle = "rgba(232, 248, 245, 0.92)";
        ctx.fillText(n.label, p.x + 10, p.y + 4);
      });

      raf = requestAnimationFrame(draw);
    }

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return (
    <div className="hero-field" ref={wrapRef} aria-hidden>
      <StaticMesh />
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ position: "absolute", inset: 0 }}
      />
    </div>
  );
}
