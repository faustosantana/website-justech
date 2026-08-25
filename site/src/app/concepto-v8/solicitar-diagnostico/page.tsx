import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

export const metadata = pageMeta(
  "Solicitar diagnóstico",
  "Ruta para evaluar cobertura, capacidad, segmentación o continuidad de una red empresarial en operación.",
  `${V85_BASE}/solicitar-diagnostico/`,
);

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/solicitar-diagnostico/`, label: "Solicitar diagnóstico" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Conversión</p>
          <h1>Solicitar un diagnóstico de red</h1>
          <p className={styles.lead}>
            Partimos de la topología real: enlaces, Wi-Fi, borde y sucursales. El resultado es un alcance técnico para
            mejorar cobertura, capacidad o continuidad.
          </p>
        </article>
        <IntentQuote initial="redes" />
      </main>
    </ConceptShell>
  );
}
