import { ConceptShell } from "@/components/v8/Chrome";
import { CableDemo, CableHandover } from "@/components/v8/CableDemo";
import { ServiceExperience } from "@/components/v8/ServiceExperience";
import { CASES } from "@/content/cases-anonymized";
import { PAGE_QUOTES, PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";

const page = PAGES.cableado;

export const metadata = pageMeta(page.title, page.description, page.path, "/visual/v8/v82-sede-rack.jpg");

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <ServiceExperience
          kicker="Infraestructura"
          title={page.title}
          lead={page.description}
          problem={page.problem}
          result={page.result}
          who={page.who}
          includes={page.includes}
          how={page.how}
          faq={page.faq}
          path={page.path}
          hero={{ image: "v82-sede-rack", alt: "Cuarto técnico empresarial con rack organizado." }}
          crumbs={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Cableado estructurado" },
          ]}
          demo={<CableDemo />}
          afterDemo={<CableHandover />}
          technologies={["Cobre", "Fibra óptica", "Racks", "Patch panels", "Certificación según alcance"]}
          caseTitle={CASES[0].title}
          caseLead={CASES[0].lead}
          nextHref={`${V85_BASE}/solicitar-levantamiento/`}
          nextLabel="Solicitar un levantamiento"
          quotes={PAGE_QUOTES.cableado}
          dark
        />
      </main>
    </ConceptShell>
  );
}
