import { ConceptShell } from "@/components/v8/Chrome";
import { CableDemo } from "@/components/v8/CableDemo";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { Crumbs, ServiceArticle } from "@/components/v8/ServiceArticle";
import { PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

const page = PAGES.cableado;

export const metadata = pageMeta(page.title, page.description, page.path, "/visual/v8/v82-sede-rack.jpg");

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Cableado estructurado" },
          ]}
        />
        <ServiceArticle
          kicker="Infraestructura y conectividad · Santo Domingo"
          title={page.title}
          lead={page.description}
          problem={page.problem}
          who={page.who}
          includes={page.includes}
          how={page.how}
          delivers={page.delivers}
          faq={page.faq}
          path={page.path}
          hero={{ image: "v82-sede-rack", alt: "Cuarto técnico empresarial con rack organizado." }}
          demo={
            <div className={styles.demoSlot}>
              <CableDemo />
            </div>
          }
          nextHref={`${V85_BASE}/solicitar-levantamiento/`}
          nextLabel="Solicitar un levantamiento"
        />
        <IntentQuote initial="cableado" />
      </main>
    </ConceptShell>
  );
}
