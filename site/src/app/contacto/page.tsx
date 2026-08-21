import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contacto",
  "Hable con un especialista de Justech SRL en Santo Domingo.",
  "/contacto/",
);

export default function Page() {
  return (
    <main id="contenido">
      <PageHero
        eyebrow="Contacto"
        title="Cuéntenos el requerimiento"
        lead="Un especialista le responde en horario laboral. Si ya es cliente, use el portal de soporte."
      />
      <div className="container pt-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Inicio" },
            { href: "/contacto/", label: "Contacto" },
          ]}
        />
      </div>
      <div className="container grid gap-12 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <aside>
          <h2 className="mt-0">Justech SRL</h2>
          <p>
            Teléfono:{" "}
            <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
            <br />
            Correo: <a href={`mailto:${company.email}`}>{company.email}</a>
            <br />
            Soporte: <a href={company.supportUrl}>{company.supportUrl}</a>
          </p>
          <p className="text-sm text-muted">{company.hours}</p>
        </aside>
      </div>
    </main>
  );
}
