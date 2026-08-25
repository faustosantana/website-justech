import Link from "next/link";
import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Documentos legales",
  "Índice de políticas y documentos públicos de Justech SRL.",
  "/documentos-legales/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Legal"
      title="Documentos legales"
      lead="Políticas públicas de Justech SRL. Los PDF firmados permanecen en justech.do."
      path="/documentos-legales/"
    >
      <p>
        Use el <Link href="/legal/">centro legal</Link> de este sitio para navegar las
        políticas. Los originales publicados el 13 de julio de 2026 están en las URLs
        correspondientes de justech.do.
      </p>
    </Interior>
  );
}
