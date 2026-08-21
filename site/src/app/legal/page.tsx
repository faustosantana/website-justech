import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { legalLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Centro legal",
  "Políticas y documentos públicos de Justech SRL. Este índice no reproduce contenido de apuestas.",
  "/legal/",
);

export default function Page() {
  return (
    <main id="contenido">
      <PageHero
        eyebrow="Cumplimiento"
        title="Centro legal y de cumplimiento"
        lead="Índice limpio de Justech. Sustituye, en este preview, la URL de producción que en agosto 2026 sirvió contenido ajeno."
      />
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
        <p className="mt-8 text-sm text-muted">
          PDFs del 13/07/2026 permanecen en producción bajo /documentos-legales/. No se
          copian al staging para no mezclar orígenes.
        </p>
      </div>
    </main>
  );
}
