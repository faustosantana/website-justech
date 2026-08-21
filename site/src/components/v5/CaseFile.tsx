"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";
import { company } from "@/content/site";

const kinds = [
  {
    t: "Conectividad",
    title: "Sucursal sin conectividad",
    d: "El usuario de piso no llega a sede ni a correo. Se registra, se clasifica y se escala a red.",
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

export function CaseFile() {
  const [k, setK] = useState(0);
  const [step, setStep] = useState(2);
  const c = kinds[k];
  return (
    <div>
      <div className="v5-seg" role="tablist" aria-label="Tipo de caso">
        {kinds.map((x, idx) => (
          <button
            key={x.t}
            type="button"
            role="tab"
            aria-selected={idx === k}
            className={idx === k ? "is-on" : ""}
            onClick={() => {
              setK(idx);
              setStep(1);
            }}
          >
            {x.t}
          </button>
        ))}
      </div>
      <div className="v5-visual" data-visual>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase("/visual/v5/support.jpg")}
          alt="Caso simulado: sucursal sin conectividad."
          width={1600}
          height={1067}
        />
      </div>
      <article className="v5-case-meta">
        <p>
          <span className="status">{step === timeline.length - 1 ? "Cerrado" : "En curso"}</span>
          <span style={{ marginLeft: "0.75rem" }}>{c.title}</span>
        </p>
        <p>
          {c.d} Paso {step + 1} de {timeline.length}: {timeline[step]}.
        </p>
        <ol className="v5-stepper" aria-label="Avance del caso">
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
        <p className="text-sm">
          Simulación. Horario: {company.hours}. Los tiempos se firman, no se publican.
        </p>
      </article>
    </div>
  );
}
