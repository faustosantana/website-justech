import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Infraestructura y redes",
  "Página en validación. Justech no publica esta línea como oferta activa hasta confirmación comercial.",
  "/soluciones/infraestructura-y-redes/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soluciones"
      title="Infraestructura y redes"
      lead="Capacidad mencionada en credenciales internas. Esta URL existe para la arquitectura SEO objetivo; el copy comercial se publica cuando C14 lo autorice."
      pending
    >
      <p>
        Mientras tanto, los requerimientos de implementación y soporte se atienden por las
        líneas ya públicas.
      </p>
    </Interior>
  );
}
