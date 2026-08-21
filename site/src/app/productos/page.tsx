import Link from "next/link";
import { Interior } from "@/components/Interior";
import { productGroupCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Productos y tecnología empresarial",
  "Catálogo consultivo B2B: equipos, redes, licencias, colaboración y data center. Cotización con especialista. Justech SRL.",
  "/productos/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Productos"
      title="Tecnología para empresas, con criterio de uso"
      lead="No es un comercio electrónico. Cada línea se cotiza según cantidad, garantía y puesta en marcha."
      path="/productos/"
    >
      {productGroupCaps.map((g) => (
        <section key={g.title} className="mt-10">
          <h2>{g.title}</h2>
          <ul className="m-0 list-none p-0">
            {g.items.map((p) => (
              <li key={p.href} className="border-b border-line py-4">
                <Link href={p.href} className="text-navy no-underline">
                  {p.title}
                </Link>
                <p className="mt-1 mb-0 text-sm text-muted">{p.problem}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p>
        <Link className="btn btn-primary" href="/contacto/cotizacion/">
          Solicitar cotización
        </Link>
      </p>
    </Interior>
  );
}
