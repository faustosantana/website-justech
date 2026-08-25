"use client";

import Link from "next/link";
import { useState } from "react";
import { CLOUD_COPY, SECURITY_COPY, V85_BASE } from "@/content/v85";
import styles from "./studios.module.css";

const secBeats = [
  { t: "Identidad y dispositivo en política", d: "El usuario autenticado y el equipo inscrito cumplen el control acordado." },
  { t: "Se detecta un equipo no conforme", d: "Falta cifrado, actualización o inscripción. Se aplica el control del alcance." },
  { t: "Aislamiento conceptual", d: "Se limita el acceso a red o aplicación sin detener el resto de la empresa." },
  { t: "Corrección", d: "Se aplica la política: parche, cifrado o retiro del acceso." },
  { t: "Acceso restablecido", d: "El usuario vuelve a trabajar. El evento queda documentado." },
];

const cloudBeats = [
  { t: "Usuario y archivos en uso", d: "El trabajo ocurre en el puesto, con identidad corporativa." },
  { t: "Copia en la plataforma acordada", d: "Los archivos y el correo tienen una copia según el diseño del servicio." },
  { t: "Incidente o borrado", d: "Un archivo crítico deja de estar disponible en el puesto." },
  { t: "Recuperación", d: "Se restaura desde la copia acordada." },
  { t: "Estado operativo", d: "El usuario continúa. Queda registro de lo recuperado." },
];

export function SecurityDemo({ compact = true }: { compact?: boolean }) {
  const [i, setI] = useState(0);
  const beat = secBeats[i];
  return (
    <section className={styles.story} id="seguridad-demo" aria-labelledby="sec-title" data-demo="sec-86">
      <p className={styles.kickerLight}>Demostración resumida</p>
      <h2 id="sec-title">{SECURITY_COPY.title}</h2>
      <p className={styles.noteLight}>{SECURITY_COPY.body}</p>
      <p className={styles.noteLight}>{SECURITY_COPY.label}</p>
      <div className={styles.storyScene}>
        <SecurityScene beat={i} />
        <ol className={styles.storyRail} aria-label="Capas">
          {["Identidad", "Dispositivo", "Endpoint", "Política", "Red", "Firewall", "Aplicación"].map((n, idx) => (
            <li key={n} data-on={i >= Math.min(idx, 4) ? "1" : "0"} data-iso={i === 2 && idx >= 4 ? "1" : "0"}>
              {n}
            </li>
          ))}
        </ol>
      </div>
      <p aria-live="polite">
        <strong>{beat.t}. </strong>
        {beat.d}
      </p>
      <div className={styles.cableNav}>
        <button type="button" onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0}>
          Anterior
        </button>
        <span>
          {i + 1} / {secBeats.length}
        </span>
        <button type="button" onClick={() => setI((n) => Math.min(secBeats.length - 1, n + 1))} disabled={i === secBeats.length - 1}>
          Siguiente
        </button>
      </div>
      {compact ? (
        <p>
          <Link href={`${V85_BASE}/contacto/?motivo=seguridad`}>Conversar sobre seguridad y gestión</Link>
        </p>
      ) : null}
    </section>
  );
}

