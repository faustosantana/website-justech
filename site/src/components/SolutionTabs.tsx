"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { solutionCaps } from "@/content/capabilities";

export function SolutionTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const featured = solutionCaps.filter((s) =>
    [
      "modernizacion-de-infraestructura",
      "continuidad-operacional",
      "seguridad-y-proteccion",
      "productividad-y-colaboracion",
      "sucursales",
      "proyectos-llave-en-mano",
    ].includes(s.slug),
  );
  const current = featured[active] ?? featured[0];

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Ecosistema de soluciones">
        {featured.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setActive((v) => (v + 1) % featured.length);
              if (e.key === "ArrowLeft") setActive((v) => (v - 1 + featured.length) % featured.length);
            }}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div
        className="feature-panel"
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
      >
        <div>
          <p className="eyebrow">{current.kicker}</p>
          <h3 className="mt-2 mb-3 text-2xl">{current.title}</h3>
          <p className="text-muted">{current.problem}</p>
          <Link className="more" href={current.href}>
            Ver solución
          </Link>
        </div>
        <ul className="m-0 list-none p-0">
          {current.signals.map((s) => (
            <li key={s} className="border-t border-line py-3 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
