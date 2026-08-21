import { Flagship } from "@/components/Flagship";
import { OpsBoard } from "@/components/OpsBoard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Servicios administrados de TI",
  "Rutinas de inventario, copias, red y casos. Representación visual, no un producto de consola. Justech SRL.",
  "/servicios/servicios-administrados/",
);

export default function Page() {
  return (
    <Flagship
      kicker="Servicios administrados"
      title="Operar la tecnología, todas las semanas."
      lead="Inventario, higiene, copias, casos y mantenimiento con un interlocutor. No un técnico ocasional."
      scene="msp"
      photo="/visual/ops-desk.webp"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/servicios/", label: "Servicios" },
        { href: "/servicios/servicios-administrados/", label: "Servicios administrados" },
      ]}
      ctaHref="/contacto/servicio-administrado/"
      ctaLabel="Solicitar servicio administrado"
    >
      <div className="container section">
        <h2 className="section-title">Así se ve delegar la operación — en simulación.</h2>
        <OpsBoard />
        <p className="text-sm text-muted">
          Esta interfaz no es un software que Justech venda. Ilustra el tipo de visibilidad que un
          servicio administrado puede construir.
        </p>
      </div>
    </Flagship>
  );
}
