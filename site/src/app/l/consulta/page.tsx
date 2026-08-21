import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Consulta tecnológica",
  "Solicite una conversación con un especialista de Justech SRL sobre soporte, licenciamiento, equipos o implementación.",
  "/l/consulta/",
);

export default function Page() {
  return (
    <main id="contenido">
      <PageHero
        eyebrow="Conversación inicial"
        title="Tecnología alineada con el resultado que necesita"
        lead="Cuéntenos el contexto. Un especialista de Justech propone el siguiente paso con claridad."
      />
      <div className="container grid gap-12 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <ContactForm landing="/l/consulta/" />
        <aside>
          <h2 className="mt-0">Con esta conversación puede avanzar en</h2>
          <ul>
            <li>Soporte técnico con portal de tickets</li>
            <li>Renovación de software y licencias</li>
            <li>Equipamiento empresarial</li>
            <li>Implementación y consultoría</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
