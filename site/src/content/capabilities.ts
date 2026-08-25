import {
  cablingLinks,
  cablingProcess,
  cycle,
  industryLinks,
  productGroups,
  services,
  technologyLinks,
} from "./site";

export type Faq = { q: string; a: string };
export type LinkRef = { href: string; label: string };

export type Capability = {
  slug: string;
  href: string;
  cluster: "soluciones" | "servicios" | "productos" | "infraestructura" | "industrias" | "tecnologias";
  title: string;
  kicker: string;
  lead: string;
  problem: string;
  audience: string;
  signals: string[];
  scope: string[];
  process: string[];
  benefits: string[];
  related: LinkRef[];
  complementary: LinkRef[];
  faqs: Faq[];
  seoDesc: string;
  ctaHref: string;
  ctaLabel: string;
};

function slugFromHref(href: string) {
  return href.split("/").filter(Boolean).pop() ?? "";
}

export const solutionAliases: Record<string, string> = {
  ciberseguridad: "seguridad-y-proteccion",
  "nube-y-data-center": "modernizacion-de-infraestructura",
  "continuidad-y-respaldo": "continuidad-operacional",
  "automatizacion-e-ia": "automatizacion-de-procesos",
  "infraestructura-y-redes": "modernizacion-de-infraestructura",
};

export const industryAliases: Record<string, string> = {
  "banca-finanzas-seguros": "sector-financiero",
  "retail-y-servicios": "comercio",
  "industria-construccion-logistica": "manufactura",
};

const integratorProcess = [
  "Levantamiento del entorno y del resultado de negocio",
  "Diseño de alcance, responsables y ventanas de trabajo",
  "Suministro, licenciamiento o cableado según el caso",
  "Implementación y configuración",
  "Puesta en operación y soporte",
];

