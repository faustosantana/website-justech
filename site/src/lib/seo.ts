import type { Metadata } from "next";

const TITLE_BASE = "Justech SRL";

export function pageMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  const full = title.includes("Justech") ? title : `${title} · ${TITLE_BASE}`;
  return {
    title: full,
    description,
    robots: { index: false, follow: false, nocache: true },
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      locale: "es_DO",
      type: "website",
      siteName: "Justech SRL",
    },
  };
}
