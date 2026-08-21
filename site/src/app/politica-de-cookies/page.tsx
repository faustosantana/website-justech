import { LegalArticle } from "@/components/LegalArticle";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Política de cookies",
  "Cookies y medición en justech.do. Staging no carga píxeles de producción.",
  "/politica-de-cookies/",
);

export default function Page() {
  return (
    <LegalArticle code="JT-POL-COO-001" title="Política de cookies" productionPath="/politica-de-cookies/">
      <p>
        Este preview no instala GA4, GTM ni Meta Pixel. Cuando producción tenga CMP real,
        las categorías se alinearán a JT-POL-COO-001.
      </p>
    </LegalArticle>
  );
}
