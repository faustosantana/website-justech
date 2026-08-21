import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contacto",
  "Escriba a Justech SRL en Santo Domingo. Staging: el envío es simulado.",
  "/contacto/",
);

export default function Page() {
  return (
    <main id="contenido">
      <PageHero
        eyebrow="Contacto"
        title="Cuéntenos el requerimiento"
        lead="Un especialista responde en horario laboral. El soporte de clientes actuales va por el portal, no por este formulario."
      />
      <div className="container grid gap-12 py-12 md:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <aside>
          <h2 className="mt-0">Datos verificados en el sitio actual</h2>
          <p>
            Teléfono:{" "}
            <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
            <br />
            Correo: <a href={`mailto:${company.email}`}>{company.email}</a>
            <br />
            Soporte: <a href={company.supportUrl}>{company.supportUrl}</a>
          </p>
          <p className="text-sm text-muted">
            {company.emailSalesPending} y el número de WhatsApp alterno esperan unificación.
            Dirección física y RNC no se publican hasta validación.
          </p>
        </aside>
      </div>
    </main>
  );
}
