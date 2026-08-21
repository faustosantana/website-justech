import Link from "next/link";
import { CablingStory } from "@/components/CablingStory";
import { Flagship } from "@/components/Flagship";
import { cablingCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";
import { withBase } from "@/lib/paths";

export const metadata = pageMeta(
  "Cableado e infraestructura física",
  "De plano a planta certificada: levantamiento, rutas, rack, etiquetas y documentos. Justech SRL.",
  "/infraestructura-fisica/",
);

export default function Page() {
  return (
    <Flagship
      kicker="Infraestructura física"
      title="Ver la obra. No imaginarla."
      lead="Doce pasos, de un sitio desordenado a una planta etiquetada y certificable."
      scene="cabling"
      photo="/visual/patch-panel.webp"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/infraestructura-fisica/", label: "Infraestructura física" },
      ]}
      ctaHref="/contacto/levantamiento/"
      ctaLabel="Solicitar levantamiento"
    >
      <div className="container section">
        <h2 className="section-title">Avance el proceso.</h2>
        <CablingStory />
      </div>
      <section className="photo-band" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/visual/cabling-order.webp")} alt="" />
      </section>
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
    </Flagship>
  );
}
