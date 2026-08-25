import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { PageHero } from "@/components/v8/PageHero";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { company } from "@/content/site";
import { publicText } from "@/content/justech-source-of-truth";
import { V85_BASE } from "@/content/v85";
import { pageMeta, webPageLd } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

export const metadata = pageMeta(
  "Hablar con un especialista",
  "Cuente qué necesita resolver. Justech SRL evalúa, diseña, suministra, implementa y soporta desde Santo Domingo.",
  `${V85_BASE}/contacto/`,
  "/visual/v8/v83-hero-day.jpg",
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contacto Justech SRL",
  mainEntity: {
    "@type": "ProfessionalService",
    name: company.legalName,
    telephone: company.phoneTel,
    email: company.email,
    openingHours: "Mo-Fr 08:00-17:30",
    address: { "@type": "PostalAddress", addressLocality: company.city, addressCountry: "DO" },
  },
};

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              webPageLd(
                "Hablar con un especialista",
                "Cuente qué necesita resolver. Justech SRL evalúa, diseña, suministra, implementa y soporta desde Santo Domingo.",
                `${V85_BASE}/contacto/`,
              ),
            ),
          }}
        />
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/contacto/`, label: "Contacto" },
          ]}
        />
        <article className={styles.article} data-visual="1">
          <PageHero
            kicker="Contacto"
            title="Cuente el problema. Diseñamos el alcance."
            lead="Cuente el problema, el sitio y el alcance previsto. Un especialista responde en horario laboral."
            image="v83-hero-day"
            alt="Oficina empresarial de día en Santo Domingo."
          />
          <section>
            <h2>Datos de contacto</h2>
            <ul>
              <li>{publicText("legal-name")}</li>
              <li>{publicText("city")}</li>
              <li>Desde {publicText("since")}</li>
              <li>
                <a href={`tel:${company.phoneTel}`}>{publicText("phone")}</a>
              </li>
              <li>
                <a href={`mailto:${company.email}`}>{publicText("email")}</a>
              </li>
              <li>{publicText("hours")}</li>
              <li>
                <a href={company.supportUrl} rel="noreferrer">
                  {publicText("support-portal")}
                </a>
              </li>
              <li>{publicText("rnc")}</li>
            </ul>
          </section>
        </article>
        <IntentQuote />
      </main>
    </ConceptShell>
  );
}
