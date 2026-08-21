"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/paths";
import { Live } from "./Live";

const chapters = [
  { t: "Operación", d: "Una empresa funcionando, con gente y sistemas en el mismo sitio." },
  { t: "Infraestructura", d: "Rack, energía, servidores, almacenamiento y cableado." },
  { t: "Conectividad", d: "Borde, firewall, core, acceso, APs, sedes y usuarios." },
  { t: "Equipos", d: "Puestos preparados: imagen, cifrado y garantía." },
  { t: "Software y licencias", d: "Identidad, aplicaciones y un tenant gobernable." },
  { t: "Seguridad", d: "Controles en cada capa, sin apagar el negocio." },
  { t: "Nube y datos", d: "Colaboración, respaldo e integración con dueño." },
  { t: "Soporte", d: "Cae un enlace. Se registra, se asigna y se resuelve." },
  { t: "Resultado", d: "La operación continúa y puede crecer." },
];

export function World() {
  const [i, setI] = useState(0);
  const marks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = marks.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!vis) return;
        const idx = Number((vis.target as HTMLElement).dataset.ch);
        if (!Number.isNaN(idx)) setI(idx);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.5, 0.8] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="v6">
      <section className="v6-film">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="v6-plate"
          src={withBase("/visual/v5/home-still.jpg")}
          alt=""
          width={1600}
          height={900}
          fetchPriority="high"
        />
        <Live scene="operation" chapter={i} className="v6-overlay" />
        <div className="v6-copy">
          <p className="v6-kicker">Justech · Santo Domingo · Desde 2018</p>
          <h1>La capa que mantiene el negocio en movimiento.</h1>
          <p className="lead">Infraestructura, software y soporte, operados como un sistema.</p>
          <Link className="btn btn-primary" href="/contacto/diagnostico/">
            Solicitar diagnóstico
          </Link>
        </div>
      </section>

      <section className="v6-story" id="sistema">
        <div className="v6-sticky">
          <Live scene="operation" chapter={i} />
          <p className="v6-caption">
            {String(i + 1).padStart(2, "0")} · {chapters[i].t}
          </p>
        </div>
        <ol className="v6-beats">
          {chapters.map((c, idx) => (
            <li
              key={c.t}
              data-ch={idx}
              ref={(el) => {
                marks.current[idx] = el;
              }}
            >
              <p className="v6-kicker">Capítulo {idx + 1}</p>
              <h2>{c.t}</h2>
              <p>{c.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="v6-lab">
        <div className="wrap">
          <p className="v6-kicker">Explorar cómo funciona</p>
          <h2>Una experiencia educativa. No un laboratorio comercial.</h2>
          <p>
            Red, equipo, licencia, incidente, rack, nube, seguridad y cableado. El estándar se cierra en cinco
            maestras.
          </p>
          <p>
            <Link className="btn btn-ghost" href="/prototipos/">
              Abrir el recorrido
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
