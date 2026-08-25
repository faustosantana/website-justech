import { publicEvidence, type EvidenceItem } from "@/content/evidence";

/** Hechos de la franja de confianza. Solo verified. */
export const trustStripIds = [
  "city",
  "founded",
  "enterprise",
  "portal",
  "local",
  "cycle",
] as const;

export function trustStrip(): EvidenceItem[] {
  const verified = publicEvidence();
  return trustStripIds
    .map((id) => verified.find((item) => item.id === id))
    .filter((item): item is EvidenceItem => Boolean(item));
}

export const pillars = [
  {
    id: "evaluar",
    t: "Evaluar",
    d: "Levantamiento, diagnóstico, inventario y dimensionamiento.",
  },
  {
    id: "disenar",
    t: "Diseñar",
    d: "Arquitectura, cableado, redes, seguridad, nube y licenciamiento.",
  },
  {
    id: "suministrar",
    t: "Suministrar",
    d: "Equipos, networking, energía, software y licencias.",
  },
  {
    id: "implementar",
    t: "Implementar",
    d: "Instalación, migración, documentación, capacitación y entrega.",
  },
  {
    id: "operar",
    t: "Operar",
    d: "Soporte, mesa, mantenimiento, garantías y renovaciones.",
  },
] as const;

export const licenseJourney = [
  { t: "Empresa", d: "Un tenant, un responsable, un inventario." },
  { t: "Departamentos", d: "Perfiles distintos, mismas reglas de gobierno." },
  { t: "Usuarios", d: "Puestos reales, no cuentas personales sueltas." },
  { t: "Licencias", d: "Lo que se usa, con vigencia visible." },
  { t: "Aplicaciones", d: "Correo, archivos, diseño o ingeniería según el trabajo." },
  { t: "Seguridad", d: "Identidad, dispositivos y acceso alineados." },
  { t: "Adopción", d: "Capacitación para que la herramienta se use." },
  { t: "Renovación", d: "Calendario, no sorpresa de último mes." },
  { t: "Optimización", d: "Quitar lo que no se usa; cubrir lo que falta." },
] as const;

export const cableJourney = [
  { t: "Plano", d: "Sitio real, no el CAD de hace seis años.", frame: "v82-sede-vacio" },
  { t: "Rutas", d: "Bandejas, bajantes y restricciones de obra.", frame: "v82-sede-cables" },
  { t: "Puntos", d: "Voz, datos y Wi-Fi donde la operación los necesita.", frame: "v82-sede-cables" },
  { t: "Rack", d: "Gabinete operable, energía y etiquetas.", frame: "v82-sede-rack" },
  { t: "Certificación", d: "Pruebas en el alcance del proyecto, no un sello inventado.", frame: "v82-sede-rack" },
  { t: "Documentación", d: "Planos, IDs y entregables que se pueden mantener.", frame: "v82-sede-activa" },
  { t: "Entrega", d: "La planta queda lista para red, Wi-Fi y puestos.", frame: "v82-sede-activa" },
] as const;

export const sucursalSteps = [
  { t: "Operación normal", frame: "v82-ops-normal" },
  { t: "Falla el enlace principal", frame: "v82-ops-down" },
  { t: "Entra el respaldo", frame: "v82-ops-backup" },
  { t: "Se genera la alerta", frame: "v82-ops-alert" },
  { t: "Se abre el caso", frame: "v82-ops-alert" },
  { t: "Se asigna", frame: "v82-ops-alert" },
  { t: "Se diagnostica", frame: "v82-ops-degraded" },
  { t: "Se corrige", frame: "v82-ops-backup" },
  { t: "Se valida", frame: "v82-ops-recovered" },
  { t: "Se documenta", frame: "v82-ops-recovered" },
  { t: "Se cierra", frame: "v82-ops-normal" },
] as const;

export const labNodes = [
  "ISP principal",
  "ISP secundario",
  "Edge",
  "Firewall",
  "Core",
  "Distribución",
  "Acceso",
  "Wi-Fi",
  "Servidores",
  "Almacenamiento",
  "Usuarios",
  "Sucursal",
  "Nube",
  "Monitoreo",
] as const;

export const labActions = [
  { id: "trafico", t: "Visualizar tráfico", step: 0 },
  { id: "fallar", t: "Fallar enlace", step: 1 },
  { id: "respaldo", t: "Activar respaldo", step: 2 },
  { id: "vlan", t: "Enfocar VLAN", step: 6 },
  { id: "sucursal", t: "Conectar sucursal", step: 8 },
  { id: "wifi", t: "Visualizar Wi-Fi", step: 8 },
  { id: "dispositivo", t: "Detectar dispositivo", step: 9 },
  { id: "caso", t: "Abrir caso", step: 4 },
] as const;

