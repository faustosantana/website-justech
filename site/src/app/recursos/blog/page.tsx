import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Blog",
  "Aún no hay artículos propios de Justech SRL. Esta URL reserva el slug.",
  "/recursos/blog/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Recursos"
      title="Blog"
      lead="No publicamos artículos hasta tener al menos uno propio, revisado y con fecha. Evitamos thin content."
      pending
    >
      <p>Cuando exista el primer artículo, aparecerá aquí. No hay feed ni autores inventados.</p>
    </Interior>
  );
}
