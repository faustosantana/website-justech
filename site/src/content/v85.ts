import { publicText } from "./justech-source-of-truth";

export const V85_BASE = "/concepto-v8";

export const V85 = {
  version: "8.7",
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
  "Tecnologías que comercializamos, implementamos o administramos según el alcance.";

export const BRANDS_NOTE =
  "Los nombres describen el ecosistema con el que diseñamos e implementamos. La selección final depende del alcance, los usuarios y las plataformas requeridas.";

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
      {
        href: `${V85_BASE}/#necesidades`,
        label: "Abrir o renovar una sede",
        hint: "Cableado, red y puestos para iniciar operaciones.",
      },
      {
        href: `${V85_BASE}/#necesidades`,
        label: "Actualizar tecnología y plataformas",
        hint: "Equipos, identidad, aplicaciones y licencias.",
      },
      {
        href: `${V85_BASE}/#necesidades`,
        label: "Mantener la operación funcionando",
        hint: "Soporte, continuidad y gestión documentada.",
      },
    ],
  },
  servicios: [
    { href: `${V85_BASE}/cableado-estructurado/`, label: "Cableado estructurado", hint: "Planta documentada y mantenible." },
    { href: `${V85_BASE}/redes-empresariales/`, label: "Redes empresariales", hint: "LAN, Wi-Fi y continuidad del enlace." },
    { href: `${V85_BASE}/soporte-tecnico-empresarial/`, label: "Soporte técnico", hint: "Mesa de ayuda y cierre documentado." },
    { href: `${V85_BASE}/contacto/?motivo=seguridad`, label: "Seguridad y gestión", hint: "Identidad, dispositivos y red." },
    { href: `${V85_BASE}/contacto/?motivo=nube`, label: "Nube y continuidad", hint: "Colaboración, respaldo y recuperación." },
  ],
  productos: [
    { href: `${V85_BASE}/equipos-empresariales/`, label: "Equipos empresariales", hint: "Puestos listos para el primer día." },
    { href: `${V85_BASE}/licenciamiento/`, label: "Licenciamiento y plataformas", hint: "Usuarios, aplicaciones y renovación." },
  ],
} as const;

