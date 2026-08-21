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
      lead="Desde 2018 en Santo Domingo, Justech conecta el requerimiento tecnológico con una solución que la operación puede sostener."
      path="/nosotros/historia/"
    >
      <p>
        La misión de la empresa es ser aliado estratégico en materia de tecnología. La visión
        es ser la primera opción cuando una organización necesita ejecutar un requerimiento
        tecnológico con cercanía y rigor.
      </p>
    </Interior>
  );
}
