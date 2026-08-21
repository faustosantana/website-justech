import Link from "next/link";
import { ProcessTrack } from "@/components/ProcessTrack";
import { Stage } from "@/components/Stage";
import { SupportConsole } from "@/components/SupportConsole";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soporte y mesa de ayuda",
  "Flujo N1–N3, portal propio y horario publicado. Sin SLA inventado. Justech SRL.",
  "/soporte/",
);

const flow = [
  { t: "Solicitud", d: "El usuario reporta. El portal registra. No se pierde en un chat." },
  { t: "Clasificación", d: "Qué es, a quién le duele, qué capa toca." },
  { t: "Prioridad", d: "Se nombra. No se recita un SLA no firmado." },
  { t: "Asignación", d: "Un responsable. Un estado visible." },
  { t: "Diagnóstico", d: "N1 contiene. N2/N3 cambia con control." },
  { t: "Intervención", d: "La acción queda. El usuario no adivina." },
  { t: "Validación", d: "El que reportó confirma antes del cierre." },
  { t: "Cierre", d: "Historial para la siguiente vez." },
];

export default function Page() {
  return (
    <Stage
      family="interface"
      kicker="Soporte"
      title="Un caso. Un responsable. Un cierre."
      lead="El usuario reporta, el portal registra, N1 contiene, N2/N3 cambia con control. Horario publicado."
      visual={<SupportConsole />}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/soporte/", label: "Soporte" },
      ]}
      ctaHref={company.supportUrl}
      ctaLabel="Soy cliente: entrar al portal"
      secondaryHref="/contacto/soporte/"
      secondaryLabel="Necesito soporte empresarial"
      note="La consola es una simulación. Los tiempos se firman, no se publican."
    >
      <div className="container section">
        <ProcessTrack title="El ticket en movimiento" steps={flow} />
      </div>
      <div className="container pb-16 grid gap-10 lg:grid-cols-3">
        <article>
          <h2>Portal</h2>
          <p>Historial, estados y un responsable. Canal: {company.supportUrl.replace("https://", "")}.</p>
        </article>
        <article>
          <h2>Mesa de ayuda</h2>
          <p>
            N1–N3 según contrato. <Link href="/contacto/soporte/">Quiero una mesa de ayuda</Link>.
          </p>
        </article>
        <article>
          <h2>Horario</h2>
          <p>
            {company.hours}. Canales en <Link href="/canales-de-asistencia/">asistencia</Link>.
          </p>
        </article>
      </div>
    </Stage>
  );
}