function SecurityScene({ beat }: { beat: number }) {
  const isolate = beat === 2;
  const bad = beat >= 1 && beat < 4;
  const fixed = beat >= 3;
  const restored = beat >= 4;
  return (
    <svg className={styles.storySvg} viewBox="0 0 860 320" role="img" aria-label="Escena de un dispositivo no conforme en una oficina">
      <rect x="8" y="8" width="844" height="304" rx="8" fill="#0e161e" />
      <text className={styles.hudLbl} x="24" y="36">
        SEDE · IDENTIDAD + ENDPOINT
      </text>
      <g transform="translate(40 70)">
        <rect x="0" y="40" width="70" height="90" rx="6" fill="#1c2732" stroke="#5b6d7c" />
        <circle cx="35" cy="28" r="18" fill="#d7e2ea" />
        <text className={styles.hudLbl} x="35" y="150" textAnchor="middle">
          Usuario
        </text>
      </g>
      <g transform="translate(160 88)">
        <rect x="0" y="20" width="110" height="70" rx="4" fill="#121920" stroke={bad && !fixed ? "#b91c1c" : "#12b3ad"} strokeWidth="2" />
        <rect x="10" y="30" width="90" height="44" fill="#0b1018" />
        <rect x="30" y="90" width="50" height="8" fill="#3a4550" />
        {isolate ? <rect x="-10" y="8" width="130" height="110" fill="none" stroke="#b91c1c" strokeDasharray="6 4" /> : null}
        <text className={styles.hudLbl} x="55" y="128" textAnchor="middle" fill={bad && !restored ? "#fca5a5" : "#12b3ad"}>
          {restored ? "Conforme" : bad ? "No conforme" : "Inscrito"}
        </text>
      </g>
      <g transform="translate(330 70)">
        <rect x="0" y="20" width="90" height="90" rx="8" fill="#1c2732" stroke="#5b6d7c" />
        <path d="M20 40 h50 M20 55 h50 M20 70 h50 M45 40 v40" stroke="#12b3ad" fill="none" />
        <text className={styles.hudLbl} x="45" y="130" textAnchor="middle">
          Política
        </text>
      </g>
      <g transform="translate(470 88)">
        <rect x="0" y="16" width="100" height="78" rx="4" fill="#1c2732" stroke={isolate ? "#b91c1c" : "#12b3ad"} />
        <path d="M16 32 h68 M16 48 h68 M16 64 h40" stroke="#8aa0b0" />
        <text className={styles.hudLbl} x="50" y="118" textAnchor="middle">
          Firewall
        </text>
      </g>
      <g transform="translate(620 70)">
        <rect x="0" y="24" width="80" height="52" rx="4" fill="#1c2732" stroke="#5b6d7c" />
        <rect x="96" y="24" width="80" height="52" rx="4" fill="#1c2732" stroke="#5b6d7c" />
        <text className={styles.hudLbl} x="40" y="100" textAnchor="middle">
          App A
        </text>
        <text className={styles.hudLbl} x="136" y="100" textAnchor="middle">
          App B
        </text>
        <text className={styles.hudLbl} x="88" y="140" textAnchor="middle">
          Resto de la empresa activo
        </text>
      </g>
      <path
        d="M270 130 H330"
        stroke={isolate ? "#b91c1c" : restored || !bad ? "#12b3ad" : "#f59e0b"}
        strokeWidth="3"
        strokeDasharray={isolate ? "7 5" : "0"}
      />
      <path d="M420 130 H470" stroke={isolate ? "#b91c1c" : "#12b3ad"} strokeWidth="3" />
      <path d="M570 130 H620" stroke="#12b3ad" strokeWidth="3" opacity={isolate ? 0.25 : 1} />
      <text className={styles.hudLbl} x="24" y="292">
        {beat === 0
          ? "Acceso según política"
          : beat === 1
            ? "Alerta: cifrado o inscripción pendiente"
            : beat === 2
              ? "Dispositivo aislado · operación general sigue"
              : beat === 3
                ? "Corrección aplicada"
                : "Acceso restablecido · evento documentado"}
      </text>
    </svg>
  );
}

export function CloudDemo({ compact = true }: { compact?: boolean }) {
  const [i, setI] = useState(0);
  const beat = cloudBeats[i];
  return (
    <section className={styles.story} id="nube-demo" aria-labelledby="cloud-title" data-demo="cloud-86">
      <p className={styles.kickerLight}>Demostración resumida</p>
      <h2 id="cloud-title">{CLOUD_COPY.title}</h2>
      <p className={styles.noteLight}>{CLOUD_COPY.body}</p>
      <p className={styles.noteLight}>{CLOUD_COPY.label}</p>
      <div className={styles.storyScene}>
        <CloudScene beat={i} />
        <ol className={styles.storyRail} aria-label="Historia">
          {["Usuario", "Archivos", "Aplicaciones", "Identidad", "Nube", "Copia", "Recuperación"].map((n, idx) => (
            <li key={n} data-on={i >= Math.min(idx, i) ? "1" : "0"} data-now={idx === Math.min(i + 2, 6) ? "1" : "0"}>
              {n}
            </li>
          ))}
        </ol>
      </div>
      <p aria-live="polite">
        <strong>{beat.t}. </strong>
        {beat.d}
      </p>
      <div className={styles.cableNav}>
        <button type="button" onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0}>
          Anterior
        </button>
        <span>
          {i + 1} / {cloudBeats.length}
        </span>
        <button type="button" onClick={() => setI((n) => Math.min(cloudBeats.length - 1, n + 1))} disabled={i === cloudBeats.length - 1}>
          Siguiente
        </button>
      </div>
      {compact ? (
        <p>
          <Link href={`${V85_BASE}/contacto/?motivo=nube`}>Evaluar respaldo y recuperación</Link>
        </p>
      ) : null}
    </section>
  );
}

