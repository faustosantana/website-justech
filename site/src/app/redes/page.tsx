import Link from "next/link";
import { NetworkExplorer } from "@/components/NetworkExplorer";
import { Stage } from "@/components/Stage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Redes y conectividad empresarial",
  "Diseño de redes para sede, sucursales, campus y Wi-Fi. Levantamiento, segmentación y operación con Justech SRL.",
  "/redes/",
);

export default function Page() {
  return (
    <Stage
      family="layers"
      kicker="Redes"
      title="Conectar la operación, no improvisar un switch."
      lead="Sede, sucursales, APs, usuarios y nube en un diseño que se puede documentar y sostener."
      scene="network"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/redes/", label: "Redes" },
      ]}
      ctaHref="/contacto/diagnostico/?need=red"
      ctaLabel="Pedir diagnóstico de red"
      note="Topología propia, no la ciudad de la portada."
    >
      <div className="container section">
        <p className="eyebrow">Topología explorable</p>
        <h2 className="section-title">El sitio dicta el diseño.</h2>
        <NetworkExplorer />
      </div>
      <div className="container pb-16 grid gap-10 lg:grid-cols-2">
        <article>
          <h2>Alcance habitual</h2>
          <ul>
            <li>LAN, WAN y Wi-Fi de diseño</li>
            <li>Switching, routing y segmentación</li>
            <li>Disponibilidad razonable, sin afirmar 24/7</li>
            <li>Documentación y mantenimiento</li>
          </ul>
        </article>
        <article>
          <h2>Preguntas</h2>
          <details>
            <summary>¿Trabajan fuera de Santo Domingo?</summary>
            <p>La base es Santo Domingo. Otros sitios se evalúan por proyecto.</p>
          </details>
          <details>
            <summary>¿Incluye cableado?</summary>
            <p>
              Si el diagnóstico lo pide, el alcance cruza a{" "}
              <Link href="/infraestructura-fisica/">infraestructura física</Link>.
            </p>
          </details>
        </article>
      </div>
    </Stage>
  );
}
