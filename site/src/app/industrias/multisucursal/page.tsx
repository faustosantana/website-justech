import Link from "next/link";
import { Flagship } from "@/components/Flagship";
import { TechScene } from "@/components/TechScene";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Empresas con múltiples sucursales",
  "Un estándar de red, identidad y soporte para cada local. Sin casos inventados. Justech SRL.",
  "/industrias/multisucursal/",
);

export default function Page() {
  return (
    <Flagship
      kicker="Escenario"
      title="El segundo local no puede ser un invento."
      lead="Misma identidad, mismo Wi-Fi de piso, misma mesa de ayuda. El alcance se define por operación, no por un vertical de catálogo."
      scene="network"
      photo="/visual/city-mesh.webp"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/industrias/", label: "Industrias" },
        { href: "/industrias/multisucursal/", label: "Múltiples sucursales" },
      ]}
      ctaHref="/contacto/proyecto/?need=sucursal"
      ctaLabel="Diseñar el estándar"
    >
      <div className="container section grid gap-10 lg:grid-cols-2">
        <TechScene scene="network" layer={4} />
        <article>
          <h2>Qué se estandariza</h2>
          <ul>
            <li>Kit de sucursal: red, energía, impresión, colaboración</li>
            <li>Identidad de los usuarios de piso</li>
            <li>Canal de soporte remoto</li>
          </ul>
          <p>
            No publicamos cadenas de clientes. Si hay autorización, el caso aparece aquí.
          </p>
          <Link href="/soluciones/sucursales/">Solución para sucursales</Link>
        </article>
      </div>
    </Flagship>
  );
}
