import type { Metadata } from "next";
import { company } from "@/content/site";

const TITLE_BASE = "Justech SRL";

export function pageMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  const full = title.includes("Justech") ? title : `${title} · ${TITLE_BASE}`;
  return {
    title: { absolute: full },
    description,
    robots: { index: false, follow: false, nocache: true },
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      locale: "es_DO",
      type: "website",
      siteName: company.legalName,
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
    },
  };
}
