import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company, intents } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contacto y asesoría",
  "Solicite cotización, levantamiento, diagnóstico, licenciamiento, soporte o un proyecto. Justech SRL, Santo Domingo.",
  "/contacto/",
);

export default function Page() {
  return (
    <main id="contenido">
      <PageHero
        eyebrow="Contacto"
        title="Diga qué necesita. El formulario cambia con la intención."
        lead="Un especialista responde en horario laboral. Si ya es cliente, use el portal de soporte."
      />
      <div className="container pt-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Inicio" },
            { href: "/contacto/", label: "Contacto" },
          ]}
        />
      </div>
      <div className="container grid gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="mt-0">Flujos de conversación</h2>
          <ul className="m-0 list-none p-0">
            {intents.map((i) => (
              <li key={i.id} className="border-b border-line py-3">
                <Link href={i.landing} className="font-medium text-navy no-underline">
                  {i.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-line py-3">
              <a href={company.supportUrl} className="font-medium text-teal no-underline">
                Entrar al portal de soporte
              </a>
            </li>
          </ul>
          <div className="mt-10">
            <ContactForm landing="/contacto/" />
          </div>
        </div>
        <aside>
          <h2 className="mt-0">Justech SRL</h2>
          <p>
            Teléfono: <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
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
