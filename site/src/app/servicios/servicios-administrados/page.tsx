import { OpsCenter } from "@/components/OpsCenter";
import { ProcessTrack } from "@/components/ProcessTrack";
import { Stage } from "@/components/Stage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Servicios administrados de TI",
  "Rutinas de inventario, copias, red y casos. Representación visual, no un producto de consola. Justech SRL.",
  "/servicios/servicios-administrados/",
);

const flow = [
  { t: "Detección", d: "Una señal deja de ser ruido." },
  { t: "Actividad", d: "Se convierte en un trabajo con dueño." },
  { t: "Asignación", d: "Hay responsable, no un chat grupal." },
  { t: "Seguimiento", d: "El estado se ve. No se pregunta por WhatsApp." },
  { t: "Documentación", d: "Queda evidencia para la siguiente semana." },
  { t: "Mejora", d: "La operación se lee mejor que ayer." },
];

export default function Page() {
  return (
    <Stage
      family="interface"
      kicker="Servicios administrados"
      title="Operar la tecnología, todas las semanas."
      lead="Inventario, higiene, copias, casos y mantenimiento con un interlocutor. No un técnico ocasional."
      visual={<OpsCenter />}
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/servicios/", label: "Servicios" },
        { href: "/servicios/servicios-administrados/", label: "Servicios administrados" },
      ]}
      ctaHref="/contacto/servicio-administrado/"
      ctaLabel="Solicitar servicio administrado"
      note="Control y tranquilidad, no un dashboard de producto."
    >
      <div className="container section">
        <h2 className="section-title">Qué se delega, con evidencia.</h2>
        <p className="lead-copy">
          Un servicio administrado se reconoce en la rutina: inventario, copias, casos y
          mantenimiento con dueño. Esta interfaz no se vende como software.
        </p>
        <ProcessTrack title="De la señal a la mejora" steps={flow} />
        <ul className="spec-list">
          <li>Inventario que se puede auditar</li>
          <li>Copias cuya restauración se prueba</li>
          <li>Casos con responsable y horario publicado</li>
          <li>Mantenimiento con ventana, no con sorpresa</li>
        </ul>
      </div>
    </Stage>
  );
}
