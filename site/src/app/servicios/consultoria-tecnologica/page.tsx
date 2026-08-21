import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Consultoría tecnológica",
  "Asesoría para decidir qué hacer y cómo, antes de comprar o implementar.",
  "/servicios/consultoria-tecnologica/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Servicios"
      title="Consultoría tecnológica"
      lead="Aclarar el qué y el cómo: levantamiento, alternativas y un plan que se pueda ejecutar."
    >
      <p>
        No sustituye una auditoría certificada ni un informe de compliance que Justech no
        haya emitido. Es asesoría de implementación y operación.
      </p>
    </Interior>
  );
}
