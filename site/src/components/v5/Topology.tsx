"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";

const views = [
  { id: "fisica", label: "Física" },
  { id: "logica", label: "Lógica" },
  { id: "seguridad", label: "Seguridad" },
  { id: "multi", label: "Multisucursal" },
] as const;

type ViewId = (typeof views)[number]["id"];

const pins: Record<Exclude<ViewId, "fisica">, { n: number; x: string; y: string; label: string }[]> = {
  logica: [
    { n: 1, x: "90%", y: "44%", label: "Internet / ISP" },
    { n: 2, x: "78%", y: "58%", label: "Borde, firewall, core" },
    { n: 3, x: "52%", y: "22%", label: "Acceso y bandejas" },
    { n: 4, x: "36%", y: "16%", label: "Access points" },
    { n: 5, x: "30%", y: "62%", label: "Puestos" },
  ],
  seguridad: [
    { n: 1, x: "90%", y: "44%", label: "Perímetro" },
    { n: 2, x: "78%", y: "58%", label: "Firewall y VLAN" },
    { n: 3, x: "30%", y: "62%", label: "Piso segmentado" },
  ],
  multi: [
    { n: 1, x: "78%", y: "58%", label: "Sede" },
    { n: 2, x: "90%", y: "44%", label: "Enlace primario" },
  ],
};

const captions: Record<ViewId, string> = {
  fisica: "Sede: ISP, rack, bandejas, APs y puestos.",
  logica: "Internet → borde → firewall → core → acceso → usuarios.",
  seguridad: "El tráfico cruza el firewall antes del core. Las VLAN separan piso y servidores.",
  multi: "La sucursal entra por un enlace propio. El secundario espera.",
};

export function Topology() {
  const [view, setView] = useState<ViewId>("fisica");
  const marks = view === "fisica" ? [] : pins[view];
  return (
    <div>
      <div className="v5-seg" role="tablist" aria-label="Vista de red">
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
      <div className={`v5-visual v5-net v5-net-${view}`} data-visual>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase("/visual/v5/network.jpg")}
          alt="Oficina y rack con cableado estructurado."
          width={1600}
          height={1067}
        />
        {marks.length ? (
          <ol className="v5-pins">
            {marks.map((p) => (
              <li key={p.n} style={{ left: p.x, top: p.y }} title={p.label}>
                <span>{p.n}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
      {marks.length ? (
        <p className="v5-legend">
          {marks.map((p) => (
            <span key={p.n}>
              {p.n} {p.label}
            </span>
          ))}
        </p>
      ) : null}
      <p className="v5-caption">{captions[view]}</p>
    </div>
  );
}
