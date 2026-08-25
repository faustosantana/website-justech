import { SecurityLayers } from "@/components/SecurityLayers";
import { Stage } from "@/components/Stage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Seguridad y protección empresarial",
  "Capas de identidad, endpoints, perímetro, datos y respaldo. Sin SOC 24/7 inventado. Justech SRL.",
  "/seguridad/",
);

export default function Page() {
  return (
    <Stage
      family="layers"
      kicker="Seguridad"
      title="Proteger sin apagar el negocio."
      lead="Un evento se aísla. La operación sigue. Capas que las personas pueden cumplir."
      scene="security"
      story={0.85}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/seguridad/", label: "Seguridad" },
      ]}
      ctaHref="/contacto/diagnostico/?need=seguridad"
      ctaLabel="Pedir diagnóstico"
      note="Estética ejecutiva: capas, señal, contención. Sin clichés de hacker."
    >
      <div className="container section">
        <p className="eyebrow">Capas vivas</p>
        <h2 className="section-title">Seleccione una capa. Entienda el riesgo y el siguiente paso.</h2>
        <SecurityLayers />
      </div>
    </Stage>
  );
}
