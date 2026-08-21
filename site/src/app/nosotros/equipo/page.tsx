import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Equipo",
  "Justech no publica nombres ni fotos de colaboradores hasta consentimiento.",
  "/nosotros/equipo/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Equipo"
      lead="No usamos el dato de LinkedIn («1 employee») ni fotos de stock como si fueran el staff."
      pending
    >
      <p>
        Cuando RRHH entregue nombres, cargos, fotos y consentimiento, esta página existirá como
        directorio breve. Mientras tanto, el contacto es institucional.
      </p>
    </Interior>
  );
}
