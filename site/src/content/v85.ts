import { publicText } from "./justech-source-of-truth";

export const V85_BASE = "/concepto-v8";

export const V85 = {
  version: "8.5",
  hero: {
    kicker: "Justech · Integradora tecnológica · Santo Domingo",
    h1: "Integramos la tecnología que mantiene operando su empresa.",
    lead: "Infraestructura, redes, equipos, licenciamiento, nube, seguridad y soporte, coordinados por un solo equipo.",
    primary: { href: `${V85_BASE}/contacto/?motivo=solucion`, label: "Diseñar mi solución" },
    secondary: { href: "#capacidades", label: "Explorar capacidades" },
  },
  corporate: {
    title: "Tecnología empresarial, integrada de extremo a extremo.",
    body: `Desde ${publicText("since")}, Justech diseña, suministra, implementa y soporta la infraestructura, los equipos y las plataformas que mantienen operando a empresas e instituciones en República Dominicana.`,
  },
  methodInternal: {
    label: "Método interno de entrega",
    steps: [
      { id: "construir", title: "Construir", text: "Levantar, diseñar e implementar la base física y lógica." },
      { id: "modernizar", title: "Modernizar", text: "Renovar equipos, licencias y plataformas sin cortar la operación." },
      { id: "operar", title: "Operar", text: "Sostener con soporte, mantenimiento y administración continua." },
    ],
  },
} as const;

export type NeedId = "sede" | "modernizar" | "operar";

export const NEEDS: Record<
  NeedId,
  {
    id: NeedId;
    kicker: string;
    title: string;
    problem: string;
    solution: string;
    process: string[];
    related: { href: string; label: string }[];
    cta: { href: string; label: string };
    useCase: string;
    visual: string;
  }
> = {
  sede: {
    id: "sede",
    kicker: "Necesidad 1",
    title: "Abrir o renovar una sede",
    problem:
      "Una oficina, sucursal o instalación no puede operar si el cableado, la red, el cuarto técnico y los puestos no están diseñados juntos.",
    solution:
      "Diseñamos e implementamos la infraestructura tecnológica necesaria para que la sede comience a operar correctamente.",
    process: [
      "Levantamiento del sitio y de los puestos.",
      "Diseño de rutas, cuarto técnico y capacidad.",
      "Cableado, fibra, racks, switching y Wi-Fi.",
      "Servidores, almacenamiento y energía cuando aplique.",
      "Equipos de usuarios, documentación y puesta en marcha.",
    ],
    related: [
      { href: `${V85_BASE}/cableado-estructurado/`, label: "Cableado estructurado" },
      { href: `${V85_BASE}/redes-empresariales/`, label: "Redes empresariales" },
      { href: `${V85_BASE}/equipos-empresariales/`, label: "Equipos" },
    ],
    cta: { href: `${V85_BASE}/contacto/?motivo=sede`, label: "Planificar una sede" },
    useCase: "Una sucursal nueva necesita puntos, Wi-Fi, rack y puestos listos el día de apertura.",
    visual: "plan",
  },
  modernizar: {
    id: "modernizar",
    kicker: "Necesidad 2",
    title: "Actualizar tecnología y plataformas",
    problem:
      "Equipos viejos, licencias desordenadas y plataformas sin dueño generan interrupciones y gasto invisible.",
    solution:
      "Renovamos equipos, aplicaciones, licencias, identidad, seguridad y servicios de nube sin perder continuidad operativa.",
    process: [
      "Inventario de equipos, usuarios y licencias.",
      "Selección de perfiles y plataformas.",
      "Migración controlada de identidad y correo.",
      "Configuración, entrega y documentación.",
      "Renovaciones y optimización posterior.",
    ],
    related: [
      { href: `${V85_BASE}/equipos-empresariales/`, label: "Equipos empresariales" },
      { href: `${V85_BASE}/licenciamiento/`, label: "Licenciamiento" },
      { href: `${V85_BASE}/contacto/?motivo=seguridad`, label: "Seguridad y gestión" },
    ],
    cta: { href: `${V85_BASE}/contacto/?motivo=modernizacion`, label: "Evaluar una modernización" },
    useCase: "Un departamento de diez personas necesita equipos nuevos, identidad y licencias alineadas.",
    visual: "studio",
  },
  operar: {
    id: "operar",
    kicker: "Necesidad 3",
    title: "Mantener la operación funcionando",
    problem:
      "Sin un canal claro, cada incidente se resuelve aislado: el usuario llama, el equipo queda sin documentar y la red no tiene dueño.",
    solution:
      "Acompañamos la operación tecnológica mediante soporte, mantenimiento, monitoreo, administración, garantías y atención de incidentes.",
    process: [
      "Canal único de mesa de ayuda.",
      "Soporte remoto o presencial según el caso.",
      "Mantenimiento preventivo y correctivo.",
      "Administración de equipos, plataformas y licencias.",
      "Documentación del incidente y del cierre.",
    ],
    related: [
      { href: `${V85_BASE}/soporte-tecnico-empresarial/`, label: "Soporte técnico" },
      { href: `${V85_BASE}/redes-empresariales/`, label: "Redes" },
      { href: `${V85_BASE}/contacto/?motivo=administrado`, label: "Servicios administrados" },
    ],
    cta: { href: `${V85_BASE}/contacto/?motivo=soporte`, label: "Diseñar un plan de soporte" },
    useCase: "Una sucursal pierde el enlace; el ticket conecta red, diagnóstico y cierre documentado.",
    visual: "ops",
  },
};

