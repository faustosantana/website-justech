export const STAGE = "staging" as const;

/** Gates internas. No renderizar bloques públicos hasta que pasen a true. */
export const GATES = {
  clients: false,
  partners: false,
  certifications: false,
  metrics: false,
  caseStudies: false,
  testimonials: false,
} as const;

export const company = {
  legalName: "Justech SRL",
  shortName: "Justech",
  founded: 2018,
  city: "Santo Domingo",
  country: "República Dominicana",
  phoneDisplay: "+1 809 455 2372",
  phoneTel: "+18094552372",
  email: "info@justech.do",
  supportUrl: "https://soporte.justech.do",
  supportEmail: "soporte@justech.do",
  facebook: "https://www.facebook.com/justechrd",
  instagram: "https://www.instagram.com/justechrd",
  production: "https://www.justech.do",
  hours: "Lunes a viernes, 8:00–17:30 (hora de República Dominicana)",
};

export type NavChild = { href: string; label: string; pending?: boolean };

export function published<T extends { pending?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.pending);
}

export const recursosLinks: NavChild[] = [
  { href: "/recursos/", label: "Centro de recursos" },
  { href: "/recursos/faqs/", label: "Preguntas frecuentes" },
  { href: "/recursos/blog/", label: "Blog", pending: true },
  { href: "/recursos/guias/", label: "Guías", pending: true },
];

export const industryLinks: NavChild[] = [
  { href: "/industrias/gobierno/", label: "Gobierno", pending: true },
  { href: "/industrias/banca-finanzas-seguros/", label: "Banca, finanzas y seguros", pending: true },
  { href: "/industrias/salud/", label: "Salud", pending: true },
  { href: "/industrias/educacion/", label: "Educación", pending: true },
  { href: "/industrias/retail-y-servicios/", label: "Retail y servicios", pending: true },
  { href: "/industrias/hoteleria-y-turismo/", label: "Hotelería y turismo", pending: true },
  { href: "/industrias/industria-construccion-logistica/", label: "Industria, construcción y logística", pending: true },
];

export const technologyLinks: NavChild[] = [
  { href: "/tecnologias/microsoft/", label: "Microsoft" },
  { href: "/tecnologias/google/", label: "Google" },
  { href: "/tecnologias/huawei/", label: "Huawei" },
  { href: "/tecnologias/lenovo/", label: "Lenovo" },
  { href: "/tecnologias/dell/", label: "Dell" },
  { href: "/tecnologias/hp/", label: "HP" },
  { href: "/tecnologias/aws/", label: "AWS" },
  { href: "/tecnologias/cisco/", label: "Cisco" },
  { href: "/tecnologias/fortinet/", label: "Fortinet" },
  { href: "/tecnologias/adobe/", label: "Adobe" },
  { href: "/tecnologias/action1/", label: "Action1" },
];

export const solutions: NavChild[] = [
  { href: "/soluciones/software-y-licenciamiento/", label: "Software y licenciamiento" },
  { href: "/soluciones/equipamiento-empresarial/", label: "Equipamiento empresarial" },
  { href: "/soluciones/infraestructura-y-redes/", label: "Infraestructura y redes", pending: true },
  { href: "/soluciones/ciberseguridad/", label: "Ciberseguridad", pending: true },
  { href: "/soluciones/nube-y-data-center/", label: "Nube y data center", pending: true },
  { href: "/soluciones/productividad-y-colaboracion/", label: "Productividad y colaboración", pending: true },
  { href: "/soluciones/continuidad-y-respaldo/", label: "Continuidad y respaldo", pending: true },
  { href: "/soluciones/automatizacion-e-ia/", label: "Automatización e IA", pending: true },
];

export const services: NavChild[] = [
  { href: "/servicios/soporte-tecnico/", label: "Soporte técnico N1–N3" },
  { href: "/servicios/outsourcing-e-implants/", label: "Outsourcing e implants" },
  { href: "/servicios/consultoria-tecnologica/", label: "Consultoría tecnológica" },
  { href: "/servicios/implementacion-y-migraciones/", label: "Implementación y migraciones" },
  { href: "/servicios/servicios-administrados/", label: "Servicios administrados de TI", pending: true },
  { href: "/servicios/desarrollo-de-software/", label: "Desarrollo de software", pending: true },
  { href: "/servicios/qa-y-automatizacion/", label: "QA y automatización de pruebas", pending: true },
];

