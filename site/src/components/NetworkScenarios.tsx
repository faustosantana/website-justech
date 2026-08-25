"use client";

import { useState } from "react";
import { TechScene } from "@/components/TechScene";

const scenarios = [
  { id: "oficina", label: "Oficina", note: "Un core, Wi-Fi de densidad media, voz/datos." },
  { id: "sucursal", label: "Sucursal", note: "Estándar repetible: WAN, POS, impresión, Wi-Fi de piso." },
  { id: "campus", label: "Campus", note: "Varios edificios, fibra entre naves, IDS de planta." },
  { id: "almacen", label: "Almacén", note: "Cobertura de piso, handhelds, menos puestos fijos." },
  { id: "multi", label: "Múltiples ubicaciones", note: "Misma identidad, distintos enlaces, un inventario." },
];

export function NetworkScenarios() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="layer-tabs" role="tablist" aria-label="Escenarios de red">
        {scenarios.map((s, idx) => (
          <button key={s.id} type="button" role="tab" aria-selected={idx === i} onClick={() => setI(idx)}>
            {s.label}
          </button>
        ))}
      </div>
      <TechScene scene="network" layer={i} story={1} caption={scenarios[i].note} />
    </div>
  );
}
