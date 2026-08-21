import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Industrias",
  "Justech trabaja con organizaciones de distintos sectores. Cuéntenos su escenario operativo.",
  "/industrias/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Industrias"
      title="Organizaciones que no pueden detenerse"
      lead="Atendemos requerimientos tecnológicos de empresas e instituciones. El alcance se define por el resultado, no por un vertical genérico."
      path="/industrias/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/industrias/", label: "Industrias" },
      ]}
    >
      <p>
        Si su operación exige continuidad, renovación de software, equipos o un soporte con
        responsables, un especialista de Justech puede ayudarle a ordenar el camino.
      </p>
    </Interior>
  );
}
