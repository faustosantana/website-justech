import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { LicenciasLab } from "@/components/v8/PageDemos";
import { Crumbs, ServiceArticle } from "@/components/v8/ServiceArticle";
import { PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

const page = PAGES.licencias;

export const metadata = pageMeta(page.title, page.description, page.path, "/visual/v8/v82-modern-apps.jpg");

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Licenciamiento" },
          ]}
        />
        <ServiceArticle
          kicker="Licenciamiento, nube y productividad"
          title={page.title}
          lead={page.description}
          problem={page.problem}
          who={page.who}
          includes={page.includes}
          how={page.how}
          delivers={page.delivers}
          faq={page.faq}
          path={page.path}
          hero={{ image: "v82-modern-apps", alt: "Aplicaciones de productividad en un puesto empresarial." }}
          demo={
            <div className={styles.demoSlot}>
              <LicenciasLab />
            </div>
          }
          nextHref={`${V85_BASE}/solicitar-cotizacion/`}
          nextLabel="Organizar un inventario de licencias"
        />
        <IntentQuote initial="licencias" />
      </main>
    </ConceptShell>
  );
}
