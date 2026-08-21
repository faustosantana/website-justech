import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Outsourcing e implants tecnológicos",
  "Profesionales tecnológicos en su operación, con Justech como responsable.",
  "/servicios/outsourcing-e-implants/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Servicios"
      title="Outsourcing e implants"
      lead="Cuando necesita un perfil calificado fijo en su operación, lo colocamos y lo acompañamos. Es una de las diferencias prácticas frente a un integrador que solo cotiza cajas."
    >
      <p>
        El implant no sustituye una estrategia: se acuerda alcance, reporte y escalamiento
        hacia Justech.
      </p>
    </Interior>
  );
}
