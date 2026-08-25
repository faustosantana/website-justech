import { PageHero } from "@/components/v8/PageHero";
import Link from "next/link";
import type { ReactNode } from "react";
import { company } from "@/content/site";
import { V85_BASE } from "@/content/v85";
import { webPageLd } from "@/lib/seo";
import styles from "./article.module.css";

export function Crumbs({ items }: { items: { href: string; label: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href,
    })),
  };
  return (
    <nav aria-label="Miga de pan" className={styles.crumbs}>
      <ol>
        {items.map((item, i) => (
          <li key={`${item.href}-${item.label}`}>
            {i > 0 ? <span aria-hidden>/</span> : null}
            {i === items.length - 1 ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}

export function ServiceArticle({
  kicker,
  title,
  lead,
  problem,
  who,
  includes,
  how,
  delivers,
  faq,
  demo,
  nextHref,
  nextLabel,
  hero,
  path,
}: {
  kicker: string;
  title: string;
  lead: string;
  problem: string;
  who: string;
  includes: readonly string[];
  how: readonly string[];
  delivers: readonly string[];
  faq: readonly { q: string; a: string }[];
  demo?: ReactNode;
  nextHref: string;
  nextLabel: string;
  hero?: { image: string; alt: string };
  path?: string;
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
    url: path,
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
  return (
    <article className={styles.article} data-visual={hero ? "1" : "0"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      {path ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd(title, lead, path)) }}
        />
      ) : null}
      {hero ? (
        <PageHero kicker={kicker} title={title} lead={lead} image={hero.image} alt={hero.alt} />
      ) : (
        <>
          <p className={styles.kicker}>{kicker}</p>
          <h1>{title}</h1>
          <p className={styles.lead}>{lead}</p>
        </>
      )}
      <section>
        <h2>Qué problema resuelve</h2>
        <p>{problem}</p>
      </section>
      <section>
        <h2>Para quién es</h2>
        <p>{who}</p>
      </section>
      <section>
        <h2>Qué incluye</h2>
        <ul>
          {includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Cómo se ejecuta</h2>
        <ol>
          {how.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
      <section>
        <h2>Qué se entrega</h2>
        <ul>
          {delivers.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      {demo}
      <section>
        <h2>Preguntas frecuentes</h2>
        {faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      </section>
      <p className={styles.next}>
        <Link href={nextHref}>{nextLabel}</Link>
        {" · "}
        <Link href={`${V85_BASE}/contacto/`}>Hablar con un especialista</Link>
      </p>
    </article>
  );
}
