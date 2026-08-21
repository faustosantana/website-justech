import { LicenseOrg } from "@/components/LicenseOrg";
import { Stage } from "@/components/Stage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Licenciamiento empresarial",
  "De cuentas dispersas a un tenant con gobierno. Microsoft 365 y Google Workspace sin sellos de partnership. Justech SRL.",
  "/licenciamiento/",
);

export default function Page() {
  return (
    <Stage
      family="process"
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
      note="La organización se ve. El configurador no cierra un plan."
    >
      <div className="container section">
        <h2 className="section-title">De disperso a gobernado.</h2>
        <LicenseOrg />
      </div>
    </Stage>
  );
}
