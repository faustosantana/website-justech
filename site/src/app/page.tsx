import Link from "next/link";
import { CtaBand } from "@/components/PageHero";
import { HeroCanvas } from "@/components/HeroCanvas";
import { IconGrid, IconNodes, IconPulse, IconShield, IconStack } from "@/components/Icons";
import { TrustSlots } from "@/components/TrustSlots";
import {
  company,
  facts,
  method,
  outcomes,
  published,
  scenarios,
  serviceCopy,
  services,
  solutionCopy,
  solutions,
  technologyLinks,
  values,
} from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Tecnología empresarial que impulsa el negocio",
  "Justech SRL diseña, implementa y gestiona infraestructura, soporte, licenciamiento y equipos para organizaciones en República Dominicana.",
  "/",
);

const solutionIcons = [IconStack, IconGrid];
const serviceIcons = [IconPulse, IconNodes, IconShield, IconGrid];

export default function HomePage() {
  const publicSolutions = published(solutions);
  const publicServices = published(services);

  return (
    <main id="contenido">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Justech SRL · Santo Domingo · Desde 2018</p>
            <h1>La tecnología correcta mueve su negocio hacia adelante.</h1>
            <p className="deck">
              Diseñamos, implementamos y operamos las capacidades tecnológicas que las
              organizaciones necesitan para trabajar con continuidad y crecer con orden.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contacto/">
                Hablar con un especialista
              </Link>
              <Link className="btn btn-ghost" href="/soluciones/">
                Conocer las soluciones
              </Link>
            </div>
            <dl className="facts">
              {facts.map((f) => (
                <div key={f.k}>
                  <dt className="stat">{f.k}</dt>
                  <dd>
                    <span>{f.v}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroCanvas />
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Propuesta de valor</p>
            <h2 className="section-title">Resultados de negocio, con tecnología que se puede operar.</h2>
          </div>
          <div>
            {outcomes.map((o) => (
              <article key={o.n} className="outcome">
                <p className="n m-0">{o.n}</p>
                <h3 className="mt-2 mb-2 text-xl">{o.title}</h3>
                <p className="m-0 text-muted">{o.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper section">
        <div className="container">
          <p className="eyebrow">Capacidades</p>
          <h2 className="section-title">Lo que ejecutamos hoy</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {publicSolutions.map((s, i) => {
              const Icon = solutionIcons[i] ?? IconGrid;
              return (
                <article key={s.href} className="card">
                  <Icon className="icon-sm" />
                  <h3>{s.label}</h3>
                  <p>{solutionCopy[s.href]}</p>
                  <Link className="more" href={s.href}>
                    Ver solución
                  </Link>
                </article>
              );
            })}
          </div>
          <div className="mt-10 grid gap-0">
            {publicServices.map((s, i) => {
              const Icon = serviceIcons[i] ?? IconPulse;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-start justify-between gap-4 border-b border-line py-5 text-navy no-underline"
                >
                  <span className="flex items-start gap-4">
                    <Icon className="mt-1 h-6 w-6 shrink-0 text-teal" />
                    <span>
                      <strong className="block text-lg">{s.label}</strong>
                      <span className="text-sm font-normal text-muted">{serviceCopy[s.href]}</span>
                    </span>
                  </span>
                  <span className="text-teal" aria-hidden>
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Método</p>
          <h2 className="section-title">De la estrategia a la operación</h2>
          <ol className="method mt-12 p-0">
            {method.map(([n, t, d]) => (
              <li key={n}>
                <p className="eyebrow m-0">{n}</p>
                <h3>{t}</h3>
                <p className="m-0 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper section">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Escenarios</p>
            <h2 className="section-title">Dónde aporta Justech</h2>
          </div>
          <div>
            {scenarios.map((s) => (
              <article key={s.title} className="scenario">
                <h3 className="mt-0 mb-2 text-xl">{s.title}</h3>
                <p className="m-0 text-muted">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Plataformas</p>
          <h2 className="section-title">Tecnología que su organización ya reconoce</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Licenciamiento, implementación y soporte sobre plataformas empresariales de uso
            extendido, según el requerimiento de cada organización.
          </p>
          <ul className="ecosystem">
            {technologyLinks.map((t) => (
              <li key={t.href}>
                <Link href={t.href}>{t.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Continuidad</p>
            <h2 className="mt-3 mb-4 text-3xl tracking-tight">Soporte con responsables y un portal propio</h2>
            <p className="m-0 max-w-xl text-[#c5d3dc]">
              Los clientes actuales gestionan casos en {company.supportUrl.replace("https://", "")}.
              Horario de atención: {company.hours}. Las emergencias fuera de horario se atienden
              cuando el contrato lo establece.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-primary" href={company.supportUrl}>
              Ir al portal de soporte
            </a>
            <Link className="btn btn-ghost" href="/servicios/soporte-tecnico/">
              Cómo trabajamos el soporte
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Cultura</p>
          <h2 className="section-title">Cómo decidimos</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-5">
            {values.map((v) => (
              <article key={v.name} className="border-t-2 border-teal pt-4">
                <h3 className="mt-0 mb-2 text-base">{v.name}</h3>
                <p className="m-0 text-sm text-muted">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TrustSlots />
      <CtaBand />
    </main>
  );
}
