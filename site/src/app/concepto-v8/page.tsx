import { ConceptShell } from "@/components/v8/Chrome";
import { HomeHero } from "@/components/v8/HomeHero";
import { ExperienceV8 } from "@/components/v8/Experience";
import { withBase } from "@/lib/paths";
import { localBusinessLd, pageMeta, webPageLd } from "@/lib/seo";

export const metadata = pageMeta(
  "Integramos la tecnología que mantiene operando su empresa",
  "Infraestructura, redes, equipos, licenciamiento, nube, seguridad y soporte, coordinados por un solo equipo. Justech SRL, Santo Domingo, desde 2018.",
  "/concepto-v8/",
  "/visual/v8/v83-hero-day.jpg",
);

const pageLd = webPageLd(
  "Integramos la tecnología que mantiene operando su empresa",
  "Infraestructura, redes, equipos, licenciamiento, nube, seguridad y soporte, coordinados por un solo equipo. Justech SRL, Santo Domingo, desde 2018.",
  "/concepto-v8/",
);

export default function Page() {
  const desk = withBase("/visual/v8/v83-hero-day");
  const mobile = withBase("/visual/v8/v83-hero-mobile");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <link rel="preload" as="image" href={`${desk}.avif`} type="image/avif" media="(min-width: 721px)" />
      <link rel="preload" as="image" href={`${mobile}.avif`} type="image/avif" media="(max-width: 720px)" />
      <ConceptShell>
        <main id="contenido">
          <HomeHero />
          <ExperienceV8 />
        </main>
      </ConceptShell>
    </>
  );
}
