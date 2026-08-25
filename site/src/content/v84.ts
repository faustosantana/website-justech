export const heroStages = [
  { t: "Infraestructura disponible", plate: "v83-hero-rack" },
  { t: "Enlace activado", plate: "v83-hero-rack" },
  { t: "Red distribuyendo conectividad", plate: "v83-hero-day" },
  { t: "Puestos incorporados", plate: "v83-hero-ops" },
  { t: "Servicios y licencias disponibles", plate: "v83-hero-ops" },
  { t: "Seguridad aplicada", plate: "v83-hero-day" },
  { t: "Nube y respaldo conectados", plate: "v83-hero-result" },
  { t: "Monitoreo activo", plate: "v83-hero-result" },
  { t: "Operación estable", plate: "v83-hero-day" },
] as const;

export const relatedByMode = {
  construir: ["Cableado", "Fibra", "Racks", "Redes", "Wi-Fi", "Servidores", "Cuartos técnicos"],
  modernizar: ["Equipos", "Licenciamiento", "Migración", "Nube", "Identidad", "Seguridad"],
  operar: ["Soporte", "Monitoreo", "Mantenimiento", "Garantías", "Gestión", "Servicios administrados"],
} as const;

export const deviceProfiles = [
  {
    id: "admin",
    t: "Administrativo",
    context: "Operación diaria, correo y archivos.",
    mobility: "Alta",
    security: "Identidad y disco cifrado",
    apps: "Colaboración y ofimática",
    extras: "Dock y monitor cuando el puesto es fijo",
    photo: "v84-device-admin",
  },
  {
    id: "exec",
    t: "Ejecutivo",
    context: "Viaje, reuniones y firma de documentos.",
    mobility: "Muy alta",
    security: "Identidad y acceso condicional",
    apps: "Correo, videollamada, archivos",
    extras: "Cargador compacto y funda",
    photo: "v84-device-exec",
  },
  {
    id: "eng",
    t: "Ingeniería",
    context: "Diseño, CAD o análisis local.",
    mobility: "Media",
    security: "Identidad, endpoint y copias",
    apps: "Diseño y colaboración",
    extras: "Monitor adicional y estación",
    photo: "v84-device-eng",
  },
] as const;

export const devicePipeline = ["Selección", "Configuración", "Seguridad", "Inventario", "Entrega", "Garantía"] as const;

export const licenseDepts = ["Administración", "Finanzas", "Ingeniería"] as const;
export const licenseKinds = ["Productividad", "Identidad", "Seguridad"] as const;
export const licenseApps = ["Correo", "Archivos", "Reuniones"] as const;

export const quoteNeeds = [
  { id: "equipos", t: "Equipos", extra: "Perfil", options: ["Administrativo", "Ejecutivo", "Ingeniería", "Aún no lo sé"] },
  { id: "redes", t: "Redes", extra: "Alcance", options: ["Sede", "Sucursales", "Wi-Fi", "Alta disponibilidad"] },
  { id: "cableado", t: "Cableado", extra: "Sitio", options: ["Oficina", "Sucursal", "Varios pisos", "Cuarto técnico"] },
  { id: "licencias", t: "Licencias", extra: "Plataforma", options: ["Productividad", "Identidad", "Aún no lo sé"] },
  { id: "seguridad", t: "Seguridad", extra: "Enfoque", options: ["Endpoint", "Red", "Identidad", "Integral"] },
  { id: "nube", t: "Nube", extra: "Situación", options: ["Migración", "Respaldo", "Colaboración", "Aún no lo sé"] },
  { id: "soporte", t: "Soporte", extra: "Situación", options: ["Contrato nuevo", "Ya soy cliente", "Incidente"] },
  { id: "integral", t: "Proyecto integral", extra: "Tipo", options: ["Nueva sede", "Modernización", "Sucursales"] },
] as const;

export const cableLayers = [
  { t: "Plano", d: "El sitio real, no el CAD antiguo." },
  { t: "Rutas", d: "Bandejas y bajantes según obra." },
  { t: "Puntos", d: "Dónde la operación necesita datos y Wi-Fi." },
  { t: "Canalización", d: "Caminos que se pueden mantener." },
  { t: "Rack", d: "Gabinete operable, con energía." },
  { t: "Patch panel", d: "Terminación ordenada." },
  { t: "Etiquetado", d: "Un ID por punto." },
  { t: "Certificación", d: "Pruebas en el alcance del proyecto." },
  { t: "Documentación", d: "Planos que se entregan." },
  { t: "Entrega", d: "La planta queda lista para operar." },
] as const;
