"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
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
  const uid = useId().replace(/:/g, "");
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
    <section className={styles.studio} id="cableado" aria-labelledby="cab-title" data-demo="cable-86">
      <p className={styles.kickerLight}>Demostración principal</p>
      <h2 id="cab-title">De un plano a una infraestructura documentada.</h2>
      <p className={styles.lead}>
        Seis etapas de ingeniería. Plano arquitectónico e isometría de la planta. Lo construido permanece. No es un
        dibujo escolar ni un rack genérico.
      </p>
      <div className={styles.cableLayout}>
        <figure className={styles.cableBoard} data-step={step} data-motion={reduce ? "reduce" : "ok"}>
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
                decoding="async"
              />
            </picture>
          ))}
          <div className={styles.cableDual}>
            <PlanOverlay step={step} uid={uid} />
            <IsoOverlay step={step} uid={uid} />
          </div>
          <figcaption className={styles.cableCap}>
            JT-PL-01 · {stage.n} · {stage.title}
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
          <ul className={styles.cableLegend} aria-hidden="true">
            <li data-k="tray">Bandeja / UTP</li>
            <li data-k="fo">Backbone FO</li>
            <li data-k="mdf">MDF</li>
            <li data-k="pt">Punto identificado</li>
          </ul>
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

function PlanOverlay({ step, uid }: { step: number; uid: string }) {
  const on = (n: number) => step >= n;
  return (
    <svg className={styles.planSvg} viewBox="0 0 1040 900" role="img" aria-label="Plano arquitectónico de la planta tipo">
      <defs>
        <pattern id={`${uid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="rgba(10,92,86,0.14)" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${uid}-mdf`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a5c56" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0a5c56" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="24" y="36" width="992" height="840" fill="rgba(247,244,238,0.88)" stroke="#1c2a33" strokeWidth="3" />
      <rect x="40" y="88" width="960" height="772" fill={`url(#${uid}-grid)`} />
      <text className={styles.planTitle} x="48" y="64">
        PLANTA TIPO · ESCALA 1:100 · SANTO DOMINGO
      </text>
      <polygon points="56,108 76,144 36,144" fill="#0a5c56" />
      <text className={styles.planTiny} x="56" y="164" textAnchor="middle">
        N
      </text>
      <g className={styles.room}>
        <rect x="72" y="188" width="560" height="420" />
        <text x="92" y="220">ÁREA ABIERTA · 12 PUESTOS</text>
      </g>
      <g className={styles.room}>
        <rect x="652" y="188" width="328" height="188" />
        <text x="672" y="220">SALA DE REUNIONES</text>
      </g>
      <g className={styles.room}>
        <rect x="72" y="628" width="272" height="196" />
        <text x="92" y="660">RECEPCIÓN</text>
      </g>
      <g className={styles.room}>
        <rect x="364" y="628" width="248" height="196" />
        <text x="384" y="660">PASILLO / IDF</text>
      </g>
      <g className={styles.mdf} data-on={on(0) ? "1" : "0"}>
        <rect x="632" y="628" width="348" height="196" fill={`url(#${uid}-mdf)`} />
        <rect x="632" y="628" width="348" height="196" />
        <text x="652" y="660">CUARTO TÉCNICO · MDF</text>
        {on(0) ? (
          <text className={styles.planNote} x="652" y="800">
            3.20 × 2.40 m · acceso restringido · 42U
          </text>
        ) : null}
      </g>
      {[
        [104, 252],
        [234, 252],
        [364, 252],
        [494, 252],
        [104, 362],
        [234, 362],
        [364, 362],
        [494, 362],
        [104, 472],
        [234, 472],
        [364, 472],
        [494, 472],
      ].map(([x, y], i) => (
        <g key={`desk-${i}`} className={styles.desk} opacity={on(0) ? 1 : 0.35}>
          <rect x={x} y={y} width="92" height="58" rx="2" />
          <rect x={x + 8} y={y + 8} width="52" height="32" rx="1" />
          <text className={styles.planTiny} x={x + 46} y={y + 78}>
            P-{String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
      {on(0) ? (
        <g className={styles.dims}>
          <path d="M72 172 H632" />
          <text x="352" y="166">
            18.40 m
          </text>
          <path d="M56 188 V608" />
          <text x="22" y="408" transform="rotate(-90 22 408)">
            12.60 m
          </text>
        </g>
      ) : null}
      {on(1) ? (
        <g className={styles.trays}>
          <path className={styles.trayMain} d="M806 628 V128 H104 V520" />
          <path className={styles.trayDrop} d="M150 128 V252" />
          <path className={styles.trayDrop} d="M280 128 V252" />
          <path className={styles.trayDrop} d="M410 128 V252" />
          <path className={styles.trayDrop} d="M540 128 V252" />
          <path className={styles.trayDrop} d="M150 128 V472" />
          <path className={styles.trayDrop} d="M280 128 V472" />
          <path className={styles.trayDrop} d="M410 128 V472" />
          <path className={styles.trayDrop} d="M806 392 H980" />
          <text className={styles.planNote} x="88" y="118">
            Bandeja principal · bajantes · canalización
          </text>
        </g>
      ) : null}
      {on(2)
        ? [
            [150, 310],
            [280, 310],
            [410, 310],
            [540, 310],
            [150, 420],
            [280, 420],
            [410, 420],
            [540, 420],
            [150, 530],
            [280, 530],
            [410, 530],
            [540, 530],
          ].map(([cx, cy], i) => (
            <g key={`pt-${i}`}>
              <rect className={styles.faceplate} x={cx - 11} y={cy - 8} width="22" height="14" rx="1" />
              <text className={styles.planTiny} x={cx} y={cy + 24} textAnchor="middle">
                D-{String(i + 1).padStart(2, "0")}
              </text>
            </g>
          ))
        : null}
      {on(2) ? (
        <g>
          <ellipse className={styles.ap} cx="210" cy="210" rx="24" ry="13" />
          <ellipse className={styles.ap} cx="470" cy="210" rx="24" ry="13" />
          <ellipse className={styles.ap} cx="816" cy="244" rx="24" ry="13" />
          <text className={styles.planTiny} x="210" y="196" textAnchor="middle">
            AP-01
          </text>
          <text className={styles.planTiny} x="470" y="196" textAnchor="middle">
            AP-02
          </text>
          <text className={styles.planTiny} x="816" y="230" textAnchor="middle">
            AP-03
          </text>
          <rect className={styles.faceplate} x="148" y="700" width="30" height="16" />
          <text className={styles.planTiny} x="163" y="736" textAnchor="middle">
            Imp.
          </text>
          <rect className={styles.faceplate} x="214" y="700" width="30" height="16" />
          <text className={styles.planTiny} x="229" y="736" textAnchor="middle">
            Tel.
          </text>
          <path className={styles.fiber} d="M806 720 H488 V688" />
          <text className={styles.planNote} x="510" y="678">
            Backbone FO MDF–IDF
          </text>
        </g>
      ) : null}
      {on(4) ? (
        <g className={styles.cert}>
          <rect x="72" y="820" width="540" height="56" rx="6" fill="rgba(255,255,255,0.96)" stroke="#0a5c56" />
          <text x="88" y="844" fill="#0b1018" fontSize="13" fontFamily="inherit">
            Prueba de enlace · longitud · continuidad · ID
          </text>
          <text x="88" y="864" fill="#047857" fontSize="13" fontFamily="inherit">
            D-04 APROBADO · D-11 REVISIÓN · evidencia según alcance
          </text>
        </g>
      ) : null}
    </svg>
  );
}

function IsoOverlay({ step, uid }: { step: number; uid: string }) {
  const on = (n: number) => step >= n;
  const desks = [
    [80, 210],
    [170, 255],
    [260, 300],
    [350, 345],
    [40, 270],
    [130, 315],
    [220, 360],
    [310, 405],
    [0, 330],
    [90, 375],
    [180, 420],
    [270, 465],
  ];
  return (
    <svg className={styles.isoSvg} viewBox="0 0 920 900" role="img" aria-label="Isometría de la planta y elevación del rack">
      <defs>
        <linearGradient id={`${uid}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ece7dc" />
          <stop offset="1" stopColor="#d8d0c4" />
        </linearGradient>
        <linearGradient id={`${uid}-wood`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4f0e8" />
          <stop offset="1" stopColor="#cfc6b8" />
        </linearGradient>
      </defs>
      <text className={styles.planTitle} x="24" y="36">
        ISOMETRÍA · PLANTA ABIERTA + MDF
      </text>
      <polygon points="80,430 400,250 820,430 500,610" fill={`url(#${uid}-floor)`} stroke="#1c2a33" strokeWidth="2" />
      <polygon points="80,430 80,390 400,210 400,250" fill="#c5bdb0" stroke="#1c2a33" strokeWidth="1.4" />
      <polygon points="400,250 400,210 820,390 820,430" fill="#b7b0a4" stroke="#1c2a33" strokeWidth="1.4" />
      <g opacity={0.9}>
        <polygon points="560,470 760,360 820,390 820,470 620,580 560,550" fill={on(0) ? "rgba(10,92,86,0.18)" : "rgba(28,42,51,0.08)"} stroke="#0a5c56" strokeWidth={on(0) ? 2.4 : 1.2} />
        <text className={styles.planNote} x="610" y="430">
          MDF
        </text>
      </g>
      {desks.map(([x, y], i) => (
        <IsoDesk key={i} x={x + 160} y={y} n={i + 1} live={on(2)} tray={on(1)} />
      ))}
      {on(1) ? (
        <g fill="none" stroke="#0a5c56" strokeWidth="7" strokeLinecap="square" opacity="0.88">
          <path d="M200 300 L520 180 L760 300" />
          <path d="M280 340 L280 300" stroke="#12b3ad" strokeWidth="3" />
          <path d="M370 385 L370 255" stroke="#12b3ad" strokeWidth="3" />
          <path d="M460 430 L460 220" stroke="#12b3ad" strokeWidth="3" />
          <path d="M550 475 L550 250" stroke="#12b3ad" strokeWidth="3" />
        </g>
      ) : null}
      {on(2) ? (
        <g>
          <ellipse cx="300" cy="250" rx="22" ry="10" className={styles.ap} />
          <ellipse cx="500" cy="210" rx="22" ry="10" className={styles.ap} />
          <ellipse cx="680" cy="270" rx="22" ry="10" className={styles.ap} />
          <path className={styles.fiber} d="M620 500 L500 560" />
        </g>
      ) : null}
      <g transform="translate(24 620)" opacity={on(3) ? 1 : 0.22}>
        <text className={styles.planTitle} x="0" y="0">
          ELEVACIÓN MDF · RACK 42U
        </text>
        <RackCabinet live={on(3)} terminated={on(3)} labeled={on(3)} />
      </g>
      {on(5) ? (
        <g transform="translate(430 780)">
          <rect width="460" height="88" rx="6" fill="rgba(244,240,232,0.97)" stroke="#0a5c56" />
          <text x="16" y="32" fill="#0b1018" fontSize="14" fontFamily="inherit">
            Entrega: plano · nomenclatura · listado · rack · fotos
          </text>
          <text x="16" y="56" fill="#0a5c56" fontSize="13" fontFamily="inherit">
            Otro técnico puede comprender, mantener y ampliar.
          </text>
          <text x="16" y="76" fill="#3a4550" fontSize="12" fontFamily="inherit">
            Recomendaciones de crecimiento según alcance.
          </text>
        </g>
      ) : null}
    </svg>
  );
}

function IsoDesk({ x, y, n, live, tray }: { x: number; y: number; n: number; live: boolean; tray: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points="0,28 56,0 112,28 56,56" fill="#efe9de" stroke="#5b6d7c" />
      <polygon points="0,28 0,40 56,68 56,56" fill="#cfc6b8" stroke="#5b6d7c" />
      <polygon points="56,56 56,68 112,40 112,28" fill="#b9b0a4" stroke="#5b6d7c" />
      <polygon points="28,18 48,8 78,22 58,32" fill="#dce8ea" stroke="#3a4550" />
      {live ? <rect x="44" y="30" width="16" height="10" rx="1" fill="#0a5c56" /> : null}
      {tray ? <path d="M56 -8 V8" stroke="#12b3ad" strokeWidth="2" /> : null}
      <text className={styles.planTiny} x="56" y="78" textAnchor="middle">
        P-{String(n).padStart(2, "0")}
        {live ? ` · D-${String(n).padStart(2, "0")}` : ""}
      </text>
    </g>
  );
}

function RackCabinet({ live, terminated, labeled }: { live: boolean; terminated: boolean; labeled: boolean }) {
  return (
    <g>
      <polygon points="40,16 360,16 380,36 60,36" fill="#2a333b" />
      <polygon points="360,16 380,36 380,760 360,740" fill="#151b21" />
      <rect x="40" y="36" width="320" height="704" rx="3" fill="#1a2229" stroke="#0b1018" strokeWidth="3" />
      <rect x="54" y="50" width="10" height="676" fill="#3a4550" />
      <rect x="336" y="50" width="10" height="676" fill="#3a4550" />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={`l${i}`} cx="59" cy={66 + i * 48} r="2.1" fill="#8aa0b0" />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={`r${i}`} cx="341" cy={66 + i * 48} r="2.1" fill="#8aa0b0" />
      ))}
      <Patch y={56} label="PP-A · 24P" colored={terminated} />
      <Manager y={112} />
      <Switch y={150} label="SW-ACC-01" live={live} />
      <Manager y={206} />
      <Patch y={244} label="PP-B · 24P" colored={terminated} accent />
      <Switch y={300} label="SW-ACC-02" live={live} />
      <rect x="68" y="368" width="264" height="32" fill="#11181f" stroke="#2a3540" />
      <text className={styles.rackLbl} x="200" y="390" textAnchor="middle">
        ORGANIZADOR HORIZONTAL
      </text>
      <rect x="68" y="412" width="264" height="64" fill="#161d24" stroke="#2a3540" />
      <text className={styles.rackLbl} x="200" y="448" textAnchor="middle">
        PDU · ALIMENTACIÓN
      </text>
      {live
        ? Array.from({ length: 8 }, (_, i) => (
            <rect key={`c${i}`} x={80 + i * 30} y="468" width="8" height="78" fill={i % 2 ? "#12b3ad" : "#0a5c56"} opacity="0.9" />
          ))
        : null}
      <rect x="68" y="560" width="264" height="88" fill="#10161c" stroke="#2a3540" />
      <text className={styles.rackLbl} x="200" y="610" textAnchor="middle">
        UPS / RESPALDO CUANDO APLIQUE
      </text>
      {labeled ? (
        <g>
          <text className={styles.planNote} x="390" y="80" fill="#0a5c56">
            Etiquetado PP-A / D-xx
          </text>
          <text className={styles.planNote} x="390" y="168" fill="#0a5c56">
            Patch cords organizados
          </text>
        </g>
      ) : null}
    </g>
  );
}

function Patch({ y, label, colored, accent }: { y: number; label: string; colored: boolean; accent?: boolean }) {
  return (
    <g transform={`translate(68 ${y})`}>
      <rect width="264" height="48" fill="#0e141a" stroke="#2c3944" />
      {Array.from({ length: 24 }, (_, i) => (
        <rect
          key={i}
          x={6 + (i % 12) * 21}
          y={i < 12 ? 8 : 26}
          width="16"
          height="11"
          rx="1"
          fill={colored ? (accent ? "#c2410c" : i % 3 === 0 ? "#0369a1" : "#0a5c56") : "#2a3540"}
        />
      ))}
      <text className={styles.rackLbl} x="268" y="14">
        {label}
      </text>
    </g>
  );
}

function Switch({ y, label, live }: { y: number; label: string; live: boolean }) {
  return (
    <g transform={`translate(68 ${y})`}>
      <rect width="264" height="48" fill="#121920" stroke="#2c3944" />
      {Array.from({ length: 22 }, (_, i) => (
        <g key={i}>
          <rect x={8 + i * 11} y="18" width="8" height="14" rx="1" fill="#0b1018" stroke="#5b6d7c" />
          <circle cx={12 + i * 11} cy="12" r="1.5" fill={live ? "#12b3ad" : "#3a4550"} />
        </g>
      ))}
      <text className={styles.rackLbl} x="8" y="46">
        {label}
      </text>
    </g>
  );
}

function Manager({ y }: { y: number }) {
  return (
    <g transform={`translate(68 ${y})`}>
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M${10 + i * 22} 4 v22`} stroke="#6b7c88" strokeWidth="3" />
      ))}
    </g>
  );
}
