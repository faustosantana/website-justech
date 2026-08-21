import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Casos",
  "Justech no publica casos de éxito con cifras o logos hasta autorización escrita.",
  "/casos/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Casos"
      title="Historias de clientes"
      lead="El sitio actual muestra logos y testimonios. Este preview no los republica hasta permiso y clasificación de la relación."
      pending
    >
      <p>
        Un testimonio de Leja Car Rental aparece en el home marcado como pendiente de
        autorización. No hay galería de logos ni métricas de ahorro.
      </p>
    </Interior>
  );
}
