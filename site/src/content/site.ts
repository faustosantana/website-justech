export const STAGE = "staging" as const;

export const company = {
  legalName: "Justech SRL",
  shortName: "Justech",
  founded: 2018,
  city: "Santo Domingo",
  country: "República Dominicana",
  phoneDisplay: "+1 809 455 2372",
  phoneTel: "+18094552372",
  email: "info@justech.do",
  emailSalesPending: "ventas@justech.do",
  supportUrl: "https://soporte.justech.do",
  supportEmail: "soporte@justech.do",
  facebook: "https://www.facebook.com/justechrd",
  instagram: "https://www.instagram.com/justechrd",
  production: "https://www.justech.do",
};

export type NavChild = { href: string; label: string; pending?: boolean };

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
  {
    name: "Responsabilidad",
    body: "Honrar el requerimiento en calidad y tiempo.",
  },
  {
    name: "Vocación de servicio",
    body: "Pensar con el cliente, no solo para el cliente.",
  },
  {
    name: "Pasión",
    body: "Satisfacción de formar parte de la solución.",
  },
  {
    name: "Honestidad",
    body: "Transparencia e integridad; sin prácticas injustas ni promesas infladas.",
  },
  {
    name: "Sencillez",
    body: "Experiencia al servicio de la solución más apropiada, no de la más aparatosa.",
  },
];
