import Link from "next/link";
import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Cumplimiento y confianza",
  "Políticas y documentos públicos de Justech SRL.",
  "/nosotros/cumplimiento/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Cumplimiento y confianza"
      lead="Las políticas públicas de Justech describen cómo tratamos la información, el soporte y la continuidad."
      path="/nosotros/cumplimiento/"
    >
      <p>
        Consulte el <Link href="/legal/">centro legal</Link> y las políticas de privacidad,
        cookies, seguridad de la información, contingencia y nivel de servicio.
      </p>
    </Interior>
  );
}
