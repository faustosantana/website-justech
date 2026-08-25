import type { Metadata } from "next";
import { company } from "@/content/site";

const TITLE_BASE = "Justech SRL";

export function pageMeta(
  title: string,
  description: string,
  path: string,
  image = "/visual/v8/v83-hero-day.jpg",
): Metadata {
  const full = title.includes("Justech") ? title : `${title} · ${TITLE_BASE}`;
  return {
    title: { absolute: full },
    description,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      locale: "es_DO",
      type: "website",
      siteName: company.legalName,
      url: path,
      images: [{ url: image, width: 1600, height: 900, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [image],
    },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: company.legalName,
    image: "/visual/v8/v83-hero-day.jpg",
    foundingDate: String(company.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: company.city,
      addressCountry: "DO",
    },
    telephone: company.phoneTel,
    email: company.email,
    url: company.production,
    areaServed: { "@type": "Country", name: "Dominican Republic" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:30",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phoneTel,
      email: company.email,
      contactType: "customer service",
      availableLanguage: ["Spanish"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:30",
      },
    },
    sameAs: [company.facebook, company.instagram],
  };
}

export function webPageLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    inLanguage: "es-DO",
    isPartOf: { "@type": "WebSite", name: company.legalName, url: company.production },
    about: { "@type": "ProfessionalService", name: company.legalName },
    url: path,
  };
}
