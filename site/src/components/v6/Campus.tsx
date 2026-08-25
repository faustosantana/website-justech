"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";
import { Live } from "./Live";

const views = [
  { id: "fisica", label: "Física" },
  { id: "logica", label: "Lógica" },
  { id: "seguridad", label: "Seguridad" },
  { id: "multi", label: "Multisucursal" },
] as const;

export function Campus() {
  const [view, setView] = useState<(typeof views)[number]["id"]>("fisica");
  return (
    <div>
      <div className="v6-seg" role="tablist" aria-label="Vista de red">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={view === v.id}
            className={view === v.id ? "is-on" : ""}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div className="v6-visual" data-visual>
        {view === "fisica" ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/visual/v5/network.jpg")} alt="Oficina y rack con cableado estructurado." width={1600} height={1067} />
            <Live scene="campus" view="logica" className="v6-ghost" />
          </>
        ) : (
          <Live scene="campus" view={view} chapter={view === "multi" ? 8 : 2} />
        )}
      </div>
      <p className="v6-caption">
        {view === "fisica" && "Sede: ISP, rack, bandejas, APs y puestos. El canvas marca el tráfico."}
        {view === "logica" && "Internet → borde → firewall → core → acceso → APs → usuarios. Los switches muestran puertos."}
        {view === "seguridad" && "El tráfico cruza el firewall. VLAN de piso separada de servidores."}
        {view === "multi" && "Sucursal por enlace propio. El secundario espera en discontinuo."}
      </p>
    </div>
  );
}
