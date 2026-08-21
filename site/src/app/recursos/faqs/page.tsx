import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Preguntas frecuentes",
  "Respuestas operativas de Justech SRL, sin relleno.",
  "/recursos/faqs/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Recursos"
      title="Preguntas frecuentes"
      lead="Extraídas de los documentos públicos de julio 2026 y de la operación visible. Nada de FAQ inventado para Google."
    >
      <h2>¿Cómo abro un caso de soporte?</h2>
      <p>
        Portal soporte.justech.do, correo de soporte o teléfono publicado. Incluya impacto,
        hora de inicio y evidencias.
      </p>
      <h2>¿El soporte es 24/7?</h2>
      <p>
        El horario público es laboral, lunes a viernes. Fuera de horario se registra para el
        siguiente día hábil, salvo emergencia contractual.
      </p>
      <h2>¿Justech es partner Gold de Microsoft o Fortinet?</h2>
      <p>No lo afirmamos en este sitio hasta tener designation vigente.</p>
      <h2>¿Puedo comprar en línea?</h2>
      <p>No. Las cotizaciones son B2B, no hay carrito.</p>
    </Interior>
  );
}
