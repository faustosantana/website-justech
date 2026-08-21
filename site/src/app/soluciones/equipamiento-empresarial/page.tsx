import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Equipamiento empresarial",
  "Equipos, servidores, redes y accesorios para organizaciones, no venta minorista.",
  "/soluciones/equipamiento-empresarial/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soluciones"
      title="Equipamiento empresarial"
      lead="Selección y entrega de equipos con compromiso de calidad y tiempo, alineado a un requerimiento — no a un carrito de e-commerce."
    >
      <p>
        Servidores, estaciones, redes y accesorios se cotizan según el caso. WooCommerce no
        forma parte de este sitio: no hay tienda pública.
      </p>
    </Interior>
  );
}
