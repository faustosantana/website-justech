import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

const pages: Record<string, { title: string; path: string }> = {
  ciberseguridad: {
    title: "Ciberseguridad",
    path: "/soluciones/ciberseguridad/",
  },
  "nube-y-data-center": {
    title: "Nube y data center",
    path: "/soluciones/nube-y-data-center/",
  },
  "productividad-y-colaboracion": {
    title: "Productividad y colaboración",
    path: "/soluciones/productividad-y-colaboracion/",
  },
  "continuidad-y-respaldo": {
    title: "Continuidad y respaldo",
    path: "/soluciones/continuidad-y-respaldo/",
  },
  "automatizacion-e-ia": {
    title: "Automatización e inteligencia artificial",
    path: "/soluciones/automatizacion-e-ia/",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return {};
  return pageMeta(p.title, `${p.title}: contenido en validación comercial.`, p.path);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) return null;
  return (
    <Interior
      eyebrow="Soluciones"
      title={p.title}
      lead="Esta línea aparece en credenciales internas. No se vende aquí como partnership ni como oferta cerrada hasta validación."
      pending
    >
      <p>
        Si su requerimiento encaja, escríbanos: lo trataremos por consultoría o
        implementación, sin inventar un catálogo.
      </p>
    </Interior>
  );
}
