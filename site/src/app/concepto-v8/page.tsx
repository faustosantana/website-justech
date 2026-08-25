import { ExperienceV8 } from "@/components/v8/Experience";
import { withBase } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Concepto V8",
  "Justech Technology Experience. Muestra aislada: un header, un hero y tres estados. No sustituye el sitio público.",
  "/concepto-v8/",
);

export default function Page() {
  const hero = withBase("/visual/v8/v81-hero.webp");
  return (
    <>
      <link rel="preload" as="image" href={hero} type="image/webp" />
      <ExperienceV8 />
    </>
  );
}
