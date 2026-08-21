import { Interior } from "@/components/Interior";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soporte",
  "Portal de soporte de Justech SRL para clientes actuales.",
  "/soporte/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soporte"
      title="Portal para clientes actuales"
      lead="Los tickets se gestionan en el portal de Justech, separado del contacto comercial."
      path="/soporte/"
    >
      <p>
        <a className="btn btn-primary" href={company.supportUrl}>
          Ir a soporte.justech.do
        </a>
      </p>
      <p>
        Horario: {company.hours}. Canales adicionales en{" "}
        <a href="/canales-de-asistencia/">Canales de asistencia</a>.
      </p>
    </Interior>
  );
}
