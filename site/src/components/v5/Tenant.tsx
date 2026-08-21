"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";

const steps = [
  { t: "Organización", d: "Se nombra el tenant. Dirección, finanzas, ventas, operaciones." },
  { t: "Usuarios", d: "Altas con identidad corporativa. El directorio es la fuente." },
  { t: "Licencias", d: "Un pool. Asignación por puesto, con disponibilidad a la vista." },
  { t: "Aplicaciones", d: "Correo, archivos, reuniones. Lo que el trabajo pide." },
  { t: "Gobierno", d: "Políticas, renovación y soporte sobre el mismo tenant." },
];

export function Tenant() {
  const [i, setI] = useState(0);
  const step = steps[i];
  return (
    <div>
      <div className="v5-visual" data-visual>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase("/visual/v5/license.jpg")}
          alt="Consola de tenant. Demostración, sin datos de clientes."
          width={1600}
          height={1067}
        />
      </div>
      <div className="v5-seg" role="tablist" aria-label="Paso del tenant">
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
          {i + 1} · {step.t}.
        </strong>{" "}
        {step.d}
      </p>
      <p className="v5-caption">Sin precios ni planes cerrados. Un especialista valida el tenant real.</p>
    </div>
  );
}
