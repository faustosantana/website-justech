import Link from "next/link";
import { ConceptShell } from "@/components/v8/Chrome";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { RESOURCE_ARTICLES, RESOURCE_AUTHOR, RESOURCE_DATE } from "@/content/resources";
import { V85_BASE } from "@/content/v85";
import { articleLd, pageMeta } from "@/lib/seo";
import styles from "@/components/v8/premium.module.css";

export function ResourcePage({ slug }: { slug: keyof typeof RESOURCE_ARTICLES }) {
  const article = RESOURCE_ARTICLES[slug];
  return (
    <ConceptShell>
      <main id="contenido">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd(article.title, article.description, article.path, RESOURCE_DATE)) }}
        />
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/recursos/`, label: "Recursos" },
            { href: article.path, label: article.title },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Guía</p>
          <h1>{article.title}</h1>
          <p className={styles.meta}>
            {RESOURCE_AUTHOR} · {RESOURCE_DATE}
          </p>
          <p>{article.intro}</p>
          <h2>Señales</h2>
          <ul className={styles.signals}>
            {article.signals.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Lista de verificación</h2>
          <ul className={styles.check}>
            {article.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Errores comunes</h2>
          <ul className={styles.signals}>
            {article.errors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2>Qué información preparar</h2>
          <ul className={styles.check}>
            {article.prepare.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.ctaRow}>
            <Link className={styles.cta} href={article.ctaHref}>
              {article.ctaLabel}
            </Link>
            <Link href={article.serviceHref}>{article.serviceLabel}</Link>
          </p>
        </article>
      </main>
    </ConceptShell>
  );
}

export function resourceMeta(slug: keyof typeof RESOURCE_ARTICLES) {
  const article = RESOURCE_ARTICLES[slug];
  return pageMeta(article.title, article.description, article.path);
}
