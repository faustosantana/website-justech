import { Interior } from "@/components/Interior";
import { technologyLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

const pages = Object.fromEntries(technologyLinks.map((l) => [l.href.split("/").filter(Boolean).pop()!, l]));

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return {};
  return pageMeta(
    p.label,
    `${p.label}: ficha de tecnología en validación. Justech no afirma partnership certificado en este preview.`,
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
      lead="Ficha reservada. Sin logo de fabricante, sin nivel Gold/Silver y sin cifra de proyectos."
      pending
    >
      <p>
        Cuando comercial entregue designation vigente y permiso de marca, esta página describirá
        el alcance real (licenciamiento, implementación o soporte).
      </p>
    </Interior>
  );
}
