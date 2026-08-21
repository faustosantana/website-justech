import { LegalArticle } from "@/components/LegalArticle";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Canales de asistencia",
  "Horario y canales de soporte Justech SRL.",
  "/canales-de-asistencia/",
);

export default function Page() {
  return (
    <LegalArticle
      code="JT-SOP-ATN-001"
      title="Canales de asistencia y atención"
      productionPath="/canales-de-asistencia/"
    >
      <p>
        Correo general info@justech.do, teléfono 809-455-2372, portal
        soporte.justech.do. Horario: lunes a viernes, 8:00 a 17:30, America/Santo_Domingo,
        salvo feriados. soporte@justech.do figura como publicado sujeto a confirmación
        operativa del buzón.
      </p>
    </LegalArticle>
  );
}
