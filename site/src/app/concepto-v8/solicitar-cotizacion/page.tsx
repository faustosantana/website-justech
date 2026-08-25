import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

export const metadata = pageMeta(
  "Solicitar cotización",
  "Ruta de conversión para cotizar infraestructura, equipos, licencias o un proyecto integral. Formulario simulado en staging.",
  `${V85_BASE}/solicitar-cotizacion/`,
);

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/solicitar-cotizacion/`, label: "Solicitar cotización" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Conversión</p>
          <h1>Solicitar cotización</h1>
          <p className={styles.lead}>
            Describa equipos, licencias o un proyecto. Recibirá una propuesta según el alcance, no un carrito de
            compra.
          </p>
        </article>
        <IntentQuote initial="equipos" />
      </main>
    </ConceptShell>
  );
}
