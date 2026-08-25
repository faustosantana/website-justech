import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { company } from "@/content/site";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

export const metadata = pageMeta(
  "Hablar con un especialista",
  "Cuente qué necesita resolver. Justech SRL evalúa, diseña, suministra, implementa y soporta desde Santo Domingo. Formulario de demostración en este entorno.",
  `${V85_BASE}/contacto/`,
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
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/contacto/`, label: "Contacto" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Contacto</p>
          <h1>Cuente el problema. Diseñamos el alcance.</h1>
          <p className={styles.lead}>
            El formulario de este entorno es simulado: no crea un caso ni envía correo. En el sitio público, un
            especialista responde en horario laboral.
          </p>
          <p>
            {company.phoneDisplay} · {company.email} · {company.hours}
          </p>
        </article>
        <IntentQuote />
      </main>
    </ConceptShell>
  );
}