export const solutionCaps: Capability[] = [
  {
    slug: "modernizacion-de-infraestructura",
    href: "/soluciones/modernizacion-de-infraestructura/",
    cluster: "soluciones",
    title: "Modernización de infraestructura",
    kicker: "Problema de negocio",
    lead: "Cuando servidores, redes o cableado ya no sostienen el crecimiento, el riesgo no es estético: es operativo.",
    problem:
      "Entornos armados por capas sucesivas —un switch aquí, un servidor allá— terminan con puntos únicos de falla, direccionamiento confuso y ventanas de mantenimiento imposibles.",
    audience:
      "Organizaciones con sede o sucursales que necesitan renovar red, servidores, almacenamiento o el cuarto técnico sin apagar el negocio.",
    signals: [
      "Caídas recurrentes asociadas a un solo equipo o enlace",
      "No hay inventario fiable de lo que está en producción",
      "El cableado o el rack impide ampliar con orden",
      "Los respaldos existen, pero nadie ha restaurado de verdad",
    ],
    scope: [
      "Diagnóstico de red, servidores, energía y cableado",
      "Diseño de topología y de crecimiento",
      "Suministro e instalación de equipos",
      "Migración controlada y documentación de entrega",
    ],
    process: integratorProcess,
    benefits: [
      "Un diseño que se puede operar, no una suma de cajas",
      "Ventanas de trabajo acordadas con la operación",
      "Base para monitoreo, respaldo y soporte continuo",
    ],
    related: [
      { href: "/infraestructura-fisica/", label: "Infraestructura física" },
      { href: "/productos/servidores/", label: "Servidores" },
      { href: "/productos/redes/", label: "Redes" },
    ],
    complementary: [
      { href: "/servicios/levantamiento-y-diagnostico/", label: "Levantamiento" },
      { href: "/servicios/monitoreo/", label: "Monitoreo" },
    ],
    faqs: [
      {
        q: "¿Hay que reemplazar todo de una vez?",
        a: "No. El diseño parte de lo que ya funciona y prioriza lo que concentra riesgo. El plan se ejecuta por fases cuando el negocio lo exige.",
      },
      {
        q: "¿Incluye cableado?",
        a: "Si el diagnóstico lo requiere, el alcance cubre canalización, puntos, racks y certificación. Es un trabajo de obra técnica, no un extra decorativo.",
      },
    ],
    seoDesc:
      "Modernización de infraestructura tecnológica para empresas en República Dominicana: red, servidores, cableado e implementación con Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  {
    slug: "transformacion-digital",
    href: "/soluciones/transformacion-digital/",
    cluster: "soluciones",
    title: "Transformación digital",
    kicker: "Problema de negocio",
    lead: "Digitalizar no es comprar software. Es alinear procesos, identidades, datos y operación para que el trabajo fluya.",
    problem:
      "Las herramientas se acumulan —correo, archivos, tickets, ERP— sin un dueño claro. La gente vuelve a Excel y el riesgo queda en cuentas personales.",
    audience:
      "Direcciones que necesitan ordenar identidad, colaboración, procesos y soporte sobre una base que el equipo pueda usar.",
    signals: [
      "Cada área elige su herramienta y no hay directorio común",
      "Los archivos críticos viven en laptops o chats",
      "No hay un proceso de alta/baja de usuarios",
      "La gerencia no ve el costo real de licencias",
    ],
    scope: [
      "Mapa de procesos y de herramientas actuales",
      "Diseño de identidad, licenciamiento y adopción",
      "Integraciones razonables entre sistemas",
      "Capacitación y mesa de ayuda para sostener el cambio",
    ],
    process: integratorProcess,
    benefits: [
      "Menos islas de información",
      "Licencias y accesos con trazabilidad",
      "Un camino de adopción, no una entrega de usuarios y claves",
    ],
    related: [
      { href: "/productos/microsoft-365/", label: "Microsoft 365" },
      { href: "/productos/google-workspace/", label: "Google Workspace" },
      { href: "/soluciones/automatizacion-de-procesos/", label: "Automatización" },
    ],
    complementary: [
      { href: "/servicios/consultoria-tecnologica/", label: "Consultoría" },
      { href: "/servicios/capacitacion-y-adopcion/", label: "Adopción" },
    ],
    faqs: [
      {
        q: "¿Justech impone una plataforma?",
        a: "No. Se parte de lo que la organización ya usa y de las restricciones de cumplimiento. La recomendación se justifica por operación, no por moda.",
      },
    ],
    seoDesc:
      "Transformación digital para empresas en República Dominicana: procesos, licenciamiento, identidad y adopción con Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  {
    slug: "productividad-y-colaboracion",
    href: "/soluciones/productividad-y-colaboracion/",
    cluster: "soluciones",
    title: "Productividad y colaboración",
    kicker: "Problema de negocio",
    lead: "El trabajo híbrido exige la misma calidad de reunión, archivo y acceso dentro y fuera de la oficina.",
    problem:
      "Las reuniones fallan, los archivos se duplican y nadie sabe cuál es la versión válida. El problema se atribuye a “la red” cuando suele ser diseño de colaboración.",
    audience: "Equipos distribuidos, sucursales y direcciones que dependen de reuniones y documentos compartidos.",
    signals: [
      "Videollamadas inestables en salas o en casa",
      "Licencias de colaboración sin gobierno de grupos",
      "Salas de junta con cableado y audio improvisados",
      "No hay criterio de qué se guarda en la nube y qué no",
    ],
    scope: [
      "Diseño de tenancy, grupos y políticas de archivos",
      "Salas de videoconferencia y pantallas de colaboración",
      "Red inalámbrica y cableado de salas",
      "Adopción y soporte de primer nivel",
    ],
    process: integratorProcess,
    benefits: [
      "Una forma de trabajar, no cinco chats paralelos",
      "Salas que se pueden usar sin un técnico en la puerta",
      "Soporte cuando falla el dispositivo o la cuenta",
    ],
    related: [
      { href: "/productos/videoconferencia/", label: "Videoconferencia" },
      { href: "/productos/microsoft-365/", label: "Microsoft 365" },
      { href: "/soluciones/trabajo-hibrido/", label: "Trabajo híbrido" },
    ],
    complementary: [
      { href: "/servicios/instalacion-y-configuracion/", label: "Instalación" },
      { href: "/servicios/capacitacion-y-adopcion/", label: "Capacitación" },
    ],
    faqs: [
      {
        q: "¿Incluye el equipamiento de la sala?",
        a: "Puede incluir pantallas, audio, cámara, cableado y configuración. El alcance se cotiza según la sala y el software que ya tengan.",
      },
    ],
    seoDesc:
      "Productividad y colaboración empresarial en República Dominicana: Microsoft 365, Google Workspace y salas de videoconferencia con Justech SRL.",
    ctaHref: "/contacto/licenciamiento/",
    ctaLabel: "Consultar licenciamiento",
  },
  {
    slug: "continuidad-operacional",
    href: "/soluciones/continuidad-operacional/",
    cluster: "soluciones",
    title: "Continuidad operacional",
    kicker: "Problema de negocio",
    lead: "Detenerse no es una opción. La continuidad se diseña: energía, respaldo, red, restauraciones ensayadas y soporte con dueño.",
    problem:
      "Muchas empresas tienen un disco de backup y una UPS. Casi ninguna ha medido cuánto tarda en volver a operar ni quién ejecuta el plan un sábado.",
    audience: "Operaciones con cajas, sucursales, plantas o servicios que no pueden esperar al siguiente día hábil sin un plan.",
    signals: [
      "Apagones que apagan red, POS o comunicaciones",
      "Respaldos que nunca se han restaurado",
      "Un solo proveedor de enlace o un solo servidor",
      "El conocimiento está en una sola persona",
    ],
    scope: [
      "Análisis de puntos únicos de falla",
      "UPS, respaldo, replicación y pruebas de restore",
      "Documentación de arranque y de escalamiento",
      "Soporte y, cuando el contrato lo cubre, atención de emergencia",
    ],
    process: integratorProcess,
    benefits: [
      "Un plan que alguien puede ejecutar",
      "Energía y respaldo dimensionados al servicio, no al folleto",
      "Menos dependencia de héroes individuales",
    ],
    related: [
      { href: "/productos/ups/", label: "UPS y energía" },
      { href: "/productos/backup/", label: "Backup" },
      { href: "/servicios/respaldo-y-recuperacion/", label: "Recuperación" },
    ],
    complementary: [
      { href: "/servicios/servicios-administrados/", label: "Servicios administrados" },
      { href: "/servicios/soporte-tecnico/", label: "Soporte" },
    ],
    faqs: [
      {
        q: "¿Justech ofrece 24/7?",
        a: "El horario publicado de atención es lunes a viernes, 8:00–17:30. Cobertura fuera de ese horario solo si el contrato la establece.",
      },
    ],
    seoDesc:
      "Continuidad operacional para empresas en República Dominicana: respaldo, energía, recuperación y soporte con Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  {
    slug: "seguridad-y-proteccion",
    href: "/soluciones/seguridad-y-proteccion/",
    cluster: "soluciones",
    title: "Seguridad y protección",
    kicker: "Problema de negocio",
    lead: "Reducir exposición sin frenar la operación: identidad, endpoints, perímetro y copias que se puedan restaurar.",
    problem:
      "El antivirus en el laptop no es un programa de seguridad. Las cuentas compartidas, los firewalls en modo default y los respaldos sin prueba dejan la puerta abierta.",
    audience: "Empresas que manejan datos de clientes, sucursales o trabajo remoto y necesitan controles que el equipo pueda cumplir.",
    signals: [
      "Cuentas compartidas o sin MFA",
      "Equipos personales en la red corporativa sin criterio",
      "Firewall o Wi-Fi con configuración de fábrica",
      "Nadie sabe qué hacer ante un ransomware",
    ],
    scope: [
      "Endurecimiento de identidad y de endpoints",
      "Firewalls, segmentación y redes inalámbricas",
      "Respaldo inmutable o aislado según el diseño",
      "Respuesta inicial coordinada con el soporte de Justech",
    ],
    process: integratorProcess,
    benefits: [
      "Controles que la gente puede usar",
      "Menos superficie obvia (admin, RDP, Wi-Fi abierto)",
      "Un camino de recuperación, no solo de bloqueo",
    ],
    related: [
      { href: "/productos/firewalls/", label: "Firewalls" },
      { href: "/productos/endpoint/", label: "Endpoint management" },
      { href: "/productos/seguridad/", label: "Seguridad" },
    ],
    complementary: [
      { href: "/servicios/monitoreo/", label: "Monitoreo" },
      { href: "/servicios/consultoria-tecnologica/", label: "Consultoría" },
    ],
    faqs: [
      {
        q: "¿Es un SOC 24/7?",
        a: "No afirmamos un centro de operaciones propio las 24 horas. Diseñamos controles, monitoreo y escalamiento según el contrato.",
      },
    ],
    seoDesc:
      "Ciberseguridad empresarial en República Dominicana: identidad, endpoints, firewalls y respaldo con Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  {
    slug: "gestion-y-monitoreo",
    href: "/soluciones/gestion-y-monitoreo/",
    cluster: "soluciones",
    title: "Gestión y monitoreo tecnológico",
    kicker: "Problema de negocio",
    lead: "No se puede operar lo que no se ve. Inventario, alertas y un portal de casos evitan apagar incendios a ciegas.",
    problem:
      "Los equipos se descubren cuando fallan. No hay lista de garantías, de licencias ni de quién tiene qué laptop.",
    audience: "Operaciones que ya tienen un parque de equipos y necesitan visibilidad, no otra consola decorativa.",
    signals: [
      "Inventario en una hoja que nadie actualiza",
      "Alertas que nadie atiende, o ninguna alerta",
      "Garantías vencidas descubiertas en el momento del daño",
      "Tickets por WhatsApp sin historial",
    ],
    scope: [
      "Inventario de endpoints, red y contratos",
      "Monitoreo de servicios acordados",
      "Mesa de ayuda con portal de casos",
      "Informes de lo atendido, no de vanity metrics",
    ],
    process: integratorProcess,
    benefits: [
      "Saber qué hay en producción",
      "Escalar con contexto, no con capturas sueltas",
      "Base para mantenimiento y renovación",
    ],
    related: [
      { href: "/productos/endpoint/", label: "Endpoint management" },
      { href: "/servicios/monitoreo/", label: "Monitoreo" },
      { href: "/servicios/mesa-de-ayuda/", label: "Mesa de ayuda" },
    ],
    complementary: [
      { href: "/servicios/servicios-administrados/", label: "Servicios administrados" },
      { href: "/servicios/gestion-de-garantias/", label: "Garantías" },
    ],
    faqs: [
      {
        q: "¿Qué se monitorea?",
        a: "Lo que el alcance define: disponibilidad de enlaces, servidores, copias o endpoints. No prometemos visibilidad total del universo TI el primer día.",
      },
    ],
    seoDesc:
      "Gestión y monitoreo de TI para empresas en República Dominicana, con inventario, alertas y mesa de ayuda. Justech SRL.",
    ctaHref: "/contacto/servicio-administrado/",
    ctaLabel: "Hablar de servicio administrado",
  },
  {
    slug: "optimizacion-de-costos",
    href: "/soluciones/optimizacion-de-costos/",
    cluster: "soluciones",
    title: "Optimización de costos tecnológicos",
    kicker: "Problema de negocio",
    lead: "Pagar por lo que se usa, con trazabilidad: licencias huérfanas, equipos sobredimensionados y contratos que nadie revisa.",
    problem:
      "El gasto de TI se diluye entre tarjetas corporativas, renovaciones automáticas y compras de última hora. Nadie ve el total.",
    audience: "Finanzas y operaciones que necesitan ordenar licencias, hardware y soporte sin recortar a ciegas.",
    signals: [
      "Más licencias que usuarios activos",
      "Equipos de gama alta para tareas básicas, o al revés",
      "Varios proveedores para lo mismo",
      "Renovaciones que llegan como sorpresa",
    ],
    scope: [
      "Inventario de licencias y de parque",
      "Propuesta de derecho-sizing y de consolidación",
      "Renegociación de compras y de soporte",
      "Gobierno simple de altas y bajas",
    ],
    process: integratorProcess,
    benefits: [
      "Gasto alineado al uso real",
      "Menos renovaciones sorpresa",
      "Decisiones con inventario, no con intuición",
    ],
    related: [
      { href: "/productos/licencias/", label: "Licencias" },
      { href: "/servicios/consultoria-tecnologica/", label: "Consultoría" },
    ],
    complementary: [
      { href: "/servicios/gestion-de-garantias/", label: "Garantías" },
      { href: "/soluciones/gestion-y-monitoreo/", label: "Monitoreo" },
    ],
    faqs: [
      {
        q: "¿El ahorro está garantizado?",
        a: "No publicamos un porcentaje. El resultado depende del desperdicio real. Primero se mide; después se propone.",
      },
    ],
    seoDesc:
      "Optimización de costos de TI en República Dominicana: licencias, equipos y contratos con trazabilidad. Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  {
    slug: "trabajo-hibrido",
    href: "/soluciones/trabajo-hibrido/",
    cluster: "soluciones",
    title: "Trabajo híbrido",
    kicker: "Problema de negocio",
    lead: "Sucursales, remoto y sede con la misma calidad de acceso, seguridad y soporte.",
    problem:
      "La oficina funciona y la casa no —o al revés. VPN improvisada, Wi-Fi de sucursal saturado y laptops sin cifrado.",
    audience: "Empresas con personal en campo, varias sedes o esquemas mixtos de asistencia.",
    signals: [
      "El rendimiento “depende de si estás en la oficina”",
      "Accesos remotos compartidos o inseguros",
      "Sucursales con red de consumo",
      "Soporte que solo existe de forma presencial en sede",
    ],
    scope: [
      "Identidad, dispositivos y acceso remoto",
      "Red de sucursales y Wi-Fi corporativo",
      "Equipamiento portátil y periféricos",
      "Mesa de ayuda remota y presencial",
    ],
    process: integratorProcess,
    benefits: [
      "Misma experiencia de trabajo en sede y fuera",
      "Menos excepciones de seguridad “porque es remoto”",
      "Soporte que llega al usuario donde esté",
    ],
    related: [
      { href: "/soluciones/sucursales/", label: "Sucursales" },
      { href: "/productos/laptops/", label: "Laptops" },
      { href: "/infraestructura-fisica/redes-inalambricas/", label: "Wi-Fi" },
    ],
    complementary: [
      { href: "/servicios/soporte-tecnico/", label: "Soporte" },
      { href: "/soluciones/productividad-y-colaboracion/", label: "Colaboración" },
    ],
    faqs: [
      {
        q: "¿Instalan en sucursales fuera de Santo Domingo?",
        a: "La base es Santo Domingo. Proyectos en otras localidades se evalúan según alcance, desplazamiento y calendario. No publicamos una cobertura nacional sin confirmarla.",
      },
    ],
    seoDesc:
      "Trabajo híbrido para empresas en República Dominicana: sucursales, acceso remoto, laptops y soporte. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Solicitar proyecto",
  },
  {
    slug: "automatizacion-de-procesos",
    href: "/soluciones/automatizacion-de-procesos/",
    cluster: "soluciones",
    title: "Automatización de procesos",
    kicker: "Problema de negocio",
    lead: "Menos trabajo repetitivo y más control: flujos, integraciones y pruebas, sin teatro de “IA” vacío.",
    problem:
      "El equipo copia datos entre sistemas, arma reportes a mano y comete errores que luego el soporte debe deshacer.",
    audience: "Operaciones con procesos estables y sistemas que ya existen, donde el cuello de botella es la repetición.",
    signals: [
      "Las mismas tareas cada semana en hojas y correos",
      "Sistemas que no se hablan",
      "Errores de transcripción con impacto en clientes o nómina",
      "Nadie documentó el proceso; “está en la cabeza de alguien”",
    ],
    scope: [
      "Levantamiento del proceso real (no el del manual)",
      "Integración o flujo automatizado con responsables",
      "Pruebas y rollback",
      "Capacitación de quien opera el flujo",
    ],
    process: integratorProcess,
    benefits: [
      "Tiempo del equipo en excepciones, no en copiar",
      "Menos errores mecánicos",
      "Un proceso que se puede auditar",
    ],
    related: [
      { href: "/servicios/desarrollo-de-software/", label: "Integración" },
      { href: "/servicios/qa-y-automatizacion/", label: "QA" },
      { href: "/soluciones/datos-e-inteligencia-artificial/", label: "Datos" },
    ],
    complementary: [
      { href: "/servicios/consultoria-tecnologica/", label: "Consultoría" },
      { href: "/servicios/capacitacion-y-adopcion/", label: "Adopción" },
    ],
    faqs: [
      {
        q: "¿Hacen RPA o inteligencia artificial?",
        a: "Automatizamos cuando el proceso está claro y el retorno es operativo. No vendemos un robot genérico ni un chatbot como solución a un proceso inexistente.",
      },
    ],
    seoDesc:
      "Automatización de procesos empresariales en República Dominicana: integraciones, flujos y pruebas. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Solicitar proyecto",
  },
  {
    slug: "datos-e-inteligencia-artificial",
    href: "/soluciones/datos-e-inteligencia-artificial/",
    cluster: "soluciones",
    title: "Datos e inteligencia artificial",
    kicker: "Problema de negocio",
    lead: "Decisiones con información ordenada. Primero datos limpios y acceso; después modelos, si aportan.",
    problem:
      "Los reportes no coinciden entre áreas. Los datos están en laptops, y cualquier “IA” se construiría sobre arena.",
    audience: "Direcciones que necesitan un criterio único de cifras y, más adelante, automatizar análisis repetibles.",
    signals: [
      "Tres versiones del mismo KPI",
      "Extracciones manuales desde sistemas distintos",
      "Nadie es dueño de la calidad del dato",
      "Interés en IA sin un caso de uso concreto",
    ],
    scope: [
      "Inventario de fuentes y de definiciones",
      "Ordenamiento, acceso y respaldo de datos de negocio",
      "Tableros o extractos que operaciones pueda sostener",
      "Pilotos de automatización o de asistencia solo con dato fiable",
    ],
    process: integratorProcess,
    benefits: [
      "Una definición de las cifras que importan",
      "Menos discusiones sobre “cuál Excel es el bueno”",
      "Base honesta antes de hablar de modelos",
    ],
    related: [
      { href: "/soluciones/automatizacion-de-procesos/", label: "Automatización" },
      { href: "/productos/almacenamiento/", label: "Almacenamiento" },
    ],
    complementary: [
      { href: "/servicios/consultoria-tecnologica/", label: "Consultoría" },
      { href: "/servicios/desarrollo-de-software/", label: "Integración" },
    ],
    faqs: [
      {
        q: "¿Justech vende un producto de IA propio?",
        a: "No. Acompañamos el orden de los datos y, cuando hay un caso claro, la adopción de herramientas del ecosistema que el cliente ya usa o puede licenciar.",
      },
    ],
    seoDesc:
      "Datos e inteligencia artificial para empresas en República Dominicana: ordenamiento, reportes y adopción responsable. Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  {
    slug: "sucursales",
    href: "/soluciones/sucursales/",
    cluster: "soluciones",
    title: "Soluciones para sucursales",
    kicker: "Problema de negocio",
    lead: "La misma experiencia de red, identidad, impresión y soporte en cada punto de servicio.",
    problem:
      "Cada sucursal se armó con lo que había a mano. El estándar de la sede no existe en el resto de puntos.",
    audience: "Cadenas, clínicas, colegios, retail y oficinas con más de un sitio físico.",
    signals: [
      "Wi-Fi y caja distintos en cada local",
      "Aperturas de sucursal improvisadas a última hora",
      "El técnico de sede viaja para cambios simples",
      "No hay un “kit” de sucursal documentado",
    ],
    scope: [
      "Estándar de sucursal: red, energía, impresión, colaboración",
      "Cableado y Wi-Fi del local",
      "Identidad y equipos del personal de piso",
      "Soporte remoto y visitas planificadas",
    ],
    process: integratorProcess,
    benefits: [
      "Aperturas repetibles",
      "Menos excepciones por local",
      "Soporte con inventario por sucursal",
    ],
    related: [
      { href: "/infraestructura-fisica/cableado-estructurado/", label: "Cableado" },
      { href: "/infraestructura-fisica/redes-inalambricas/", label: "Wi-Fi" },
      { href: "/soluciones/trabajo-hibrido/", label: "Trabajo híbrido" },
    ],
    complementary: [
      { href: "/servicios/instalacion-y-configuracion/", label: "Instalación" },
      { href: "/contacto/levantamiento/", label: "Levantamiento" },
    ],
    faqs: [
      {
        q: "¿Hacen el local completo, incluyendo CCTV?",
        a: "Publicamos cableado, red, energía y TI. Seguridad física (CCTV, control de acceso) solo se ofrece cuando esté confirmada como servicio directo.",
      },
    ],
    seoDesc:
      "Tecnología para sucursales en República Dominicana: red, cableado, equipos y soporte estándar por local. Justech SRL.",
    ctaHref: "/contacto/levantamiento/",
    ctaLabel: "Solicitar levantamiento",
  },
  {
    slug: "proyectos-llave-en-mano",
    href: "/soluciones/proyectos-llave-en-mano/",
    cluster: "soluciones",
    title: "Proyectos tecnológicos llave en mano",
    kicker: "Problema de negocio",
    lead: "Un responsable, de la evaluación a la operación: diseño, compra, cableado, configuración y soporte.",
    problem:
      "El cliente coordina a tres proveedores que no se hablan. El servidor llega antes que el rack; las licencias, antes que las cuentas.",
    audience: "Organizaciones que quieren un interlocutor para un proyecto con fecha, no una colección de cotizaciones.",
    signals: [
      "Varios proveedores sin un integrador",
      "Fechas de mudanza, apertura o auditoría ya fijadas",
      "Alcance mezclado entre obra civil y TI",
      "Nadie documenta la entrega",
    ],
    scope: [
      "Dirección del proyecto y de proveedores involucrados",
      "Diseño, suministro, implementación y cableado",
      "Pruebas, capacitación y acta de entrega",
      "Paso a soporte o a servicio administrado",
    ],
    process: cycle,
    benefits: [
      "Una línea de responsabilidad",
      "Secuencia de compras alineada a la instalación",
      "Documentación para operar el día después",
    ],
    related: [
      { href: "/servicios/gestion-de-proyectos/", label: "Gestión de proyectos" },
      { href: "/infraestructura-fisica/", label: "Infraestructura física" },
    ],
    complementary: [
      { href: "/servicios/implementacion-y-migraciones/", label: "Implementación" },
      { href: "/servicios/servicios-administrados/", label: "Operación" },
    ],
    faqs: [
      {
        q: "¿Justech sustituye al contratista de obra civil?",
        a: "No. Coordinamos la parte tecnológica y las interferencias (canalización, energía, racks) con quien ejecute la obra.",
      },
    ],
    seoDesc:
      "Proyectos tecnológicos llave en mano en República Dominicana: diseño, suministro, implementación y soporte. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Solicitar proyecto",
  },
  {
    slug: "software-y-licenciamiento",
    href: "/soluciones/software-y-licenciamiento/",
    cluster: "soluciones",
    title: "Software y licenciamiento",
    kicker: "Problema de negocio",
    lead: "Licencias alineadas a usuarios reales, con implementación y soporte —no una clave en un correo.",
    problem:
      "Se renueva de oído. Hay productos instalados sin contrato y contratos sin usuarios activos.",
    audience: "Empresas que necesitan Microsoft 365, Google Workspace u otro software de productividad y seguridad con gobierno.",
    signals: [
      "Usuarios que se fueron y siguen licenciados",
      "Mezcla de cuentas personales y corporativas",
      "Nadie administra el tenant",
      "Compras por tarjeta sin centro de costo",
    ],
    scope: [
      "Diagnóstico de tenancy y de puestos",
      "Cotización y provisión de licencias",
      "Configuración, migración de correo/archivos y adopción",
      "Soporte de identidad y de aplicaciones cubiertas",
    ],
    process: integratorProcess,
    benefits: [
      "Puestos que coinciden con personas",
      "Menos riesgo de cuentas huérfanas",
      "Un interlocutor para compra y para operación",
    ],
    related: [
      { href: "/productos/microsoft-365/", label: "Microsoft 365" },
      { href: "/productos/google-workspace/", label: "Google Workspace" },
      { href: "/productos/licencias/", label: "Licencias" },
    ],
    complementary: [
      { href: "/servicios/capacitacion-y-adopcion/", label: "Adopción" },
      { href: "/contacto/licenciamiento/", label: "Consultar licencias" },
    ],
    faqs: [
      {
        q: "¿Son partners oficiales?",
        a: "Justech comercializa e implementa software empresarial. Los niveles de partnership se publicarán cuando existan documentos vigentes. Mientras tanto no usamos el sello de “partner oficial”.",
      },
    ],
    seoDesc:
      "Licencias Microsoft 365, Google Workspace y software empresarial en República Dominicana, con implementación. Justech SRL.",
    ctaHref: "/contacto/licenciamiento/",
    ctaLabel: "Consultar licenciamiento",
  },
  {
    slug: "equipamiento-empresarial",
    href: "/soluciones/equipamiento-empresarial/",
    cluster: "soluciones",
    title: "Equipamiento empresarial",
    kicker: "Problema de negocio",
    lead: "Estaciones, laptops, servidores y red con criterio de uso —catálogo consultivo, no un carrito.",
    problem:
      "Se compra el modelo de oferta. A los seis meses no corre el sistema de la empresa o no hay garantía local clara.",
    audience: "Compras y TI que necesitan parque coherente, garantías y puesta en marcha.",
    signals: [
      "Flota heterogénea imposible de soportar",
      "Compras individuales por cada gerencia",
      "Equipos sin imagen, cifrado ni inventario",
      "Servidores o switches elegidos por precio de lista",
    ],
    scope: [
      "Especificación según carga de trabajo",
      "Suministro B2B y logística acordada",
      "Imagen, configuración y etiquetado",
      "Gestión de garantía y de reemplazo",
    ],
    process: integratorProcess,
    benefits: [
      "Parque que el soporte puede atender",
      "Menos excepciones de hardware",
      "Entrega lista para trabajar, no una caja en recepción",
    ],
    related: [
      { href: "/productos/", label: "Catálogo de productos" },
      { href: "/servicios/gestion-de-garantias/", label: "Garantías" },
    ],
    complementary: [
      { href: "/contacto/cotizacion/", label: "Cotizar equipos" },
      { href: "/servicios/instalacion-y-configuracion/", label: "Configuración" },
    ],
    faqs: [
      {
        q: "¿Hay precios en el sitio?",
        a: "No. Es un catálogo consultivo. La cotización depende de disponibilidad, cantidad, garantía y servicios de puesta en marcha.",
      },
    ],
    seoDesc:
      "Venta de equipos tecnológicos para empresas en República Dominicana: estaciones, laptops, servidores y redes. Justech SRL.",
    ctaHref: "/contacto/cotizacion/",
    ctaLabel: "Solicitar cotización",
  },
];

