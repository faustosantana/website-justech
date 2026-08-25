import Link from "next/link";
import { Device } from "@/components/v6/Device";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Laptops empresariales",
  "Selección, imagen, etiquetado, entrega y garantía. Catálogo consultivo, no tienda. Justech SRL.",
  "/productos/laptops/",
);

export default function Page() {
  return (
    <main id="contenido" className="v6">
      <div className="v6-frame split">
        <div>
          <p className="v6-kicker">Equipos</p>
          <h1>Equipos preparados para cada puesto.</h1>
          <p className="lead-copy">
            Selección, imagen, entrega y garantía. Un especialista cierra la especificación.
          </p>
          <p>
            <Link className="btn btn-primary" href="/contacto/cotizacion/?need=equipos">
              Solicitar cotización
            </Link>
          </p>
        </div>
        <Device />
      </div>
    </main>
  );
}
