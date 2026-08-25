"use client";

import { useMemo, useState } from "react";
import { TechScene } from "@/components/TechScene";

const scenarios = [
  { id: "oficina", label: "Oficina", layer: 0, note: "Un core, Wi-Fi de densidad media." },
  { id: "sucursal", label: "Sucursal", layer: 1, note: "WAN repetible, piso y POS." },
  { id: "campus", label: "Campus", layer: 2, note: "Varios edificios, fibra entre naves." },
  { id: "almacen", label: "Almacén", layer: 3, note: "Cobertura de piso y handhelds." },
  { id: "multi", label: "Multisucursal", layer: 4, note: "Misma identidad, distintos enlaces." },
];

export function NetworkExplorer() {
  const [scene, setScene] = useState(0);
  const [failed, setFailed] = useState(false);
  const [wan, setWan] = useState(true);
  const current = scenarios[scene];
  const story = failed ? 0.28 : wan ? 1 : 0.55;
  const status = useMemo(() => {
    if (failed) return "Enlace primario caído · redundancia activa";
    return wan ? "Tráfico LAN/WAN en operación" : "Segmento LAN aislado para revisión";
  }, [failed, wan]);

  return (
    <div className="live-block">
      <div className="layer-tabs" role="tablist" aria-label="Escenarios de red">
        {scenarios.map((s, idx) => (
          <button key={s.id} type="button" role="tab" aria-selected={idx === scene} onClick={() => setScene(idx)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="live-split">
        <TechScene scene="network" layer={current.layer} story={story} caption={current.note} />
        <div className="live-controls">
          <p className="stage-note">{status}</p>
          <p className="text-sm">
            Representación educativa del diseño y la operación. No es una plataforma de monitoreo propia.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-paper" onClick={() => setFailed((v) => !v)}>
              {failed ? "Restaurar enlace" : "Simular caída"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setWan((v) => !v)}>
              {wan ? "Ver segmentación" : "Volver a LAN/WAN"}
            </button>
          </div>
          <ul className="spec-list">
            <li>Sede · switch · router · firewall</li>
            <li>Sucursales · access points · usuarios remotos</li>
            <li>Nube · enlace primario y secundario</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
