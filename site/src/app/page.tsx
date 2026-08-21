import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HeroField } from "@/components/HeroField";
import { Reveal } from "@/components/Reveal";
import { SolutionTabs } from "@/components/SolutionTabs";
import { TicketPreview } from "@/components/TicketPreview";
import { TrustSlots } from "@/components/TrustSlots";
import {
  cablingCaps,
  productGroupCaps,
  serviceCaps,
  solutionCaps,
} from "@/content/capabilities";
import {
  cablingProcess,
  company,
  cycle,
  industryLinks,
  intents,
  method,
  problems,
  recursosLinks,
  technologyLinks,
  verifiedSignals,
} from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Integradora tecnológica: infraestructura, software y operación",
  "Justech SRL evalúa, diseña, suministra, implementa y opera tecnología empresarial en República Dominicana — redes, cableado, licencias, equipos y soporte.",
  "/",
);

const ecoInfra = [
  "Cableado y fibra",
  "Racks y energía",
  "Redes y Wi-Fi",
  "Servidores",
];
const ecoSoft = [
  "Identidad y licencias",
  "Colaboración",
  "Endpoint y backup",
  "Nube según el caso",
];
const ecoOps = [
  "Mesa de ayuda",
  "Monitoreo acordado",
  "Mantenimiento",
  "Proyectos",
];

