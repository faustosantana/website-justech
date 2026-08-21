import Link from "next/link";
import { Flagship } from "@/components/Flagship";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Laptops empresariales",
  "Selección, imagen, etiquetado, entrega y garantía. Catálogo consultivo, no tienda. Justech SRL.",
  "/productos/laptops/",
);

const chain = [
  "Necesidad",
  "Especificación",
  "Cotización",
  "Recepción",
  "Imagen y cifrado",
  "Etiqueta",
  "Entrega",
  "Garantía",
];

export default function Page() {
  return (
    <Flagship
      kicker="Aprovisionamiento"
      title="Una laptop es un puesto de trabajo, no una oferta de mostrador."
      lead="Criterio de uso, imagen corporativa, inventario y RMA. Sin precios en el sitio."
      scene="rack"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/productos/", label: "Productos" },
        { href: "/productos/laptops/", label: "Laptops" },
      ]}
      ctaHref="/contacto/cotizacion/?need=equipos"
      ctaLabel="Solicitar cotización"
    >
      <div className="container section">
        <ol className="rail">
          {chain.map((s, i) => (
            <li key={s}>
              <p className="n m-0">{String(i + 1).padStart(2, "0")}</p>
              <h3>{s}</h3>
            </li>
          ))}
        </ol>
        <p>
          Otras categorías en el <Link href="/productos/">catálogo consultivo</Link>.
        </p>
      </div>
    </Flagship>
  );
}