export const AREAS = [
  {
    id: "infra",
    title: "Infraestructura y conectividad",
    href: `${V85_BASE}/cableado-estructurado/`,
    items: [
      "Cableado estructurado",
      "Fibra óptica",
      "Canalización",
      "Racks y cuartos técnicos",
      "Redes LAN y WAN",
      "Switching y routing",
      "Wi-Fi empresarial",
      "Servidores y almacenamiento",
      "Respaldo eléctrico cuando aplique",
      "Documentación y certificación",
    ],
  },
  {
    id: "equipos",
    title: "Equipos y puestos de trabajo",
    href: `${V85_BASE}/equipos-empresariales/`,
    items: [
      "Laptops, desktops y workstations",
      "Monitores y accesorios",
      "Servidores",
      "Impresión cuando aplique",
      "Configuración e inventario",
      "Seguridad inicial, entrega y garantía",
    ],
  },
  {
    id: "licencias",
    title: "Licenciamiento, nube y productividad",
    href: `${V85_BASE}/licenciamiento/`,
    items: [
      "Microsoft 365, Google Workspace y Adobe",
      "Correo, colaboración e identidad",
      "Migración y renovaciones",
      "Respaldo y nube",
      "Optimización de licencias",
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad y gestión",
    href: `${V85_BASE}/contacto/?motivo=seguridad`,
    items: [
      "Firewalls",
      "Seguridad de endpoints",
      "Control de acceso digital",
      "Protección de identidad",
      "Gestión de dispositivos y actualizaciones",
      "Respaldo y segmentación de redes",
    ],
  },
  {
    id: "soporte",
    title: "Soporte y servicios administrados",
    href: `${V85_BASE}/soporte-tecnico-empresarial/`,
    items: [
      "Mesa de ayuda remota y presencial",
      "Mantenimiento e incidentes",
      "Administración de plataformas",
      "Monitoreo e inventario",
      "Garantías, documentación y acompañamiento",
    ],
  },
] as const;

export type BrandRelation =
  | "tecnologia-implementada"
  | "producto-comercializado"
  | "plataforma-gestionada"
  | "canal-documentado"
  | "certificacion-documentada";

export const BRANDS: {
  name: string;
  relation: BrandRelation;
  public: boolean;
}[] = [
  { name: "Microsoft", relation: "plataforma-gestionada", public: true },
  { name: "Huawei", relation: "tecnologia-implementada", public: true },
  { name: "Google", relation: "plataforma-gestionada", public: true },
  { name: "Lenovo", relation: "producto-comercializado", public: true },
  { name: "Dell", relation: "producto-comercializado", public: true },
  { name: "HP", relation: "producto-comercializado", public: true },
  { name: "Cisco", relation: "tecnologia-implementada", public: true },
  { name: "Fortinet", relation: "tecnologia-implementada", public: true },
  { name: "AWS", relation: "plataforma-gestionada", public: true },
  { name: "Adobe", relation: "plataforma-gestionada", public: true },
  { name: "Action1", relation: "plataforma-gestionada", public: true },
];

export const BRANDS_COPY =
  "Diseñamos soluciones sobre tecnologías empresariales reconocidas, seleccionadas según las necesidades técnicas, operativas y presupuestarias de cada organización.";

export const BRANDS_NOTE =
  "Los nombres describen tecnologías con las que trabajamos. No implican partnership, certificación ni distribución autorizada hasta que exista documento y permiso de publicación.";

export const CABLE_STAGES = [
  {
    id: "levantamiento",
    n: "01",
    title: "Levantamiento y diseño",
    text: "Identificamos puestos, rutas, distancias, condiciones del sitio y capacidad necesaria antes de cotizar.",
  },
  {
    id: "rutas",
    n: "02",
    title: "Rutas y canalización",
    text: "Diseñamos recorridos mantenibles y preparados para crecimiento.",
  },
  {
    id: "puntos",
    n: "03",
    title: "Puntos y backbone",
    text: "Cada punto responde a una ubicación, un uso y una identificación.",
  },
  {
    id: "rack",
    n: "04",
    title: "Rack y terminación",
    text: "Terminamos, organizamos y documentamos cada conexión en el cuarto técnico.",
  },
  {
    id: "pruebas",
    n: "05",
    title: "Pruebas y certificación",
    text: "Validamos la instalación y entregamos evidencia técnica según el alcance contratado.",
  },
  {
    id: "docs",
    n: "06",
    title: "Documentación y entrega",
    text: "Entregamos una infraestructura que otro técnico puede comprender, mantener y ampliar.",
  },
] as const;

export const NAV = {
  primary: [
    { id: "soluciones", label: "Soluciones" },
    { id: "servicios", label: "Servicios" },
    { id: "productos", label: "Productos" },
    { href: `${V85_BASE}/contacto/?motivo=industrias`, label: "Industrias" },
    { href: `${V85_BASE}/recursos/`, label: "Recursos" },
    { href: `${V85_BASE}/contacto/?motivo=nosotros`, label: "Nosotros" },
    { href: "https://soporte.justech.do", label: "Soporte", external: true },
  ],
  cta: { href: `${V85_BASE}/contacto/`, label: "Hablar con un especialista" },
  soluciones: {
    needs: [
      { href: `${V85_BASE}/#necesidades`, label: "Abrir o renovar una sede" },
      { href: `${V85_BASE}/#necesidades`, label: "Actualizar infraestructura" },
      { href: `${V85_BASE}/equipos-empresariales/`, label: "Renovar equipos" },
      { href: `${V85_BASE}/licenciamiento/`, label: "Organizar licencias" },
      { href: `${V85_BASE}/contacto/?motivo=nube`, label: "Migrar a la nube" },
      { href: `${V85_BASE}/contacto/?motivo=seguridad`, label: "Mejorar seguridad" },
      { href: `${V85_BASE}/soporte-tecnico-empresarial/`, label: "Resolver problemas de soporte" },
      { href: `${V85_BASE}/soporte-tecnico-empresarial/`, label: "Operar tecnología con acompañamiento" },
    ],
  },
  servicios: [
    { href: `${V85_BASE}/cableado-estructurado/`, label: "Infraestructura y cableado" },
    { href: `${V85_BASE}/redes-empresariales/`, label: "Redes y conectividad" },
    { href: `${V85_BASE}/contacto/?motivo=implementacion`, label: "Implementación" },
    { href: `${V85_BASE}/licenciamiento/`, label: "Licenciamiento" },
    { href: `${V85_BASE}/contacto/?motivo=nube`, label: "Nube" },
    { href: `${V85_BASE}/contacto/?motivo=seguridad`, label: "Seguridad" },
    { href: `${V85_BASE}/soporte-tecnico-empresarial/`, label: "Soporte" },
    { href: `${V85_BASE}/contacto/?motivo=administrado`, label: "Servicios administrados" },
    { href: `${V85_BASE}/contacto/?motivo=consultoria`, label: "Consultoría" },
    { href: `${V85_BASE}/contacto/?motivo=levantamiento`, label: "Levantamientos" },
  ],
  productos: [
    { href: `${V85_BASE}/equipos-empresariales/#laptops`, label: "Laptops" },
    { href: `${V85_BASE}/equipos-empresariales/#desktops`, label: "Desktops" },
    { href: `${V85_BASE}/equipos-empresariales/#workstations`, label: "Workstations" },
    { href: `${V85_BASE}/equipos-empresariales/#servidores`, label: "Servidores" },
    { href: `${V85_BASE}/equipos-empresariales/#almacenamiento`, label: "Almacenamiento" },
    { href: `${V85_BASE}/redes-empresariales/`, label: "Networking" },
    { href: `${V85_BASE}/redes-empresariales/#wifi`, label: "Wi-Fi" },
    { href: `${V85_BASE}/equipos-empresariales/#accesorios`, label: "Accesorios" },
    { href: `${V85_BASE}/contacto/?motivo=energia`, label: "Energía" },
    { href: `${V85_BASE}/licenciamiento/`, label: "Software y licencias" },
  ],
} as const;

export const PAGES = {
  cableado: {
    path: `${V85_BASE}/cableado-estructurado/`,
    title: "Cableado estructurado preparado para crecer y mantenerse.",
    description:
      "Diseñamos e instalamos infraestructura de cobre y fibra para oficinas, sucursales y cuartos técnicos en Santo Domingo. Cada punto, ruta y terminación se organiza con criterios de operación, mantenimiento y crecimiento.",
    problem:
      "Un cableado improvisado se vuelve invisible hasta que falla: no hay plano, el rack no identifica puertos y ampliar un puesto implica abrir cielo raso sin criterio.",
    who: "Empresas e instituciones en República Dominicana que abren, mudan o reordenan una sede y necesitan infraestructura documentada, no solamente puntos activos.",
    includes: [
      "Levantamiento de puestos, rutas y cuarto técnico.",
      "Diseño de canalización, cobre y fibra cuando aplique.",
      "Racks, patch panels, switching de acceso y etiquetado.",
      "Puntos de usuario, access points y backbone entre áreas.",
      "Pruebas según el alcance contratado y memoria de entrega.",
    ],
    how: [
      "Visitamos el sitio o trabajamos sobre planos existentes.",
      "Definimos nomenclatura, rutas y capacidad de crecimiento.",
      "Instalamos, terminamos y organizamos el cuarto técnico.",
      "Probamos enlaces e identificamos cada punto.",
      "Entregamos plano actualizado, listado y recomendaciones.",
    ],
    delivers: [
      "Infraestructura instalada según el alcance.",
      "Identificación de puntos y puertos.",
      "Documentación para operación y ampliación.",
      "Evidencia de pruebas cuando el contrato lo incluye.",
    ],
    faq: [
      {
        q: "¿El cableado incluye certificación de categoría específica?",
        a: "Entregamos evidencia técnica según el alcance contratado. No afirmamos un estándar o instrumento concreto hasta que el proyecto lo define.",
      },
      {
        q: "¿Trabajan cobre y fibra?",
        a: "Sí. El diseño combina cobre hacia el puesto y fibra de backbone entre áreas o pisos cuando la distancia o la capacidad lo requieren.",
      },
      {
        q: "¿Pueden intervenir una sede en operación?",
        a: "Sí. El levantamiento define ventanas, rutas existentes y cómo ampliar sin cortar la operación más de lo acordado.",
      },
    ],
  },
  redes: {
    path: `${V85_BASE}/redes-empresariales/`,
    title: "Redes empresariales diseñadas para mantener la operación conectada.",
    description:
      "Evaluamos cobertura, capacidad, segmentación, seguridad y continuidad para integrar usuarios, equipos, servidores, nube y sucursales en Santo Domingo y el resto del país.",
    problem:
      "Una red que creció por acumulación deja usuarios lentos, Wi-Fi saturado y una sucursal que depende de un solo enlace sin dueño claro.",
    who: "Organizaciones con una o varias sedes que necesitan LAN, WAN, Wi-Fi y borde coordinados, no equipos sueltos.",
    includes: [
      "Evaluación de cobertura, capacidad y segmentación.",
      "Switching, routing y Wi-Fi empresarial.",
      "Enlace principal y respaldo cuando el sitio lo requiere.",
      "Firewall de borde e integración con servidores y nube.",
      "Documentación de topología y de incidentes de conectividad.",
    ],
    how: [
      "Levantamos la topología real, no la del diagrama viejo.",
      "Diseñamos borde, core, acceso y cobertura inalámbrica.",
      "Implementamos por fases para no cortar la operación.",
      "Validamos failover cuando hay enlace secundario.",
      "Dejamos un mapa que el soporte puede usar al día siguiente.",
    ],
    delivers: [
      "Red operable y documentada.",
      "Criterios de segmentación y de acceso.",
      "Plan de continuidad del enlace cuando aplica.",
      "Punto de contacto para incidentes de conectividad.",
    ],
    faq: [
      {
        q: "¿Justech opera un NOC 24/7?",
        a: "No. Acompañamos la operación en horario hábil y con canales documentados. No prometemos un centro de operaciones propio.",
      },
      {
        q: "¿Pueden trabajar con el ISP actual?",
        a: "Sí. Integramos el enlace existente y, si hay secundario, diseñamos la conmutación. No sustituimos al proveedor de última milla.",
      },
    ],
  },
  equipos: {
    path: `${V85_BASE}/equipos-empresariales/`,
    title: "Equipos listos para trabajar desde el primer día.",
    description:
      "Seleccionamos, suministramos y configuramos laptops, desktops, workstations y servidores según el perfil del usuario, con identidad, aplicaciones, inventario, accesorios y garantía.",
    problem:
      "Comprar un equipo no es incorporarlo: sin imagen, identidad, cifrado e inventario, el usuario llega y la operación improvisa.",
    who: "Empresas que incorporan colaboradores, renuevan flotas o estandarizan puestos en República Dominicana.",
    includes: [
      "Selección por perfil: administración, dirección, ingeniería.",
      "Laptops, desktops, workstations, monitores y accesorios.",
      "Servidores y almacenamiento cuando el proyecto lo incluye.",
      "Configuración, identidad, cifrado inicial e inventario.",
      "Entrega y gestión de garantía.",
    ],
    how: [
      "Definimos el perfil y el estándar del puesto.",
      "Cotizamos equipos acordes a carga, movilidad y presupuesto.",
      "Preparamos imagen, identidad y aplicaciones acordadas.",
      "Entregamos con inventario y accesorios.",
      "Documentamos serial, usuario y vigencia de garantía.",
    ],
    delivers: [
      "Equipo configurado y asignado.",
      "Registro de inventario.",
      "Accesorios del perfil.",
      "Canal de garantía.",
    ],
    faq: [
      {
        q: "¿Venden al detalle como tienda en línea?",
        a: "No. Cotizamos equipos empresariales según el proyecto. No hay carrito ni «comprar ahora».",
      },
      {
        q: "¿Pueden incluir impresión y servidores?",
        a: "Sí, cuando forman parte del puesto o de la sede. No los empujamos si el alcance es solo laptops.",
      },
    ],
  },
  licencias: {
    path: `${V85_BASE}/licenciamiento/`,
    title: "Licencias organizadas alrededor de usuarios, roles y necesidades reales.",
    description:
      "Acompañamos la selección, asignación, migración, adopción y renovación de Microsoft 365, Google Workspace, Adobe y otras plataformas empresariales para reducir desorden y mantener continuidad.",
    problem:
      "Las licencias se compran por urgencia y se olvidan en renovación: hay asientos de más, usuarios sin MFA y departamentos que no coinciden con el directorio.",
    who: "Organizaciones que necesitan correo, colaboración, identidad y software de creación sin perder el control de asignaciones.",
    includes: [
      "Selección de planes según rol.",
      "Asignación, revisión y renovación.",
      "Migración de correo e identidad cuando aplica.",
      "Políticas básicas de acceso.",
      "Optimización de asientos no usados.",
    ],
    how: [
      "Inventariamos usuarios, departamentos y aplicaciones reales.",
      "Proponemos el plan mínimo que cubre el trabajo, no el más caro.",
      "Asignamos, documentamos y preparamos la renovación.",
      "Acompañamos la adopción en el equipo.",
    ],
    delivers: [
      "Mapa de licencias por usuario y departamento.",
      "Plataforma operativa según el alcance.",
      "Calendario de renovación.",
      "Criterios de alta y baja.",
    ],
    faq: [
      {
        q: "¿Son partner certificado de Microsoft o Google?",
        a: "Trabajamos esas plataformas como tecnologías de la operación. No publicamos sello de partner hasta tener documento y autorización.",
      },
      {
        q: "¿Pueden mezclar Microsoft 365 y Google Workspace?",
        a: "Sí, cuando la organización ya opera así. El diseño parte de identidad y correo reales, no de una marca única obligatoria.",
      },
    ],
  },
  soporte: {
    path: `${V85_BASE}/soporte-tecnico-empresarial/`,
    title: "Soporte que entiende la operación, no solamente el incidente.",
    description:
      "Recibimos, clasificamos, atendemos y documentamos requerimientos técnicos en Santo Domingo, conectando usuarios, equipos, redes y plataformas dentro de un mismo proceso.",
    problem:
      "El usuario reporta «no hay internet» y el caso muere en un chat: no hay prioridad, responsable ni cierre que otro técnico pueda retomar.",
    who: "Empresas que necesitan mesa de ayuda, soporte remoto o presencial, mantenimiento y administración continua, en horario hábil.",
    includes: [
      "Mesa de ayuda y portal de soporte.",
      "Soporte remoto y presencial.",
      "Mantenimiento preventivo y correctivo.",
      "Gestión de incidentes, garantías e inventario.",
      "Administración de equipos, plataformas y licencias cuando está contratada.",
    ],
    how: [
      "El usuario abre el caso en el portal o por los canales acordados.",
      "Clasificamos impacto y asignamos responsable.",
      "Diagnosticamos con contexto de red, equipo y plataforma.",
      "Resolvemos, validamos con el usuario y cerramos con nota.",
    ],
    delivers: [
      "Canal único de atención.",
      "Historial del caso.",
      "Cierre documentado.",
      "Aprendizaje para el siguiente incidente.",
    ],
    faq: [
      {
        q: "¿El soporte es 24/7?",
        a: "El horario indicado es lunes a viernes, 8:00 a. m. a 5:30 p. m., hora de República Dominicana. Fuera de ese horario no prometemos cobertura salvo un acuerdo específico, que no se publica aquí.",
      },
      {
        q: "¿Dónde abro un ticket?",
        a: "En el portal de soporte, en un host distinto a este sitio. El enlace está en la cabecera y en esta página.",
      },
    ],
  },
} as const;

export const RELATION_LABEL: Record<BrandRelation, string> = {
  "tecnologia-implementada": "Tecnología implementada",
  "producto-comercializado": "Producto comercializado",
  "plataforma-gestionada": "Plataforma gestionada",
  "canal-documentado": "Canal o partnership documentado",
  "certificacion-documentada": "Certificación documentada",
};

export const QUOTE_NEEDS = [
  {
    id: "sede",
    t: "Abrir o renovar una sede",
    extra: "Tipo de sitio",
    options: ["Oficina nueva", "Sucursal", "Renovación de planta", "Varios pisos"],
  },
  {
    id: "modernizacion",
    t: "Actualizar tecnología y plataformas",
    extra: "Enfoque principal",
    options: ["Equipos", "Licencias", "Identidad y seguridad", "Nube"],
  },
  {
    id: "soporte",
    t: "Mantener la operación funcionando",
    extra: "Situación",
    options: ["Contrato nuevo", "Ya soy cliente", "Incidente", "Servicio administrado"],
  },
  {
    id: "cableado",
    t: "Cableado o cuarto técnico",
    extra: "Sitio",
    options: ["Oficina", "Sucursal", "Varios pisos", "Solo rack"],
  },
  {
    id: "redes",
    t: "Redes y Wi-Fi",
    extra: "Alcance",
    options: ["Sede", "Sucursales", "Wi-Fi", "Enlace con respaldo"],
  },
  {
    id: "equipos",
    t: "Equipos y puestos",
    extra: "Perfil",
    options: ["Administrativo", "Ejecutivo", "Ingeniería", "Aún no lo sé"],
  },
  {
    id: "licencias",
    t: "Licenciamiento",
    extra: "Plataforma",
    options: ["Microsoft 365", "Google Workspace", "Adobe", "Aún no lo sé"],
  },
  {
    id: "seguridad",
    t: "Seguridad y gestión",
    extra: "Enfoque",
    options: ["Endpoint", "Red", "Identidad", "Integral"],
  },
] as const;

export const HIRE_STEPS = [
  "Perfil",
  "Equipo",
  "Configuración",
  "Identidad",
  "Cifrado",
  "Aplicaciones",
  "Inventario",
  "Accesorios",
  "Entrega",
  "Garantía",
] as const;

export const RESOURCES = [
  {
    slug: "cableado",
    title: "Qué debe entregar un proyecto de cableado estructurado",
    description:
      "Lista de entregables para que una sede no quede con puntos activos y sin memoria técnica.",
  },
  {
    slug: "wifi",
    title: "Cómo dimensionar el Wi-Fi de una oficina",
    description:
      "Criterios prácticos de cobertura, densidad y backhaul antes de comprar access points.",
  },
  {
    slug: "equipos",
    title: "Señales de que una empresa debe renovar sus equipos",
    description:
      "Indicadores operativos —no de marketing— para decidir una renovación de puestos.",
  },
] as const;
