import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Casos",
  "Conversemos sobre el resultado que su organización necesita. Justech SRL, Santo Domingo.",
  "/casos/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Resultados"
      title="De un requerimiento a una operación en marcha"
      lead="Cada organización llega con un contexto distinto. Un especialista le ayuda a definir el alcance y el siguiente paso."
      path="/casos/"
    >
      <p>
        Si desea explorar un proyecto de soporte, licenciamiento, equipos o implementación,
        escríbanos. Documentaremos el caso con el rigor que su operación exige.
      </p>
    </Interior>
  );
}
