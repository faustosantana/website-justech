import Link from "next/link";
import { Campus } from "@/components/v6/Campus";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Redes y conectividad empresarial",
  "Diseño de redes para sede, sucursales, campus y Wi-Fi. Levantamiento, segmentación y operación con Justech SRL.",
  "/redes/",
);

export default function Page() {
  return (
    <main id="contenido" className="v6">
      <div className="v6-frame split">
        <div>
          <p className="v6-kicker">Redes</p>
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
        <Campus />
      </div>
    </main>
  );
}
