import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Metodología",
  "Estrategia, aprovisionamiento, implementación, operación y mejora continua.",
  "/nosotros/metodologia/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Metodología"
      lead="Cinco pasos cortos. Nada de marcos que no operemos en público."
    >
      <ol>
        <li>Estrategia: entender operación y riesgo.</li>
        <li>Aprovisionamiento: licencias y equipos trazables.</li>
        <li>Implementación: puesta en marcha con dueño del resultado.</li>
        <li>Operación: soporte y tickets.</li>
        <li>Mejora continua: ajustar lo que ya corre.</li>
      </ol>
      <p>
        Scrum, Kanban, SAFe o CI/CD se mencionan solo cuando el proyecto lo use de verdad —
        no como decoración.
      </p>
    </Interior>
  );
}
