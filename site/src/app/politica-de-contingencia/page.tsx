import { LegalArticle } from "@/components/LegalArticle";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contingencia y continuidad",
  "Política de contingencia y continuidad operativa de Justech SRL.",
  "/politica-de-contingencia/",
);

export default function Page() {
  return (
    <LegalArticle
      code="JT-POL-CONT"
      title="Contingencia y continuidad operativa"
      productionPath="/politica-de-contingencia/"
    >
      <p>Consulte el documento público de julio 2026 para el texto íntegro.</p>
    </LegalArticle>
  );
}
