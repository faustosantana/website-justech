import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Guías",
  "Materiales de Justech SRL para orientar decisiones tecnológicas.",
  "/recursos/guias/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Recursos"
      title="Guías"
      lead="Las guías se publican cuando existe un documento propio, con responsable y fecha."
      path="/recursos/guias/"
    >
      <p>Hasta entonces, use el centro legal y las preguntas frecuentes.</p>
    </Interior>
  );
}
