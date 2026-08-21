import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Guías",
  "Aún no hay guías descargables validadas de Justech SRL.",
  "/recursos/guias/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Recursos"
      title="Guías"
      lead="Las descargas se publican cuando exista un documento propio, con responsable y fecha. No hay lead magnet inventado."
      pending
    >
      <p>Mientras tanto, use el centro legal y las preguntas frecuentes.</p>
    </Interior>
  );
}
