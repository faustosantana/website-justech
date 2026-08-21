export const STAGE = "staging" as const;

export const GATES = {
  clients: false,
  partners: false,
  certifications: false,
  metrics: false,
  caseStudies: false,
  testimonials: false,
  physicalSecurity: false,
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

export type NavChild = {
  href: string;
  label: string;
  pending?: boolean;
  hint?: string;
};

export function published<T extends { pending?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.pending);
}

export const solutions: NavChild[] = [
  { href: "/soluciones/modernizacion-de-infraestructura/", label: "Modernización de infraestructura", hint: "Entornos que ya no sostienen el crecimiento" },
  { href: "/soluciones/transformacion-digital/", label: "Transformación digital", hint: "Procesos y herramientas alineados al negocio" },
  { href: "/soluciones/productividad-y-colaboracion/", label: "Productividad y colaboración", hint: "Trabajo que no depende de una sola oficina" },
  { href: "/soluciones/continuidad-operacional/", label: "Continuidad operacional", hint: "Cuando detenerse no es una opción" },
  { href: "/soluciones/seguridad-y-proteccion/", label: "Seguridad y protección", hint: "Reducir exposición sin frenar la operación" },
  { href: "/soluciones/gestion-y-monitoreo/", label: "Gestión y monitoreo", hint: "Visibilidad de lo que está en producción" },
  { href: "/soluciones/optimizacion-de-costos/", label: "Optimización de costos tecnológicos", hint: "Pagar por lo que se usa, con trazabilidad" },
  { href: "/soluciones/trabajo-hibrido/", label: "Trabajo híbrido", hint: "Sucursales, remoto y sede con la misma calidad" },
  { href: "/soluciones/automatizacion-de-procesos/", label: "Automatización de procesos", hint: "Menos trabajo repetitivo, más control" },
  { href: "/soluciones/datos-e-inteligencia-artificial/", label: "Datos e inteligencia artificial", hint: "Decisiones con información ordenada" },
  { href: "/soluciones/sucursales/", label: "Soluciones para sucursales", hint: "Misma experiencia en cada punto de servicio" },
  { href: "/soluciones/proyectos-llave-en-mano/", label: "Proyectos llave en mano", hint: "Un responsable, de la evaluación a la operación" },
  { href: "/soluciones/software-y-licenciamiento/", label: "Software y licenciamiento" },
  { href: "/soluciones/equipamiento-empresarial/", label: "Equipamiento empresarial" },
];

export const services: NavChild[] = [
  { href: "/servicios/consultoria-tecnologica/", label: "Consultoría tecnológica" },
  { href: "/servicios/levantamiento-y-diagnostico/", label: "Levantamiento y diagnóstico" },
  { href: "/servicios/diseno-de-soluciones/", label: "Diseño de soluciones" },
  { href: "/servicios/implementacion-y-migraciones/", label: "Implementación y migraciones" },
  { href: "/servicios/gestion-de-proyectos/", label: "Gestión de proyectos" },
  { href: "/servicios/soporte-tecnico/", label: "Soporte técnico" },
  { href: "/servicios/mesa-de-ayuda/", label: "Mesa de ayuda" },
  { href: "/servicios/servicios-administrados/", label: "Servicios administrados" },
  { href: "/servicios/outsourcing-e-implants/", label: "Outsourcing e implants" },
  { href: "/servicios/mantenimiento/", label: "Mantenimiento preventivo y correctivo" },
  { href: "/servicios/instalacion-y-configuracion/", label: "Instalación y configuración" },
  { href: "/servicios/respaldo-y-recuperacion/", label: "Respaldo y recuperación" },
  { href: "/servicios/monitoreo/", label: "Monitoreo" },
  { href: "/servicios/capacitacion-y-adopcion/", label: "Capacitación y adopción" },
  { href: "/servicios/desarrollo-de-software/", label: "Desarrollo e integración" },
  { href: "/servicios/qa-y-automatizacion/", label: "QA y pruebas" },
  { href: "/servicios/gestion-de-garantias/", label: "Gestión de garantías" },
];

