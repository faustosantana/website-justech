import { ExperienceV8 } from "@/components/v8/Experience";
import { withBase } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Tecnología empresarial conectada",
  "Justech integra infraestructura, equipos, redes, licenciamiento, nube, seguridad y soporte bajo una sola estrategia tecnológica.",
  "/concepto-v8/",
);

export default function Page() {
  const desk = withBase("/visual/v8/v82-hero-rest");
  const mobile = withBase("/visual/v8/v82-hero-mobile");
  return (
    <>
      <link rel="preload" as="image" href={`${desk}.avif`} type="image/avif" media="(min-width: 721px)" />
      <link rel="preload" as="image" href={`${mobile}.avif`} type="image/avif" media="(max-width: 720px)" />
      <ExperienceV8 />
    </>
  );
}
