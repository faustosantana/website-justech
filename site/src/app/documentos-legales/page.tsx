import Link from "next/link";
import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Documentos legales",
  "Índice de PDFs legales de Justech SRL.",
  "/documentos-legales/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Legal"
      title="Documentos legales"
      lead="Los PDF firmados permanecen en el origen de producción. Este índice no apunta a la /legal/ comprometida."
    >
      <p>
        Use el <Link href="/legal/">centro legal de este preview</Link> o las URLs de
        políticas en www.justech.do (excepto /legal/ hasta que se restaure).
      </p>
    </Interior>
  );
}
