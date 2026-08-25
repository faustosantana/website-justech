import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { company } from "@/content/site";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

export const metadata = pageMeta(
  "Solicitar soporte",
  "Ruta para diseñar un plan de mesa de ayuda, mantenimiento o servicio administrado. Horario hábil en República Dominicana.",
  `${V85_BASE}/solicitar-soporte/`,
);

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/solicitar-soporte/`, label: "Solicitar soporte" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Conversión</p>
          <h1>Diseñar un plan de soporte</h1>
          <p className={styles.lead}>
            Canal único, responsable y cierre documentado. Horario indicado: {company.hours}. Si ya es cliente, use
            también el portal de soporte.
          </p>
          <p>
            <a href={company.supportUrl} rel="noreferrer">
              Abrir el portal de soporte
            </a>
          </p>
        </article>
        <IntentQuote initial="soporte" />
      </main>
    </ConceptShell>
  );
}
