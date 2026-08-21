import { ConceptV7 } from "@/components/v7/Concept";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Concepto V7",
  "Muestra aislada de dirección visual: header, home, red, equipos, soporte, conversación y pie. No sustituye el sitio público.",
  "/concepto-v7/",
);

export default function Page() {
  return <ConceptV7 />;
}
