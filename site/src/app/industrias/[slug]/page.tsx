import { Interior } from "@/components/Interior";
import { industryLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const pages = Object.fromEntries(industryLinks.map((l) => [l.href.split("/").filter(Boolean).pop()!, l]));

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return {};
  return pageMeta(p.label, `${p.label}: vertical en validación. Justech no la afirma como especialidad publicada.`, p.href);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return null;
  return (
    <Interior
      eyebrow="Industrias"
      title={p.label}
      lead="Página reservada en el sitemap. El copy comercial se escribe cuando exista evidencia de trabajo en este vertical."
      pending
    >
      <p>
        Si su organización opera en este sector, escríbanos el requerimiento. No inventamos casos,
        SLAs ni clientes de referencia.
      </p>
    </Interior>
  );
}
