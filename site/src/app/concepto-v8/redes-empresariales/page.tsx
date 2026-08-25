import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { Crumbs, ServiceArticle } from "@/components/v8/ServiceArticle";
import { RedesLab } from "@/components/v8/PageDemos";
import { PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

const page = PAGES.redes;

export const metadata = pageMeta(page.title, page.description, page.path, "/visual/v8/v82-ops-normal.jpg");

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Redes empresariales" },
          ]}
        />
        <ServiceArticle
          kicker="Redes y conectividad · República Dominicana"
          title={page.title}
          lead={page.description}
          problem={page.problem}
          who={page.who}
          includes={page.includes}
          how={page.how}
          delivers={page.delivers}
          faq={page.faq}
          path={page.path}
          hero={{ image: "v82-ops-normal", alt: "Operación de red empresarial en estado normal." }}
          demo={
            <div className={styles.demoSlot} id="wifi">
              <RedesLab />
            </div>
          }
          nextHref={`${V85_BASE}/solicitar-diagnostico/`}
          nextLabel="Solicitar un diagnóstico de red"
        />
        <IntentQuote initial="redes" />
      </main>
    </ConceptShell>
  );
}
