export const STAGING_ROUTES = [
  "/concepto-v8/",
  "/concepto-v8/cableado-estructurado/",
  "/concepto-v8/redes-empresariales/",
  "/concepto-v8/equipos-empresariales/",
  "/concepto-v8/licenciamiento/",
  "/concepto-v8/soporte-tecnico-empresarial/",
  "/concepto-v8/contacto/",
  "/concepto-v8/solicitar-cotizacion/",
  "/concepto-v8/solicitar-levantamiento/",
  "/concepto-v8/solicitar-diagnostico/",
  "/concepto-v8/solicitar-soporte/",
  "/concepto-v8/recursos/",
  "/concepto-v8/recursos/cableado/",
  "/concepto-v8/recursos/wifi/",
  "/concepto-v8/recursos/equipos/",
] as const;

/** Mapa propuesto para el corte a producción. No se activa en V8.5. */
export const PRODUCTION_MAP: { staging: string; production: string; intent: string }[] = [
  { staging: "/concepto-v8/", production: "/", intent: "Home integradora" },
  { staging: "/concepto-v8/cableado-estructurado/", production: "/servicios/cableado-estructurado/", intent: "Cableado estructurado Santo Domingo" },
  { staging: "/concepto-v8/redes-empresariales/", production: "/servicios/redes-empresariales/", intent: "Instalación de redes empresariales" },
  { staging: "/concepto-v8/equipos-empresariales/", production: "/productos/laptops-empresariales/", intent: "Equipos y puestos" },
  { staging: "/concepto-v8/licenciamiento/", production: "/servicios/licenciamiento/", intent: "Licenciamiento Microsoft 365 / Workspace" },
  { staging: "/concepto-v8/soporte-tecnico-empresarial/", production: "/servicios/soporte-tecnico-empresarial/", intent: "Soporte técnico para empresas" },
  { staging: "/concepto-v8/contacto/", production: "/contacto/", intent: "Contacto / cotización" },
  { staging: "/concepto-v8/solicitar-cotizacion/", production: "/solicitar-cotizacion/", intent: "Campaña cotización" },
  { staging: "/concepto-v8/solicitar-levantamiento/", production: "/solicitar-levantamiento/", intent: "Campaña levantamiento" },
  { staging: "/concepto-v8/solicitar-diagnostico/", production: "/solicitar-diagnostico/", intent: "Campaña diagnóstico" },
  { staging: "/concepto-v8/solicitar-soporte/", production: "/solicitar-soporte/", intent: "Campaña soporte" },
  { staging: "/concepto-v8/recursos/", production: "/recursos/", intent: "Centro de recursos" },
  { staging: "/concepto-v8/recursos/cableado/", production: "/recursos/cableado/", intent: "Guía de entrega de cableado" },
  { staging: "/concepto-v8/recursos/wifi/", production: "/recursos/wifi/", intent: "Guía de evaluación Wi-Fi" },
  { staging: "/concepto-v8/recursos/equipos/", production: "/recursos/equipos/", intent: "Guía de renovación de equipos" },
];

export const FUTURE_PILLARS = [
  "/soluciones/",
  "/servicios/",
  "/productos/",
  "/industrias/",
  "/recursos/",
  "/nosotros/",
  "/contacto/",
];

export const CUTOVER_CONTROLS = [
  "noindex",
  "robots",
  "canonical",
  "sitemap",
  "analytics",
  "Search Console",
  "redirecciones",
] as const;
