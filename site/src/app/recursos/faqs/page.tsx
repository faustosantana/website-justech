import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Preguntas frecuentes",
  "Soporte, horarios, cotizaciones y canales de Justech SRL.",
  "/recursos/faqs/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Recursos"
      title="Preguntas frecuentes"
      lead="Respuestas operativas para quien evalúa o ya trabaja con Justech."
      path="/recursos/faqs/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/recursos/", label: "Recursos" },
        { href: "/recursos/faqs/", label: "Preguntas frecuentes" },
      ]}
    >
      <h2>¿Cómo abro un caso de soporte?</h2>
      <p>
        Desde el portal soporte.justech.do, por correo de soporte o por el teléfono publicado.
        Incluya impacto, hora de inicio y evidencias.
      </p>
      <h2>¿Cuál es el horario de atención?</h2>
      <p>
        Lunes a viernes, de 8:00 a 17:30, hora de República Dominicana. Fuera de ese horario el
        caso queda registrado para el siguiente día hábil, salvo que el contrato contemple
        otra cobertura.
      </p>
      <h2>¿Puedo comprar en línea?</h2>
      <p>
        Las cotizaciones son B2B. Un especialista arma la propuesta según inventario, plazos y
        usuarios.
      </p>
      <h2>¿El soporte y las ventas usan el mismo canal?</h2>
      <p>
        No. Los clientes actuales usan el portal de soporte. Los requerimientos nuevos entran
        por contacto comercial.
      </p>
    </Interior>
  );
}
