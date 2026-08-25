import { ConceptShell } from "@/components/v8/Chrome";
import { RedesLab, SoporteLab } from "@/components/v8/PageDemos";
import { ServiceExperience } from "@/components/v8/ServiceExperience";
import { CASES } from "@/content/cases-anonymized";
import { PAGE_QUOTES, PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/premium.module.css";
import { company } from "@/content/site";

const page = PAGES.soporte;

export const metadata = pageMeta(page.title, page.description, page.path, "/visual/v8/v82-ops-alert.jpg");

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <ServiceExperience
          kicker="Soporte"
          title={page.title}
          lead={page.description}
          problem={page.problem}
          result={page.result}
          who={page.who}
          includes={page.includes}
          how={page.how}
          delivers={page.delivers}
          faq={page.faq}
          path={page.path}
          hero={{ image: "v82-ops-alert", alt: "Mesa de operación atendiendo un incidente de conectividad." }}
          crumbs={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Soporte técnico empresarial" },
          ]}
          demo={
            <>
              <RedesLab />
              <SoporteLab />
            </>
          }
          afterDemo={
            <nav className={styles.paths} aria-label="Caminos de soporte">
              <a href={company.supportUrl} rel="noreferrer" data-k="client">
                <strong>Ya soy cliente</strong>
                Portal de soporte
              </a>
              <a href={`${V85_BASE}/contacto/?motivo=soporte`}>
                <strong>Necesito soporte para mi empresa</strong>
                Formulario comercial
              </a>
            </nav>
          }
          technologies={["Portal de soporte", "Mesa de ayuda", "Inventario", "Garantías"]}
          caseTitle={CASES[2].title}
          caseLead={CASES[2].lead}
          nextHref={`${V85_BASE}/solicitar-soporte/`}
          nextLabel="Diseñar un plan de soporte"
          quotes={PAGE_QUOTES.soporte}
          dark
        />
      </main>
    </ConceptShell>
  );
}
