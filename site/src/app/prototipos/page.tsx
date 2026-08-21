import { Live } from "@/components/v6/Live";
import { pageMeta } from "@/lib/seo";
import { withBase } from "@/lib/paths";

export const metadata = pageMeta(
  "Explorar cómo funciona",
  "Recorrido educativo de rack, seguridad, nube y cableado. No es un laboratorio comercial. Justech SRL.",
  "/prototipos/",
);

export default function Page() {
  return (
    <main id="contenido" className="v6">
      <div className="v6-frame">
        <div>
          <p className="v6-kicker">Explorar cómo funciona</p>
          <h1>Prototipos vivos. Aún no se propagan.</h1>
          <p className="lead-copy">
            Rack, seguridad, nube y cableado. Experiencia educativa dentro del sitio, no un laboratorio comercial.
          </p>
        </div>
        <div className="v6-proto-grid">
          <figure>
            <Live scene="rack" />
            <figcaption>
              <strong>Rack.</strong> Ensamblado progresivo: energía, patch, switching, cómputo.
            </figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/visual/v5/security.jpg")} alt="" width={1600} height={1067} />
            <Live scene="campus" view="seguridad" className="v6-ghost" />
            <figcaption>
              <strong>Seguridad.</strong> Operación normal. Capas, sin alarma permanente.
            </figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/visual/v5/cloud.jpg")} alt="" width={1600} height={1067} />
            <figcaption>
              <strong>Nube.</strong> Local, identidad, destino.
            </figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/visual/v5/cabling.jpg")} alt="" width={1600} height={1067} />
            <figcaption>
              <strong>Cableado.</strong> Planta: rutas, panel, prueba.
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  );
}
