import Link from "next/link";
import type { Capability } from "@/content/capabilities";
import { CtaBand, PageHero } from "@/components/PageHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const clusterLabel: Record<Capability["cluster"], string> = {
  soluciones: "Soluciones",
  servicios: "Servicios",
  productos: "Productos",
  infraestructura: "Infraestructura física",
  industrias: "Industrias",
  tecnologias: "Tecnologías",
};

const clusterIndex: Record<Capability["cluster"], string> = {
  soluciones: "/soluciones/",
  servicios: "/servicios/",
  productos: "/productos/",
  infraestructura: "/infraestructura-fisica/",
  industrias: "/industrias/",
  tecnologias: "/tecnologias/",
};

export function CapabilityPage({ cap }: { cap: Capability }) {
  const index = clusterIndex[cap.cluster];
  return (
    <main id="contenido">
      <PageHero eyebrow={cap.kicker} title={cap.title} lead={cap.lead} />
      <div className="container pt-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Inicio" },
            { href: index, label: clusterLabel[cap.cluster] },
            { href: cap.href, label: cap.title },
          ]}
        />
      </div>
      <div className="container cap-grid py-12">
        <article>
          <h2>Qué problema resuelve</h2>
          <p>{cap.problem}</p>
          <h2>Para quién es</h2>
          <p>{cap.audience}</p>
          <h2>Señales de que lo necesita</h2>
          <ul>
            {cap.signals.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <h2>Alcance</h2>
          <ul>
            {cap.scope.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <h2>Proceso</h2>
          <ol className="rail" style={{ gridTemplateColumns: undefined }}>
            {cap.process.map((step, i) => (
              <li key={step}>
                <p className="n m-0">{String(i + 1).padStart(2, "0")}</p>
                <h3>{step}</h3>
              </li>
            ))}
          </ol>
          <h2>Beneficios</h2>
          <ul>
            {cap.benefits.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {cap.faqs.length ? (
            <>
              <h2>Preguntas frecuentes</h2>
              <div className="faq-list">
                {cap.faqs.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </>
          ) : null}
        </article>
        <aside className="cap-side">
          <p className="eyebrow">Siguiente paso</p>
          <h2 className="mt-2 text-2xl">{cap.ctaLabel}</h2>
          <p className="text-sm text-muted">
            Formularios de este entorno no envían correo. En el sitio público, un especialista responde en horario laboral.
          </p>
          <Link className="btn btn-primary" href={cap.ctaHref}>
            {cap.ctaLabel}
          </Link>
          <p>
            <Link className="more" href="/contacto/">
              Hablar con un especialista
            </Link>
          </p>
          {cap.related.length ? (
            <>
              <h3 className="mt-8 text-base">Tecnologías y temas relacionados</h3>
              <ul className="m-0 list-none p-0">
                {cap.related.map((r) => (
                  <li key={r.href} className="border-b border-line py-2">
                    <Link href={r.href} className="text-navy no-underline">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {cap.complementary.length ? (
            <>
              <h3 className="mt-8 text-base">Servicios complementarios</h3>
              <ul className="m-0 list-none p-0">
                {cap.complementary.map((r) => (
                  <li key={r.href} className="border-b border-line py-2">
                    <Link href={r.href} className="text-navy no-underline">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </aside>
      </div>
      <CtaBand />
    </main>
  );
}
