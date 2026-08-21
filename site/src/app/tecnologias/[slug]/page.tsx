import { Interior } from "@/components/Interior";
import { technologyLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const pages = Object.fromEntries(
  technologyLinks.map((l) => [l.href.split("/").filter(Boolean).pop()!, l]),
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
    `Licenciamiento e implementación de tecnologías ${p.label} para organizaciones, con Justech SRL.`,
    p.href,
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return null;
  return (
    <Interior
      eyebrow="Tecnologías"
      title={p.label}
      lead={`Acompañamos la adopción, renovación y operación de tecnologías ${p.label} según el requerimiento de cada organización.`}
      path={p.href}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/tecnologias/", label: "Tecnologías" },
        { href: p.href, label: p.label },
      ]}
    >
      <p>
        El trabajo típico incluye licenciamiento, puesta en marcha y soporte. El alcance se
        define caso a caso, con responsables y un plan que la operación pueda sostener.
      </p>
    </Interior>
  );
}