export const productDoors = [
  { t: "Laptops", href: "/productos/laptops/", d: "Puestos móviles con criterio de uso." },
  { t: "Desktops", href: "/productos/estaciones-de-trabajo/", d: "Estaciones fijas para operación diaria." },
  { t: "Workstations", href: "/productos/estaciones-de-trabajo/", d: "Perfiles de diseño, CAD o datos." },
  { t: "Servidores", href: "/productos/servidores/", d: "Cómputo local cuando el negocio lo requiere." },
  { t: "Almacenamiento", href: "/productos/almacenamiento/", d: "Capacidad y respaldo, no un disco suelto." },
  { t: "Networking", href: "/productos/redes/", d: "Switches, firewalls y acceso." },
  { t: "Impresión", href: "/productos/impresion/", d: "Flota con suministro y soporte." },
  { t: "Accesorios", href: "/productos/accesorios/", d: "Lo que completa el puesto." },
  { t: "Energía", href: "/productos/ups/", d: "UPS y continuidad eléctrica del rack." },
  { t: "Software y licencias", href: "/productos/licencias/", d: "Suites y renovación con gobierno." },
] as const;

export const featuredResources = [
  {
    t: "Guía para un levantamiento de red",
    d: "Qué se observa en sitio antes de cotizar puntos o Wi-Fi.",
    href: "/recursos/guia-levantamiento/",
  },
  {
    t: "Preguntas frecuentes",
    d: "Alcance, horario, portal y lo que no afirmamos sin evidencia.",
    href: "/recursos/faqs/",
  },
  {
    t: "¿Qué necesita resolver?",
    d: "Una puerta corta hacia cotización, levantamiento o soporte.",
    href: "/resolver/",
  },
] as const;

export type FormIntent =
  | "disenar"
  | "cotizar"
  | "levantamiento"
  | "renovar"
  | "equipos"
  | "soporte"
  | "administrado"
  | "especialista";

export const formIntents: {
  id: FormIntent;
  label: string;
  extra: { name: string; label: string; options: string[] };
}[] = [
  {
    id: "disenar",
    label: "Diseñar solución",
    extra: {
      name: "alcance",
      label: "Alcance",
      options: ["Nueva sede", "Modernización", "Sucursal", "Integral", "Aún no lo sé"],
    },
  },
  {
    id: "cotizar",
    label: "Solicitar cotización",
    extra: {
      name: "categoria",
      label: "Categoría",
      options: ["Laptops / desktops", "Servidores", "Redes", "Impresión", "Licencias", "Otro"],
    },
  },
  {
    id: "levantamiento",
    label: "Solicitar levantamiento",
    extra: {
      name: "sitio",
      label: "Tipo de sitio",
      options: ["Oficina", "Sucursal", "Varios pisos", "Cuarto técnico", "Otro"],
    },
  },
  {
    id: "renovar",
    label: "Renovar licencias",
    extra: {
      name: "suite",
      label: "Plataforma",
      options: ["Microsoft 365", "Google Workspace", "Otra", "Aún no lo sé"],
    },
  },
  {
    id: "equipos",
    label: "Comprar equipos",
    extra: {
      name: "perfil",
      label: "Perfil de uso",
      options: ["Oficina", "CAD / diseño", "Servidor", "Movilidad", "Aún no lo sé"],
    },
  },
  {
    id: "soporte",
    label: "Solicitar soporte",
    extra: {
      name: "canal",
      label: "Situación",
      options: ["Ya soy cliente — portal", "Contrato nuevo", "Incidente puntual", "No estoy seguro"],
    },
  },
  {
    id: "administrado",
    label: "Contratar servicio administrado",
    extra: {
      name: "sedes",
      label: "Sedes a cubrir",
      options: ["Una sede", "Varias sucursales", "Aún no lo sé"],
    },
  },
  {
    id: "especialista",
    label: "Hablar con especialista",
    extra: {
      name: "tema",
      label: "Tema",
      options: ["Redes", "Cableado", "Licencias", "Equipos", "Soporte", "Otro"],
    },
  },
];

export const proposedResources = [
  "Guía para abrir una nueva oficina",
  "Checklist de cableado estructurado",
  "Cómo elegir laptops empresariales",
  "Cuándo renovar un servidor",
  "Microsoft 365 vs Google Workspace",
  "Cómo preparar una migración a la nube",
  "Plan básico de continuidad tecnológica",
  "Qué debe incluir un contrato de soporte",
  "Cómo documentar una red",
  "Señales de que necesita servicios administrados",
] as const;
