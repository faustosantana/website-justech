import { ConceptShell } from "@/components/v8/Chrome";
import { ServiceExperience } from "@/components/v8/ServiceExperience";
import { RedesLab } from "@/components/v8/PageDemos";
import { CASES } from "@/content/cases-anonymized";
import { PAGE_QUOTES, PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";

const page = PAGES.redes;

export const metadata = pageMeta(page.title, page.description, page.path, "/visual/v8/v82-ops-normal.jpg");

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <ServiceExperience
          kicker="Redes"
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
          hero={{ image: "v82-ops-normal", alt: "Operación de red empresarial en estado normal." }}
          crumbs={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Redes empresariales" },
          ]}
          demo={
            <div id="wifi">
              <RedesLab />
            </div>
          }
          technologies={["Switching", "Routing", "Wi-Fi empresarial", "Firewall de borde", "Enlace de respaldo"]}
          caseTitle={CASES[2].title}
          caseLead={CASES[2].lead}
          nextHref={`${V85_BASE}/solicitar-diagnostico/`}
          nextLabel="Solicitar un diagnóstico de red"
          quotes={PAGE_QUOTES.redes}
          dark
        />
      </main>
    </ConceptShell>
  );
}