export const aboutLinks: NavChild[] = [
  { href: "/nosotros/", label: "Quiénes somos" },
  { href: "/nosotros/historia/", label: "Historia y propósito" },
  { href: "/nosotros/metodologia/", label: "Metodología" },
  { href: "/nosotros/equipo/", label: "Equipo", pending: true },
  { href: "/nosotros/partners/", label: "Partners", pending: true },
  { href: "/nosotros/cumplimiento/", label: "Cumplimiento y confianza" },
];

export const legalLinks: NavChild[] = [
  { href: "/legal/", label: "Centro legal" },
  { href: "/politica-de-privacidad/", label: "Privacidad" },
  { href: "/politica-de-proteccion-de-datos/", label: "Protección de datos" },
  { href: "/politica-de-cookies/", label: "Cookies" },
  { href: "/politica-de-seguridad-de-la-informacion/", label: "Seguridad de la información" },
  { href: "/politica-de-contingencia/", label: "Contingencia" },
  { href: "/canales-de-asistencia/", label: "Canales de asistencia" },
  { href: "/acuerdo-de-nivel-de-servicio/", label: "Acuerdo de nivel de servicio" },
];

export const values = [
  { name: "Responsabilidad", body: "Honrar el requerimiento en calidad y en el tiempo acordado." },
  { name: "Vocación de servicio", body: "Pensar con el cliente para sostener su operación." },
  { name: "Pasión", body: "Compromiso con formar parte de la solución, no solo del diagnóstico." },
  { name: "Honestidad", body: "Transparencia e integridad en cada compromiso." },
  { name: "Sencillez", body: "La solución más apropiada, con la experiencia justa para ejecutarla." },
];

export const solutionCopy: Record<string, string> = {
  "/soluciones/software-y-licenciamiento/":
    "Renovación y aprovisionamiento de software empresarial, con acompañamiento para que la adopción sea ordenada.",
  "/soluciones/equipamiento-empresarial/":
    "Estaciones, servidores, redes y accesorios seleccionados según el requerimiento, con criterio de calidad y plazo.",
};

export const serviceCopy: Record<string, string> = {
  "/servicios/soporte-tecnico/":
    "Atención N1 a N3 para que las incidencias no detengan el negocio, con tickets en portal propio.",
  "/servicios/outsourcing-e-implants/":
    "Profesionales integrados a su operación, con responsable Justech y alcance definido.",
  "/servicios/consultoria-tecnologica/":
    "Diagnóstico y recomendaciones para decidir con claridad, antes de invertir.",
  "/servicios/implementacion-y-migraciones/":
    "Puesta en marcha y migraciones con plan, responsables y criterio de continuidad.",
};

export const outcomes = [
  {
    n: "01",
    title: "Operar con continuidad",
    body: "Soporte e implementación pensados para que la tecnología sostenga el día a día, no para interrumpirlo.",
  },
  {
    n: "02",
    title: "Decidir con claridad",
    body: "Consultoría que traduce el requerimiento de negocio en un camino técnico ejecutable.",
  },
  {
    n: "03",
    title: "Aprovisionar con orden",
    body: "Licencias y equipos con trazabilidad, plazos y acompañamiento de adopción.",
  },
  {
    n: "04",
    title: "Evolucionar con medida",
    body: "Mejoras sobre lo que ya funciona, alineadas al resultado y a la capacidad de operación.",
  },
];

export const method = [
  ["01", "Estrategia", "Comprender el negocio, el riesgo operativo y el resultado esperado."],
  ["02", "Aprovisionamiento", "Software y equipos con trazabilidad y responsables claros."],
  ["03", "Implementación", "Puesta en marcha con un plan que la operación puede sostener."],
  ["04", "Operación", "Soporte N1–N3 y seguimiento de casos en el portal de Justech."],
  ["05", "Mejora", "Ajustar lo que ya corre, con evidencia y prioridad de negocio."],
];

export const scenarios = [
  {
    title: "Cuando la operación no puede detenerse",
    body: "Incidencias, cambios y mantenimiento con un canal de tickets y un responsable visible.",
  },
  {
    title: "Cuando hay que renovar el parque tecnológico",
    body: "Licenciamiento y equipos definidos según el uso real de su organización.",
  },
  {
    title: "Cuando la decisión requiere criterio",
    body: "Consultoría e implementación para pasar de la evaluación a un entorno en producción.",
  },
];

export const facts = [
  { k: "2018", v: "Año de fundación" },
  { k: "Santo Domingo", v: "Base de operación" },
  { k: "N1–N3", v: "Soporte técnico" },
];
