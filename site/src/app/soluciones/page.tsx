import Link from "next/link";
import { Interior } from "@/components/Interior";
import { published, solutionCopy, solutions } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soluciones tecnológicas empresariales",
  "Licenciamiento y equipamiento empresarial con Justech SRL en República Dominicana.",
  "/soluciones/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soluciones"
      title="Tecnología al servicio de un resultado de negocio"
      lead="Publicamos las líneas que ya operamos con organizaciones: software, licenciamiento y equipamiento empresarial."
      path="/soluciones/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/soluciones/", label: "Soluciones" },
      ]}
    >
      <ul className="grid-cards list-none p-0">
        {published(solutions).map((s) => (
          <li key={s.href} className="card">
            <h2>{s.label}</h2>
            <p>{solutionCopy[s.href]}</p>
            <Link className="more" href={s.href}>
              Conocer más
            </Link>
          </li>
        ))}
      </ul>
    </Interior>
  );
}
