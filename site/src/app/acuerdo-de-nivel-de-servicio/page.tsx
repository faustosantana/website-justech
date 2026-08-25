import { LegalArticle } from "@/components/LegalArticle";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Acuerdo de nivel de servicio",
  "SLA público de Justech SRL (JT-SLA-001).",
  "/acuerdo-de-nivel-de-servicio/",
);

export default function Page() {
  return (
    <LegalArticle
      code="JT-SLA-001"
      title="Acuerdo de nivel de servicio"
      productionPath="/acuerdo-de-nivel-de-servicio/"
    >
      <p>
        Los tiempos objetivo viven en el documento público. Primera respuesta no equivale a
        resolución. Este preview no inventa minutos de SLA.
      </p>
    </LegalArticle>
  );
}
