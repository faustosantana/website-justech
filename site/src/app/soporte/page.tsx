import Link from "next/link";
import { Incident } from "@/components/v6/Incident";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soporte y mesa de ayuda",
  "Flujo N1–N3, portal propio y horario publicado. Sin SLA inventado. Justech SRL.",
  "/soporte/",
);

export default function Page() {
  return (
    <main id="contenido" className="v6">
      <div className="v6-frame split">
        <div>
          <p className="v6-kicker">Soporte</p>
          <h1>Soporte con trazabilidad de principio a fin.</h1>
          <p className="lead-copy">
            Un usuario de sucursal pierde conectividad. La red pasa a respaldo. El portal registra.
          </p>
          <p className="hero-actions">
            <a className="btn btn-primary" href={company.supportUrl}>
              Soy cliente: entrar al portal
            </a>
            <Link className="btn btn-ghost" href="/contacto/soporte/">
              Mesa de ayuda
            </Link>
          </p>
        </div>
        <Incident />
      </div>
    </main>
  );
}
