import { LegalArticle } from "@/components/LegalArticle";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Política de privacidad",
  "Tratamiento de información en canales digitales de Justech SRL.",
  "/politica-de-privacidad/",
);

export default function Page() {
  return (
    <LegalArticle
      code="JT-POL-PRI-001"
      title="Política de privacidad"
      productionPath="/politica-de-privacidad/"
    >
      <p>
        Aplica al sitio, formularios, cotizaciones, soporte, licenciamiento intermediado,
        correo y analítica. No vendemos datos personales. Contacto: info@justech.do ·
        soporte@justech.do · 809-455-2372.
      </p>
    </LegalArticle>
  );
}
