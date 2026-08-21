"use client";

import { useEffect, useState } from "react";
import { company } from "@/content/site";
import { Live } from "./Live";

const kinds = [
  {
    t: "Conectividad",
    title: "Sucursal sin conectividad",
    d: "Cae el enlace primario. La red pasa a respaldo. Se abre el caso.",
  },
  {
    t: "Acceso",
    title: "Alta o bloqueo de identidad",
    d: "Un puesto cambia. El directorio debe coincidir. N1 evidencia, N2 aplica.",
  },
  {
    t: "Correo",
    title: "Buzón o autenticación",
    d: "El síntoma es el correo. La causa suele ser identidad o el tenant.",
  },
  {
    t: "Equipo",
    title: "Puesto que no inicia",
    d: "Imagen, cifrado o hardware. El portal guarda el historial.",
  },
];

const timeline = ["Usuario", "Portal", "N1", "Diagnóstico", "Corrección", "Validación", "Cierre"];

export function Incident() {
  const [k, setK] = useState(0);
  const [step, setStep] = useState(2);
  const c = kinds[k];
  const netChapter = k === 0 && step < 4 ? 7 : 8;

  useEffect(() => {
    if (k !== 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setStep((s) => (s >= timeline.length - 1 ? 2 : s + 1));
    }, 2200);
    return () => window.clearInterval(id);
  }, [k]);

  return (
    <div>
      <div className="v6-seg" role="tablist" aria-label="Tipo de caso">
        {kinds.map((x, idx) => (
          <button
            key={x.t}
            type="button"
            role="tab"
            aria-selected={idx === k}
            className={idx === k ? "is-on" : ""}
            onClick={() => {
              setK(idx);
              setStep(idx === 0 ? 2 : 1);
            }}
          >
            {x.t}
          </button>
        ))}
      </div>
      <div className="v6-visual" data-visual>
        <Live scene="campus" view="multi" chapter={netChapter} />
      </div>
      <article className="v6-case-meta">
        <p>
          <span className="status">{step === timeline.length - 1 ? "Cerrado" : "En curso"}</span>
          <span style={{ marginLeft: "0.75rem" }}>{c.title}</span>
        </p>
        <p>
          {c.d} Paso {step + 1} de {timeline.length}: {timeline[step]}.
        </p>
        <ol className="v6-stepper" aria-label="Avance del caso">
          {timeline.map((name, idx) => (
            <li key={name}>
              <button
                type="button"
                className={idx === step ? "is-on" : ""}
                aria-current={idx === step ? "step" : undefined}
                onClick={() => setStep(idx)}
              >
                {name}
              </button>
            </li>
          ))}
        </ol>
        <p className="text-sm">Simulación. Horario: {company.hours}.</p>
      </article>
    </div>
  );
}