function CloudScene({ beat }: { beat: number }) {
  const copied = beat >= 1;
  const incident = beat === 2;
  const restoring = beat >= 3;
  const ok = beat >= 4;
  return (
    <svg className={styles.storySvg} viewBox="0 0 860 320" role="img" aria-label="Escena de copia y recuperación en la nube acordada">
      <rect x="8" y="8" width="844" height="304" rx="8" fill="#0e161e" />
      <text className={styles.hudLbl} x="24" y="36">
        PUESTO · IDENTIDAD · COPIA ACORDADA
      </text>
      <g transform="translate(48 80)">
        <rect x="0" y="20" width="120" height="78" rx="4" fill="#121920" stroke="#5b6d7c" />
        <rect x="12" y="32" width="96" height="48" fill="#0b1018" />
        <text className={styles.hudLbl} x="60" y="122" textAnchor="middle">
          Usuario
        </text>
      </g>
      <g transform="translate(220 78)">
        {["Contrato.pdf", "Correo", "Carpeta finanzas"].map((label, idx) => (
          <g key={label} transform={`translate(0 ${idx * 46})`}>
            <rect
              width="150"
              height="36"
              rx="4"
              fill="#1c2732"
              stroke={incident && idx === 0 ? "#b91c1c" : ok || copied ? "#12b3ad" : "#5b6d7c"}
              strokeDasharray={incident && idx === 0 ? "5 4" : "0"}
            />
            <text className={styles.hudLbl} x="12" y="24">
              {incident && idx === 0 ? "Contrato.pdf — ausente" : label}
            </text>
          </g>
        ))}
      </g>
      <g transform="translate(430 96)">
        <circle cx="36" cy="36" r="28" fill="#1c2732" stroke="#12b3ad" />
        <text className={styles.hudLbl} x="36" y="42" textAnchor="middle">
          ID
        </text>
        <text className={styles.hudLbl} x="36" y="88" textAnchor="middle">
          Identidad
        </text>
      </g>
      <g transform="translate(560 70)">
        <path d="M50 88c-28 0-36-28-16-36 0-32 72-32 80 4 28-8 48 24 16 32z" fill="#1c2732" stroke="#38bdf8" />
        <text className={styles.hudLbl} x="70" y="130" textAnchor="middle">
          Nube acordada
        </text>
        {copied ? (
          <text className={styles.hudLbl} x="70" y="152" textAnchor="middle" fill="#12b3ad">
            {ok ? "Copia + registro" : restoring ? "Restaurando" : "Copia presente"}
          </text>
        ) : null}
      </g>
      <path d="M168 130 H220" stroke="#12b3ad" strokeWidth="3" />
      <path d="M370 130 H402" stroke="#12b3ad" strokeWidth="3" />
      <path
        d="M494 130 H560"
        stroke={copied ? "#38bdf8" : "#5b6d7c"}
        strokeWidth="3"
        strokeDasharray={copied ? "0" : "6 5"}
      />
      {restoring ? <path d="M560 160 C 480 200, 320 200, 280 160" fill="none" stroke="#12b3ad" strokeWidth="3" markerEnd="url(#none)" /> : null}
      <text className={styles.hudLbl} x="24" y="292">
        {beat === 0
          ? "Trabajo en el puesto"
          : beat === 1
            ? "Copia según el diseño del servicio"
            : beat === 2
              ? "El archivo deja de estar en el puesto"
              : beat === 3
                ? "Restauración desde la copia acordada"
                : "Operación continua · registro de lo recuperado"}
      </text>
    </svg>
  );
}

export function ClientShowcase() {
  return null;
}
