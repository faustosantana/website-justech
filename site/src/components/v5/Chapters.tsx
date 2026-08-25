"use client";

import { useState } from "react";
import { withBase } from "@/lib/paths";

const chapters = [
  { t: "Empresa", d: "La operación sigue, con gente y sistemas en el mismo sitio.", pos: "38% 50%" },
  { t: "Planta", d: "Rack, energía y canalización como base de la sede.", pos: "8% 55%" },
  { t: "Red", d: "El enlace llega, el core reparte, el acceso sirve al piso.", pos: "18% 42%" },
  { t: "Puestos", d: "Equipos e identidades que coinciden con el trabajo.", pos: "72% 52%" },
  { t: "Software", d: "Correo, archivos y reuniones bajo un tenant.", pos: "58% 48%" },
  { t: "Seguridad", d: "Capas que se pueden cumplir y el negocio sigue abierto.", pos: "22% 50%" },
  { t: "Datos y nube", d: "Lo que viaja y lo que permanece, con dueño.", pos: "48% 40%" },
  { t: "Soporte", d: "Un caso, un responsable, un cierre.", pos: "64% 58%" },
  { t: "Operación", d: "Justech sostiene el hilo. El negocio no se detiene.", pos: "38% 50%" },
];

export function Chapters() {
  const [i, setI] = useState(0);
  const ch = chapters[i];
  return (
    <section className="v5-chapters" id="sistema">
      <div className="wrap">
        <div>
          <p className="v5-kicker">Capítulo {i + 1} de 9</p>
          <h2 className="section-title" style={{ color: "#fff" }}>
            Justech integra cada capa de la operación.
          </h2>
          <p className="v5-chapter-now">
            <strong>{ch.t}.</strong> {ch.d}
          </p>
          <ol className="v5-ticks" aria-label="Capítulos">
            {chapters.map((c, idx) => (
              <li key={c.t}>
                <button
                  type="button"
                  className={idx === i ? "is-on" : ""}
                  aria-current={idx === i ? "step" : undefined}
                  aria-label={`${c.t}, capítulo ${idx + 1}`}
                  onClick={() => setI(idx)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="still">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase("/visual/v5/home-still.jpg")}
            alt=""
            width={1600}
            height={1000}
            style={{ objectPosition: ch.pos }}
          />
          <p className="v5-caption">
            {ch.t} · la misma escena, otro foco
          </p>
        </div>
      </div>
    </section>
  );
}