export const PAGES = {
  cableado: {
    path: `${V85_BASE}/cableado-estructurado/`,
    title: "Cableado estructurado preparado para crecer y mantenerse.",
    result: "Una planta identificada, con rutas mantenibles y un cuarto técnico que otro equipo puede operar.",
    description:
      "Diseñamos e instalamos infraestructura de cobre y fibra para oficinas, sucursales y cuartos técnicos. Cada punto, ruta y terminación se organiza con criterios de operación, mantenimiento y crecimiento.",
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
        q: "¿Qué evidencia técnica entrega el proyecto?",
        a: "Según el alcance contratado: plano actualizado, nomenclatura, listado de puntos, elevación del rack y, cuando aplica, evidencia de pruebas y memoria fotográfica.",
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
    result: "Una topología operable, con borde, acceso y un plan claro cuando el enlace principal no responde.",
    description:
      "Evaluamos cobertura, capacidad, segmentación, seguridad y continuidad para integrar usuarios, equipos, servidores, nube y sucursales.",
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
        q: "¿Qué modalidad de acompañamiento ofrece Justech?",
        a: "El alcance se define según la operación, los canales de atención, los horarios y los servicios contratados. Para los servicios publicados actualmente, la atención se coordina mediante el equipo local y el portal de soporte.",
      },
      {
        q: "¿Pueden trabajar con el ISP actual?",
        a: "Sí. Integramos el enlace existente y, si hay secundario, diseñamos la conmutación. El proveedor de última milla permanece como parte del diseño.",
      },
      {
        q: "¿Cómo se evalúa el Wi-Fi de una oficina?",
        a: "Partimos de densidad de usuarios, aplicaciones, materiales y backhaul cableado. El diseño se valida en el sitio antes de ampliar cobertura.",
      },
    ],
  },
  equipos: {
    path: `${V85_BASE}/equipos-empresariales/`,
    title: "Equipos listos para trabajar desde el primer día.",
    result: "Un puesto configurado, inventariado y entregado según el perfil, con canal de garantía.",
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
        q: "¿Cómo se adquieren los equipos?",
        a: "Cotizamos según perfil, cantidad y puesta en marcha. El siguiente paso es una recomendación y una propuesta comercial.",
      },
      {
        q: "¿Pueden incluir impresión y servidores?",
        a: "Sí, cuando forman parte del puesto o de la sede. El alcance se define con el perfil de trabajo, no con un catálogo cerrado.",
      },
      {
        q: "¿Qué incluye la configuración de un puesto?",
        a: "Identidad, aplicaciones acordadas, inventario, accesorios del perfil y el canal de garantía. Los modelos se confirman en la cotización.",
      },
    ],
  },
  licencias: {
    path: `${V85_BASE}/licenciamiento/`,
    title: "Licencias organizadas alrededor de usuarios, roles y necesidades reales.",
    result: "Usuarios con las aplicaciones que necesitan, identidad controlada y un calendario de renovación.",
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
        q: "¿Cómo se relacionan con Microsoft, Google u otras plataformas?",
        a: "Comercializamos, implementamos o administramos esas tecnologías según el alcance del proyecto. La selección final depende de los usuarios, las aplicaciones y la operación.",
      },
      {
        q: "¿Pueden mezclar Microsoft 365 y Google Workspace?",
        a: "Sí, cuando la organización ya opera así. El diseño parte de identidad y correo reales, y de cómo trabaja cada equipo.",
      },
      {
        q: "¿Qué ocurre en una renovación de licencias?",
        a: "Revisamos utilización, asientos asignados y el calendario del fabricante. Proponemos el plan que cubre el trabajo, con margen para altas y bajas.",
      },
    ],
  },
  soporte: {
    path: `${V85_BASE}/soporte-tecnico-empresarial/`,
    title: "Soporte que entiende la operación, no solamente el incidente.",
    result: "Un caso con responsable, diagnóstico, validación del usuario y cierre que otro técnico puede retomar.",
    description:
      "Recibimos, clasificamos, atendemos y documentamos requerimientos técnicos, conectando usuarios, equipos, redes y plataformas dentro de un mismo proceso.",
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
        q: "¿En qué horario atiende el soporte?",
        a: "La atención publicada es de lunes a viernes, 8:00 a 17:30, hora de República Dominicana, a través del equipo local y el portal de soporte. Coberturas adicionales se definen en el contrato.",
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
  "Selección",
  "Configuración",
  "Seguridad",
  "Inventario",
  "Entrega",
  "Garantía",
] as const;

export const CABLE_HOME = [
  {
    id: "plano",
    n: "01",
    title: "Plano",
    text: "Distribución, rutas previstas y cuarto de comunicaciones sobre el sitio real.",
    visual: 0,
  },
  {
    id: "instalacion",
    n: "02",
    title: "Instalación",
    text: "Puntos, backbone y rack avanzan juntos. Lo construido permanece visible.",
    visual: 3,
  },
  {
    id: "entrega",
    n: "03",
    title: "Entrega documentada",
    text: "Nomenclatura, listado y memoria para operar y ampliar con criterio.",
    visual: 5,
  },
] as const;

export const SECURITY_COPY = {
  title: "Controles coordinados para reducir exposición.",
  body: "Integramos identidad, dispositivos, endpoints, red, aplicaciones y protección de datos de acuerdo con las necesidades de cada organización.",
  label: "Visualización conceptual del proceso",
} as const;

export const CLOUD_COPY = {
  title: "Nube con un propósito operativo claro.",
  body: "Diseñamos colaboración, migración, respaldo y recuperación alrededor de los usuarios, las aplicaciones y la continuidad requerida.",
  label: "Visualización conceptual del proceso",
} as const;

export type QuoteNeed = {
  id: string;
  t: string;
  extra: string;
  options: readonly string[];
};

