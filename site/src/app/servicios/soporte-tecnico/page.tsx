import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soporte técnico N1–N3",
  "Soporte técnico remoto y presencial para la continuidad de su operación.",
  "/servicios/soporte-tecnico/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Servicios"
      title="Soporte técnico N1, N2 y N3"
      lead="Atendemos incidencias para que el negocio no se detenga. El detalle de tiempos está en el acuerdo de nivel de servicio público, sin prometer 24/7 si el contrato no lo dice."
    >
      <p>
        Canal de tickets:{" "}
        <a href="https://soporte.justech.do">soporte.justech.do</a>. El horario de atención
        publicado en los documentos de julio 2026 es lunes a viernes, 8:00 a 17:30, hora de
        República Dominicana.
      </p>
      <p>Emergencias fuera de horario solo si están acordadas contractualmente.</p>
    </Interior>
  );
}