export const productGroups: { title: string; items: NavChild[] }[] = [
  {
    title: "Equipos",
    items: [
      { href: "/productos/estaciones-de-trabajo/", label: "Computadoras y estaciones" },
      { href: "/productos/laptops/", label: "Laptops" },
      { href: "/productos/servidores/", label: "Servidores" },
      { href: "/productos/almacenamiento/", label: "Almacenamiento" },
      { href: "/productos/impresion/", label: "Impresión" },
      { href: "/productos/accesorios/", label: "Accesorios" },
    ],
  },
  {
    title: "Redes y energía",
    items: [
      { href: "/productos/redes/", label: "Redes y conectividad" },
      { href: "/productos/switches/", label: "Switches" },
      { href: "/productos/routers/", label: "Routers" },
      { href: "/productos/firewalls/", label: "Firewalls" },
      { href: "/productos/access-points/", label: "Access points" },
      { href: "/productos/ups/", label: "UPS y energía" },
    ],
  },
  {
    title: "Software y nube",
    items: [
      { href: "/productos/licencias/", label: "Licencias de software" },
      { href: "/productos/microsoft-365/", label: "Microsoft 365" },
      { href: "/productos/google-workspace/", label: "Google Workspace" },
      { href: "/productos/cloud/", label: "Soluciones cloud" },
      { href: "/productos/endpoint/", label: "Endpoint management" },
      { href: "/productos/backup/", label: "Backup" },
    ],
  },
  {
    title: "Colaboración y data center",
    items: [
      { href: "/productos/videoconferencia/", label: "Videoconferencia" },
      { href: "/productos/colaboracion/", label: "Pantallas y colaboración" },
      { href: "/productos/data-center/", label: "Equipamiento para centros de datos" },
      { href: "/productos/seguridad/", label: "Seguridad" },
    ],
  },
];

export const cablingLinks: NavChild[] = [
  { href: "/infraestructura-fisica/cableado-estructurado/", label: "Cableado estructurado" },
  { href: "/infraestructura-fisica/fibra-optica/", label: "Fibra óptica" },
  { href: "/infraestructura-fisica/certificacion/", label: "Certificación de puntos" },
  { href: "/infraestructura-fisica/levantamiento/", label: "Levantamiento de redes" },
  { href: "/infraestructura-fisica/racks-y-gabinetes/", label: "Racks y gabinetes" },
  { href: "/infraestructura-fisica/canalizacion/", label: "Canalización" },
  { href: "/infraestructura-fisica/puntos-de-red/", label: "Puntos de red" },
  { href: "/infraestructura-fisica/redes-inalambricas/", label: "Redes inalámbricas" },
  { href: "/infraestructura-fisica/cuartos-tecnicos/", label: "Cuartos técnicos" },
  { href: "/infraestructura-fisica/centros-de-datos/", label: "Centros de datos" },
  { href: "/infraestructura-fisica/documentacion/", label: "Documentación y etiquetado" },
  { href: "/infraestructura-fisica/mantenimiento/", label: "Mantenimiento de infraestructura" },
];

export const productLinks: NavChild[] = productGroups.flatMap((g) => g.items);

export const verifiedSignals = [
  { k: "2018", v: "Fundación en Santo Domingo" },
  { k: "Portal propio", v: "soporte.justech.do" },
  { k: "Horario", v: "Lun–Vie 8:00–17:30" },
  { k: "Contacto", v: "+1 809 455 2372" },
];

