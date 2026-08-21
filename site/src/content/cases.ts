/**
 * Sistema de casos de éxito. Las fichas no se renderizan mientras GATES.caseStudies sea false.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  situation: string;
  challenge: string;
  solution: string;
  technologies: string[];
  scope: string;
  execution: string;
  result: string;
  quote?: { author: string; role: string; text: string };
  gallery?: string[];
  ctaHref: string;
};

/** Vacío a propósito. No inventar historias. */
export const caseStudies: CaseStudy[] = [];
