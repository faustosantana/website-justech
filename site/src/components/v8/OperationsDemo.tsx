"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CLOUD_COPY, SECURITY_COPY, V85_BASE } from "@/content/v85";
import styles from "./operations.module.css";

const LAYERS = [
  {
    id: "sede",
    label: "Sede",
    title: "Plano técnico de referencia con distribución, rutas, puntos y cuarto de comunicaciones.",
    detail: "La planta queda identificada: puestos, bandejas y rack en el mismo criterio de nomenclatura.",
    cta: { href: `${V85_BASE}/cableado-estructurado/`, label: "Ver cableado estructurado" },
  },
  {
    id: "red",
    label: "Red",
    title: "Visualización del proceso de continuidad de conectividad.",
    detail: "Borde, firewall, switches, Wi-Fi y sucursal. Si el enlace principal falla, el respaldo sostiene la operación.",
    cta: { href: `${V85_BASE}/redes-empresariales/`, label: "Ver redes empresariales" },
  },
  {
    id: "puestos",
    label: "Puestos",
    title: "Un colaborador llega con el puesto configurado.",
    detail: "Laptop, monitor, dock, identidad y accesorios del perfil, listos para el primer día.",
    cta: { href: `${V85_BASE}/equipos-empresariales/`, label: "Ver equipos empresariales" },
  },
  {
    id: "plataformas",
    label: "Plataformas",
    title: "Identidad, aplicaciones y licencias asignadas al rol.",
    detail: "La selección final depende del alcance, los usuarios y las plataformas requeridas.",
    cta: { href: `${V85_BASE}/licenciamiento/`, label: "Ver licenciamiento" },
  },
  {
    id: "seguridad",
    label: "Seguridad",
    title: SECURITY_COPY.title,
    detail: SECURITY_COPY.body,
    cta: { href: `${V85_BASE}/contacto/?motivo=seguridad`, label: "Conversar sobre seguridad" },
  },
  {
    id: "nube",
    label: "Nube",
    title: CLOUD_COPY.title,
    detail: CLOUD_COPY.body,
    cta: { href: `${V85_BASE}/contacto/?motivo=nube`, label: "Evaluar nube y continuidad" },
  },
  {
    id: "soporte",
    label: "Soporte",
    title: "Un evento técnico se convierte en caso, se corrige y se documenta.",
    detail: "El usuario reporta, el equipo clasifica, diagnostica, resuelve y cierra con nota.",
    cta: { href: `${V85_BASE}/soporte-tecnico-empresarial/`, label: "Ver soporte técnico" },
  },
] as const;

const INTERVAL = 2400;

