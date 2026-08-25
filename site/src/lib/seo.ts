import type { Metadata } from "next";
import { PRODUCTION_MAP } from "@/content/architecture";
import { company } from "@/content/site";

const TITLE_BASE = "Justech SRL";

/** Canonical de producción: sin `/concepto-v8/` tras el corte. */
export function productionPath(stagingPath: string) {
  const normalized = stagingPath.endsWith("/") || stagingPath === "/" ? stagingPath : `${stagingPath}/`;
  const mapped = PRODUCTION_MAP.find((item) => item.staging === normalized);
  if (mapped) return mapped.production;
  if (normalized.startsWith("/concepto-v8/recursos/")) {
    return normalized.replace("/concepto-v8", "") || "/recursos/";
  }
  if (normalized.startsWith("/concepto-v8/l/")) {
    return normalized.replace("/concepto-v8", "") || "/";
  }
  if (normalized === "/concepto-v8/") return "/";
  return normalized.replace(/^\/concepto-v8/, "") || "/";
}

export function canonicalUrl(stagingPath: string) {
  return new URL(productionPath(stagingPath), company.production).toString();
}

function absAsset(path: string) {
  return new URL(path, company.production).toString();
}

export function pageMeta(
  title: string,
  description: string,
  path: string,
  image = "/visual/v8/v83-hero-day.jpg",
): Metadata {
  const full = title.includes("Justech") ? title : `${title} · ${TITLE_BASE}`;
  const canonical = productionPath(path);
  const ogImage = image;
  return {
    title: { absolute: full },
    description,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    alternates: { canonical },
    openGraph: {
      title: full,
      description,
      locale: "es_DO",
      type: "website",
      siteName: company.legalName,
      url: canonical,
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [ogImage],
    },
  };
}

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.legalName,
    legalName: company.legalName,
    image: absAsset("/visual/v8/v83-hero-day.jpg"),
    logo: absAsset("/brand/justech-logo.png"),
    taxID: "1-31-98224-3",
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
    url: canonicalUrl(path),
  };
}

export function articleLd(headline: string, description: string, path: string, datePublished: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified: datePublished,
    inLanguage: "es-DO",
    author: { "@type": "Organization", name: company.legalName, url: company.production },
    publisher: {
      "@type": "Organization",
      name: company.legalName,
      logo: { "@type": "ImageObject", url: absAsset("/brand/justech-logo.png") },
    },
    mainEntityOfPage: canonicalUrl(path),
    url: canonicalUrl(path),
  };
}
