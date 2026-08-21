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
  return pageMeta(
    p.title,
    `${p.title} para organizaciones. Justech evalúa el alcance con consultoría e implementación.`,
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
      eyebrow="Soluciones"
      title={p.title}
      lead="Cuéntenos el requerimiento. Evaluamos el alcance junto a consultoría e implementación."
      path={p.path}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/soluciones/", label: "Soluciones" },
        { href: p.path, label: p.title },
      ]}
    >
      <p>
        Cada organización llega con un contexto distinto. Un especialista de Justech le ayuda a
        definir el camino más apropiado, sin un paquete rígido.
      </p>
    </Interior>
  );
}
