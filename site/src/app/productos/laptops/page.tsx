import Link from "next/link";
import { EquipWizard } from "@/components/EquipWizard";
import { LaptopRig } from "@/components/LaptopRig";
import { Stage } from "@/components/Stage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Laptops empresariales",
  "Selección, imagen, etiquetado, entrega y garantía. Catálogo consultivo, no tienda. Justech SRL.",
  "/productos/laptops/",
);

export default function Page() {
  return (
    <Stage
      family="object"
      kicker="Aprovisionamiento"
      title="Una laptop es un puesto de trabajo, no una oferta de mostrador."
      lead="Criterio de uso, imagen corporativa, inventario y RMA. Sin precios en el sitio."
      scene="laptop"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/productos/", label: "Productos" },
        { href: "/productos/laptops/", label: "Laptops" },
      ]}
      ctaHref="/contacto/cotizacion/?need=equipos"
      ctaLabel="Solicitar cotización"
      note="El objeto es un portátil. El rack no entra en esta página."
    >
      <div className="container section">
        <LaptopRig />
        <EquipWizard />
        <p>
          Otras categorías en el <Link href="/productos/">catálogo consultivo</Link>. Servidores y
          data center: <Link href="/productos/servidores/">diseño de carga</Link>.
        </p>
      </div>
    </Stage>
  );
}
