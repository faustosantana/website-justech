import { Flagship } from "@/components/Flagship";
import { LicenseStudio } from "@/components/LicenseStudio";
import { TechScene } from "@/components/TechScene";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Licenciamiento empresarial",
  "De cuentas dispersas a un tenant con gobierno. Microsoft 365 y Google Workspace sin sellos de partnership. Justech SRL.",
  "/licenciamiento/",
);

export default function Page() {
  return (
    <Flagship
      kicker="Licenciamiento"
      title="Puestos que coinciden con personas."
      lead="Descubrimiento, asignación, migración, renovación y soporte. Sin precios en pantalla."
      scene="license"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/licenciamiento/", label: "Licenciamiento" },
      ]}
      ctaHref="/contacto/licenciamiento/"
      ctaLabel="Solicitar evaluación"
    >
      <div className="container section grid gap-12 lg:grid-cols-2">
        <div>
          <h2>De disperso a gobernado</h2>
          <ol>
            <li>Descubrir tenants y cuentas personales</li>
            <li>Seleccionar el plan según el trabajo real</li>
            <li>Asignar, migrar y configurar</li>
            <li>Renovar y optimizar puestos</li>
          </ol>
          <TechScene scene="license" />
        </div>
        <LicenseStudio />
      </div>
    </Flagship>
  );
}