export const PAGE_QUOTES: Record<string, readonly QuoteNeed[]> = {
  cableado: [
    { id: "cableado", t: "Solicitar levantamiento", extra: "Sitio", options: ["Oficina nueva", "Sucursal", "Renovación de planta", "Varios pisos"] },
    { id: "cableado-cotizar", t: "Cotizar instalación", extra: "Alcance", options: ["Puntos de usuario", "Rack y backbone", "Fibra", "Proyecto completo"] },
    { id: "cableado-ampliar", t: "Ampliar infraestructura existente", extra: "Situación", options: ["Añadir puestos", "Reordenar rack", "Nuevo piso", "Sucursal adicional"] },
    { id: "cableado-otro", t: "Otro requerimiento", extra: "Enfoque", options: ["Documentación", "Pruebas", "Cuarto técnico", "Otro"] },
  ],
  redes: [
    { id: "redes", t: "Diagnosticar red", extra: "Síntoma", options: ["Lentitud", "Wi-Fi irregular", "Corte de enlace", "Segmentación"] },
    { id: "redes-wifi", t: "Mejorar Wi-Fi", extra: "Espacio", options: ["Oficina", "Salas de reunión", "Varios pisos", "Sucursal"] },
    { id: "redes-sucursales", t: "Conectar sucursales", extra: "Alcance", options: ["Dos sedes", "Varias sucursales", "Sede + remoto", "Aún no lo sé"] },
    { id: "redes-continuidad", t: "Diseñar continuidad", extra: "Prioridad", options: ["Enlace de respaldo", "Firewall", "Servidores", "Integral"] },
    { id: "redes-otro", t: "Otro", extra: "Enfoque", options: ["Switching", "Documentación", "Monitoreo", "Otro"] },
  ],
  equipos: [
    { id: "equipos", t: "Solicitar recomendación de equipos", extra: "Perfil", options: ["Administrativo", "Ejecutivo", "Ingeniería", "Varios perfiles"] },
    { id: "equipos-renovar", t: "Renovar una flota", extra: "Volumen", options: ["Menos de 10", "10 a 30", "Más de 30", "Aún no lo sé"] },
    { id: "equipos-servidores", t: "Servidores o almacenamiento", extra: "Uso", options: ["Sede", "Aplicaciones internas", "Respaldo", "Aún no lo sé"] },
    { id: "equipos-otro", t: "Otro requerimiento", extra: "Enfoque", options: ["Accesorios", "Garantía", "Inventario", "Otro"] },
  ],
  licencias: [
    { id: "licencias", t: "Incorporar usuarios", extra: "Plataforma", options: ["Microsoft 365", "Google Workspace", "Adobe", "Aún no lo sé"] },
    { id: "licencias-asignar", t: "Asignar aplicaciones", extra: "Situación", options: ["Alta de equipo", "Cambio de rol", "Departamento nuevo", "Revisión general"] },
    { id: "licencias-identidad", t: "Controlar identidad", extra: "Enfoque", options: ["Acceso", "MFA", "Dispositivos", "Integral"] },
    { id: "licencias-renovar", t: "Preparar renovación", extra: "Plazo", options: ["Este trimestre", "Este año", "Migración", "Aún no lo sé"] },
    { id: "licencias-otro", t: "Otro", extra: "Enfoque", options: ["Utilización", "Migración", "Adopción", "Otro"] },
  ],
  soporte: [
    { id: "soporte", t: "Necesito soporte para mi empresa", extra: "Situación", options: ["Contrato nuevo", "Incidente", "Servicio administrado", "Mantenimiento"] },
    { id: "soporte-cliente", t: "Ya soy cliente", extra: "Canal", options: ["Portal de soporte", "Seguimiento de caso", "Ampliar cobertura", "Otro"] },
    { id: "soporte-otro", t: "Otro requerimiento", extra: "Enfoque", options: ["Inventario", "Garantías", "Capacitación", "Otro"] },
  ],
};

export const LICENSE_RESULTS = [
  "Incorporar usuarios",
  "Asignar aplicaciones",
  "Controlar identidad",
  "Revisar utilización",
  "Preparar renovación",
  "Acompañar migración",
] as const;

export const RESOURCES = [
  {
    slug: "cableado",
    title: "Qué debe entregar un proyecto de cableado estructurado",
    description: "Entregables, señales de una planta incompleta y cómo preparar el levantamiento.",
  },
  {
    slug: "wifi",
    title: "Cómo evaluar el Wi-Fi de una oficina",
    description: "Cobertura, densidad, backhaul y errores frecuentes antes de ampliar access points.",
  },
  {
    slug: "equipos",
    title: "Cuándo renovar los equipos de una empresa",
    description: "Señales operativas, lista de verificación y datos que aceleran una cotización útil.",
  },
] as const;