const serviceBodies: Record<
  string,
  Pick<Capability, "lead" | "problem" | "audience" | "signals" | "scope" | "benefits" | "faqs" | "seoDesc" | "ctaHref" | "ctaLabel" | "related" | "complementary">
> = {
  "consultoria-tecnologica": {
    lead: "Una opinión técnica con consecuencias operativas: qué hacer, qué no comprar y en qué orden.",
    problem: "Las decisiones se toman por catálogo o por el proveedor del momento, sin un criterio de riesgo y de costo total.",
    audience: "Gerencias que necesitan un interlocutor para armar un plan, no una cotización suelta.",
    signals: ["Hay varias propuestas incompatibles", "El proyecto no tiene dueño interno", "Se mezcla urgencia con estrategia"],
    scope: ["Entrevistas y levantamiento", "Opciones con pros, contras y dependencias", "Hoja de ruta y siguientes compras"],
    benefits: ["Decisiones documentadas", "Menos compras revertidas"],
    related: [{ href: "/servicios/levantamiento-y-diagnostico/", label: "Diagnóstico" }],
    complementary: [{ href: "/servicios/diseno-de-soluciones/", label: "Diseño" }],
    faqs: [{ q: "¿La consultoría obliga a comprar con Justech?", a: "No. El entregable es el plan. La ejecución puede seguir con Justech si así se acuerda." }],
    seoDesc: "Consultoría tecnológica empresarial en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  "levantamiento-y-diagnostico": {
    lead: "Ver el sitio, el rack, las cuentas y los puntos únicos de falla antes de cotizar.",
    problem: "Se presupuestan puntos de red o servidores sin pisar el lugar ni revisar el tenant.",
    audience: "Proyectos de cableado, modernización o soporte que necesitan una foto real del entorno.",
    signals: ["Planos desactualizados", "Nadie abre el gabinete hace meses", "El inventario no coincide con lo instalado"],
    scope: ["Visita o sesión remota estructurada", "Hallazgos priorizados", "Insumo para diseño y presupuesto"],
    benefits: ["Presupuestos con menos sorpresas", "Prioridad por riesgo, no por catálogo"],
    related: [{ href: "/infraestructura-fisica/levantamiento/", label: "Levantamiento de redes" }],
    complementary: [{ href: "/contacto/levantamiento/", label: "Solicitar visita" }],
    faqs: [{ q: "¿El levantamiento tiene costo?", a: "Depende del sitio y de la profundidad. Se informa antes de agendar. En este entorno de prueba el formulario no genera un cobro." }],
    seoDesc: "Levantamiento y diagnóstico de TI y redes para empresas en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  "diseno-de-soluciones": {
    lead: "Topología, identidades, racks y crecimiento: el plano que la instalación va a ejecutar.",
    problem: "Se instala sin un diseño. Cada técnico improvisa y el siguiente no entiende el entorno.",
    audience: "Proyectos con más de un oficio (red, servidores, licencias, cableado).",
    signals: ["No hay diagrama lógico", "El gabinete no tiene espacio de crecimiento", "Las VLANs o los SSIDs se inventaron sobre la marcha"],
    scope: ["Arquitectura lógica y física", "Lista de materiales y de licencias", "Criterios de aceptación"],
    benefits: ["Instalación repetible", "Menos retrabajo"],
    related: [{ href: "/soluciones/proyectos-llave-en-mano/", label: "Llave en mano" }],
    complementary: [{ href: "/servicios/gestion-de-proyectos/", label: "Proyecto" }],
    faqs: [{ q: "¿Entregan planos?", a: "El diseño incluye diagramas y listas. El detalle de certificación y etiquetado se entrega en proyectos de infraestructura física." }],
    seoDesc: "Diseño de soluciones tecnológicas e infraestructura para empresas. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Solicitar proyecto",
  },
  "implementacion-y-migraciones": {
    lead: "Puesta en marcha que la operación puede sostener: ventanas, rollback y comunicación al usuario.",
    problem: "La migración se hace un viernes sin plan B. El lunes nadie entra al correo.",
    audience: "Cambios de tenant, servidores, controladores o sitios de red.",
    signals: ["Fecha de corte ya anunciada", "Sistemas legacy sin dueño", "Usuarios que no toleran una mañana caída"],
    scope: ["Plan de oleadas", "Migración de identidades, correo o cargas", "Pruebas y soporte hiper-cuidado post-corte"],
    benefits: ["Corte con dueño", "Usuarios informados", "Vuelta atrás pensada"],
    related: [{ href: "/soluciones/software-y-licenciamiento/", label: "Licenciamiento" }],
    complementary: [{ href: "/servicios/qa-y-automatizacion/", label: "Pruebas" }],
    faqs: [{ q: "¿Migran correo y archivos?", a: "Sí, cuando el alcance lo incluye (por ejemplo Microsoft 365 o Google Workspace). El volumen y las excepciones se miden en el diagnóstico." }],
    seoDesc: "Implementación y migraciones tecnológicas para empresas en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Solicitar proyecto",
  },
  "gestion-de-proyectos": {
    lead: "Calendario, dependencias y responsables: para que el rack, las licencias y la obra coincidan.",
    problem: "El hardware llega y el sitio no está listo. O al revés.",
    audience: "Proyectos con fecha de mudanza, apertura o auditoría.",
    signals: ["Varios frentes en paralelo", "Compras internacionales con lead time", "Usuarios finales no enterados"],
    scope: ["Plan, hitos y riesgos", "Coordinación de oficios", "Acta de entrega"],
    benefits: ["Menos tiempo muerto entre compras e instalación"],
    related: [{ href: "/soluciones/proyectos-llave-en-mano/", label: "Llave en mano" }],
    complementary: [{ href: "/servicios/implementacion-y-migraciones/", label: "Implementación" }],
    faqs: [{ q: "¿Usan una metodología propietaria?", a: "Usamos un ciclo simple y visible: estrategia, aprovisionamiento, implementación, operación y mejora." }],
    seoDesc: "Gestión de proyectos tecnológicos en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Solicitar proyecto",
  },
  "soporte-tecnico": {
    lead: "Incidencias con dueño, horario publicado y un portal propio. N1 a N3 según el contrato.",
    problem: "El soporte es un chat informal. No hay historial, ni prioridad, ni quién cierra el caso.",
    audience: "Organizaciones que ya operan con Justech o que quieren un canal formal de atención.",
    signals: ["Todo llega por WhatsApp", "El mismo incidente se reporta tres veces", "Nadie mide tiempos"],
    scope: ["Portal de casos", "Atención remota y presencial acordada", "Escalamiento N1–N3", "Comunicación al reportante"],
    benefits: ["Un hilo por incidente", "Horario y canales claros", "Menos conocimiento atrapado en chats"],
    related: [{ href: "/soporte/", label: "Portal de soporte" }, { href: "/servicios/mesa-de-ayuda/", label: "Mesa de ayuda" }],
    complementary: [{ href: "/servicios/servicios-administrados/", label: "Servicios administrados" }],
    faqs: [
      {
        q: "¿Cuál es el horario?",
        a: "Lunes a viernes, 8:00–17:30, hora de República Dominicana. Emergencias fuera de horario solo si el contrato lo establece.",
      },
    ],
    seoDesc: "Soporte técnico empresarial en República Dominicana, con portal de tickets. Justech SRL.",
    ctaHref: "/contacto/soporte/",
    ctaLabel: "Contratar soporte",
  },
  "mesa-de-ayuda": {
    lead: "Un frente para el usuario: contraseñas, periféricos, cuentas y derivación cuando el caso es de infraestructura.",
    problem: "El usuario no sabe a quién escribir. TI interna se convierte en pasillo.",
    audience: "Empresas que quieren un N1 organizado, propio o en implant.",
    signals: ["Cola informal de favores", "Usuarios repetidores sin guía", "TI senior resolviendo bloqueos de impresora"],
    scope: ["Recepción y clasificación", "Resolución N1", "Derivación con contexto", "Base de conocimiento viva"],
    benefits: ["TI especializada en lo que exige especialización"],
    related: [{ href: "/servicios/soporte-tecnico/", label: "Soporte" }],
    complementary: [{ href: "/servicios/outsourcing-e-implants/", label: "Implants" }],
    faqs: [{ q: "¿La mesa es 24/7?", a: "El horario publicado es hábil diurno. Turnos extendidos se acuerdan por contrato, no se publican como regla." }],
    seoDesc: "Mesa de ayuda TI para empresas en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/soporte/",
    ctaLabel: "Contratar soporte",
  },
  "servicios-administrados": {
    lead: "Operar el entorno con rutinas: parches, copias, monitoreo y un interlocutor, no un técnico ocasional.",
    problem: "Todo es reactivo. Los parches y las copias dependen de que alguien se acuerde.",
    audience: "Empresas sin un equipo TI completo o que quieren complementar al interno.",
    signals: ["Parches atrasados", "Copias sin prueba", "Inventario desconocido", "Cansancio del recurso interno"],
    scope: ["Rutinas acordadas (parches, copias, revisión)", "Monitoreo del perímetro definido", "Informe de lo ejecutado", "Mejoras priorizadas"],
    benefits: ["Menos sorpresas", "Un ritmo de higiene tecnológica"],
    related: [{ href: "/soluciones/gestion-y-monitoreo/", label: "Monitoreo" }],
    complementary: [{ href: "/contacto/servicio-administrado/", label: "Solicitar MSP" }],
    faqs: [{ q: "¿Sustituyen al gerente de TI?", a: "No necesariamente. El servicio se puede diseñar como complemento o como operación cotidiana, con un responsable del cliente." }],
    seoDesc: "Servicios administrados de TI para empresas en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/servicio-administrado/",
    ctaLabel: "Solicitar servicio administrado",
  },
  "outsourcing-e-implants": {
    lead: "Un profesional de Justech en su operación, con respaldo del equipo y del portal de casos.",
    problem: "Se contrata a una persona suelta. Cuando falta, el conocimiento se va con ella.",
    audience: "Empresas que necesitan presencia en sitio con un proveedor detrás.",
    signals: ["Vacante TI difícil de cubrir", "Picos de carga (aperturas, cierres, auditorías)", "Quieren continuidad si la persona no está"],
    scope: ["Perfil y horario acordados", "Presencia en sitio o mixta", "Escalamiento a N2/N3 de Justech", "Reportes al responsable del cliente"],
    benefits: ["Cara visible + equipo detrás"],
    related: [{ href: "/servicios/soporte-tecnico/", label: "Soporte" }],
    complementary: [{ href: "/servicios/mesa-de-ayuda/", label: "Mesa de ayuda" }],
    faqs: [{ q: "¿El implant es empleado del cliente?", a: "Es un servicio de Justech, con las condiciones laborales y de confidencialidad que se firmen. El detalle se acuerda caso a caso." }],
    seoDesc: "Outsourcing e implants de TI en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/soporte/",
    ctaLabel: "Hablar de implants",
  },
  mantenimiento: {
    lead: "Preventivo y correctivo: limpiezas, firmware, recambios y visitas antes de que el polvo apague el rack.",
    problem: "El mantenimiento es “cuando se dañe”. Los filtros, las UPS y los APs se olvidan.",
    audience: "Sitios con cuarto técnico, flota de PCs o red que ya está en producción.",
    signals: ["Ruidos, calor o alertas de UPS", "Equipos sin firmware reciente", "Garantías a punto de vencer"],
    scope: ["Rondas preventivas", "Correctivo con repuestos acordados", "Registro de lo hecho"],
    benefits: ["Menos fallas evitables", "Historial del activo"],
    related: [{ href: "/infraestructura-fisica/mantenimiento/", label: "Infraestructura" }],
    complementary: [{ href: "/servicios/gestion-de-garantias/", label: "Garantías" }],
    faqs: [{ q: "¿Incluye piezas?", a: "Las piezas se cotizan o se cubren por garantía del fabricante. El contrato aclara qué es mano de obra y qué es material." }],
    seoDesc: "Mantenimiento preventivo y correctivo de equipos e infraestructura. Justech SRL.",
    ctaHref: "/contacto/soporte/",
    ctaLabel: "Contratar mantenimiento",
  },
  "instalacion-y-configuracion": {
    lead: "Del empaque al puesto de trabajo: imagen, dominio, impresión, Wi-Fi y prueba de usuario.",
    problem: "Las cajas se entregan en recepción. Cada quien se instala como puede.",
    audience: "Compras de equipos, aperturas y refrescos de flota.",
    signals: ["Laptops sin cifrado", "Impresoras en modo default", "Usuarios que tardan días en quedar productivos"],
    scope: ["Desempaque e inventario", "Imagen y políticas", "Conectividad y periféricos", "Entrega al usuario"],
    benefits: ["Puesto listo", "Activo etiquetado"],
    related: [{ href: "/productos/", label: "Productos" }],
    complementary: [{ href: "/contacto/cotizacion/", label: "Cotizar" }],
    faqs: [{ q: "¿Instalan en casa del colaborador?", a: "Se puede acordar logística de envío y configuración remota o en sitio. El alcance se define en la orden." }],
    seoDesc: "Instalación y configuración de equipos empresariales en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/cotizacion/",
    ctaLabel: "Solicitar cotización",
  },
  "respaldo-y-recuperacion": {
    lead: "Copias que se restauran. Política, medio, prueba y un runbook para el día malo.",
    problem: "Hay un disco en un cajón. Nadie sabe la fecha de la última copia buena.",
    audience: "Cualquier operación cuyo dato no quepa en “lo siento, se perdió”.",
    signals: ["Una sola copia local", "No hay restore test", "Ransomware es un tema tabú"],
    scope: ["Diseño 3-2-1 o equivalente razonable", "Implementación", "Prueba de restore", "Instrucciones de recuperación"],
    benefits: ["Saber cuánto tarda volver", "Copias fuera del mismo incidente"],
    related: [{ href: "/productos/backup/", label: "Backup" }],
    complementary: [{ href: "/soluciones/continuidad-operacional/", label: "Continuidad" }],
    faqs: [{ q: "¿Garantizan RPO/RTO numéricos?", a: "Los objetivos se acuerdan por contrato después de medir. No publicamos un RTO universal." }],
    seoDesc: "Respaldo y recuperación de datos para empresas en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  },
  monitoreo: {
    lead: "Alertas con dueño: disponibilidad de lo acordado, no un mar de ruido.",
    problem: "O no hay monitoreo, o hay mil correos que nadie lee.",
    audience: "Entornos con servidores, enlaces, copias o sedes que deben avisarse temprano.",
    signals: ["El cliente se entera por el usuario", "Herramientas instaladas y abandonadas"],
    scope: ["Definir qué importa", "Instalar o conectar el sensor", "Ruta de escalamiento en horario acordado"],
    benefits: ["Menos tiempo ciego"],
    related: [{ href: "/soluciones/gestion-y-monitoreo/", label: "Gestión" }],
    complementary: [{ href: "/servicios/servicios-administrados/", label: "MSP" }],
    faqs: [{ q: "¿Monitorean 24/7 con un NOC propio?", a: "No afirmamos un NOC 24/7. El monitoreo y la atención se acotan al contrato." }],
    seoDesc: "Monitoreo de infraestructura y servicios TI para empresas. Justech SRL.",
    ctaHref: "/contacto/servicio-administrado/",
    ctaLabel: "Hablar de monitoreo",
  },
  "capacitacion-y-adopcion": {
    lead: "Que la gente use lo que se compró: sesiones, guías cortas y acompañamiento post-marcha.",
    problem: "Se entrega el tenant y se espera que “ya saben Office”.",
    audience: "Migraciones de colaboración, nuevas salas o cambios de proceso.",
    signals: ["Baja adopción", "Cuentas creadas y nunca usadas", "Jefes pidiendo ‘una charla’ el día del corte"],
    scope: ["Mapa de públicos", "Sesiones y materiales", "Canal de dudas en los primeros días"],
    benefits: ["Menos rechazos", "Menos tickets de “¿dónde quedó mi archivo?”"],
    related: [{ href: "/soluciones/productividad-y-colaboracion/", label: "Colaboración" }],
    complementary: [{ href: "/servicios/implementacion-y-migraciones/", label: "Migración" }],
    faqs: [{ q: "¿Es una academia?", a: "No. Es adopción ligada a un proyecto concreto, no un catálogo de cursos abiertos." }],
    seoDesc: "Capacitación y adopción de herramientas empresariales. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Incluir adopción",
  },
  "desarrollo-de-software": {
    lead: "Integraciones y desarrollos a la medida cuando el proceso ya está claro —no una fábrica de apps genéricas.",
    problem: "Se pide “una app” para tapar un proceso inexistente o un Excel que nadie gobernó.",
    audience: "Organizaciones con sistemas que deben hablarse o con un flujo estable que merece un desarrollo.",
    signals: ["Doble captura", "APIs disponibles pero sin uso", "Un Excel que ya es un sistema"],
    scope: ["Alcance y criterios de aceptación", "Desarrollo o integración", "Pruebas, entrega y soporte inicial"],
    benefits: ["Menos pegamento humano entre sistemas"],
    related: [{ href: "/soluciones/automatizacion-de-procesos/", label: "Automatización" }],
    complementary: [{ href: "/servicios/qa-y-automatizacion/", label: "QA" }],
    faqs: [{ q: "¿Hacen productos masivos?", a: "El foco es integración y desarrollos ligados a la operación del cliente, con alcance cerrado." }],
    seoDesc: "Desarrollo e integración de software para empresas en República Dominicana. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Solicitar proyecto",
  },
  "qa-y-automatizacion": {
    lead: "Probar antes de que el usuario encuentre el error: scripts, casos y criterios de aceptación.",
    problem: "El corte se hace y se descubre en producción que el flujo crítico no corre.",
    audience: "Migraciones, desarrollos e integraciones con riesgo de negocio.",
    signals: ["No hay ambiente de pruebas", "El usuario es el tester", "Regresiones cada vez que se cambia algo"],
    scope: ["Plan de pruebas", "Ejecución manual o automatizada", "Informe de defectos y de go/no-go"],
    benefits: ["Menos cortes a ciegas"],
    related: [{ href: "/servicios/implementacion-y-migraciones/", label: "Implementación" }],
    complementary: [{ href: "/servicios/desarrollo-de-software/", label: "Desarrollo" }],
    faqs: [{ q: "¿Automatizan todo?", a: "Se automatiza lo repetible. Lo exploratorio y lo de negocio se prueba con criterio, no con teatro de cobertura al 100%." }],
    seoDesc: "QA y pruebas para proyectos tecnológicos empresariales. Justech SRL.",
    ctaHref: "/contacto/proyecto/",
    ctaLabel: "Incluir QA",
  },
  "gestion-de-garantias": {
    lead: "Que el RMA no sea una odisea: inventario, vigencia y coordinación con el canal.",
    problem: "El equipo falla y nadie tiene factura, serial ni vigencia.",
    audience: "Parques con laptops, servidores, UPS o impresión bajo garantía de fabricante.",
    signals: ["Seriales no registrados", "Equipos mezclados de varios compradores", "Tiempo perdido armando el expediente"],
    scope: ["Registro de activos y de vigencia", "Diagnóstico de cobertura", "Coordinación de RMA y de equipo de reemplazo si se acordó"],
    benefits: ["Menos tiempo administrativo en el momento del daño"],
    related: [{ href: "/productos/", label: "Equipos" }],
    complementary: [{ href: "/servicios/mantenimiento/", label: "Mantenimiento" }],
    faqs: [{ q: "¿Justech fabrica los equipos?", a: "No. Gestionamos la garantía del fabricante o del canal según el documento de compra." }],
    seoDesc: "Gestión de garantías de equipos empresariales. Justech SRL.",
    ctaHref: "/contacto/soporte/",
    ctaLabel: "Hablar de garantías",
  },
};

export const serviceCaps: Capability[] = services.map((s) => {
  const slug = slugFromHref(s.href);
  const body = serviceBodies[slug];
  if (!body) {
    throw new Error(`Falta copy de servicio: ${slug}`);
  }
  return {
    slug,
    href: s.href,
    cluster: "servicios",
    title: s.label,
    kicker: "Servicio",
    process: integratorProcess,
    ...body,
  };
});

function productCap(
  slug: string,
  title: string,
  problem: string,
  audience: string,
  signals: string[],
  extraRelated: LinkRef[] = [],
): Capability {
  return {
    slug,
    href: `/productos/${slug}/`,
    cluster: "productos",
    title,
    kicker: "Catálogo consultivo",
    lead: `${title} para entornos empresariales, con especificación, suministro y puesta en marcha —sin carrito ni precio de lista.`,
    problem,
    audience,
    signals,
    scope: [
      `Especificación de ${title.toLowerCase()} según la carga de trabajo`,
      "Cotización B2B según disponibilidad y garantía",
      "Instalación o configuración cuando el alcance lo incluye",
      "Inventario y soporte posterior",
    ],
    process: ["Uso y restricciones", "Alternativas técnicas", "Cotización", "Entrega", "Configuración y soporte"],
    benefits: ["Equipo o licencia alineados al uso", "Un interlocutor para compra y para incidentes", "Menos compras de escaparate"],
    related: extraRelated,
    complementary: [
      { href: "/contacto/cotizacion/", label: "Solicitar cotización" },
      { href: "/contacto/", label: "Hablar con un especialista" },
      { href: "/soluciones/proyectos-llave-en-mano/", label: "Diseñar una solución" },
    ],
    faqs: [
      {
        q: "¿Por qué no hay precios?",
        a: "Porque dependen de cantidad, vigencia, garantía, tipo de cambio y servicios de instalación. El canal es cotización, no e-commerce.",
      },
    ],
    seoDesc: `${title} para empresas en República Dominicana. Catálogo consultivo B2B de Justech SRL.`,
    ctaHref: "/contacto/cotizacion/",
    ctaLabel: "Solicitar cotización",
  };
}

export const productCaps: Capability[] = [
  productCap("estaciones-de-trabajo", "Computadoras y estaciones de trabajo", "Se compran PCs de consumo para cargas que piden estabilidad, gestión y garantía comercial.", "Áreas administrativas, diseño, cajas y back-office.", ["Equipos heterogéneos", "Sin imagen corporativa", "Garantía de mostrador"], [{ href: "/productos/laptops/", label: "Laptops" }]),
  productCap("laptops", "Laptops", "La flota se arma por oferta. Autonomía, teclado y soporte de piezas no se pensaron.", "Trabajo híbrido, campo y direcciones.", ["Modelos únicos imposibles de reemplazar", "Sin cifrado"], [{ href: "/soluciones/trabajo-hibrido/", label: "Trabajo híbrido" }]),
  productCap("servidores", "Servidores", "El servidor se eligió por el precio del chasis, no por la carga, las copias ni la energía.", "Sedes con aplicaciones internas, archivos o virtualización.", ["Un solo equipo crítico", "Sin contrato de partes"], [{ href: "/productos/almacenamiento/", label: "Almacenamiento" }, { href: "/productos/ups/", label: "UPS" }]),
  productCap("almacenamiento", "Almacenamiento", "Los archivos crecen en discos sueltos. No hay cuotas, ni copias, ni un dueño.", "Archivos departamentales, CCTV interno de TI o respaldos.", ["Discos USB como “servidor”", "Volúmenes llenos sin aviso"], [{ href: "/productos/backup/", label: "Backup" }]),
  productCap("impresion", "Impresión", "Cada área compra su impresora. No hay cuentas, ni tóner gobernado, ni red de impresión.", "Oficinas y sucursales con volumen de documentos.", ["Costos de consumible invisibles", "Equipos domésticos en red"], [{ href: "/soluciones/sucursales/", label: "Sucursales" }]),
  productCap("accesorios", "Accesorios", "Periféricos incompatibles o de consumo que el soporte no puede estandarizar.", "Estaciones, salas y campo.", ["Cables y docks distintos por persona"], [{ href: "/productos/estaciones-de-trabajo/", label: "Estaciones" }]),
  productCap("redes", "Redes y conectividad", "La red creció por parches. No hay diagrama ni segmentación.", "Cualquier sitio con más de un switch o un AP.", ["Bucles", "Wi-Fi de casa", "Sin VLAN"], [{ href: "/infraestructura-fisica/", label: "Cableado" }]),
  productCap("switches", "Switches", "Switches no gestionables en el núcleo, o un core sin recambio.", "Cuartos técnicos y gabinetes de piso.", ["Sin stacking ni uplink claro"], [{ href: "/productos/redes/", label: "Redes" }]),
  productCap("routers", "Routers", "El enlace entra a un router de consumo o a un equipo sin respaldo de configuración.", "Bordes de sede y sucursal.", ["Un solo WAN", "Configuración sin backup"], [{ href: "/productos/firewalls/", label: "Firewalls" }]),
  productCap("firewalls", "Firewalls", "El perímetro es el router del ISP. Las reglas las conoce una sola persona.", "Sedes que exponen servicios o VPN.", ["Admin por defecto", "Sin alta disponibilidad cuando el negocio la pide"], [{ href: "/soluciones/seguridad-y-proteccion/", label: "Seguridad" }]),
  productCap("access-points", "Access points", "APs domésticos, canales pisados y un SSID para invitados y finanzas.", "Oficinas, aulas, retail y bodegas.", ["Zonas muertas", "Sin controlador ni inventario"], [{ href: "/infraestructura-fisica/redes-inalambricas/", label: "Wi-Fi" }]),
  productCap("ups", "UPS y energía", "La UPS está subdimensionada o las baterías tienen años. El apagón apaga el core.", "Racks, POS y comunicaciones.", ["Autonomía desconocida", "Sin mantenimiento de baterías"], [{ href: "/soluciones/continuidad-operacional/", label: "Continuidad" }]),
  productCap("licencias", "Licencias de software", "Claves reenviadas por correo, sin tenant ni inventario de puestos.", "Productividad, seguridad y diseño.", ["Más puestos que personas"], [{ href: "/productos/microsoft-365/", label: "Microsoft 365" }]),
  productCap("microsoft-365", "Microsoft 365", "Cuentas personales de Outlook, o un tenant sin MFA ni gobierno de grupos.", "Organizaciones sobre ecosistema Microsoft.", ["Licencias Exchange sueltas", "Archivos en PCs"], [{ href: "/tecnologias/microsoft/", label: "Microsoft" }]),
  productCap("google-workspace", "Google Workspace", "El dominio no está verificado o convive con Gmail personal.", "Equipos que ya colaboran en Google.", ["Unidades compartidas sin dueño"], [{ href: "/tecnologias/google/", label: "Google" }]),
  productCap("cloud", "Soluciones cloud", "Cargas en cuentas personales o en un proveedor sin respaldo ni identidad corporativa.", "Correo, archivos, copias o infraestructura según el caso.", ["Tarjeta de un empleado pagando la nube"], [{ href: "/tecnologias/aws/", label: "AWS" }]),
  productCap("endpoint", "Endpoint management", "Los laptops son islas. Parches, cifrado e inventario no existen.", "Flotas Windows o mixtas.", ["Software pirata o desactualizado"], [{ href: "/tecnologias/action1/", label: "Action1" }]),
  productCap("backup", "Backup", "Una copia local al mismo ransomware. O ninguna.", "Servidores, SaaS y endpoints.", ["No hay restore test"], [{ href: "/servicios/respaldo-y-recuperacion/", label: "Recuperación" }]),
  productCap("videoconferencia", "Videoconferencia", "La sala tiene un televisor y un parlante Bluetooth. Nadie se oye.", "Juntas directivas, aulas y sucursales.", ["Ecos", "Cámara de laptop en la mesa"], [{ href: "/productos/colaboracion/", label: "Colaboración" }]),
  productCap("colaboracion", "Pantallas y colaboración", "Pizarras y pantallas que no se conectan a la identidad corporativa.", "Salas de proyecto y formación.", ["Cables HDMI como único protocolo"], [{ href: "/soluciones/productividad-y-colaboracion/", label: "Productividad" }]),
  productCap("data-center", "Equipamiento para centros de datos", "El “data center” es un closet sin flujo de aire, sin PDU ni etiquetado.", "Cuartos técnicos y salas de servidores.", ["Piso improvisado", "Sin gestión de cables"], [{ href: "/infraestructura-fisica/centros-de-datos/", label: "Centros de datos" }]),
  productCap("seguridad", "Seguridad (software y perímetro)", "Se compra un antivirus de consumo y se declara “cumplimiento”.", "Endpoints, correo y borde de red.", ["Sin MFA", "Sin parches"], [{ href: "/soluciones/seguridad-y-proteccion/", label: "Solución de seguridad" }]),
];

const cablingBodies: Record<string, Pick<Capability, "lead" | "problem" | "audience" | "signals" | "scope" | "seoDesc">> = {
  "cableado-estructurado": {
    lead: "Cobre certificado, organizado y documentado. La red inalámbrica no sustituye un backbone mal hecho.",
    problem: "Puntos improvisados, patch cords como planta permanente y gabinetes imposibles de intervenir.",
    audience: "Oficinas, sucursales, aulas y sitios que van a crecer.",
    signals: ["Cables sin etiqueta", "Velocidad inconsistente", "No hay plano de puntos"],
    scope: ["Diseño de planta", "Canalización y tendido", "Terminación, certificación y etiquetado"],
    seoDesc: "Cableado estructurado para empresas en República Dominicana. Justech SRL.",
  },
  "fibra-optica": {
    lead: "Enlaces de fibra entre edificios, pisos o racks cuando el cobre no alcanza en distancia o inmunidad.",
    problem: "Se alarga cobre más allá de lo razonable o se usa fibra sin pruebas.",
    audience: "Campus, bodegas, multicuarto técnico.",
    signals: ["Enlaces saturados o inestables entre sedes cortas", "Conversores improvisados"],
    scope: ["Ruta, tipo de fibra, fusión o conectores, pruebas y documentación"],
    seoDesc: "Instalación de fibra óptica para empresas en República Dominicana. Justech SRL.",
  },
  certificacion: {
    lead: "Medir, no adivinar: certificación de puntos con registro para entrega y para garantía de planta.",
    problem: "El cableador “ya terminó” pero nadie tiene el reporte.",
    audience: "Proyectos que deben entregar a TI, auditoría o un siguiente contratista.",
    signals: ["Sin reportes", "Puntos que no negocian la velocidad esperada"],
    scope: ["Pruebas, corrección y entrega de resultados"],
    seoDesc: "Certificación de puntos de red en República Dominicana. Justech SRL.",
  },
  levantamiento: {
    lead: "Pisar el sitio: rutas, plenum, plafón, interferencias y lo que el plano no muestra.",
    problem: "Se cotiza por Google Maps.",
    audience: "Cualquier proyecto de planta nueva o remodelación.",
    signals: ["Planos CAD desactualizados", "Obra en paralelo"],
    scope: ["Visita, fotos de gabinete, conteo de puntos, restricciones de horario"],
    seoDesc: "Levantamiento de redes e infraestructura física. Justech SRL.",
  },
  "racks-y-gabinetes": {
    lead: "Racks con flujo, PDU, organización y espacio de crecimiento. Un closet lleno no es un cuarto técnico.",
    problem: "Switches apilados en el piso o gabinetes sin gestión de cables.",
    audience: "Sedes y sucursales con core o distribución.",
    signals: ["Calor", "Cables frente a los rieles", "Sin frente/reverso claro"],
    scope: ["Suministro e instalación de racks, organización, etiquetado, energía"],
    seoDesc: "Instalación y organización de racks y gabinetes. Justech SRL.",
  },
  canalizacion: {
    lead: "Rutas protegidas: bandeja, tubería, canaleta según el sitio y la norma aplicable al proyecto.",
    problem: "El cable va por el piso o se grapa a lo que haya.",
    audience: "Obra nueva y remodelaciones.",
    signals: ["Cables expuestos", "Mezcla de datos y energía sin criterio"],
    scope: ["Diseño de ruta, materiales e instalación coordinada con obra"],
    seoDesc: "Canalización para cableado estructurado. Justech SRL.",
  },
  "puntos-de-red": {
    lead: "Puntos en el lugar correcto, con categoría acordada y certificación.",
    problem: "Se pone un punto “cerca” y el escritorio termina con un tendido visible.",
    audience: "Oficinas, aulas, POS y puestos fijos.",
    signals: ["Extensiones improvisadas", "Puntos muertos en paredes"],
    scope: ["Conteo, posición, tendido, jacks, pruebas"],
    seoDesc: "Instalación de puntos de red empresariales. Justech SRL.",
  },
  "redes-inalambricas": {
    lead: "Wi-Fi de diseño: cobertura, capacidad y SSIDs separados. Un AP de consumo no es un plan.",
    problem: "Huecos, interferencia y un único password para todos.",
    audience: "Oficinas abiertas, retail, aulas y bodegas.",
    signals: ["Usuarios en 2.4 GHz saturado", "Invitados en la VLAN de finanzas"],
    scope: ["Site survey o diseño, APs, controladora o equivalente, SSID y autenticación"],
    seoDesc: "Redes inalámbricas empresariales en República Dominicana. Justech SRL.",
  },
  "cuartos-tecnicos": {
    lead: "El cuarto como sistema: espacio, energía, refrigeración razonable, acceso y orden.",
    problem: "El cuarto es un depósito con un switch.",
    audience: "Sedes que concentran voz/datos/servidores.",
    signals: ["Llave perdida", "Combustible o limpieza junto al rack", "Sin bitácora"],
    scope: ["Layout, racks, energía, cableado y normas básicas de acceso"],
    seoDesc: "Diseño y habilitación de cuartos técnicos. Justech SRL.",
  },
  "centros-de-datos": {
    lead: "Salas de servidores o micro data center: energía, red, racks y operación cotidiana —a la escala real del cliente.",
    problem: "Se copia un data center de catálogo para un closet de 8 U.",
    audience: "Empresas que concentran cómputo on-premise.",
    signals: ["Crecimiento sin PDU", "Sin gestión de cambios"],
    scope: ["Diseño a escala, equipamiento, cableado, documentación y soporte"],
    seoDesc: "Equipamiento y habilitación de centros de datos y salas de servidores. Justech SRL.",
  },
  documentacion: {
    lead: "Planos, etiquetas y leyendas para que el siguiente técnico no adivine.",
    problem: "El conocimiento se fue con el instalador anterior.",
    audience: "Entregas de obra y tomas de control de un sitio existente.",
    signals: ["Cables de colores sin leyenda", "Nadie encuentra el punto 24"],
    scope: ["Etiquetado, diagramas, inventario de puertos y entrega"],
    seoDesc: "Documentación y etiquetado de infraestructura de red. Justech SRL.",
  },
  mantenimiento: {
    lead: "Inspección de planta, recertificación puntual, organización de gabinetes y corrección de puntos.",
    problem: "La planta se degradó a golpes de “un punto más”.",
    audience: "Sitios con cableado ya en producción.",
    signals: ["Gabinete ingobernable", "Puntos intermitentes"],
    scope: ["Ronda, correctivos, reetiquetado, informe"],
    seoDesc: "Mantenimiento de infraestructura de red y cableado. Justech SRL.",
  },
};

export const cablingCaps: Capability[] = cablingLinks.map((l) => {
  const slug = slugFromHref(l.href);
  const body = cablingBodies[slug];
  if (!body) {
    throw new Error(`Falta copy de infraestructura: ${slug}`);
  }
  return {
    slug,
    href: l.href,
    cluster: "infraestructura",
    title: l.label,
    kicker: "Infraestructura física",
    process: cablingProcess.map(([, t]) => t),
    benefits: ["Planta que se puede operar", "Entrega con pruebas", "Base para Wi-Fi, voz y datos"],
    related: [
      { href: "/infraestructura-fisica/", label: "Infraestructura física" },
      { href: "/contacto/levantamiento/", label: "Levantamiento" },
    ],
    complementary: [
      { href: "/soluciones/modernizacion-de-infraestructura/", label: "Modernización" },
      { href: "/productos/redes/", label: "Equipos de red" },
    ],
    faqs: [
      {
        q: "¿Trabajan de noche?",
        a: "Las ventanas se acuerdan con la operación. Sitios que no pueden cortar de día se planifican en horario especial, cotizado.",
      },
    ],
    ctaHref: "/contacto/levantamiento/",
    ctaLabel: "Solicitar levantamiento",
    ...body,
  };
});

const industryBodies: Record<string, { lead: string; problem: string; signals: string[] }> = {
  "sector-financiero": {
    lead: "Continuidad, identidad y controles. No publicamos casos de banca hasta tener autorización.",
    problem: "La operación no tolera improvisación en accesos, sucursales y registros.",
    signals: ["Múltiples sucursales", "Requisitos de auditoría", "Tiempos de caja"],
  },
  gobierno: {
    lead: "Procesos, licitaciones y operación cotidiana. El alcance se define por el pliego y por el sitio.",
    problem: "Expedientes, sedes y usuarios con reglas distintas a las de una pyme.",
    signals: ["Múltiples edificios", "Usuarios rotativos", "Documentación de entrega"],
  },
  educacion: {
    lead: "Aulas, identidad de estudiantes y docentes, Wi-Fi de densidad y laboratorios.",
    problem: "La red de invitados y la académica se pisan; los laboratorios no se pueden gestionar.",
    signals: ["Picos de conexión", "Salas de cómputo", "Cuentas por semestre"],
  },
  salud: {
    lead: "Continuidad en consultorios y administración. No afirmamos certificación clínica ni HIS propios.",
    problem: "Agenda, imagen y red de sucursales no pueden caerse a media jornada.",
    signals: ["Consultorios", "Datos sensibles", "Horario extendido de operación clínica"],
  },
  comercio: {
    lead: "Punto de venta, sucursal, impresión y Wi-Fi de piso. El estándar se copia de un local a otro.",
    problem: "Cada tienda es un invento.",
    signals: ["POS", "Inventario", "Aperturas"],
  },
  manufactura: {
    lead: "Planta, oficinas y, si aplica, enlace entre naves. Se diseña con la operación, no contra ella.",
    problem: "La red de oficina y la de piso se mezclan sin criterio.",
    signals: ["Turnos", "Ambientes con polvo o distancia", "PCs de planta"],
  },
  "servicios-profesionales": {
    lead: "Identidad, archivos y reuniones. El dato del cliente no puede vivir en cuentas personales.",
    problem: "Firmas y consultoras crecen en laptops sueltas.",
    signals: ["Trabajo híbrido", "Confidencialidad", "Licencias de productividad"],
  },
  "sin-fines-de-lucro": {
    lead: "Presupuesto contenido, continuidad y licenciamiento adecuado al tipo de organización.",
    problem: "Se dona equipo heterogéneo y no hay quien lo opere.",
    signals: ["Voluntariado", "Sedes pequeñas", "Donaciones de hardware"],
  },
  pymes: {
    lead: "Un interlocutor para lo esencial: correo, equipos, red y soporte, sin un departamento TI de diez personas.",
    problem: "El dueño es el soporte. Las compras se hacen el día del incidente.",
    signals: ["Sin inventario", "Cuentas personales", "Un solo proveedor informal"],
  },
  multisucursal: {
    lead: "Un estándar, varios sitios: red, identidad, impresión y mesa de ayuda.",
    problem: "El segundo local no se parece al primero.",
    signals: ["Aperturas", "Personal rotativo", "Enlaces distintos por local"],
  },
  "hoteleria-y-turismo": {
    lead: "Operación de hospedaje y servicios con red de huéspedes separada de la corporativa, cuando el proyecto lo pide.",
    problem: "El Wi-Fi de huésped tumba la operación interna.",
    signals: ["Alta densidad", "Turnos 365", "Puntos de caja"],
  },
};

export const industryCaps: Capability[] = [
  ...industryLinks.map((l) => l.href),
  "/industrias/hoteleria-y-turismo/",
].map((href) => {
  const slug = slugFromHref(href);
  const label = industryLinks.find((i) => i.href === href)?.label ?? "Hotelería y turismo";
  const body = industryBodies[slug];
  return {
    slug,
    href,
    cluster: "industrias" as const,
    title: label,
    kicker: "Industria",
    lead: body.lead,
    problem: body.problem,
    audience: `Organizaciones del ámbito de ${label.toLowerCase()} que necesitan tecnología operable, no un vertical genérico de catálogo.`,
    signals: body.signals,
    scope: [
      "Levantamiento del escenario operativo",
      "Diseño de red, identidades, equipos y soporte",
      "Implementación por fases",
      "Mesa de ayuda según contrato",
    ],
    process: integratorProcess,
    benefits: ["Alcance atado a la operación", "Sin casos inventados en esta página", "Camino a referencias cuando existan permisos"],
    related: [
      { href: "/soluciones/", label: "Soluciones" },
      { href: "/servicios/", label: "Servicios" },
    ],
    complementary: [{ href: "/contacto/diagnostico/", label: "Diagnóstico" }],
    faqs: [
      {
        q: "¿Tienen casos publicados de este sector?",
        a: "No mientras no haya autorización. La página describe el tipo de trabajo, no una lista de clientes.",
      },
    ],
    seoDesc: `Tecnología empresarial para ${label.toLowerCase()} en República Dominicana. Justech SRL.`,
    ctaHref: "/contacto/diagnostico/",
    ctaLabel: "Pedir diagnóstico",
  };
});

export const technologyCaps: Capability[] = technologyLinks.map((l) => {
  const slug = slugFromHref(l.href);
  return {
    slug,
    href: l.href,
    cluster: "tecnologias" as const,
    title: l.label,
    kicker: "Ecosistema tecnológico",
    lead: `Justech puede suministrar, licenciar, implementar o dar soporte sobre tecnologías ${l.label} según el requerimiento y la disponibilidad del canal.`,
    problem: "Se cita una marca como si eso sustituyera el diseño, la identidad y el soporte.",
    audience: "Organizaciones que ya usan o evalúan este fabricante o plataforma.",
    signals: ["Renovación", "Ampliación de puestos", "Soporte del entorno existente"],
    scope: [
      "Evaluación de encaje con el entorno actual",
      "Suministro o licenciamiento a través de canales disponibles",
      "Implementación y configuración",
      "Soporte del conjunto, no del logo",
    ],
    process: integratorProcess,
    benefits: ["Un integrador frente a varias cajas", "Sin sellos de partnership inventados"],
    related: [
      { href: "/tecnologias/", label: "Ecosistema" },
      { href: "/productos/", label: "Productos" },
    ],
    complementary: [
      { href: "/contacto/licenciamiento/", label: "Licenciamiento" },
      { href: "/contacto/cotizacion/", label: "Cotización" },
    ],
    faqs: [
      {
        q: `¿Justech es partner oficial de ${l.label}?`,
        a: "No publicamos niveles de partnership ni certificaciones hasta tener documentos vigentes. Vender o implementar un producto no equivale a una alianza formal.",
      },
      {
        q: "¿Pueden usar el logo del fabricante?",
        a: "Solo con autorización. En este sitio los fabricantes se listan por nombre, sin badges.",
      },
    ],
    seoDesc: `${l.label} para empresas en República Dominicana: licenciamiento, implementación y soporte con Justech SRL. Sin afirmación de partnership no documentado.`,
    ctaHref: "/contacto/",
    ctaLabel: "Hablar con un especialista",
  };
});

export const allCapabilities: Capability[] = [
  ...solutionCaps,
  ...serviceCaps,
  ...productCaps,
  ...cablingCaps,
  ...industryCaps,
  ...technologyCaps,
];

export function findCap(list: Capability[], slug: string) {
  return list.find((c) => c.slug === slug);
}

export function resolveSolution(slug: string) {
  const mapped = solutionAliases[slug] ?? slug;
  return { slug: mapped, cap: findCap(solutionCaps, mapped), aliasedFrom: solutionAliases[slug] ? slug : undefined };
}

export function resolveIndustry(slug: string) {
  const mapped = industryAliases[slug] ?? slug;
  return { slug: mapped, cap: findCap(industryCaps, mapped), aliasedFrom: industryAliases[slug] ? slug : undefined };
}

export const productGroupCaps = productGroups.map((g) => ({
  title: g.title,
  items: g.items
    .map((i) => productCaps.find((p) => p.href === i.href))
    .filter((p): p is NonNullable<typeof p> => Boolean(p)),
}));

export type IntentId =
  | "cotizacion"
  | "levantamiento"
  | "diagnostico"
  | "licenciamiento"
  | "soporte"
  | "proyecto"
  | "servicio-administrado";

export type IntentConfig = {
  id: IntentId;
  title: string;
  lead: string;
  seoDesc: string;
  submitLabel: string;
  categoryLabel: string;
  categories: string[];
  extras: Array<"quantity" | "location" | "neededBy" | "role">;
};

export const intentConfigs: IntentConfig[] = [
  {
    id: "cotizacion",
    title: "Cotización de equipos",
    lead: "Indique el tipo de equipo y una cantidad aproximada. Un especialista arma la propuesta. En este entorno no se envía el mensaje.",
    seoDesc: "Solicitar cotización de equipos tecnológicos empresariales. Justech SRL.",
    submitLabel: "Enviar solicitud de cotización",
    categoryLabel: "Categoría de equipos",
    categories: ["Estaciones / laptops", "Servidores y almacenamiento", "Redes", "Impresión", "Colaboración", "Otro"],
    extras: ["role", "quantity", "location", "neededBy"],
  },
  {
    id: "levantamiento",
    title: "Levantamiento de cableado e infraestructura",
    lead: "Cuéntenos el sitio. Coordinamos una visita o una sesión para ver racks, puntos y restricciones reales.",
    seoDesc: "Solicitar levantamiento de cableado estructurado. Justech SRL.",
    submitLabel: "Solicitar levantamiento",
    categoryLabel: "Tipo de sitio",
    categories: ["Oficina", "Sucursal", "Campus / varios pisos", "Cuarto técnico", "Otro"],
    extras: ["role", "location", "neededBy"],
  },
  {
    id: "diagnostico",
    title: "Diagnóstico tecnológico",
    lead: "Un recuento honesto del entorno —red, identidades, copias, soporte— para proponer el siguiente paso.",
    seoDesc: "Pedir un diagnóstico tecnológico empresarial. Justech SRL.",
    submitLabel: "Pedir diagnóstico",
    categoryLabel: "Enfoque del diagnóstico",
    categories: ["Infraestructura", "Licenciamiento", "Seguridad", "Soporte / MSP", "Integral", "Otro"],
    extras: ["role", "location"],
  },
  {
    id: "licenciamiento",
    title: "Consulta de licenciamiento",
    lead: "Microsoft 365, Google Workspace u otras licencias. Indique puestos aproximados. Sin sellos de partnership inventados.",
    seoDesc: "Consultar licencias Microsoft 365 y Google Workspace para empresas. Justech SRL.",
    submitLabel: "Consultar licencias",
    categoryLabel: "Plataforma",
    categories: ["Microsoft 365", "Google Workspace", "Seguridad / endpoint", "Otra", "No estoy seguro"],
    extras: ["role", "quantity"],
  },
  {
    id: "soporte",
    title: "Soporte o mesa de ayuda",
    lead: "Para un contrato nuevo de soporte. Si ya es cliente, use el portal. Horario publicado: lunes a viernes, 8:00–17:30.",
    seoDesc: "Contratar soporte técnico empresarial. Justech SRL.",
    submitLabel: "Solicitar conversación de soporte",
    categoryLabel: "Modalidad",
    categories: ["Mesa de ayuda", "Soporte N1–N3", "Implant / outsourcing", "Mantenimiento", "No estoy seguro"],
    extras: ["role", "quantity"],
  },
  {
    id: "proyecto",
    title: "Proyecto llave en mano",
    lead: "Mudanza, apertura, renovación o un alcance que mezcla obra técnica, equipos y software.",
    seoDesc: "Solicitar un proyecto tecnológico llave en mano. Justech SRL.",
    submitLabel: "Solicitar proyecto",
    categoryLabel: "Tipo de proyecto",
    categories: ["Apertura / mudanza", "Modernización", "Sucursales", "Migración de plataforma", "Otro"],
    extras: ["role", "location", "neededBy"],
  },
  {
    id: "servicio-administrado",
    title: "Servicio administrado",
    lead: "Rutinas de parches, copias, monitoreo y un interlocutor. El detalle se acuerda; no se publican SLAs inventados.",
    seoDesc: "Solicitar servicios administrados de TI. Justech SRL.",
    submitLabel: "Solicitar servicio administrado",
    categoryLabel: "Prioridad inicial",
    categories: ["Parches y endpoints", "Copias", "Monitoreo", "Mesa de ayuda", "Paquete combinado"],
    extras: ["role", "quantity"],
  },
];

export function getIntent(id: string) {
  return intentConfigs.find((i) => i.id === id);
}

export type Campaign = {
  slug: string;
  title: string;
  match: string;
  lead: string;
  benefits: string[];
  scope: string[];
  faqs: Faq[];
  intent: IntentId;
  seoDesc: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "consulta",
    title: "Tecnología alineada con el resultado que necesita",
    match: "Conversación inicial",
    lead: "Cuéntenos el contexto. Un especialista de Justech propone el siguiente paso con claridad.",
    benefits: ["Un interlocutor para infraestructura, software y soporte", "Alcance escrito", "Sin compromiso de compra en esta conversación"],
    scope: ["Soporte", "Licenciamiento", "Equipos", "Cableado", "Proyectos"],
    faqs: [
      { q: "¿Cuánto tardan en responder?", a: "En el sitio público, en horario laboral. Este entorno de prueba no envía el mensaje." },
    ],
    intent: "diagnostico",
    seoDesc: "Consulta tecnológica con Justech SRL en Santo Domingo.",
  },
  {
    slug: "cableado-estructurado",
    title: "Cableado estructurado para empresas",
    match: "Instalación de redes y certificación de puntos",
    lead: "Levantamiento, diseño, presupuesto, instalación, certificación y documentación. Un hilo, un responsable.",
    benefits: ["Planta certificable", "Gabinetes operables", "Base para Wi-Fi y voz/datos"],
    scope: ["Cobre y fibra", "Racks", "Canalización", "Puntos", "Wi-Fi asociado"],
    faqs: [
      { q: "¿Trabajan en República Dominicana?", a: "Sí. Justech opera desde Santo Domingo. Los sitios en otras localidades se evalúan por proyecto." },
      { q: "¿Incluye certificación?", a: "Los proyectos de planta nueva la incluyen en el alcance estándar. Sitios existentes se cotizan según pruebas necesarias." },
    ],
    intent: "levantamiento",
    seoDesc: "Cableado estructurado e instalación de redes para empresas en República Dominicana. Justech SRL.",
  },
  {
    slug: "soporte-tecnico-empresarial",
    title: "Soporte técnico empresarial",
    match: "Mesa de ayuda y continuidad en horario publicado",
    lead: "Casos con portal propio, N1–N3 según contrato y un horario claro. No prometemos 24/7 genérico.",
    benefits: ["Historial por caso", "Escalamiento", "Separado del canal comercial"],
    scope: ["Remoto", "Presencial acordado", "Implants", "Mantenimiento"],
    faqs: [
      { q: "¿Dónde abro un ticket si ya soy cliente?", a: "En soporte.justech.do." },
      { q: "¿Cuál es el horario?", a: "Lunes a viernes, 8:00–17:30, hora de República Dominicana." },
    ],
    intent: "soporte",
    seoDesc: "Soporte técnico empresarial en República Dominicana, con portal de casos. Justech SRL.",
  },
  {
    slug: "microsoft-365",
    title: "Microsoft 365 para empresas",
    match: "Licenciamiento, tenant y adopción",
    lead: "Puestos, identidad, correo y archivos con gobierno. Implementación incluida cuando el alcance lo pide.",
    benefits: ["Menos cuentas personales", "Migración planificada", "Soporte del conjunto"],
    scope: ["Cotización de puestos", "Configuración", "Migración", "Adopción"],
    faqs: [
      { q: "¿Son partner Gold / Solutions Partner?", a: "No publicamos un nivel de partnership sin documento vigente." },
    ],
    intent: "licenciamiento",
    seoDesc: "Licencias Microsoft 365 para empresas en República Dominicana. Justech SRL.",
  },
  {
    slug: "google-workspace",
    title: "Google Workspace para empresas",
    match: "Correo, Drive e identidad con dominio corporativo",
    lead: "Verificación de dominio, puestos y migración desde cuentas dispersas.",
    benefits: ["Dominio corporativo", "Unidades con dueño", "Soporte de adopción"],
    scope: ["Puestos", "Migración", "Gobierno básico"],
    faqs: [{ q: "¿Puedo mezclar con Microsoft?", a: "A veces. Se evalúa identidad y correo para no duplicar caos." }],
    intent: "licenciamiento",
    seoDesc: "Google Workspace para empresas en República Dominicana. Justech SRL.",
  },
  {
    slug: "servicios-administrados",
    title: "Servicios administrados de TI",
    match: "Operación cotidiana: parches, copias y monitoreo",
    lead: "Un ritmo de higiene tecnológica con informe, no un técnico ocasional.",
    benefits: ["Rutinas", "Interlocutor", "Menos reactivo"],
    scope: ["Endpoints", "Copias", "Monitoreo acordado", "Mesa de ayuda"],
    faqs: [{ q: "¿Hay un SLA publicado en minutos?", a: "Los tiempos se firman en el contrato. El documento público de nivel de servicio no inventa 24/7." }],
    intent: "servicio-administrado",
    seoDesc: "Servicios administrados de TI para empresas en República Dominicana. Justech SRL.",
  },
];

export function getCampaign(slug: string) {
  return campaigns.find((c) => c.slug === slug);
}
