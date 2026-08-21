import { pageMeta } from "@/lib/seo";
import { withBase } from "@/lib/paths";

export const metadata = pageMeta(
  "Prototipos visuales v5",
  "Stills aislados de rack, seguridad, nube y cableado. No son páginas de producto. Justech SRL.",
  "/prototipos/",
);

const items = [
  { src: "/visual/v5/rack.jpg", t: "Rack", d: "Patch, switching, cómputo, energía. Sin marcas." },
  { src: "/visual/v5/security.jpg", t: "Seguridad", d: "Operación normal. Capas, no alarma permanente." },
  { src: "/visual/v5/cloud.jpg", t: "Nube", d: "Local, identidad, destino. Sin nubes flotantes." },
  { src: "/visual/v5/cabling.jpg", t: "Cableado", d: "Planta terminada: rutas, panel, prueba." },
];

export default function Page() {
  return (
    <main id="contenido" className="v5">
      <div className="v5-frame">
        <div>
          <p className="v5-kicker" style={{ color: "#0a5c64" }}>
            Laboratorio
          </p>
          <h1>Prototipos. Aún no se propagan.</h1>
          <p className="lead-copy">
            Rack, seguridad, nube y cableado en stills. El estándar se cierra en las cinco maestras.
          </p>
        </div>
        <div className="v5-proto-grid">
          {items.map((item) => (
            <figure key={item.t}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(item.src)} alt="" width={1600} height={1067} />
              <figcaption>
                <strong>{item.t}.</strong> {item.d}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
