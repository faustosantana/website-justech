import Link from "next/link";
import { CablingCompare } from "@/components/CablingCompare";
import { Stage } from "@/components/Stage";
import { cablingCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Cableado e infraestructura física",
  "De plano a planta certificada: levantamiento, rutas, rack, etiquetas y documentos. Justech SRL.",
  "/infraestructura-fisica/",
);

export default function Page() {
  return (
    <Stage
      family="process"
      kicker="Infraestructura física"
      title="Ver la obra. No imaginarla."
      lead="Doce pasos, de un sitio desordenado a una planta etiquetada y certificable."
      scene="cabling"
      story={0.7}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/infraestructura-fisica/", label: "Infraestructura física" },
      ]}
      ctaHref="/contacto/levantamiento/"
      ctaLabel="Solicitar levantamiento"
      note="El plano se construye delante. El antes/después es ilustración, no un cliente."
    >
      <div className="container section">
        <h2 className="section-title">De closet improvisado a planta operable.</h2>
        <CablingCompare />
      </div>
      <div className="container py-16">
        <h2>Capítulos de la planta</h2>
        <ul className="chip-list">
          {cablingCaps.map((c) => (
            <li key={c.href}>
              <Link href={c.href}>{c.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Stage>
  );
}
