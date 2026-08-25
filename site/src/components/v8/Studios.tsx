"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CableDemo } from "@/components/v8/CableDemo";
import { company } from "@/content/site";
import { HIRE_STEPS, QUOTE_NEEDS, V85_BASE } from "@/content/v85";
import {
  deviceProfiles,
  licenseApps,
  licenseDepts,
  licenseKinds,
} from "@/content/v84";
import { withBase } from "@/lib/paths";
import { track } from "@/lib/events";
import styles from "./studios.module.css";

export { CableDemo };

type Layer = "general" | "red" | "seguridad" | "sucursales";
type NodeState = "live" | "dead" | "wait";

const netStages = [
  "Tráfico por el enlace principal",
  "Pasa por borde y firewall",
  "Llega al core",
  "Se distribuye a acceso",
  "AP, usuarios y servidores",
  "Segmentación visible",
  "Falla el enlace principal",
  "El respaldo toma el tráfico",
  "La operación permanece activa",
  "Evento para soporte",
];

export function NetworkDemo({
  beat,
  playing,
  onPlay,
  onBeat,
}: {
  beat: number;
  playing: boolean;
  onPlay: () => void;
  onBeat: (n: number) => void;
}) {
  const [layer, setLayer] = useState<Layer>("general");
  const [compact, setCompact] = useState(false);
  const primaryDead = beat >= 6 && beat < 9;
  const backup = beat >= 7;
  const live = beat >= 1;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const vis = (group: Layer | "all") => {
    if (layer === "general" || group === "all") return 1;
    return layer === group ? 1 : 0.16;
  };

  const st = {
    isp1: primaryDead ? "dead" : live ? "live" : "wait",
    isp2: backup ? "live" : "wait",
    edge: live || backup ? "live" : "wait",
    fw: beat >= 1 || backup ? "live" : "wait",
    core: beat >= 2 || backup ? "live" : "wait",
    access: beat >= 3 || backup ? "live" : "wait",
    edgeAccess: beat >= 4 || backup ? "live" : "wait",
    cloud: beat >= 6 || backup ? "live" : "wait",
    mon: beat >= 7 ? "live" : "wait",
    branch: backup ? "live" : beat >= 4 ? "wait" : "wait",
  } as const;

  return (
    <section className={styles.lab} id="red" aria-labelledby="red-title">
      <div className={styles.labInner}>
        <div className={styles.labHead}>
          <div>
            <p className={styles.kicker}>Acto técnico</p>
            <h2 id="red-title">Una sede con enlace principal y respaldo.</h2>
            <p className={styles.note}>Demostración conceptual de arquitectura · ISP, borde, firewall, core, acceso, Wi-Fi, servidores, sucursal y nube.</p>
            <p>
              <Link href={`${V85_BASE}/redes-empresariales/`}>Ver redes empresariales</Link>
            </p>
            <p className={styles.liveLine} aria-live="polite">
              {netStages[Math.min(beat, netStages.length - 1)]}
            </p>
          </div>
          <div className={styles.layers} role="group" aria-label="Capas">
            {(["general", "red", "seguridad", "sucursales"] as Layer[]).map((id) => (
              <button key={id} type="button" aria-pressed={layer === id} onClick={() => setLayer(id)}>
                {id === "general" ? "General" : id === "red" ? "Red" : id === "seguridad" ? "Seguridad" : "Sucursales"}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.netStage}>
          <div className={styles.svgWrap} data-compact={compact ? "1" : "0"}>
            {compact ? (
              <MobileNet vis={vis} st={st} live={live} backup={backup} primaryDead={primaryDead} beat={beat} />
            ) : (
              <DeskNet vis={vis} st={st} live={live} backup={backup} primaryDead={primaryDead} beat={beat} />
            )}
          </div>
          <aside className={styles.netHud} aria-label="Estado de la demostración">
            <p>
              <strong>ISP principal</strong>
              <span data-k={primaryDead ? "dead" : live ? "live" : "wait"}>{primaryDead ? "Fuera de servicio" : live ? "Activo" : "En espera"}</span>
            </p>
            <p>
              <strong>ISP respaldo</strong>
              <span data-k={backup ? "live" : "wait"}>{backup ? "Toma el tráfico" : "En espera"}</span>
            </p>
            <p>
              <strong>Borde / firewall</strong>
              <span data-k={live || backup ? "live" : "wait"}>{live || backup ? "Operativo" : "En espera"}</span>
            </p>
            <p>
              <strong>Sucursal</strong>
              <span data-k={backup ? "live" : beat >= 4 ? "wait" : "wait"}>{backup ? "Continúa por respaldo" : "Observación"}</span>
            </p>
            <p className={styles.hudNote}>Demostración conceptual. Sin cifras de disponibilidad.</p>
          </aside>
        </div>
        <div className={styles.legend} aria-hidden="true">
          <span data-k="live">Enlace activo</span>
          <span data-k="backup">Respaldo</span>
          <span data-k="dead">Fuera de servicio</span>
        </div>
        <div className={styles.row}>
          <button type="button" className={styles.cta} onClick={onPlay}>
            {playing ? "Pausar" : "Reproducir"}
          </button>
          <button type="button" className={styles.ghost} onClick={() => onBeat(6)}>
            Fallar enlace
          </button>
          <button type="button" className={styles.ghost} onClick={() => onBeat(7)}>
            Activar respaldo
          </button>
          <button
            type="button"
            className={styles.ghost}
            onClick={() => {
              onBeat(9);
              document.getElementById("soporte-demo")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Abrir caso
          </button>
        </div>
      </div>
    </section>
  );
}

function DeskNet({
  vis,
  st,
  live,
  backup,
  primaryDead,
  beat,
}: {
  vis: (g: Layer | "all") => number;
  st: Record<string, string>;
  live: boolean;
  backup: boolean;
  primaryDead: boolean;
  beat: number;
}) {
  const dist = beat >= 3 || backup;
  const edge = beat >= 4 || backup;
  return (
    <svg viewBox="0 0 1020 560" role="img" aria-label="Topología empresarial de demostración">
      <CableDefs />
      <path className={`${styles.cable} ${primaryDead ? styles.cableDead : live ? styles.cableLive : ""}`} d="M118 78 H210 V168 H268" />
      <path className={`${styles.cable} ${backup ? styles.cableBackup : ""}`} d="M118 248 H210 V168 H268" />
      <path className={`${styles.cable} ${live || backup ? styles.cableLive : ""}`} d="M348 168 H418" />
      <path className={`${styles.cable} ${beat >= 2 || backup ? styles.cableLive : ""}`} d="M508 168 H572" />
      <path className={`${styles.cable} ${dist ? styles.cableLive : ""}`} d="M708 160 H760 V72" />
      <path className={`${styles.cable} ${dist ? styles.cableLive : ""}`} d="M708 176 H760 V248" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M868 78 H930" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M868 168 H930" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M868 258 H930" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M640 210 V318" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M640 348 H760" />
      <path className={`${styles.cable} ${beat >= 6 || backup ? styles.cableLive : ""}`} d="M880 348 H980 V78 H930" />
      <path className={`${styles.cable} ${backup ? styles.cableBackup : ""}`} d="M300 430 H210 V248" />
      <g opacity={vis("red")}>
        <Isp x={28} y={42} label="ISP principal" state={st.isp1 as NodeState} />
        <Isp x={28} y={212} label="ISP respaldo" state={st.isp2 as NodeState} />
        <Edge x={268} y={140} label="Router de borde" state={st.edge as NodeState} />
        <Core x={572} y={140} label="Core switch" state={st.core as NodeState} />
        <Access x={760} y={48} label="Switch acceso A" state={st.access as NodeState} />
        <Access x={760} y={224} label="Switch acceso B" state={st.access as NodeState} />
        <Ap x={930} y={48} label="Access point" state={st.edgeAccess as NodeState} />
        <UserNode x={930} y={140} label="Usuarios" state={st.edgeAccess as NodeState} />
        <Printer x={930} y={230} label="Telefonía / impresión" state={st.edgeAccess as NodeState} />
      </g>
      <g opacity={vis("seguridad")}>
        <Firewall x={418} y={140} label="Firewall" state={st.fw as NodeState} />
        <Monitor x={930} y={430} label="Monitoreo" state={st.mon as NodeState} />
      </g>
      <g opacity={vis("sucursales")}>
        <Server x={572} y={318} label="Servidores" state={st.edgeAccess as NodeState} />
        <Storage x={760} y={318} label="Almacenamiento" state={st.edgeAccess as NodeState} />
        <CloudNode x={930} y={318} label="Nube" state={st.cloud as NodeState} />
        <Branch x={268} y={400} label="Sucursal" state={st.branch as NodeState} />
      </g>
    </svg>
  );
}

function MobileNet({
  vis,
  st,
  live,
  backup,
  primaryDead,
  beat,
}: {
  vis: (g: Layer | "all") => number;
  st: Record<string, string>;
  live: boolean;
  backup: boolean;
  primaryDead: boolean;
  beat: number;
}) {
  const dist = beat >= 3 || backup;
  const edge = beat >= 4 || backup;
  return (
    <svg viewBox="0 0 360 980" role="img" aria-label="Topología vertical de demostración">
      <CableDefs />
      <path className={`${styles.cable} ${primaryDead ? styles.cableDead : live ? styles.cableLive : ""}`} d="M180 88 V128" />
      <path className={`${styles.cable} ${backup ? styles.cableBackup : ""}`} d="M64 168 H180 V128" />
      <path className={`${styles.cable} ${live || backup ? styles.cableLive : ""}`} d="M180 196 V236" />
      <path className={`${styles.cable} ${beat >= 2 || backup ? styles.cableLive : ""}`} d="M180 304 V344" />
      <path className={`${styles.cable} ${dist ? styles.cableLive : ""}`} d="M180 412 V452" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M64 500 H180 V452" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M296 500 H180" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M180 520 V560" />
      <path className={`${styles.cable} ${edge ? styles.cableLive : ""}`} d="M180 628 V668" />
      <path className={`${styles.cable} ${beat >= 6 || backup ? styles.cableLive : ""}`} d="M180 736 V776" />
      <path className={`${styles.cable} ${backup ? styles.cableBackup : ""}`} d="M180 884 V776" />
      <g opacity={vis("red")}>
        <Isp x={118} y={16} label="ISP principal" state={st.isp1 as NodeState} />
        <Isp x={16} y={128} label="ISP respaldo" state={st.isp2 as NodeState} />
        <Edge x={118} y={128} label="Borde" state={st.edge as NodeState} />
        <Core x={86} y={344} label="Core" state={st.core as NodeState} />
        <Access x={118} y={452} label="Acceso" state={st.access as NodeState} />
        <Ap x={16} y={500} label="AP" state={st.edgeAccess as NodeState} />
        <UserNode x={232} y={500} label="Usuarios" state={st.edgeAccess as NodeState} />
      </g>
      <g opacity={vis("seguridad")}>
        <Firewall x={118} y={236} label="Firewall" state={st.fw as NodeState} />
        <Monitor x={118} y={884} label="Monitoreo" state={st.mon as NodeState} />
      </g>
      <g opacity={vis("sucursales")}>
        <Server x={118} y={560} label="Servidores" state={st.edgeAccess as NodeState} />
        <Storage x={118} y={668} label="Almacenamiento" state={st.edgeAccess as NodeState} />
        <CloudNode x={118} y={776} label="Nube" state={st.cloud as NodeState} />
        <Branch x={232} y={128} label="Sucursal" state={st.branch as NodeState} />
      </g>
    </svg>
  );
}

function CableDefs() {
  return (
    <defs>
      <marker id="flow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0 0 L7 3 L0 6 Z" fill="#12b3ad" />
      </marker>
      <marker id="flowB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0 0 L7 3 L0 6 Z" fill="#38bdf8" />
      </marker>
    </defs>
  );
}

function frame(state: NodeState) {
  return `${styles.node} ${state === "live" ? styles.nodeLive : state === "dead" ? styles.nodeDead : styles.nodeWait}`;
}

function Isp({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle className={frame(state)} cx="44" cy="28" r="26" />
      <path className={styles.glyph} d="M28 28h32M44 14v28M34 20c8-8 12-8 20 0M34 36c8 8 12 8 20 0" />
      <text className={styles.label} x="44" y="68" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Edge({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className={frame(state)} d="M8 10 H86 L94 38 H0 Z" />
      {[12, 24, 36, 48, 60, 72].map((px) => (
        <rect key={px} x={px} y="22" width="8" height="10" rx="1" className={styles.port} />
      ))}
      <text className={styles.label} x="47" y="58" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Firewall({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className={frame(state)} x="6" y="4" width="78" height="48" rx="2" />
      <path className={styles.glyph} d="M18 10h54M18 18h54M18 26h54M18 34h54M45 10v32" />
      <path className={styles.glyph} d="M32 14 l13-6 13 6v14l-13 8-13-8z" />
      <text className={styles.label} x="45" y="68" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Core({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className={frame(state)} width="136" height="44" rx="3" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} className={styles.port} x={8 + i * 10} y="10" width="7" height="10" rx="1" />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={`b${i}`} className={styles.port} x={8 + i * 10} y="24" width="7" height="10" rx="1" />
      ))}
      <circle className={styles.led} cx="128" cy="12" r="2.2" />
      <text className={styles.label} x="68" y="60" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Access({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className={frame(state)} width="108" height="36" rx="3" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} className={styles.port} x={8 + i * 12} y="14" width="8" height="12" rx="1" />
      ))}
      <circle className={styles.led} cx="100" cy="10" r="2" />
      <text className={styles.label} x="54" y="52" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Ap({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse className={frame(state)} cx="36" cy="22" rx="28" ry="16" />
      <circle cx="36" cy="22" r="5" className={styles.port} />
      <path className={styles.glyph} d="M22 12c8-8 20-8 28 0M18 8c12-12 28-12 40 0" />
      <text className={styles.label} x="36" y="52" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function UserNode({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className={frame(state)} d="M16 8 h48 l10 22 H6 Z" />
      <rect className={frame(state)} x="10" y="30" width="52" height="8" rx="1" />
      <text className={styles.label} x="36" y="54" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Printer({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className={frame(state)} x="18" y="4" width="44" height="14" rx="2" />
      <rect className={frame(state)} x="8" y="16" width="64" height="22" rx="3" />
      <rect className={styles.port} x="22" y="22" width="36" height="10" />
      <text className={styles.label} x="40" y="54" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Server({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className={frame(state)} width="92" height="48" rx="2" />
      <rect className={styles.bay} x="10" y="8" width="72" height="14" rx="1" />
      <rect className={styles.bay} x="10" y="26" width="72" height="14" rx="1" />
      <circle className={styles.led} cx="18" cy="15" r="2" />
      <circle className={styles.led} cx="18" cy="33" r="2" />
      <text className={styles.label} x="46" y="64" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Storage({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className={frame(state)} width="92" height="48" rx="2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className={styles.bay} x={10 + i * 18} y="10" width="16" height="28" rx="1" />
      ))}
      <text className={styles.label} x="46" y="64" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function CloudNode({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className={frame(state)} d="M28 40c-14 0-18-14-8-18 0-16 36-16 40 2 14-4 24 12 8 16z" />
      <text className={styles.label} x="40" y="58" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Branch({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path className={frame(state)} d="M16 42 V22 L46 8 L76 22 V42 H16Z" />
      <rect className={styles.port} x="34" y="28" width="10" height="14" />
      <rect className={styles.port} x="50" y="24" width="12" height="8" />
      <text className={styles.label} x="46" y="58" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function Monitor({ x, y, label, state }: { x: number; y: number; label: string; state: NodeState }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className={frame(state)} x="6" y="4" width="72" height="42" rx="3" />
      <path className={styles.glyph} d="M16 34 L28 22 40 28 52 16 66 24" />
      <rect className={styles.port} x="36" y="46" width="12" height="6" />
      <text className={styles.label} x="42" y="68" textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

export function DeviceDemo({ compact = false }: { compact?: boolean }) {
  const [profile, setProfile] = useState(0);
  const [step, setStep] = useState(0);
  const item = deviceProfiles[profile];
  const pipeline = compact ? HIRE_STEPS.filter((_, i) => i % 2 === 0) : HIRE_STEPS;
  const stage = pipeline[Math.min(step, pipeline.length - 1)];
  return (
    <section className={styles.studio} id="equipos" aria-labelledby="eq-title">
      <p className={styles.kickerLight}>Suministro</p>
      <h2 id="eq-title">Incorporación de un nuevo colaborador.</h2>
      <div className={styles.profiles} role="tablist" aria-label="Perfiles de puesto">
        {deviceProfiles.map((p, i) => (
          <button key={p.id} type="button" role="tab" aria-selected={profile === i} onClick={() => { setProfile(i); setStep(0); }}>
            {p.t}
          </button>
        ))}
      </div>
      <div className={styles.split} key={item.id}>
        <figure className={styles.photo}>
          <picture>
            <source srcSet={withBase(`/visual/v8/${item.photo}.webp`)} type="image/webp" />
            <img src={withBase(`/visual/v8/${item.photo}.jpg`)} alt={`Puesto ${item.t}`} width={1400} height={788} loading="lazy" />
          </picture>
          <ol className={styles.hireOverlay} aria-hidden="true">
            {pipeline.map((s, i) => (
              <li key={s} data-on={i <= step ? "1" : "0"} data-now={i === step ? "1" : "0"}>
                {s}
              </li>
            ))}
          </ol>
          <figcaption>
            {item.t} · {stage}
          </figcaption>
        </figure>
        <div className={styles.meta}>
          <div className={styles.pipe} aria-label="Proceso de incorporación">
            {pipeline.map((s, i) => (
              <button key={s} type="button" aria-current={i === step ? "step" : undefined} onClick={() => setStep(i)}>
                {s}
              </button>
            ))}
          </div>
          <p>
            {item.context} En esta etapa: {stage.toLowerCase()}.
          </p>
          <dl className={styles.dl}>
            <div>
              <dt>Movilidad</dt>
              <dd>{item.mobility}</dd>
            </div>
            <div>
              <dt>Seguridad</dt>
              <dd>{item.security}</dd>
            </div>
            <div>
              <dt>Aplicaciones</dt>
              <dd>{item.apps}</dd>
            </div>
            <div>
              <dt>Accesorios</dt>
              <dd>{item.extras}</dd>
            </div>
          </dl>
          <p className={styles.noteLight}>Recomendación conceptual. Sin modelos ni precios. Cotizamos; no hay «comprar ahora».</p>
          {compact ? (
            <p>
              <Link href={`${V85_BASE}/equipos-empresariales/`}>Ver equipos empresariales</Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

const licenseSteps = [
  "Organización",
  "Usuarios",
  "Departamentos",
  "Licencias",
  "Asignación",
  "Aplicaciones",
  "Políticas",
  "Utilización",
  "Renovación",
];

export function LicenseDemo({ compact = false }: { compact?: boolean }) {
  const [dept, setDept] = useState(0);
  const [users, setUsers] = useState(10);
  const [kind, setKind] = useState(0);
  const [apps, setApps] = useState<string[]>(["Correo"]);
  const [policy, setPolicy] = useState(false);
  const [phase, setPhase] = useState(0);
  const assigned = Math.min(users, kind === 2 ? users : Math.max(users - 1, 1));
  return (
    <section className={styles.studio} id="licencias" aria-labelledby="lic-title">
      <p className={styles.kickerLight}>Demostración del proceso</p>
      <h2 id="lic-title">Incorporar diez usuarios a un departamento.</h2>
      <ol className={styles.stepper} aria-label="Etapas">
        {licenseSteps.map((s, i) => (
          <li key={s} data-on={i <= phase ? "1" : "0"}>
            {s}
          </li>
        ))}
      </ol>
      <div className={styles.split}>
        <div>
          <p className={styles.org}>Organización de demostración · {licenseDepts[dept]}</p>
          <div className={styles.depts}>
            {licenseDepts.map((d, i) => (
              <button
                key={d}
                type="button"
                aria-pressed={dept === i}
                onClick={() => {
                  setDept(i);
                  setPhase(2);
                }}
              >
                {d}
              </button>
            ))}
          </div>
          <div className={styles.users}>
            <button
              type="button"
              onClick={() => {
                setUsers((n) => Math.max(3, n - 1));
                setPhase(1);
              }}
              aria-label="Quitar usuario"
            >
              −
            </button>
            <span>{users} usuarios de demostración</span>
            <button
              type="button"
              onClick={() => {
                setUsers((n) => Math.min(16, n + 1));
                setPhase(1);
              }}
              aria-label="Añadir usuario"
            >
              +
            </button>
          </div>
          <div className={styles.seats} aria-hidden="true">
            {Array.from({ length: users }, (_, i) => (
              <span key={i} data-on={i < assigned ? "1" : "0"} />
            ))}
          </div>
          <ul className={styles.dirGrid} aria-label="Directorio de demostración">
            {Array.from({ length: users }, (_, i) => (
              <li key={i} data-on={i < assigned ? "1" : "0"}>
                <strong>U-{String(i + 1).padStart(2, "0")}</strong>
                <span>{i < assigned ? licenseKinds[kind] : "Sin asiento"}</span>
              </li>
            ))}
          </ul>
          <div className={styles.depts}>
            {licenseKinds.map((k, i) => (
              <button
                key={k}
                type="button"
                aria-pressed={kind === i}
                onClick={() => {
                  setKind(i);
                  setPhase(3);
                }}
              >
                {k}
              </button>
            ))}
          </div>
          <div className={styles.apps}>
            {licenseApps.map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={apps.includes(a)}
                onClick={() => {
                  setApps((list) => (list.includes(a) ? list.filter((x) => x !== a) : [...list, a]));
                  setPhase(5);
                }}
              >
                {a}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.policy}
            aria-pressed={policy}
            onClick={() => {
              setPolicy((v) => !v);
              setPhase(6);
            }}
          >
            {policy ? "Política de acceso activa" : "Activar política de acceso (conceptual)"}
          </button>
        </div>
        <div className={styles.meta}>
          <p>
            {licenseDepts[dept]} con {licenseKinds[kind]}. Aplicaciones: {apps.join(", ") || "ninguna"}.
          </p>
          <p>
            Asignadas {assigned} · disponibles {users - assigned}.
          </p>
          <div className={styles.meter} aria-hidden="true">
            <span style={{ width: `${(assigned / users) * 100}%` }} />
          </div>
          <p>Revisión de utilización en esta demostración: {Math.round((assigned / users) * 100)}%.</p>
          <p className={styles.noteLight}>Renovación: próximo ciclo de revisión. Sin precios ni sello de partner.</p>
          {compact ? (
            <p>
              <Link href={`${V85_BASE}/licenciamiento/`}>Ver licenciamiento</Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SupportDemo({ beat, onWatchNet }: { beat: number; onWatchNet: () => void }) {
  const steps = [
    "Falla el enlace",
    "Entra el respaldo",
    "Se registra el incidente",
    "Se crea el ticket",
    "Se clasifica",
    "Se asigna",
    "Se diagnostica",
    "Se corrige",
    "El usuario valida",
    "Se documenta y cierra",
  ];
  const idx = Math.min(Math.max(beat - 6, 0), 9);
  const status = idx >= 9 ? "Cerrado" : idx >= 2 ? "En curso" : "Detectado";
  const activity =
    idx >= 9
      ? "Caso documentado y cerrado. La sucursal opera por el enlace de respaldo o el principal restablecido."
      : idx >= 7
        ? "Corrección aplicada. Pendiente de validación con el usuario de la sucursal."
        : idx >= 5
          ? "Especialista de redes en diagnóstico. Cruza topología, ISP y último cambio."
          : idx >= 2
            ? "Incidente registrado. Continuidad por ISP de respaldo."
            : "Enlace principal fuera de servicio.";
  const log = [
    "Evento de conectividad en sucursal Norte.",
    "Tráfico conmutado al ISP secundario.",
    "Ticket JT-1042 abierto desde la red.",
    "Prioridad: operación de sucursal.",
    "Asignado a especialista de redes.",
    "Diagnóstico: enlace primario inalcanzable.",
    "Coordinación con ISP / validación de borde.",
    "Usuario confirma acceso a sistemas.",
    "Cierre con nota y topología adjunta.",
  ];
  return (
    <section className={styles.studio} id="soporte-demo" aria-labelledby="sup-title">
      <p className={styles.kickerLight}>Caso de demostración</p>
      <h2 id="sup-title">Sucursal sin conectividad.</h2>
      <p className={styles.noteLight}>
        El ticket nace del evento de red. No es un chat suelto: hay responsable, diagnóstico, validación y cierre.
      </p>
      <article className={styles.ticket}>
        <header>
          <div>
            <strong>JT-1042</strong>
            <span className={styles.pill} data-s={status}>
              {status}
            </span>
          </div>
          <button type="button" className={styles.ghost} onClick={onWatchNet}>
            Ver en la red
          </button>
        </header>
        <svg className={styles.miniNet} viewBox="0 0 520 72" aria-hidden="true">
          <rect x="8" y="18" width="90" height="36" rx="4" fill={beat >= 6 && beat < 9 ? "#7f1d1d" : "#0a5c56"} />
          <text x="53" y="42" textAnchor="middle" fill="#f4f1ea" fontSize="11">
            ISP-1
          </text>
          <rect x="140" y="18" width="90" height="36" rx="4" fill={beat >= 7 ? "#0a5c56" : "#3a4550"} />
          <text x="185" y="42" textAnchor="middle" fill="#f4f1ea" fontSize="11">
            ISP-2
          </text>
          <rect x="272" y="18" width="100" height="36" rx="4" fill="#12263a" stroke="#12b3ad" />
          <text x="322" y="42" textAnchor="middle" fill="#e8eef4" fontSize="11">
            Sucursal
          </text>
          <rect x="412" y="18" width="96" height="36" rx="4" fill="#12263a" />
          <text x="460" y="42" textAnchor="middle" fill="#e8eef4" fontSize="11">
            Ticket
          </text>
          <path d="M98 36 H140" stroke={beat >= 6 && beat < 9 ? "#b91c1c" : "#12b3ad"} strokeWidth="3" />
          <path d="M230 36 H272" stroke={beat >= 7 ? "#38bdf8" : "#5b6d7c"} strokeWidth="3" />
          <path d="M372 36 H412" stroke={beat >= 8 ? "#12b3ad" : "#5b6d7c"} strokeWidth="3" />
        </svg>
        <p className={styles.netLink} data-on={beat >= 6 ? "1" : "0"}>
          Origen: laboratorio de red · ISP principal {beat >= 6 && beat < 9 ? "fuera de servicio" : "en observación"}
        </p>
        <dl className={styles.ticketMeta}>
          <div>
            <dt>Sede</dt>
            <dd>Sucursal Norte</dd>
          </div>
          <div>
            <dt>Categoría</dt>
            <dd>Enlace</dd>
          </div>
          <div>
            <dt>Etapa</dt>
            <dd>{steps[idx]}</dd>
          </div>
          <div>
            <dt>Responsable</dt>
            <dd>Especialista de redes</dd>
          </div>
        </dl>
        <p className={styles.activity} aria-live="polite">
          {activity}
        </p>
        <ol>
          {steps.map((s, i) => (
            <li key={s} data-on={i <= idx ? "1" : "0"} data-now={i === idx ? "1" : "0"}>
              {s}
            </li>
          ))}
        </ol>
        <ul className={styles.activityLog} aria-label="Actividad">
          {log.slice(0, Math.min(idx + 1, log.length)).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p>
          <Link href={`${V85_BASE}/soporte-tecnico-empresarial/`}>Ver soporte técnico empresarial</Link>
        </p>
      </article>
    </section>
  );
}

export function QuoteFlow({ initial, onDone }: { initial?: string; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState(initial ?? "");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [extra, setExtra] = useState("");
  const [err, setErr] = useState("");
  const cfg = QUOTE_NEEDS.find((n) => n.id === need);
  const labels = ["Necesidad", "Datos", "Confirmar"];

  useEffect(() => {
    if (initial) {
      setNeed(initial);
      setStep(0);
    }
  }, [initial]);

  function next(e: FormEvent) {
    e.preventDefault();
    if (step === 0 && !need) {
      setErr("Seleccione qué necesita resolver.");
      return;
    }
    if (step === 1 && (!name || !org || !email || !extra)) {
      setErr("Complete los campos para continuar.");
      return;
    }
    setErr("");
    if (step === 0) track("quote_start", { need });
    if (step < 2) setStep(step + 1);
    else {
      track("quote_submit", { need });
      onDone();
    }
  }

  const summary = useMemo(
    () => `${cfg?.t ?? "—"} · ${extra || "sin detalle"} · ${name} · ${org} · ${email}`,
    [cfg, extra, name, org, email],
  );

  return (
    <section className={styles.quote} id="conversar">
      <h2>¿Qué necesita resolver?</h2>
      <p>
        {company.phoneDisplay} · {company.email}
      </p>
      <div className={styles.progress} aria-hidden="true">
        {labels.map((l, i) => (
          <span key={l} data-on={i <= step ? "1" : "0"}>
            {i + 1}. {l}
          </span>
        ))}
      </div>
      <form onSubmit={next} data-step={step} noValidate>
        {step === 0 ? (
          <div className={styles.needs} role="radiogroup" aria-label="Necesidad">
            {QUOTE_NEEDS.map((n) => (
              <label key={n.id} data-on={need === n.id ? "1" : "0"}>
                <input
                  type="radio"
                  name="need"
                  value={n.id}
                  checked={need === n.id}
                  onChange={() => {
                    setNeed(n.id);
                    setErr("");
                  }}
                />
                {n.t}
              </label>
            ))}
          </div>
        ) : null}
        {step === 1 && cfg ? (
          <>
            <label>
              Nombre
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            </label>
            <label>
              Empresa
              <input value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" required />
            </label>
            <label>
              Correo corporativo
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required />
            </label>
            <label>
              {cfg.extra}
              <select value={extra} onChange={(e) => setExtra(e.target.value)} required>
                <option value="" disabled>
                  Seleccione
                </option>
                {cfg.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          </>
        ) : null}
        {step === 2 ? (
          <p role="status">
            Resumen: {summary}. Al confirmar acepta ser contactado sobre esta solicitud.
          </p>
        ) : null}
        {err ? (
          <p className={styles.formErr} role="alert">
            {err}
          </p>
        ) : null}
        <p className={styles.privacy}>
          Usamos estos datos para contactarle sobre esta solicitud.{" "}
          <a href="/politica-de-privacidad/">Privacidad</a>
        </p>
        <div className={styles.row}>
          {step > 0 ? (
            <button type="button" className={styles.ghost} onClick={() => setStep((n) => n - 1)}>
              Atrás
            </button>
          ) : null}
          <button type="submit" className={styles.cta}>
            {step === 2 ? "Confirmar" : "Continuar"}
          </button>
        </div>
      </form>
    </section>
  );
}
