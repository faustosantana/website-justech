/**
 * Fuente de verdad corporativa Justech.
 * La UI pública solo puede leer afirmaciones con status VERIFIED_PUBLIC
 * y publishPermission PUBLIC. No mezclar NEEDS_CONFIRMATION en copy visible.
 */
export type ClaimStatus =
  | "VERIFIED_PUBLIC"
  | "VERIFIED_INTERNAL"
  | "NEEDS_CONFIRMATION"
  | "NOT_PUBLIC";

export type PublishPermission = "PUBLIC" | "INTERNAL_ONLY" | "DO_NOT_PUBLISH";

export type Claim = {
  id: string;
  text: string;
  source: string;
  validatedOn: string;
  status: ClaimStatus;
  publishPermission: PublishPermission;
  notes?: string;
};

const VALIDATED = "2026-04-24";

export const CLAIMS: Claim[] = [
  {
    id: "legal-name",
    text: "Justech SRL",
    source: "RNC 1-31-98224-3; sitio público www.justech.do",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "brand",
    text: "Justech",
    source: "Sitio público y wordmark oficial",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "city",
    text: "Santo Domingo, República Dominicana",
    source: "Sitio público; Google Business Profile",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "since",
    text: "2018",
    source: "Mandato del propietario; coherente con operación local",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "focus",
    text: "Soluciones tecnológicas empresariales",
    source: "Sitio público y mandato V8.5",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "local-service",
    text: "Atención local en República Dominicana",
    source: "Mandato V8.5; operación en Santo Domingo",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "capability",
    text: "Capacidad de evaluar, diseñar, suministrar, implementar y soportar",
    source: "Mandato V8.5; coherente con oferta pública de infraestructura, equipos, licencias y soporte",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "phone",
    text: "+1 809 455 2372",
    source: "Sitio público www.justech.do",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "email",
    text: "info@justech.do",
    source: "Mandato V8.5 — correo provisional hasta validar buzón de producción",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
    notes: "El dominio justech.do existe. El buzón de producción no se toca desde este repositorio.",
  },
  {
    id: "hours",
    text: "Lunes a viernes, 8:00 a. m. a 5:30 p. m., hora de República Dominicana",
    source: "Mandato V8.5",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "support-portal",
    text: "Portal de soporte disponible en soporte.justech.do",
    source: "HEAD 200 a https://soporte.justech.do; producto Odoo en otro host",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "integrator",
    text: "Integramos infraestructura, equipos, licenciamiento, nube, seguridad y soporte",
    source: "Mandato V8.5; coherente con páginas públicas de servicios",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "rnc",
    text: "RNC 1-31-98224-3",
    source: "Sitio público",
    validatedOn: VALIDATED,
    status: "VERIFIED_PUBLIC",
    publishPermission: "PUBLIC",
  },
  {
    id: "whatsapp",
    text: "WhatsApp comercial",
    source: "No verificado como canal público en este ciclo",
    validatedOn: VALIDATED,
    status: "NEEDS_CONFIRMATION",
    publishPermission: "DO_NOT_PUBLISH",
  },
  {
    id: "street-address",
    text: "Dirección física de oficina",
    source: "No publicada de forma verificable en este ciclo",
    validatedOn: VALIDATED,
    status: "NEEDS_CONFIRMATION",
    publishPermission: "DO_NOT_PUBLISH",
  },
  {
    id: "partner-microsoft",
    text: "Partner certificado Microsoft",
    source: "Sin documento de canal en el repositorio",
    validatedOn: VALIDATED,
    status: "NEEDS_CONFIRMATION",
    publishPermission: "DO_NOT_PUBLISH",
  },
  {
    id: "sla-247",
    text: "Atención 24/7 o SLA contractual",
    source: "Prohibido por mandato hasta evidencia",
    validatedOn: VALIDATED,
    status: "NOT_PUBLIC",
    publishPermission: "DO_NOT_PUBLISH",
  },
  {
    id: "soc-noc",
    text: "SOC o NOC propio",
    source: "No forma parte de la oferta verificada",
    validatedOn: VALIDATED,
    status: "NOT_PUBLIC",
    publishPermission: "DO_NOT_PUBLISH",
  },
];

export function publicClaims(): Claim[] {
  return CLAIMS.filter((c) => c.status === "VERIFIED_PUBLIC" && c.publishPermission === "PUBLIC");
}

export function claim(id: string): Claim | undefined {
  return CLAIMS.find((c) => c.id === id);
}

export function publicText(id: string): string {
  const c = claim(id);
  if (!c || c.status !== "VERIFIED_PUBLIC" || c.publishPermission !== "PUBLIC") {
    throw new Error(`Claim ${id} is not VERIFIED_PUBLIC`);
  }
  return c.text;
}
