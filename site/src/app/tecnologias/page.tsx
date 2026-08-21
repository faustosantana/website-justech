import Link from "next/link";
import { Interior } from "@/components/Interior";
import { technologyCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Ecosistema tecnológico",
  "Fabricantes y plataformas con las que Justech puede licenciar, suministrar o implementar. Sin partnership afirmado sin documentos.",
  "/tecnologias/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Tecnologías"
      title="Nombres de fabricante, no sellos de alianza"
      lead="Esta biblioteca queda lista para activar niveles de partnership cuando existan documentos. Mientras tanto, el trabajo se describe como suministro, licenciamiento, implementación o soporte."
      path="/tecnologias/"
    >
      <ul className="ecosystem mt-0">
        {technologyCaps.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.title}</Link>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted">
        Diferenciamos fabricante, distribuidor, reseller y alianza formal. Vender un producto no convierte a Justech en “partner oficial”.
      </p>
    </Interior>
  );
}
