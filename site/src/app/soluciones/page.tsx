import Link from "next/link";
import { Interior } from "@/components/Interior";
import { solutionCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soluciones tecnológicas empresariales",
  "Modernización, continuidad, seguridad, colaboración, sucursales y proyectos llave en mano. Justech SRL, República Dominicana.",
  "/soluciones/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soluciones"
      title="Problemas de negocio, resueltos con tecnología operable"
      lead="Cada solución describe un resultado —no un estante de productos. El suministro y el cableado entran cuando el diseño lo exige."
      path="/soluciones/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/soluciones/", label: "Soluciones" },
      ]}
    >
      <ol className="m-0 list-none p-0">
        {solutionCaps.map((s, i) => (
          <li key={s.href} className="border-b border-line py-6">
            <p className="eyebrow m-0">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 mb-2">
              <Link href={s.href} className="text-navy no-underline">
                {s.title}
              </Link>
            </h2>
            <p className="mb-0 text-muted">{s.lead}</p>
          </li>
        ))}
      </ol>
    </Interior>
  );
}
