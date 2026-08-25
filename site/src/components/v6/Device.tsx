"use client";

import { useEffect, useState } from "react";

const profiles = [
  {
    t: "Administrativo",
    d: "Puesto de oficina, imagen estándar, cifrado y soporte de mesa.",
    screen: "Correo · archivos · mesa",
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
    screen: "Agenda · videollamada",
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
    screen: "Mapa · CRM ligero",
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
    screen: "Lienzo · paleta",
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
    screen: "Repo · terminal · docs",
    attrs: [
      ["Cómputo", "Núcleos y RAM de estación"],
      ["Refrigeración", "Carga sostenida"],
      ["Conectividad", "Docks y pantallas"],
      ["Seguridad", "Imagen de ingeniería"],
      ["Soporte", "RMA con ventana"],
    ],
  },
];

export function Device() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setOpen(true), reduce ? 0 : 220);
    return () => window.clearTimeout(t);
  }, []);
  const p = profiles[i];
  return (
    <div>
      <div className={`v6-visual v6-device ${open ? "is-open" : ""}`} data-visual data-profile={p.t}>
        <div className="v6-laptop" aria-hidden>
          <div className="v6-lid">
            <div className="v6-bezel">
              <div className="v6-cam" />
              <div className="v6-lcd">
                <p>{p.t}</p>
                <span>{p.screen}</span>
              </div>
            </div>
          </div>
          <div className="v6-base">
            <div className="v6-keys" />
            <div className="v6-pad" />
          </div>
        </div>
      </div>
      <div className="v6-seg" role="tablist" aria-label="Perfil de puesto">
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
      <ul className="v6-attr">
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
