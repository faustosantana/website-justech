import Link from "next/link";
import type { ReactNode } from "react";
import { company } from "@/content/site";
import { V85_BASE, type QuoteNeed } from "@/content/v85";
import { canonicalUrl, webPageLd } from "@/lib/seo";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { PageHero } from "@/components/v8/PageHero";
import { IntentQuote } from "@/components/v8/IntentQuote";
import styles from "./premium.module.css";

export function ServiceExperience({
  kicker,
  title,
  lead,
  problem,
  result,
  who,
  includes,
  how,
  delivers,
  faq,
  demo,
  afterDemo,
  technologies,
  caseTitle,
  caseLead,
  nextHref,
  nextLabel,
  hero,
  path,
  crumbs,
  quotes,
  dark,
}: {
  kicker: string;
  title: string;
  lead: string;
  problem: string;
  result: string;
  who: string;
  includes: readonly string[];
  how: readonly string[];
  delivers?: readonly string[];
  faq: readonly { q: string; a: string }[];
  demo?: ReactNode;
  afterDemo?: ReactNode;
  technologies?: readonly string[];
  caseTitle?: string;
  caseLead?: string;
  nextHref: string;
  nextLabel: string;
  hero: { image: string; alt: string };
  path: string;
  crumbs: { href: string; label: string }[];
  quotes?: readonly QuoteNeed[];
  dark?: boolean;
}) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: lead,
    url: canonicalUrl(path),
    provider: {
      "@type": "ProfessionalService",
      name: company.legalName,
      telephone: company.phoneTel,
      email: company.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: company.city,
        addressCountry: "DO",
      },
    },
    areaServed: "DO",
  };
  const nav = [
    { href: "#problema", label: "Problema" },
    { href: "#alcance", label: "Alcance" },
    { href: "#demostracion", label: "Demostración" },
    { href: "#proceso", label: "Proceso" },
    { href: "#faq", label: "Preguntas" },
  ];
  return (
    <>
      <Crumbs items={crumbs} />
      <article className={styles.page}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd(title, lead, path)) }} />
        <div className={styles.heroWrap}>
          <PageHero kicker={kicker} title={title} lead={lead} image={hero.image} alt={hero.alt} />
        </div>
        <nav className={styles.inNav} aria-label="En esta página">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <section className={styles.split} id="problema">
          <div>
            <p className={styles.kicker}>Problema</p>
            <h2>Qué impide operar con claridad.</h2>
            <p>{problem}</p>
          </div>
          <div className={styles.result}>
            <p className={styles.kicker}>Resultado</p>
            <h2>Qué queda en marcha.</h2>
            <p>{result}</p>
            <p className={styles.who}>{who}</p>
          </div>
        </section>
        <section className={styles.scope} id="alcance">
          <p className={styles.kicker}>Alcance</p>
          <h2>Cómo se cubre el trabajo.</h2>
          <ol>
            {includes.map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>
        <div className={dark ? styles.darkAct : styles.demoAct} id="demostracion">
          {demo}
        </div>
        {afterDemo}
        <section className={styles.process} id="proceso">
          <p className={styles.kicker}>Proceso</p>
          <h2>De la conversación a la entrega.</h2>
          <ol>
            {how.map((item, i) => (
              <li key={item}>
                <strong>{String(i + 1).padStart(2, "0")}</strong>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
        {delivers ? (
          <section className={styles.delivers} id="entregables">
            <p className={styles.kicker}>Entregables</p>
            <h2>Qué queda en manos del cliente.</h2>
            <ul>
              {delivers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {technologies ? (
          <section className={styles.tech} id="tecnologias">
            <p className={styles.kicker}>Tecnologías</p>
            <h2>Con qué se implementa, según el alcance.</h2>
            <p>{technologies.join(" · ")}</p>
          </section>
        ) : null}
        {caseTitle ? (
          <section className={styles.case} id="experiencia">
            <p className={styles.kicker}>Experiencia</p>
            <h2>{caseTitle}</h2>
            <p>{caseLead}</p>
          </section>
        ) : null}
        <section className={styles.faq} id="faq">
          <p className={styles.kicker}>Preguntas</p>
          <h2>Dudas frecuentes antes de empezar.</h2>
          {faq.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        </section>
        <section className={styles.ctaBand} id="siguiente">
          <div>
            <h2>Siguiente paso.</h2>
            <p>Cuente el alcance. Un especialista responde en horario laboral.</p>
          </div>
          <p>
            <Link className={styles.cta} href={nextHref}>
              {nextLabel}
            </Link>
            {" "}
            <Link href={`${V85_BASE}/contacto/`}>Hablar con un especialista</Link>
          </p>
        </section>
      </article>
      <IntentQuote intents={quotes} />
    </>
  );
}
