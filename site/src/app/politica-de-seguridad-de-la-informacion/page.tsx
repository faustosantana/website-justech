import { LegalArticle } from "@/components/LegalArticle";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Seguridad de la información",
  "Política de seguridad de la información de Justech SRL.",
  "/politica-de-seguridad-de-la-informacion/",
);

export default function Page() {
  return (
    <LegalArticle
      code="JT-POL-SEG-001"
      title="Seguridad de la información"
      productionPath="/politica-de-seguridad-de-la-informacion/"
    >
      <p>El texto vigente es el publicado el 13 jul 2026. Este preview no lo reescribe.</p>
    </LegalArticle>
  );
}
