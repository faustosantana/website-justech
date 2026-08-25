/**
 * V8.7 — escenarios empresariales. Identidad de clientes, cifras y
 * autorización permanecen fuera de la UI pública (restricción interna).
 */

import { V85_BASE } from "./v85";

export const CASES_HEADING = "Experiencia aplicada a escenarios empresariales.";

export const CASES_INTRO =
  "Cada proyecto parte de una necesidad diferente. Estos escenarios muestran cómo organizamos el trabajo desde el levantamiento hasta la entrega y el soporte.";

export const CASES = [
  {
    id: "sede",
    title: "Nueva sede",
    lead: "Diseño e implementación de infraestructura para iniciar operaciones.",
    service: "Cableado estructurado, red y puestos de trabajo.",
    href: `${V85_BASE}/cableado-estructurado/`,
  },
  {
    id: "renovacion",
    title: "Renovación tecnológica",
    lead: "Organización de equipos, identidad, aplicaciones y licenciamiento.",
    service: "Equipos, licencias y onboarding coordinado.",
    href: `${V85_BASE}/equipos-empresariales/`,
  },
  {
    id: "continuidad",
    title: "Continuidad multisucursal",
    lead: "Conectividad, respaldo y gestión documentada de incidentes.",
    service: "Red, nube y soporte coordinado.",
    href: `${V85_BASE}/redes-empresariales/`,
  },
] as const;
