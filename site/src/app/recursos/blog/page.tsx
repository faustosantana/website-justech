import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Blog",
  "Perspectivas de Justech SRL sobre tecnología empresarial en República Dominicana.",
  "/recursos/blog/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Recursos"
      title="Perspectivas"
      lead="Publicaremos aquí artículos propios, con fecha y responsable."
      path="/recursos/blog/"
    >
      <p>Mientras tanto, las preguntas frecuentes recogen la operación cotidiana de Justech.</p>
    </Interior>
  );
}