export default function HomePage() {
  return (
    <main id="contenido">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Integradora tecnológica · Santo Domingo · Desde 2018</p>
            <h1>Tecnología que sostiene la operación — de extremo a extremo.</h1>
            <p className="deck">
              Justech evalúa, diseña, suministra, implementa y opera la infraestructura, el
              software y el soporte que las organizaciones necesitan para no detenerse.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contacto/diagnostico/">
                Solicitar diagnóstico
              </Link>
              <Link className="btn btn-ghost" href="/soluciones/">
                Conocer capacidades
              </Link>
            </div>
          </div>
          <HeroField />
        </div>
      </section>

      <section className="trust-bar" aria-label="Datos verificables">
        <ul className="container">
          {verifiedSignals.map((s) => (
            <li key={s.k}>
              <strong>{s.k}</strong>
              <span>{s.v}</span>
            </li>
          ))}
        </ul>
      </section>

      <Reveal as="section" className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Problemas</p>
            <h2 className="section-title">Lo que suele estar roto antes de comprar otra caja.</h2>
          </div>
          <ol className="problem-list">
            {problems.map((p, i) => (
              <li key={p.title}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="mt-0 mb-2 text-xl">{p.title}</h3>
                  <p className="m-0 text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal as="section" className="section band-paper">
        <div className="container">
          <p className="eyebrow">Soluciones</p>
          <h2 className="section-title">Resultados de negocio, no una lista de SKU.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Cada línea parte de un problema operativo. El detalle —alcance, proceso y preguntas—
            está en la ficha correspondiente.
          </p>
          <div className="mt-10">
            <SolutionTabs />
          </div>
          <ul className="chip-list">
            {solutionCaps.slice(0, 12).map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="container">
          <p className="eyebrow">Conectado</p>
          <h2 className="section-title">Infraestructura, software y operación en un mismo hilo.</h2>
          <div className="eco-map mt-12">
            <div className="eco-col">
              <h3>Infraestructura</h3>
              <ul>
                {ecoInfra.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="eco-join" aria-hidden />
            <div className="eco-col">
              <h3>Software</h3>
              <ul>
                {ecoSoft.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="eco-join" aria-hidden />
            <div className="eco-col">
              <h3>Servicios</h3>
              <ul>
                {ecoOps.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 mb-0 max-w-2xl text-muted">
            El ciclo de trabajo: {cycle.join(" → ")}.
          </p>
        </div>
      </Reveal>

      <Reveal as="section" className="section band-paper">
        <div className="container">
          <p className="eyebrow">Productos</p>
          <h2 className="section-title">Catálogo consultivo B2B — sin carrito.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Especificación, cotización, instalación cuando aplica y garantía. Precios y stock se
            confirman con un especialista.
          </p>
          <div className="mt-10">
            {productGroupCaps.map((g) => (
              <div key={g.title} className="catalog-row">
                <h3 className="m-0 text-base">{g.title}</h3>
                <ul>
                  {g.items.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/contacto/cotizacion/">
              Solicitar cotización
            </Link>
            <Link className="btn btn-paper" href="/productos/">
              Ver catálogo
            </Link>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="container">
          <p className="eyebrow">Planta física</p>
          <h2 className="section-title">Cableado e infraestructura que se pueden operar.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Levantamiento, diseño, presupuesto, instalación, certificación, documentación y soporte.
            Sin afirmar CCTV ni control de acceso como oferta directa.
          </p>
          <ol className="rail mt-12">
            {cablingProcess.map(([n, t, d]) => (
              <li key={n}>
                <p className="n m-0">{n}</p>
                <h3>{t}</h3>
                <p className="m-0 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
          <ul className="chip-list">
            {cablingCaps.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" className="section band-paper">
        <div className="container">
          <p className="eyebrow">Método</p>
          <h2 className="section-title">De la estrategia a la operación cotidiana.</h2>
          <ol className="method mt-12">
            {method.map(([n, t, d]) => (
              <li key={n}>
                <p className="eyebrow m-0">{n}</p>
                <h3>{t}</h3>
                <p className="m-0 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal as="section" className="section band-navy">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Soporte</p>
            <h2 className="mt-3 mb-4 text-3xl tracking-tight">Servicios administrados y un portal propio.</h2>
            <p className="max-w-xl text-[#c5d3dc]">
              Los clientes actuales gestionan casos en {company.supportUrl.replace("https://", "")}.
              Horario publicado: {company.hours}. Fuera de ese horario, solo si el contrato lo cubre.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn btn-primary" href={company.supportUrl}>
                Entrar al portal
              </a>
              <Link className="btn btn-ghost" href="/servicios/servicios-administrados/">
                Servicios administrados
              </Link>
            </div>
            <ul className="mt-8 columns-1 gap-x-8 sm:columns-2">
              {serviceCaps.slice(0, 8).map((s) => (
                <li key={s.href} className="mb-2 text-sm">
                  <Link href={s.href} className="text-[#d7e4ea] no-underline hover:underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <TicketPreview />
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="container">
          <p className="eyebrow">Industrias</p>
          <h2 className="section-title">El alcance se define por la operación, no por un vertical de catálogo.</h2>
          <p className="mt-4 max-w-2xl text-muted">
            Preparamos estructura para estos sectores. Las referencias específicas se publicarán cuando
            exista autorización.
          </p>
          <ul className="chip-list">
            {industryLinks.map((i) => (
              <li key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <TrustSlots />

      <Reveal as="section" className="section band-paper">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Ecosistema</p>
            <h2 className="section-title">Fabricantes y plataformas, por nombre.</h2>
            <p className="text-muted">
              Suministro, licenciamiento o implementación según disponibilidad. Sin badges de
              partnership ni “partner oficial” hasta tener documentos.
            </p>
            <ul className="ecosystem">
              {technologyLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href}>{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Recursos</p>
            <h2 className="section-title">Orientación operativa.</h2>
            <ul className="m-0 list-none p-0">
              {recursosLinks
                .filter((r) => r.href !== "/recursos/")
                .map((r) => (
                  <li key={r.href} className="border-t border-line py-4">
                    <Link href={r.href} className="text-lg text-navy no-underline">
                      {r.label}
                    </Link>
                  </li>
                ))}
              <li className="border-t border-line py-4">
                <Link href="/recursos/faqs/" className="text-lg text-navy no-underline">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Diagnóstico</p>
            <h2 className="section-title">Empiece por el sitio y el resultado, no por el folleto.</h2>
            <p className="text-muted">
              Elija la conversación. Cada formulario cambia los campos según la intención.
            </p>
            <ul className="m-0 list-none p-0">
              {intents.map((i) => (
                <li key={i.id} className="border-t border-line py-3">
                  <Link href={i.landing} className="font-medium text-navy no-underline">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mt-0">Contacto comercial</h3>
            <p className="text-sm text-muted">
              {company.phoneDisplay} · {company.email} · {company.hours}
            </p>
            <ContactForm landing="/" intent="diagnostico" />
          </div>
        </div>
      </Reveal>
    </main>
  );
}
