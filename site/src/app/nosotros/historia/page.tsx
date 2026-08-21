import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Historia y propósito",
  "Justech SRL nace en 2018 en Santo Domingo para conectar necesidades tecnológicas con ejecución.",
  "/nosotros/historia/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Historia y propósito"
      lead="2018, Santo Domingo. Un equipo que había enfrentado los mismos retos de las empresas a las que sirve."
    >
      <p>
        Misión publicada: ser su aliado estratégico en materia de tecnología. Visión
        publicada: ser primera opción nacional cuando hay un requerimiento tecnológico —
        ambición, no un ranking verificado.
      </p>
    </Interior>
  );
}