export const industryLinks: NavChild[] = [
  { href: "/industrias/sector-financiero/", label: "Sector financiero" },
  { href: "/industrias/gobierno/", label: "Gobierno" },
  { href: "/industrias/educacion/", label: "Educación" },
  { href: "/industrias/salud/", label: "Salud" },
  { href: "/industrias/comercio/", label: "Comercio" },
  { href: "/industrias/manufactura/", label: "Manufactura" },
  { href: "/industrias/servicios-profesionales/", label: "Servicios profesionales" },
  { href: "/industrias/sin-fines-de-lucro/", label: "Organizaciones sin fines de lucro" },
  { href: "/industrias/pymes/", label: "Pequeñas y medianas empresas" },
  { href: "/industrias/multisucursal/", label: "Empresas con múltiples sucursales" },
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

export const aboutLinks: NavChild[] = [
  { href: "/nosotros/", label: "Quiénes somos" },
  { href: "/nosotros/historia/", label: "Historia y propósito" },
  { href: "/nosotros/metodologia/", label: "Metodología" },
  { href: "/nosotros/cumplimiento/", label: "Cumplimiento" },
  { href: "/nosotros/partners/", label: "Fabricantes y plataformas" },
];

export const recursosLinks: NavChild[] = [
  { href: "/recursos/", label: "Centro de recursos" },
  { href: "/recursos/faqs/", label: "Preguntas frecuentes" },
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
  { name: "Pasión", body: "Compromiso con formar parte de la solución." },
  { name: "Honestidad", body: "Transparencia e integridad en cada compromiso." },
  { name: "Sencillez", body: "La solución más apropiada, con la experiencia justa para ejecutarla." },
];

export const problems = [
  {
    title: "La operación se detiene cuando falla un punto único",
    body: "Rediseñamos el entorno para que un incidente no apague sucursales, cajas o equipos críticos.",
  },
  {
    title: "Se compra tecnología sin un diseño que la sostenga",
    body: "Antes del suministro: levantamiento, alcance y responsables. Después: implementación y soporte.",
  },
  {
    title: "Licencias, equipos y tickets viven en islas distintas",
    body: "Unimos aprovisionamiento, cableado, configuración y mesa de ayuda en un solo hilo de ejecución.",
  },
  {
    title: "No hay visibilidad de lo que ya está en producción",
    body: "Monitoreo, inventario y un portal de casos para saber qué ocurre y quién atiende.",
  },
];

export const cycle = [
  "Evaluación",
  "Diseño",
  "Suministro",
  "Licenciamiento",
  "Implementación",
  "Cableado",
  "Configuración",
  "Soporte",
  "Mantenimiento",
  "Servicios administrados",
];

export const cablingProcess = [
  ["01", "Levantamiento", "Sitio, puntos, canalización y restricciones reales."],
  ["02", "Diseño", "Topología, racks, Wi-Fi y crecimiento."],
  ["03", "Presupuesto", "Materiales, mano de obra y ventanas de trabajo."],
  ["04", "Instalación", "Ejecución con orden de gabinetes y etiquetado."],
  ["05", "Certificación", "Pruebas de puntos y registro de resultados."],
  ["06", "Documentación", "Planos, etiquetas y entrega operativa."],
  ["07", "Soporte", "Mantenimiento y ampliación cuando el negocio crece."],
];

export const method = [
  ["01", "Estrategia", "Comprender el negocio, el riesgo y el resultado esperado."],
  ["02", "Aprovisionamiento", "Software, equipos e infraestructura con trazabilidad."],
  ["03", "Implementación", "Puesta en marcha que la operación puede sostener."],
  ["04", "Operación", "Soporte N1–N3 y seguimiento en el portal de Justech."],
  ["05", "Mejora", "Ajustar lo que ya corre, con prioridad de negocio."],
];

export const intents = [
  { id: "cotizacion", label: "Cotización de equipos", landing: "/contacto/cotizacion/" },
  { id: "levantamiento", label: "Levantamiento de cableado", landing: "/contacto/levantamiento/" },
  { id: "diagnostico", label: "Diagnóstico tecnológico", landing: "/contacto/diagnostico/" },
  { id: "licenciamiento", label: "Licenciamiento", landing: "/contacto/licenciamiento/" },
  { id: "soporte", label: "Soporte o mesa de ayuda", landing: "/contacto/soporte/" },
  { id: "proyecto", label: "Proyecto llave en mano", landing: "/contacto/proyecto/" },
  { id: "servicio-administrado", label: "Servicio administrado", landing: "/contacto/servicio-administrado/" },
] as const;
