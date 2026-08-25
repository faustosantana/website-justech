import Link from "next/link";
import { Assign } from "@/components/v6/Assign";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Licenciamiento empresarial",
  "De cuentas dispersas a un tenant con gobierno. Microsoft 365 y Google Workspace sin sellos de partnership. Justech SRL.",
  "/licenciamiento/",
);

export default function Page() {
  return (
    <main id="contenido" className="v6">
      <div className="v6-frame split">
        <div>
          <p className="v6-kicker">Licenciamiento</p>
          <h1>Control sobre cada licencia.</h1>
          <p className="lead-copy">
            Identidad, asignaciones y aplicaciones en un tenant que se puede gobernar.
          </p>
          <p>
            <Link className="btn btn-primary" href="/contacto/licenciamiento/">
              Solicitar evaluación
            </Link>
          </p>
        </div>
        <Assign />
      </div>
    </main>
  );
}
