import { LegalArticle } from "@/components/LegalArticle";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Protección de datos personales",
  "Política de protección de datos de Justech SRL.",
  "/politica-de-proteccion-de-datos/",
);

export default function Page() {
  return (
    <LegalArticle
      code="JT-POL-DP-001"
      title="Protección de datos personales"
      productionPath="/politica-de-proteccion-de-datos/"
    >
      <p>
        Complementa la privacidad. Derechos ARCO y bases de tratamiento se rigen por el
        documento publicado el 13 de julio de 2026.
      </p>
    </LegalArticle>
  );
}
