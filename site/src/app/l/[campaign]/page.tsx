import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { LandingChrome } from "@/components/LandingChrome";
import { campaigns, getCampaign } from "@/content/capabilities";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return campaigns.map((c) => ({ campaign: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;
  const c = getCampaign(campaign);
  if (!c) return {};
  return pageMeta(c.title, c.seoDesc, `/l/${c.slug}/`);
}

export default async function Page({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;
  const c = getCampaign(campaign);
  if (!c) notFound();
  return (
    <main id="contenido">
      <LandingChrome />
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">{c.match}</p>
          <h1>{c.title}</h1>
          <p className="lead m-0 max-w-2xl">{c.lead}</p>
        </div>
      </header>
      <div className="container grid gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h2>Por qué esta conversación</h2>
          <ul>
            {c.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h2>Alcance habitual</h2>
          <ul>
            {c.scope.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <h2>Preguntas</h2>
          {c.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
        <div>
          <ContactForm landing={`/l/${c.slug}/`} intent={c.intent} />
          <p className="text-sm text-muted">
            {company.phoneDisplay} · {company.hours}. UTM listos en campos ocultos para campañas.
          </p>
        </div>
      </div>
    </main>
  );
}
