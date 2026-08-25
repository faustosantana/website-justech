"use client";

import { useState } from "react";
import { TechScene } from "@/components/TechScene";

const bays = [
  { t: "Procesamiento", d: "Núcleos según la carga, no según el folleto." },
  { t: "Memoria", d: "Capacidad para picos, no para el idle." },
  { t: "Almacenamiento", d: "Rendimiento, retención y crecimiento." },
  { t: "Redundancia", d: "Discos, fuentes y caminos que se pueden perder." },
  { t: "Red", d: "Uplinks, segmentación y administración." },
  { t: "Energía y UPS", d: "Autonomía para apagar con orden, no para improvisar." },
  { t: "Respaldo", d: "Copias que se restauran, fuera del mismo rack si aplica." },
  { t: "Virtualización", d: "Densidad con cabeza para operar." },
];

const loads = [
  "Archivos y colaboración",
  "Aplicaciones",
  "Virtualización",
  "Respaldo",
  "Sucursal",
  "Base de datos",
  "Crecimiento",
];

export function RackExplorer() {
  const [i, setI] = useState(0);
  const [load, setLoad] = useState(0);
  return (
    <div className="live-block">
      <div className="layer-tabs" role="tablist" aria-label="Carga prevista">
        {loads.map((l, idx) => (
          <button key={l} type="button" role="tab" aria-selected={idx === load} onClick={() => setLoad(idx)}>
            {l}
          </button>
        ))}
      </div>
      <div className="live-split">
        <TechScene scene="rack" layer={i} story={1} caption={loads[load]} />
        <div>
          <div className="layer-tabs" role="tablist" aria-label="Compartimentos del rack">
            {bays.map((b, idx) => (
              <button key={b.t} type="button" role="tab" aria-selected={idx === i} onClick={() => setI(idx)}>
                {b.t}
              </button>
            ))}
          </div>
          <h3>{bays[i].t}</h3>
          <p>{bays[i].d}</p>
          <p className="text-sm">Sin especificaciones inventadas. El diseño sigue a la carga {loads[load].toLowerCase()}.</p>
        </div>
      </div>
    </div>
  );
}
