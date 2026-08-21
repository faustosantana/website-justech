import Link from "next/link";
import { Topology } from "@/components/v5/Topology";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Redes y conectividad empresarial",
  "Diseño de redes para sede, sucursales, campus y Wi-Fi. Levantamiento, segmentación y operación con Justech SRL.",
  "/redes/",
);

export default function Page() {
  return (
    <main id="contenido" className="v5">
      <div className="v5-frame split">
        <div>
          <p className="v5-kicker" style={{ color: "#0a5c64" }}>
            Redes
          </p>
          <h1>Redes diseñadas para crecer.</h1>
          <p className="lead-copy">
            Sede, sucursales y usuarios en una topología que se puede documentar y operar.
          </p>
          <p>
            <Link className="btn btn-primary" href="/contacto/diagnostico/?need=red">
              Pedir diagnóstico de red
            </Link>
          </p>
        </div>
        <Topology />
      </div>
    </main>
  );
}
