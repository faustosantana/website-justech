/**
 * Matriz privada de clientes. No importar en componentes públicos
 * para renderizar nombres, logos o testimonios.
 * Clasificación: PRIVATE_RELATIONSHIP | NAME_ALLOWED | LOGO_ALLOWED | CASE_ALLOWED | TESTIMONIAL_ALLOWED
 */
export type ClientPublishState =
  | "PRIVATE_RELATIONSHIP"
  | "NAME_ALLOWED"
  | "LOGO_ALLOWED"
  | "CASE_ALLOWED"
  | "TESTIMONIAL_ALLOWED";

export type ClientEvidence = {
  id: string;
  client: string;
  service: string;
  date: string;
  sector: string;
  evidence: string;
  permitName: boolean;
  permitLogo: boolean;
  permitTestimonial: boolean;
  verifiableResult: string;
  state: ClientPublishState;
};

/**
 * Vacío a propósito. Credenciales, propuestas, facturas o conversaciones
 * no autorizan publicación. Completar fila por fila con permiso escrito.
 */
export const CLIENT_EVIDENCE: ClientEvidence[] = [];

export const CLIENT_COMPONENTS_ENABLED = false;

export function publicClients(): ClientEvidence[] {
  if (!CLIENT_COMPONENTS_ENABLED) return [];
  return CLIENT_EVIDENCE.filter((c) =>
    ["NAME_ALLOWED", "LOGO_ALLOWED", "CASE_ALLOWED", "TESTIMONIAL_ALLOWED"].includes(c.state),
  );
}
