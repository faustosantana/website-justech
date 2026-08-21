import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Infraestructura y redes",
  "Diseño e implementación de infraestructura y redes para organizaciones, con Justech SRL.",
  "/soluciones/infraestructura-y-redes/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soluciones"
      title="Infraestructura y redes"
      lead="Conectividad, servidores y entornos de red alineados a la continuidad de su operación."
      path="/soluciones/infraestructura-y-redes/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/soluciones/", label: "Soluciones" },
        { href: "/soluciones/infraestructura-y-redes/", label: "Infraestructura y redes" },
      ]}
    >
      <p>
        Si su organización necesita ordenar, ampliar o modernizar la infraestructura, un
        especialista evalúa el requerimiento e integra el trabajo con implementación y soporte.
      </p>
    </Interior>
  );
}
