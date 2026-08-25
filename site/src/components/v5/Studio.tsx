"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";

const profiles = [
  {
    t: "Administrativo",
    d: "Puesto de oficina, imagen estándar, cifrado y soporte de mesa.",
    attrs: [
      ["Uso", "Escritorio, movilidad ocasional"],
      ["Pantalla", "Estándar, videoconferencia"],
      ["Seguridad", "Cifrado e imagen corporativa"],
      ["Entrega", "Inventario y garantía"],
      ["Soporte", "Portal y RMA según contrato"],
    ],
  },
  {
    t: "Ejecutivo",
    d: "Ligero, autonomía larga y reuniones sin fricción.",
    attrs: [
      ["Uso", "Viaje y sede"],
      ["Pantalla", "Nítida, cámara fiable"],
      ["Seguridad", "Cifrado y acceso controlado"],
      ["Autonomía", "Jornada completa"],
      ["Soporte", "Reposición con criterio"],
    ],
  },
  {
    t: "Movilidad",
    d: "Ventas y campo: peso, batería y conectividad.",
    attrs: [
      ["Uso", "Fuera de oficina"],
      ["Peso", "Prioridad sobre núcleos extra"],
      ["Conectividad", "Wi-Fi y celular a evaluar"],
      ["Seguridad", "Imagen y localización"],
      ["Garantía", "Cobertura de movilidad"],
    ],
  },
  {
    t: "Diseño",
    d: "Color, pantalla y almacenamiento local, cerrados en cotización.",
    attrs: [
      ["Pantalla", "Fidelidad de color"],
      ["Gráficos", "Según el trabajo del puesto"],
      ["Almacenamiento", "Local y respaldo"],
      ["Calibración", "A validar en sitio"],
      ["Accesorios", "Tableta o monitor a cotizar"],
    ],
  },
  {
    t: "Ingeniería",
    d: "CPU, memoria y docks para quien necesita estación local.",
    attrs: [
      ["Cómputo", "Núcleos y RAM de estación"],
      ["Refrigeración", "Carga sostenida"],
      ["Conectividad", "Docks y pantallas"],
      ["Seguridad", "Imagen de ingeniería"],
      ["Soporte", "RMA con ventana"],
    ],
  },
];

export function Studio() {
  const [i, setI] = useState(0);
  const p = profiles[i];
  return (
    <div>
      <div className="v5-visual" data-visual data-profile={p.t}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/visual/v5/laptop.jpg")} alt="Portátil empresarial en estudio." width={1600} height={1067} />
      </div>
      <div className="v5-seg" role="tablist" aria-label="Perfil de puesto">
        {profiles.map((x, idx) => (
          <button
            key={x.t}
            type="button"
            role="tab"
            aria-selected={idx === i}
            className={idx === i ? "is-on" : ""}
            onClick={() => setI(idx)}
          >
            {x.t}
          </button>
        ))}
      </div>
      <p>
        <strong>{p.t}.</strong> {p.d}
      </p>
      <ul className="v5-attr">
        {p.attrs.map(([k, v]) => (
          <li key={k}>
            <strong>{k}</strong>
            <span>{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
