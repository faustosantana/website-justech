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
  return pageMeta(
    p.title,
    `${p.title}. Justech atiende el requerimiento desde consultoría e implementación.`,
    p.path,
  );
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
      eyebrow="Servicios"
      title={p.title}
      lead="Describa el resultado que necesita. Un especialista propone el alcance."
      path={p.path}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/servicios/", label: "Servicios" },
        { href: p.path, label: p.title },
      ]}
    >
      <p>
        Esta conversación se atiende con el mismo rigor que el resto de nuestros servicios:
        responsables, plazos y un plan que la operación pueda sostener.
      </p>
    </Interior>
  );
}