export function OperationsDemo() {
  const [layer, setLayer] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [inView, setInView] = useState(false);
  const current = LAYERS[layer];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduce(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = document.getElementById("operacion");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting) setPlaying(false);
        else if (!reduce) setPlaying(true);
      },
      { threshold: 0.28 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!playing || reduce || !inView) return;
    const id = window.setInterval(() => setLayer((n) => (n + 1) % LAYERS.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [playing, reduce, inView]);

  function go(n: number) {
    setLayer(Math.max(0, Math.min(LAYERS.length - 1, n)));
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setLayer((n) => (n + 1) % LAYERS.length);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setLayer((n) => (n - 1 + LAYERS.length) % LAYERS.length);
    }
    if (e.key === " " || e.key === "Enter") {
      if ((e.target as HTMLElement).tagName === "A" || (e.target as HTMLElement).tagName === "BUTTON") return;
      e.preventDefault();
      if (!reduce) setPlaying((v) => !v);
    }
    if (e.key === "Home") {
      e.preventDefault();
      go(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      go(LAYERS.length - 1);
    }
  }

  return (
    <section
      className={styles.ops}
      id="operacion"
      aria-labelledby="ops-title"
      data-demo="ops-87"
      tabIndex={0}
      onKeyDown={onKey}
    >
      <div className={styles.inner}>
        <p className={styles.kicker}>Demostración operacional</p>
        <h2 id="ops-title">Así se conecta una operación.</h2>
        <p className={styles.lead}>
          La misma organización evoluciona: sede, red, puestos, plataformas, seguridad, nube y soporte. Una vista
          activa.
        </p>
        <div className={styles.tabs} role="tablist" aria-label="Capas de la operación">
          {LAYERS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={layer === i}
              onClick={() => {
                go(i);
                setPlaying(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={styles.stage}>
          <figure className={styles.board} data-layer={current.id} data-motion={reduce ? "reduce" : "ok"}>
            <OrgScene layer={layer} />
            <figcaption>
              <span>{current.label}</span>
              {current.id === "seguridad" || current.id === "nube" ? (
                <em>{SECURITY_COPY.label}</em>
              ) : (
                <em>Una organización, siete momentos.</em>
              )}
            </figcaption>
          </figure>
          <aside className={styles.copy} aria-live="polite">
            <h3>{current.title}</h3>
            <p>{current.detail}</p>
            <Link className={styles.cta} href={current.cta.href}>
              {current.cta.label}
            </Link>
            <div className={styles.controls}>
              <button type="button" onClick={() => go(layer - 1)} disabled={layer === 0}>
                Anterior
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!reduce) setPlaying((v) => !v);
                }}
                disabled={reduce}
              >
                {playing ? "Pausar" : "Reproducir"}
              </button>
              <button type="button" onClick={() => go(layer + 1)} disabled={layer === LAYERS.length - 1}>
                Siguiente
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function OrgScene({ layer }: { layer: number }) {
  const sede = layer >= 0;
  const red = layer >= 1;
  const puestos = layer >= 2;
  const plat = layer >= 3;
  const sec = layer >= 4;
  const nube = layer >= 5;
  const sop = layer >= 6;
  const fail = layer === 1;
  const isolate = layer === 4;
  return (
    <svg viewBox="0 0 1120 560" role="img" aria-label="Organización de demostración que evoluciona por capas">
      <rect width="1120" height="560" fill="#0e161e" />
      <text className={styles.hud} x="28" y="36">
        JT-OPS · SEDE NORTE
      </text>
      <rect x="28" y="56" width="620" height="360" rx="6" fill="#121920" stroke="#2a3844" />
      <path d="M28 200 H648 M220 56 V416 M460 56 V416" stroke="#1c2732" />
      {sede ? (
        <g>
          <rect x="48" y="76" width="150" height="100" rx="4" fill="#1c2732" stroke="#0a5c56" />
          <text className={styles.hud} x="123" y="132" textAnchor="middle">
            Administración
          </text>
          <rect x="240" y="76" width="196" height="100" rx="4" fill="#1c2732" stroke="#0a5c56" />
          <text className={styles.hud} x="338" y="132" textAnchor="middle">
            Operación
          </text>
          <rect x="480" y="76" width="148" height="100" rx="4" fill="#1c2732" stroke="#12b3ad" />
          <text className={styles.hud} x="554" y="122" textAnchor="middle">
            MDF
          </text>
          <text className={styles.hud} x="554" y="142" textAnchor="middle">
            Rack
          </text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={70 + (i % 3) * 48} cy={240 + Math.floor(i / 3) * 44} r="7" fill="#12b3ad" />
          ))}
          <path d="M70 240 H554 M118 284 H554" stroke="#0a5c56" strokeWidth="2" opacity="0.7" />
        </g>
      ) : null}
      {red ? (
        <g>
          <rect x="672" y="72" width="120" height="52" rx="4" fill={fail ? "#7f1d1d" : "#0a5c56"} />
          <text className={styles.hud} x="732" y="104" textAnchor="middle">
            ISP-1
          </text>
          <rect x="672" y="140" width="120" height="52" rx="4" fill={fail ? "#0a5c56" : "#1c2732"} stroke="#38bdf8" />
          <text className={styles.hud} x="732" y="172" textAnchor="middle">
            ISP-2
          </text>
          <rect x="820" y="104" width="110" height="56" rx="4" fill="#1c2732" stroke="#12b3ad" />
          <text className={styles.hud} x="875" y="128" textAnchor="middle">
            Borde
          </text>
          <text className={styles.hud} x="875" y="146" textAnchor="middle">
            Firewall
          </text>
          <rect x="960" y="72" width="128" height="44" rx="4" fill="#1c2732" stroke="#12b3ad" />
          <text className={styles.hud} x="1024" y="100" textAnchor="middle">
            Core / acceso
          </text>
          <rect x="960" y="132" width="128" height="44" rx="4" fill="#1c2732" stroke="#12b3ad" />
          <text className={styles.hud} x="1024" y="160" textAnchor="middle">
            Wi-Fi
          </text>
          <rect x="960" y="192" width="128" height="44" rx="4" fill="#1c2732" stroke="#38bdf8" />
          <text className={styles.hud} x="1024" y="220" textAnchor="middle">
            Sucursal
          </text>
          <path
            d="M792 98 H820"
            stroke={fail ? "#b91c1c" : "#12b3ad"}
            strokeWidth="3"
            strokeDasharray={fail ? "6 4" : "0"}
          />
          <path d="M792 166 H820" stroke={fail ? "#38bdf8" : "#5b6d7c"} strokeWidth="3" />
          <path d="M930 132 H960" stroke="#12b3ad" strokeWidth="3" />
        </g>
      ) : null}
      {puestos ? (
        <g>
          <rect x="52" y="430" width="86" height="56" rx="4" fill="#121920" stroke="#12b3ad" />
          <rect x="62" y="438" width="66" height="34" fill="#0b1018" />
          <rect x="148" y="422" width="70" height="48" rx="3" fill="#1c2732" stroke="#5b6d7c" />
          <rect x="228" y="448" width="54" height="14" rx="2" fill="#3a4550" />
          <circle cx="320" cy="456" r="16" fill="#d7e2ea" />
          <text className={styles.hud} x="352" y="460">
            Colaborador · puesto listo
          </text>
        </g>
      ) : null}
      {plat ? (
        <g>
          <rect x="672" y="270" width="200" height="36" rx="4" fill="#1c2732" stroke="#12b3ad" />
          <text className={styles.hud} x="772" y="294" textAnchor="middle">
            Identidad corporativa
          </text>
          {["Correo", "Archivos", "Reuniones"].map((n, i) => (
            <g key={n}>
              <rect x={672 + i * 108} y="318" width="96" height="32" rx="4" fill="#12263a" stroke="#12b3ad" />
              <text className={styles.hud} x={720 + i * 108} y="340" textAnchor="middle">
                {n}
              </text>
            </g>
          ))}
        </g>
      ) : null}
      {sec ? (
        <g>
          <rect
            x="52"
            y="430"
            width="86"
            height="56"
            rx="4"
            fill="none"
            stroke={isolate ? "#b91c1c" : "#12b3ad"}
            strokeDasharray={isolate ? "5 4" : "0"}
            strokeWidth="2"
          />
          <text className={styles.hud} x="672" y="390" fill={isolate ? "#fca5a5" : "#12b3ad"}>
            {isolate ? "Dispositivo no conforme · control aplicado" : "Puesto conforme · acceso según política"}
          </text>
        </g>
      ) : null}
      {nube ? (
        <g>
          <path d="M980 430 c-22 0-28-22-12-28 0-24 56-24 62 4 22-6 38 18 12 24z" fill="#1c2732" stroke="#38bdf8" />
          <text className={styles.hud} x="1004" y="478" textAnchor="middle">
            {layer >= 6 ? "Copia y registro" : "Archivo protegido"}
          </text>
          <path d="M400 456 C 620 520, 820 500, 960 430" fill="none" stroke="#38bdf8" strokeWidth="2" />
        </g>
      ) : null}
      {sop ? (
        <g>
          <rect x="672" y="400" width="246" height="112" rx="6" fill="#0b1018" stroke="#12b3ad" />
          <text className={styles.hud} x="690" y="428">
            JT-1042 · En curso
          </text>
          <text className={styles.hud} x="690" y="452">
            Usuario reporta · se clasifica
          </text>
          <text className={styles.hud} x="690" y="476">
            Diagnóstico · corrección
          </text>
          <text className={styles.hud} x="690" y="500">
            Validación · documentado
          </text>
        </g>
      ) : null}
    </svg>
  );
}
