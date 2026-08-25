import { ConceptShell } from "@/components/v8/Chrome";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { RESOURCES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";
import Link from "next/link";

export const metadata = pageMeta(
  "Recursos técnicos para decidir con criterio",
  "Guías originales de Justech sobre cableado, Wi-Fi y renovación de equipos. Sin recetas copiadas ni promesas vacías.",
  `${V85_BASE}/recursos/`,
);

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/recursos/`, label: "Recursos" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Recursos</p>
          <h1>Tres guías para preparar una conversación útil.</h1>
          <p className={styles.lead}>
            Material propio. No es un blog de premios ni un recorte de fichas de fabricante.
          </p>
          <ul>
            {RESOURCES.map((r) => (
              <li key={r.slug}>
                <Link href={`${V85_BASE}/recursos/${r.slug}/`}>
                  <strong>{r.title}</strong>
                </Link>
                <span> — {r.description}</span>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </ConceptShell>
  );
}
