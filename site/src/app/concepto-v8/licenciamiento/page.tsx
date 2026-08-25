import { ConceptShell } from "@/components/v8/Chrome";
import { LicenciasLab } from "@/components/v8/PageDemos";
import { ServiceExperience } from "@/components/v8/ServiceExperience";
import { CASES } from "@/content/cases-anonymized";
import { PAGE_QUOTES, PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";

const page = PAGES.licencias;

export const metadata = pageMeta(page.title, page.description, page.path, "/visual/v8/v82-modern-apps.jpg");

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <ServiceExperience
          kicker="Licenciamiento"
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
          hero={{ image: "v82-modern-apps", alt: "Aplicaciones de productividad en un puesto empresarial." }}
          crumbs={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Licenciamiento" },
          ]}
          demo={<LicenciasLab />}
          technologies={["Microsoft 365", "Google Workspace", "Adobe", "Action1", "AWS", "Huawei"]}
          caseTitle={CASES[1].title}
          caseLead={CASES[1].lead}
          nextHref={`${V85_BASE}/solicitar-cotizacion/`}
          nextLabel="Organizar un inventario de licencias"
          quotes={PAGE_QUOTES.licencias}
        />
      </main>
    </ConceptShell>
  );
}
