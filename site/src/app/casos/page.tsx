import Link from "next/link";
import { GATES } from "@/content/site";
import { caseStudies } from "@/content/cases";
import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Casos",
  "El sistema de casos de Justech está listo. Las historias se publican cuando existan permiso y resultado verificable.",
  "/casos/",
);

export default function Page() {
  if (GATES.caseStudies && caseStudies.length) {
    return (
      <Interior eyebrow="Casos" title="Resultados" lead="Historias autorizadas." path="/casos/">
        <ul>
          {caseStudies.map((c) => (
            <li key={c.slug}>{c.title}</li>
          ))}
        </ul>
      </Interior>
    );
  }
  return (
    <Interior
      eyebrow="Resultados"
      title="De un requerimiento a una operación en marcha"
      lead="Documentamos proyectos con situación, alcance y resultado. Publicaremos fichas cuando haya autorización."
      path="/casos/"
    >
      <p>
        Mientras tanto, un especialista puede revisar su escenario con el mismo rigor que exigiría un caso publicado.
      </p>
      <p>
        <Link className="btn btn-primary" href="/contacto/proyecto/">
          Solicitar proyecto
        </Link>
      </p>
    </Interior>
  );
}
