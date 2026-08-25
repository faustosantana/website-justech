"use client";

import Link from "next/link";
import { useState } from "react";
import { TechScene } from "@/components/TechScene";
import type { SceneName } from "@/visual/motion";

const layers: { id: SceneName; href: string; title: string; result: string }[] = [
  {
    id: "network",
    href: "/redes/",
    title: "Redes",
    result: "Sede, sucursales y usuarios en un mismo diseño de conectividad.",
  },
  {
    id: "security",
    href: "/seguridad/",
    title: "Seguridad",
    result: "Capas que se pueden operar: identidad, perímetro, endpoints y respaldo.",
  },
  {
    id: "license",
    href: "/licenciamiento/",
    title: "Licencias",
    result: "Puestos, correo y colaboración con gobierno — no claves sueltas.",
  },
  {
    id: "support",
    href: "/soporte/",
    title: "Soporte",
    result: "Un caso, un responsable, un portal. Horario publicado.",
  },
  {
    id: "cabling",
    href: "/infraestructura-fisica/",
    title: "Infraestructura",
    result: "De un plano a una planta certificada y documentada.",
  },
  {
    id: "cloud",
    href: "/nube/",
    title: "Nube",
    result: "Oleadas, validación y operación — no un “subir todo”.",
  },
];

export function LayerSystem() {
  const [i, setI] = useState(0);
  const current = layers[i];

  return (
    <div className="layer-system">
      <div className="layer-visual" aria-hidden>
        <TechScene scene={current.id} story={1} layer={i} />
      </div>
      <div>
        <div className="layer-tabs" role="tablist" aria-label="Capas del sistema Justech">
          {layers.map((l, idx) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              aria-selected={idx === i}
              onClick={() => setI(idx)}
            >
              {l.title}
            </button>
          ))}
        </div>
        <h3 className="display">{current.title}</h3>
        <p className="lead-copy">{current.result}</p>
        <Link className="btn btn-primary" href={current.href}>
          Entrar a {current.title.toLowerCase()}
        </Link>
      </div>
    </div>
  );
}
