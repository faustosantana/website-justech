import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

export const metadata = pageMeta(
  "Solicitar levantamiento",
  "Ruta para planificar una sede, sucursal o cuarto técnico. El levantamiento define puestos, rutas y capacidad antes de cotizar.",
  `${V85_BASE}/solicitar-levantamiento/`,
);

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/solicitar-levantamiento/`, label: "Solicitar levantamiento" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Conversión</p>
          <h1>Solicitar un levantamiento de sede</h1>
          <p className={styles.lead}>
            Visitamos el sitio o trabajamos sobre planos. El objetivo es dimensionar cableado, red y puestos antes de
            comprometer una cifra.
          </p>
        </article>
        <IntentQuote initial="cableado" />
      </main>
    </ConceptShell>
  );
}
