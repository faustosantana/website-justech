import Link from "next/link";
import { Flagship } from "@/components/Flagship";
import { TicketFlow } from "@/components/TicketFlow";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soporte y mesa de ayuda",
  "Flujo N1–N3, portal propio y horario publicado. Sin SLA inventado. Justech SRL.",
  "/soporte/",
);

export default function Page() {
  return (
    <Flagship
      kicker="Soporte"
      title="Un caso. Un responsable. Un cierre."
      lead="El usuario reporta, el portal registra, N1 contiene, N2/N3 cambia con control. Horario publicado."
      scene="support"
      photo="/visual/ops-desk.webp"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/soporte/", label: "Soporte" },
      ]}
      ctaHref={company.supportUrl}
      ctaLabel="Ir al portal"
    >
      <div className="container section">
        <p className="eyebrow">Flujo</p>
        <h2 className="section-title">Simulación: de usuario a cierre.</h2>
        <TicketFlow />
      </div>
      <div className="container pb-16">
        <p>
          Horario: {company.hours}. Canales en{" "}
          <Link href="/canales-de-asistencia/">asistencia</Link>. Contratos nuevos:{" "}
          <Link href="/contacto/soporte/">hablar de soporte</Link>.
        </p>
        <p className="text-sm text-muted">
          Los tiempos de respuesta se firman. Aquí no se publican minutos ni 24/7.
        </p>
      </div>
    </Flagship>
  );
}
