import { ExperienceV8 } from "@/components/v8/Experience";
import { company } from "@/content/site";
import { withBase } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Integramos la tecnología que mantiene operando su empresa",
  "Infraestructura, conectividad, puestos, nube, seguridad y soporte, con un responsable. Justech SRL, Santo Domingo.",
  "/concepto-v8/",
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: company.legalName,
  foundingDate: String(company.founded),
  address: {
    "@type": "PostalAddress",
    addressLocality: company.city,
    addressCountry: "DO",
  },
  telephone: company.phoneTel,
  email: company.email,
  areaServed: "DO",
  url: "https://www.justech.do/",
};

export default function Page() {
  const desk = withBase("/visual/v8/v83-hero-day");
  const mobile = withBase("/visual/v8/v83-hero-mobile");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <link rel="preload" as="image" href={`${desk}.avif`} type="image/avif" media="(min-width: 721px)" />
      <link rel="preload" as="image" href={`${mobile}.avif`} type="image/avif" media="(max-width: 720px)" />
      <ExperienceV8 />
    </>
  );
}
