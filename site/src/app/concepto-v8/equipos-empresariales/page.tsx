import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { EquiposLab } from "@/components/v8/PageDemos";
import { Crumbs, ServiceArticle } from "@/components/v8/ServiceArticle";
import { PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";

const page = PAGES.equipos;

export const metadata = pageMeta(page.title, page.description, page.path);

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Equipos empresariales" },
          ]}
        />
        <ServiceArticle
          kicker="Equipos y puestos de trabajo"
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
              <EquiposLab />
              <section>
                <h2>Catálogo de cotización, no una tienda</h2>
                <ul>
                  <li id="laptops">Laptops empresariales.</li>
                  <li id="desktops">Computadoras de escritorio.</li>
                  <li id="workstations">Workstations.</li>
                  <li id="servidores">Servidores.</li>
                  <li id="almacenamiento">Almacenamiento.</li>
                  <li id="accesorios">Monitores, docks y accesorios.</li>
                </ul>
                <p>El siguiente paso es solicitar cotización. No hay carrito ni «comprar ahora».</p>
              </section>
            </div>
          }
          nextHref={`${V85_BASE}/solicitar-cotizacion/`}
          nextLabel="Solicitar cotización de equipos"
        />
        <IntentQuote initial="equipos" />
      </main>
    </ConceptShell>
  );
}
