import { ConceptShell } from "@/components/v8/Chrome";
import { EquiposLab } from "@/components/v8/PageDemos";
import { ServiceExperience } from "@/components/v8/ServiceExperience";
import { CASES } from "@/content/cases-anonymized";
import { PAGE_QUOTES, PAGES, V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";

const page = PAGES.equipos;

export const metadata = pageMeta(page.title, page.description, page.path, "/visual/v8/v84-device-admin.jpg");

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <ServiceExperience
          kicker="Equipos"
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
          hero={{ image: "v84-device-admin", alt: "Puesto de trabajo administrativo listo para operar." }}
          crumbs={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: page.path, label: "Equipos empresariales" },
          ]}
          demo={<EquiposLab />}
          technologies={["Lenovo", "Dell", "HP", "Identidad corporativa", "Inventario y garantía"]}
          caseTitle={CASES[1].title}
          caseLead={CASES[1].lead}
          nextHref={`${V85_BASE}/solicitar-cotizacion/`}
          nextLabel="Solicitar recomendación de equipos"
          quotes={PAGE_QUOTES.equipos}
        />
      </main>
    </ConceptShell>
  );
}
