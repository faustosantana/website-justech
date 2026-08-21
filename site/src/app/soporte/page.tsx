import { Interior } from "@/components/Interior";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soporte",
  "Portal de soporte Justech separado de ventas.",
  "/soporte/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soporte"
      title="Clientes actuales: usen el portal"
      lead="El soporte no es un formulario de marketing. Los tickets viven en el portal de Justech."
    >
      <p>
        <a className="btn btn-primary" href={company.supportUrl}>
          Ir a soporte.justech.do
        </a>
      </p>
      <p>
        Canales y horario: véase{" "}
        <a href="/canales-de-asistencia/">Canales de asistencia</a>. El selector de bases
        Odoo no forma parte de esta experiencia y no se enlaza a propósito.
      </p>
    </Interior>
  );
}
