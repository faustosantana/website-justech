"use client";

import { useState } from "react";
import { TechScene } from "@/components/TechScene";
import { company } from "@/content/site";

const flow = [
  { t: "Usuario", d: "Describe el impacto. No un chat suelto." },
  { t: "Ticket", d: "Entra al portal con historial." },
  { t: "Clasificación", d: "Prioridad y servicio afectados." },
  { t: "N1", d: "Evidencia y primera contención." },
  { t: "N2/N3", d: "Cambio controlado si hace falta." },
  { t: "Cierre", d: "El reportante ve el resultado." },
];

export function TicketFlow() {
  const [i, setI] = useState(0);
  return (
    <div className="ticket-flow">
      <TechScene scene="support" story={(i + 1) / flow.length} layer={i} />
      <ol>
        {flow.map((s, idx) => (
          <li key={s.t}>
            <button type="button" className={idx === i ? "is-on" : ""} onClick={() => setI(idx)}>
              <strong>{s.t}</strong>
              <span>{s.d}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="text-sm text-muted">
        Simulación. Canal real: {company.supportUrl.replace("https://", "")}. Horario: {company.hours}.
      </p>
    </div>
  );
}
