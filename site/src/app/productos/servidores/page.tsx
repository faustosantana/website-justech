import { RackExplorer } from "@/components/RackExplorer";
import { Stage } from "@/components/Stage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Servidores y data center",
  "Cómputo, almacenamiento, redundancia y energía según la carga. Sin especificaciones inventadas. Justech SRL.",
  "/productos/servidores/",
);

export default function Page() {
  return (
    <Stage
      family="object"
      kicker="Servidores"
      title="El rack se diseña según la carga, no según el folleto."
      lead="Procesamiento, memoria, almacenamiento, red, energía y respaldo con cabeza para operar."
      scene="rack"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/productos/", label: "Productos" },
        { href: "/productos/servidores/", label: "Servidores" },
      ]}
      ctaHref="/contacto/cotizacion/?need=servidores"
      ctaLabel="Hablar de un diseño de carga"
    >
      <div className="container section">
        <h2 className="section-title">Explore el compartimento, no un SKU.</h2>
        <RackExplorer />
      </div>
    </Stage>
  );
}
