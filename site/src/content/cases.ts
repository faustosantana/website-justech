/**
 * Sistema de casos de éxito. Las fichas no se renderizan mientras GATES.caseStudies sea false.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  industry: string;
  situation: string;
  challenge: string;
  scope: string;
  solution: string;
  technologies: string[];
  execution: string;
  result: string;
  quote?: { author: string; role: string; text: string };
  gallery?: string[];
  ctaHref: string;
  status: "verified" | "pending" | "not_authorized" | "internal_only";
};

/** Vacío a propósito. No inventar historias. */
export const caseStudies: CaseStudy[] = [];
