import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { getIntent, type IntentId } from "@/content/capabilities";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return [
    "cotizacion",
    "levantamiento",
    "diagnostico",
    "licenciamiento",
    "soporte",
    "proyecto",
    "servicio-administrado",
  ].map((intent) => ({ intent }));
}

export async function generateMetadata({ params }: { params: Promise<{ intent: string }> }) {
  const { intent } = await params;
  const cfg = getIntent(intent);
  if (!cfg) return {};
  return pageMeta(cfg.title, cfg.seoDesc, `/contacto/${cfg.id}/`);
}

export default async function Page({ params }: { params: Promise<{ intent: string }> }) {
  const { intent } = await params;
  const cfg = getIntent(intent);
  if (!cfg) notFound();
  return (
    <main id="contenido">
      <PageHero eyebrow="Conversión" title={cfg.title} lead={cfg.lead} />
      <div className="container pt-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Inicio" },
            { href: "/contacto/", label: "Contacto" },
            { href: `/contacto/${cfg.id}/`, label: cfg.title },
          ]}
        />
      </div>
      <div className="container grid gap-12 py-12 lg:grid-cols-[1.15fr_0.85fr]">
        <ContactForm landing={`/contacto/${cfg.id}/`} intent={cfg.id as IntentId} />
        <aside>
          <h2 className="mt-0">También puede</h2>
          <p>
            Llamar al <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a> o escribir a{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
          <p className="text-sm text-muted">{company.hours}</p>
        </aside>
      </div>
    </main>
  );
}
