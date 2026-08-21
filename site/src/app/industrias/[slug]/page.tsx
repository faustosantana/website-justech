import { Interior } from "@/components/Interior";
import { industryLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const pages = Object.fromEntries(
  industryLinks.map((l) => [l.href.split("/").filter(Boolean).pop()!, l]),
);

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return {};
  return pageMeta(
    p.label,
    `Tecnología empresarial para organizaciones de ${p.label.toLowerCase()}. Justech SRL, Santo Domingo.`,
    p.href,
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return null;
  return (
    <Interior
      eyebrow="Escenarios"
      title={p.label}
      lead="Describa el requerimiento operativo. Evaluamos licenciamiento, equipos, implementación y soporte según su contexto."
      path={p.href}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/industrias/", label: "Industrias" },
        { href: p.href, label: p.label },
      ]}
    >
      <p>
        Cada sector tiene restricciones distintas. Justech parte del resultado de negocio y
        propone la tecnología que la operación puede sostener.
      </p>
    </Interior>
  );
}
