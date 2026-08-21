"use client";

import { useState } from "react";
import { company } from "@/content/site";

const kinds = [
  { t: "Conectividad", d: "Sucursal sin enlace. Se clasifica y escala a red." },
  { t: "Correo", d: "Buzón o identidad. N1 evidencia, N2 tenant." },
  { t: "Dispositivo", d: "Puesto que no inicia o no cifra." },
  { t: "Licencia", d: "Asignación o renovación, no un atajo." },
  { t: "Acceso", d: "Alta, baja o MFA. Cambio controlado." },
  { t: "Servidor", d: "Servicio interno. N2/N3 con ventana." },
  { t: "Aplicación", d: "Falla de uso o de integración." },
];

const flow = ["Recibida", "Clasificada", "N1", "N2/N3", "Validación", "Cierre"];

export function SupportConsole() {
  const [k, setK] = useState(0);
  const [step, setStep] = useState(2);
  const kind = kinds[k];
  return (
    <div className="console" data-visual>
      <header className="console-head">
        <span className="mono">portal · soporte.justech.do</span>
        <span className="mono">{flow[step]}</span>
      </header>
      <div className="layer-tabs" role="tablist" aria-label="Ejemplos de caso">
        {kinds.map((x, idx) => (
          <button
            key={x.t}
            type="button"
            role="tab"
            aria-selected={idx === k}
            onClick={() => {
              setK(idx);
              setStep(1);
            }}
          >
            {x.t}
          </button>
        ))}
      </div>
      <p className="console-title">{kind.t}</p>
      <p>{kind.d}</p>
      <ol className="console-flow">
        {flow.map((name, idx) => (
          <li key={name}>
            <button type="button" className={idx === step ? "is-on" : ""} onClick={() => setStep(idx)}>
              {name}
            </button>
          </li>
        ))}
      </ol>
      <p className="text-sm">
        Simulación, sin datos de clientes. Horario publicado: {company.hours}. Sin minutos de SLA en esta página.
      </p>
    </div>
  );
}
