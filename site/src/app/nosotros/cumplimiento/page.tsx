import Link from "next/link";
import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Cumplimiento y confianza",
  "Centro legal de Justech SRL y límites de lo que este sitio afirma.",
  "/nosotros/cumplimiento/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Cumplimiento y confianza"
      lead="Las políticas públicas de julio 2026 son la base. Este preview no replica el incidente de producción en /legal/."
    >
      <p>
        Consulte el <Link href="/legal/">centro legal de este sitio</Link>. Los documentos
        auténticos vigentes también están en las URLs largas de justech.do (privacidad,
        cookies, SLA, canales). La URL de producción /legal/ estuvo comprometida: no la
        usamos como fuente.
      </p>
      <p>No se afirman ISO, premios ni partnerships no verificados.</p>
    </Interior>
  );
}
