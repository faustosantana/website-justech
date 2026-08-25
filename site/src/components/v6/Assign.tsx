"use client";

import { useState } from "react";
import { Live } from "./Live";

const steps = [
  { t: "Organización", d: "Se nombra el tenant. Dirección, finanzas, ventas, operaciones." },
  { t: "Usuarios", d: "Altas con identidad corporativa. El directorio es la fuente." },
  { t: "Licencias", d: "Un pool. Asignación por puesto, con disponibilidad a la vista." },
  { t: "Aplicaciones", d: "Correo, archivos, reuniones. Lo que el trabajo pide." },
  { t: "Gobierno", d: "Políticas, renovación y soporte sobre el mismo tenant." },
];

export function Assign() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="v6-visual" data-visual>
        <Live scene="assign" chapter={i} />
      </div>
      <div className="v6-seg" role="tablist" aria-label="Paso del tenant">
        {steps.map((s, idx) => (
          <button
            key={s.t}
            type="button"
            role="tab"
            aria-selected={idx === i}
            className={idx === i ? "is-on" : ""}
            onClick={() => setI(idx)}
          >
            {s.t}
          </button>
        ))}
      </div>
      <p>
        <strong>
          {i + 1} · {steps[i].t}.
        </strong>{" "}
        {steps[i].d}
      </p>
      <p className="v6-caption">Sin precios ni planes cerrados. Un especialista valida el tenant real.</p>
    </div>
  );
}
