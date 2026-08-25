import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Equipo",
  "Justech SRL, tecnología empresarial desde Santo Domingo.",
  "/nosotros/equipo/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Un equipo al servicio de la operación"
      lead="El contacto institucional es el canal para conocer a las personas que atenderán su requerimiento."
      path="/nosotros/equipo/"
    >
      <p>
        Escríbanos a través de Contacto o del portal de soporte. Asignamos un responsable según
        el tipo de trabajo.
      </p>
    </Interior>
  );
}
