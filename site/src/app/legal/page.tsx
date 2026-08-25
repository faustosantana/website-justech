import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { legalLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Centro legal",
  "Políticas y documentos públicos de Justech SRL.",
  "/legal/",
);

export default function Page() {
  return (
    <main id="contenido">
      <PageHero
        eyebrow="Cumplimiento"
        title="Centro legal y de cumplimiento"
        lead="Políticas públicas de Justech SRL sobre privacidad, seguridad, continuidad y servicio."
      />
      <div className="container pt-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Inicio" },
            { href: "/legal/", label: "Centro legal" },
          ]}
        />
      </div>
      <div className="container py-12">
        <ul className="m-0 max-w-xl list-none p-0">
          {legalLinks
            .filter((l) => l.href !== "/legal/")
            .map((l) => (
              <li key={l.href} className="border-b border-line py-3">
                <Link href={l.href} className="text-lg text-navy no-underline">
                  {l.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
