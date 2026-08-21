import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

const pages: Record<string, { title: string; path: string }> = {
  "servicios-administrados": {
    title: "Servicios administrados de TI",
    path: "/servicios/servicios-administrados/",
  },
  "desarrollo-de-software": {
    title: "Desarrollo de software",
    path: "/servicios/desarrollo-de-software/",
  },
  "qa-y-automatizacion": {
    title: "QA y automatización de pruebas",
    path: "/servicios/qa-y-automatizacion/",
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
  return pageMeta(p.title, `${p.title}: en validación.`, p.path);
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
    <Interior eyebrow="Servicios" title={p.title} lead="URL reservada. Copy comercial pendiente de validación." pending>
      <p>No se ofrece como paquete cerrado en este preview.</p>
    </Interior>
  );
}
