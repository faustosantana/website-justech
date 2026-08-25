import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { RedesLab, SoporteLab } from "@/components/v8/PageDemos";
import { Crumbs, ServiceArticle } from "@/components/v8/ServiceArticle";
import { PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

const page = PAGES.soporte;

export const metadata = pageMeta(page.title, page.description, page.path);

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Soporte técnico empresarial" },
          ]}
        />
        <ServiceArticle
          kicker="Soporte y servicios administrados"
          title={page.title}
          lead={page.description}
          problem={page.problem}
          who={page.who}
          includes={page.includes}
          how={page.how}
          delivers={page.delivers}
          faq={page.faq}
          demo={
            <div className={styles.demoSlot}>
              <RedesLab />
              <SoporteLab />
            </div>
          }
          nextHref={`${V85_BASE}/solicitar-soporte/`}
          nextLabel="Diseñar un plan de soporte"
        />
        <IntentQuote initial="soporte" />
      </main>
    </ConceptShell>
  );
}
