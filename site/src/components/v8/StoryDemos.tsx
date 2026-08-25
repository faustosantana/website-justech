"use client";

import Link from "next/link";
import { useState } from "react";
import { V85_BASE } from "@/content/v85";
import styles from "./studios.module.css";

const secBeats = [
  { t: "Identidad y dispositivo en política", d: "El usuario autenticado y el equipo inscrito cumplen el control acordado." },
  { t: "Se detecta un equipo no conforme", d: "Falta cifrado, actualización o inscripción. No se inventa un SIEM propio." },
  { t: "Aislamiento conceptual", d: "Se limita el acceso a red o aplicación sin apagar el resto de la empresa." },
  { t: "Corrección", d: "Se aplica la política: parche, cifrado o retiro del acceso." },
  { t: "Acceso restablecido", d: "El usuario vuelve a trabajar. El evento queda documentado." },
];

const cloudBeats = [
  { t: "Usuario y archivos en uso", d: "El trabajo ocurre en el puesto, con identidad corporativa." },
  { t: "Copia en la plataforma acordada", d: "Los archivos y el correo tienen una copia según el diseño del servicio." },
  { t: "Incidente o borrado", d: "Un archivo crítico deja de estar disponible en el puesto." },
  { t: "Recuperación", d: "Se restaura desde la copia. Sin cifras de RPO ni RTO inventadas." },
  { t: "Estado operativo", d: "El usuario continúa. Queda registro de lo recuperado." },
];

export function SecurityDemo({ compact = true }: { compact?: boolean }) {
  const [i, setI] = useState(0);
  const beat = secBeats[i];
  return (
    <section className={styles.story} id="seguridad-demo" aria-labelledby="sec-title">
      <p className={styles.kickerLight}>Demostración resumida</p>
      <h2 id="sec-title">Bloquear un dispositivo no conforme sin detener la empresa.</h2>
      <p className={styles.noteLight}>Controles de identidad, endpoint, red y aplicación. No es una plataforma propia de Justech.</p>
      <ol className={styles.storyRail} aria-label="Historia">
        {["Identidad", "Dispositivo", "Endpoint", "Política", "Red", "Firewall", "Aplicación"].map((n, idx) => (
          <li key={n} data-on={i >= Math.min(idx, 4) ? "1" : "0"} data-iso={i === 2 && idx >= 4 ? "1" : "0"}>
            {n}
          </li>
        ))}
      </ol>
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

export function CloudDemo({ compact = true }: { compact?: boolean }) {
  const [i, setI] = useState(0);
  const beat = cloudBeats[i];
  return (
    <section className={styles.story} id="nube-demo" aria-labelledby="cloud-title">
      <p className={styles.kickerLight}>Demostración resumida</p>
      <h2 id="cloud-title">Proteger y recuperar información empresarial.</h2>
      <p className={styles.noteLight}>Nube con un propósito operativo claro. Sin métricas de disponibilidad inventadas.</p>
      <ol className={styles.storyRail} aria-label="Historia">
        {["Usuario", "Archivos", "Aplicaciones", "Identidad", "Nube", "Copia", "Recuperación"].map((n, idx) => (
          <li key={n} data-on={i >= Math.min(idx, i) ? "1" : "0"} data-now={idx === Math.min(i + 2, 6) ? "1" : "0"}>
            {n}
          </li>
        ))}
      </ol>
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

export function ClientShowcase() {
  return null;
}
