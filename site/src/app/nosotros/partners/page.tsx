import Link from "next/link";
import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Alianzas tecnológicas",
  "Justech trabaja con las plataformas que su organización necesita. Santo Domingo.",
  "/nosotros/partners/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Plataformas y fabricantes"
      lead="Implementamos y licenciamos tecnologías empresariales según el requerimiento."
      path="/nosotros/partners/"
    >
      <p>
        Consulte el directorio de <Link href="/tecnologias/">tecnologías</Link> para ver las
        plataformas con las que trabajamos en licenciamiento, implementación y soporte.
      </p>
    </Interior>
  );
}
