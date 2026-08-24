import { ExperienceV8 } from "@/components/v8/Experience";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Concepto V8",
  "Justech Technology Experience. Muestra interactiva aislada: header, hero, explorador y demostración controlable. No sustituye el sitio público.",
  "/concepto-v8/",
);

export default function Page() {
  return <ExperienceV8 />;
}
