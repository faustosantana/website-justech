"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CABLE_STAGES, V85_BASE } from "@/content/v85";
import { withBase } from "@/lib/paths";
import styles from "./studios.module.css";

const plates = [
  "v82-sede-vacio",
  "v82-sede-cables",
  "v82-sede-cables",
  "v82-sede-rack",
  "v82-sede-focus-mdf",
  "v82-sede-activa",
];

export function CableDemo({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [reduce, setReduce] = useState(false);
  const stage = CABLE_STAGES[step];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  function go(n: number) {
    setStep(Math.max(0, Math.min(CABLE_STAGES.length - 1, n)));
  }

  return (
    <section className={styles.studio} id="cableado" aria-labelledby="cab-title">
      <p className={styles.kickerLight}>Demostración principal</p>
      <h2 id="cab-title">De un plano a una infraestructura documentada.</h2>
      <p className={styles.lead}>
        Seis etapas de ingeniería. Los elementos construidos permanecen. No es un plano escolar ni un rack genérico.
      </p>
      <div className={styles.cableLayout}>
        <figure className={styles.cableScene} data-step={step} data-motion={reduce ? "reduce" : "ok"}>
          {Array.from(new Set(plates.slice(0, step + 1))).map((name) => (
            <picture key={name} className={name === plates[step] ? styles.cablePlateOn : styles.cablePlate}>
              <source srcSet={withBase(`/visual/v8/${name}.webp`)} type="image/webp" />
              <img
                src={withBase(`/visual/v8/${name}.jpg`)}
                alt={
                  name === plates[step]
                    ? "Sede empresarial: planta, cuarto técnico y puestos usados como referencia de la demostración."
                    : ""
                }
                width={1600}
                height={900}
                loading="lazy"
              />
            </picture>
          ))}
          <PlanOverlay step={step} />
          <figcaption className={styles.cableCap}>
            {stage.n} · {stage.title}
          </figcaption>
        </figure>
        <div className={styles.cableCopy}>
          <ol className={styles.cableSteps} aria-label="Etapas del proyecto">
            {CABLE_STAGES.map((s, i) => (
              <li key={s.id}>
                <button type="button" aria-current={i === step ? "step" : undefined} onClick={() => go(i)}>
                  <span>{s.n}</span>
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
          <p className={styles.cableText} aria-live="polite">
            {stage.text}
          </p>
          <div className={styles.cableNav} aria-label="Recorrer etapas">
            <button type="button" onClick={() => go(step - 1)} disabled={step === 0}>
              Anterior
            </button>
            <span>
              {step + 1} / {CABLE_STAGES.length}
            </span>
            <button type="button" onClick={() => go(step + 1)} disabled={step === CABLE_STAGES.length - 1}>
              Siguiente
            </button>
          </div>
          {compact ? (
            <p>
              <Link href={`${V85_BASE}/cableado-estructurado/`}>Ver el servicio de cableado estructurado</Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function PlanOverlay({ step }: { step: number }) {
  const on = (n: number) => step >= n;
  return (
    <svg className={styles.planSvg} viewBox="0 0 1600 900" role="img" aria-label="Plano arquitectónico y cuarto técnico de demostración">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="rgba(10,92,86,0.12)" strokeWidth="1" />
        </pattern>
        <linearGradient id="mdfGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a5c56" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0a5c56" stopOpacity="0.04" />
        </linearGradient>
        <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#06111f" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect x="48" y="48" width="980" height="804" fill="url(#grid)" opacity="0.9" />
      <rect x="48" y="48" width="980" height="804" fill="none" stroke="#1c2a33" strokeWidth="3.2" />
      <text className={styles.planTitle} x="72" y="92">
        JT-PL-01 · PLANTA TIPO · ESCALA 1:100 · SANTO DOMINGO
      </text>
      <polygon points="72,118 92,154 52,154" fill="#0a5c56" />
      <text className={styles.planTiny} x="72" y="174" textAnchor="middle">
        N
      </text>

      <g className={styles.room}>
        <rect x="88" y="196" width="560" height="420" />
        <text x="108" y="228">ÁREA ABIERTA · PUESTOS</text>
      </g>
      <g className={styles.room}>
        <rect x="668" y="196" width="320" height="188" />
        <text x="688" y="228">SALA DE REUNIONES</text>
      </g>
      <g className={styles.room}>
        <rect x="88" y="636" width="280" height="176" />
        <text x="108" y="668">RECEPCIÓN</text>
      </g>
      <g className={styles.mdf} data-on={on(0) ? "1" : "0"}>
        <rect x="668" y="636" width="320" height="176" fill="url(#mdfGlow)" />
        <rect x="668" y="636" width="320" height="176" />
        <text x="688" y="668">CUARTO TÉCNICO · MDF</text>
        {on(0) ? (
          <text className={styles.planNote} x="688" y="792">
            3.20 × 2.40 m · acceso restringido
          </text>
        ) : null}
      </g>
      <g className={styles.room}>
        <rect x="388" y="636" width="260" height="176" />
        <text x="408" y="668">PASILLO / IDF</text>
      </g>

      {on(0)
        ? [
            [120, 260],
            [250, 260],
            [380, 260],
            [510, 260],
            [120, 370],
            [250, 370],
            [380, 370],
            [510, 370],
            [120, 480],
            [250, 480],
            [380, 480],
            [510, 480],
          ].map(([x, y], i) => (
            <g key={`desk-${i}`} className={styles.desk}>
              <rect x={x} y={y} width="92" height="58" rx="2" />
              <rect x={x + 8} y={y + 8} width="52" height="32" rx="1" />
              {on(0) ? (
                <text className={styles.planTiny} x={x + 46} y={y + 78}>
                  P-{String(i + 1).padStart(2, "0")}
                </text>
              ) : null}
            </g>
          ))
        : null}

      {on(0) ? (
        <g className={styles.dims}>
          <path d="M88 180 H648" />
          <text x="368" y="174">
            18.40 m
          </text>
          <path d="M72 196 V616" />
          <text x="36" y="416" transform="rotate(-90 36 416)">
            12.60 m
          </text>
        </g>
      ) : null}

      {on(1) ? (
        <g className={styles.trays}>
          <path className={styles.trayMain} d="M828 636 V140 H120 V520" />
          <path className={styles.trayDrop} d="M166 140 V260" />
          <path className={styles.trayDrop} d="M296 140 V260" />
          <path className={styles.trayDrop} d="M426 140 V260" />
          <path className={styles.trayDrop} d="M556 140 V260" />
          <path className={styles.trayDrop} d="M166 140 V480" />
          <path className={styles.trayDrop} d="M296 140 V480" />
          <path className={styles.trayDrop} d="M426 140 V480" />
          <path className={styles.trayDrop} d="M828 400 H980" />
          <text className={styles.planNote} x="108" y="132">
            Bandeja principal · bajantes · canalización
          </text>
        </g>
      ) : null}

      {on(2)
        ? [
            [166, 318],
            [296, 318],
            [426, 318],
            [556, 318],
            [166, 428],
            [296, 428],
            [426, 428],
            [556, 428],
            [166, 538],
            [296, 538],
            [426, 538],
            [556, 538],
          ].map(([cx, cy], i) => (
            <g key={`pt-${i}`}>
              <rect className={styles.faceplate} x={cx - 10} y={cy - 8} width="20" height="14" rx="1" />
              <text className={styles.planTiny} x={cx} y={cy + 22} textAnchor="middle">
                D-{String(i + 1).padStart(2, "0")}
              </text>
            </g>
          ))
        : null}
      {on(2) ? (
        <g>
          <ellipse className={styles.ap} cx="220" cy="220" rx="22" ry="12" />
          <ellipse className={styles.ap} cx="480" cy="220" rx="22" ry="12" />
          <ellipse className={styles.ap} cx="820" cy="250" rx="22" ry="12" />
          <text className={styles.planTiny} x="220" y="208" textAnchor="middle">
            AP-01
          </text>
          <text className={styles.planTiny} x="480" y="208" textAnchor="middle">
            AP-02
          </text>
          <rect className={styles.faceplate} x="160" y="700" width="28" height="16" />
          <text className={styles.planTiny} x="174" y="734" textAnchor="middle">
            Imp.
          </text>
          <rect className={styles.faceplate} x="220" y="700" width="28" height="16" />
          <text className={styles.planTiny} x="234" y="734" textAnchor="middle">
            Tel.
          </text>
          <path className={styles.fiber} d="M828 720 H518 V700" />
          <text className={styles.planNote} x="540" y="690">
            Backbone FO entre MDF e IDF
          </text>
        </g>
      ) : null}

      <g transform="translate(1088 72)" filter="url(#soft)" opacity={on(3) ? 1 : 0.18}>
        <RackCabinet live={on(3)} terminated={on(3)} labeled={on(3)} />
      </g>

      {on(4) ? <CertPanel /> : null}
      {on(5) ? <DocsPanel /> : null}
    </svg>
  );
}

function RackCabinet({ live, terminated, labeled }: { live: boolean; terminated: boolean; labeled: boolean }) {
  return (
    <g>
      <text className={styles.planTitle} x="0" y="0">
        ELEVACIÓN MDF · RACK 42U
      </text>
      <rect x="24" y="20" width="360" height="760" rx="4" fill="#1a2229" stroke="#0b1018" strokeWidth="3" />
      <rect x="40" y="36" width="12" height="728" fill="#3a4550" />
      <rect x="356" y="36" width="12" height="728" fill="#3a4550" />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={`l${i}`} cx="46" cy={56 + i * 50} r="2.2" fill="#8aa0b0" />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={`r${i}`} cx="362" cy={56 + i * 50} r="2.2" fill="#8aa0b0" />
      ))}
      <Patch y={48} label="PP-A · 24P" colored={terminated} />
      <Manager y={108} />
      <Switch y={148} label="SW-ACC-01" live={live} />
      <Manager y={208} />
      <Patch y={248} label="PP-B · 24P" colored={terminated} accent />
      <Switch y={308} label="SW-ACC-02" live={live} />
      <rect x="56" y="380" width="296" height="36" fill="#11181f" stroke="#2a3540" />
      <text className={styles.rackLbl} x="204" y="404" textAnchor="middle">
        ORGANIZADOR HORIZONTAL
      </text>
      <rect x="56" y="430" width="296" height="70" fill="#161d24" stroke="#2a3540" />
      <text className={styles.rackLbl} x="204" y="470" textAnchor="middle">
        PDU · ALIMENTACIÓN
      </text>
      {live
        ? Array.from({ length: 8 }, (_, i) => (
            <rect key={`c${i}`} x={70 + i * 34} y="488" width="8" height="86" fill={i % 2 ? "#12b3ad" : "#0a5c56"} opacity="0.85" />
          ))
        : null}
      <rect x="56" y="590" width="296" height="96" fill="#10161c" stroke="#2a3540" />
      <text className={styles.rackLbl} x="204" y="644" textAnchor="middle">
        UPS / RESPALDO CUANDO APLIQUE
      </text>
      {labeled ? (
        <g>
          <text className={styles.planNote} x="400" y="72" fill="#0a5c56">
            Etiquetado PP-A / D-xx
          </text>
          <text className={styles.planNote} x="400" y="168" fill="#0a5c56">
            Patch cords organizados
          </text>
        </g>
      ) : null}
    </g>
  );
}

function Patch({ y, label, colored, accent }: { y: number; label: string; colored: boolean; accent?: boolean }) {
  return (
    <g transform={`translate(56 ${y})`}>
      <rect width="296" height="52" fill="#0e141a" stroke="#2c3944" />
      {Array.from({ length: 24 }, (_, i) => (
        <rect
          key={i}
          x={8 + (i % 12) * 23}
          y={i < 12 ? 8 : 28}
          width="18"
          height="12"
          rx="1"
          fill={colored ? (accent ? "#c2410c" : i % 3 === 0 ? "#0369a1" : "#0a5c56") : "#2a3540"}
        />
      ))}
      <text className={styles.rackLbl} x="300" y="16">
        {label}
      </text>
    </g>
  );
}

function Switch({ y, label, live }: { y: number; label: string; live: boolean }) {
  return (
    <g transform={`translate(56 ${y})`}>
      <rect width="296" height="52" fill="#121920" stroke="#2c3944" />
      {Array.from({ length: 24 }, (_, i) => (
        <g key={i}>
          <rect x={8 + i * 12} y="18" width="9" height="14" rx="1" fill="#0b1018" stroke="#5b6d7c" />
          <circle cx={12.5 + i * 12} cy="12" r="1.6" fill={live ? "#12b3ad" : "#3a4550"} />
        </g>
      ))}
      <text className={styles.rackLbl} x="8" y="48">
        {label}
      </text>
    </g>
  );
}

function Manager({ y }: { y: number }) {
  return (
    <g transform={`translate(56 ${y})`}>
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${12 + i * 24} 4 v24`} stroke="#6b7c88" strokeWidth="3" />
      ))}
    </g>
  );
}

function CertPanel() {
  return (
    <g transform="translate(72 760)" className={styles.cert}>
      <rect x="0" y="0" width="520" height="80" rx="6" fill="rgba(255,255,255,0.94)" stroke="#0a5c56" />
      <rect x="16" y="14" width="64" height="52" rx="4" fill="#0b1018" />
      <text className={styles.rackLbl} x="48" y="46" textAnchor="middle" fill="#12b3ad">
        TEST
      </text>
      <text x="96" y="32" fill="#0b1018" fontSize="14" fontFamily="inherit">
        Prueba de enlace conceptual · longitud · continuidad · ID
      </text>
      <text x="96" y="56" fill="#047857" fontSize="14" fontFamily="inherit">
        D-04 APROBADO · D-11 REVISIÓN · evidencia según alcance
      </text>
    </g>
  );
}

function DocsPanel() {
  return (
    <g transform="translate(1088 820)">
      <rect width="440" height="56" rx="6" fill="rgba(244,240,232,0.96)" stroke="#0a5c56" />
      <text x="16" y="24" fill="#0b1018" fontSize="13" fontFamily="inherit">
        Entrega: plano actualizado · nomenclatura · listado · rack · fotos · recomendaciones
      </text>
      <text x="16" y="44" fill="#0a5c56" fontSize="12" fontFamily="inherit">
        Otro técnico puede comprender, mantener y ampliar.
      </text>
    </g>
  );
}
