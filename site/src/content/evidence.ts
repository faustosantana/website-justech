/**
 * Evidencia publicable. Solo `verified` puede renderizarse en UI pública.
 * Un logo o una mención de competidor no es partnership de Justech.
 */
export type EvidenceStatus =
  | "verified"
  | "pending"
  | "expired"
  | "not_authorized"
  | "internal_only";

export type EvidenceKind =
  | "fact"
  | "partner"
  | "certification"
  | "client"
  | "case"
  | "testimonial"
  | "metric"
  | "legal"
  | "channel";

export type EvidenceItem = {
  id: string;
  kind: EvidenceKind;
  label: string;
  detail?: string;
  status: EvidenceStatus;
  source?: string;
  verifiedOn?: string;
  href?: string;
};

export const evidence: EvidenceItem[] = [
  { id: "legal-name", kind: "legal", label: "Justech SRL", status: "verified", verifiedOn: "2026-08-25", source: "sitio y mandato" },
  { id: "city", kind: "fact", label: "Santo Domingo", status: "verified", verifiedOn: "2026-08-25" },
  { id: "founded", kind: "fact", label: "Desde 2018", detail: "Operación en República Dominicana", status: "verified", verifiedOn: "2026-08-25" },
  { id: "phone", kind: "channel", label: "+1 809 455 2372", status: "verified", href: "tel:+18094552372", verifiedOn: "2026-08-25" },
  { id: "email", kind: "channel", label: "info@justech.do", status: "verified", href: "mailto:info@justech.do", verifiedOn: "2026-08-25" },
  { id: "hours", kind: "fact", label: "Lunes a viernes, 8:00–17:30", detail: "Hora de República Dominicana", status: "verified", verifiedOn: "2026-08-25" },
  { id: "portal", kind: "channel", label: "Portal de soporte", detail: "soporte.justech.do", status: "verified", href: "https://soporte.justech.do", verifiedOn: "2026-08-25" },
  { id: "cycle", kind: "fact", label: "Proceso integral", detail: "Evaluar, diseñar, suministrar, implementar y operar", status: "verified", verifiedOn: "2026-08-25" },
  { id: "local", kind: "fact", label: "Atención local", detail: "Acompañamiento desde Santo Domingo", status: "verified", verifiedOn: "2026-08-25" },
  { id: "enterprise", kind: "fact", label: "Soluciones empresariales", detail: "Infraestructura, equipos, plataformas y soporte", status: "verified", verifiedOn: "2026-08-25" },

  { id: "rnc", kind: "legal", label: "RNC 1-31-98224-3", status: "verified", verifiedOn: "2026-08-25", source: "sitio público" },
  { id: "address", kind: "legal", label: "Dirección física", status: "pending" },
  { id: "whatsapp", kind: "channel", label: "WhatsApp comercial", status: "not_authorized" },
  { id: "coverage", kind: "fact", label: "Cobertura nacional exacta", status: "pending" },
  { id: "microsoft", kind: "partner", label: "Microsoft", status: "pending" },
  { id: "google", kind: "partner", label: "Google", status: "pending" },
  { id: "adobe", kind: "partner", label: "Adobe", status: "pending" },
  { id: "autodesk", kind: "partner", label: "Autodesk", status: "pending" },
  { id: "action1", kind: "partner", label: "Action1", status: "pending" },
  { id: "huawei", kind: "partner", label: "Huawei", status: "pending" },
  { id: "lenovo", kind: "partner", label: "Lenovo", status: "pending" },
  { id: "dell", kind: "partner", label: "Dell", status: "pending" },
  { id: "hp", kind: "partner", label: "HP", status: "pending" },
  { id: "aws", kind: "partner", label: "AWS", status: "pending" },
  { id: "cisco", kind: "partner", label: "Cisco", status: "pending" },
  { id: "fortinet", kind: "partner", label: "Fortinet", status: "pending" },
  { id: "certs", kind: "certification", label: "Certificaciones de empresa o personas", status: "pending" },
  { id: "clients", kind: "client", label: "Logos de clientes", status: "not_authorized" },
  { id: "cases", kind: "case", label: "Casos de éxito nominativos", status: "not_authorized" },
  { id: "testimonials", kind: "testimonial", label: "Testimonios nominativos", status: "not_authorized" },
  { id: "sla-public", kind: "metric", label: "SLA público, NOC, SOC, 24/7", status: "not_authorized" },
  { id: "metrics", kind: "metric", label: "Cifras de operación", status: "pending" },
  { id: "team", kind: "fact", label: "Equipo nominativo con fotos", status: "not_authorized" },
];

export function publicEvidence(kind?: EvidenceKind) {
  return evidence.filter((item) => item.status === "verified" && (kind ? item.kind === kind : true));
}
