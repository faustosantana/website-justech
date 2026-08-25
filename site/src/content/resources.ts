import { V85_BASE } from "./v85";

export const RESOURCE_DATE = "2026-08-25";
export const RESOURCE_AUTHOR = "Justech SRL";

export const RESOURCE_ARTICLES = {
  cableado: {
    slug: "cableado",
    title: "Qué debe entregar un proyecto de cableado estructurado",
    description:
      "Entregables, señales de una planta incompleta y la información que acelera un levantamiento útil.",
    path: `${V85_BASE}/recursos/cableado/`,
    serviceHref: `${V85_BASE}/cableado-estructurado/`,
    serviceLabel: "Ver cableado estructurado",
    ctaHref: `${V85_BASE}/solicitar-levantamiento/`,
    ctaLabel: "Solicitar un levantamiento",
    intro:
      "Un punto activo no cierra un proyecto. La entrega es la capacidad de operar, mantener y ampliar la planta sin abrir cielo raso a ciegas. Esta guía describe lo que un cliente debería recibir y cómo preparar la conversación técnica.",
    signals: [
      "Nadie puede decir qué puerto del patch corresponde a un puesto concreto.",
      "El rack mezcla backbone, usuarios y energía sin elevación ni etiquetas legibles.",
      "El plano de obra no coincide con lo instalado.",
      "Añadir cuatro puestos implica reabrir rutas sin nomenclatura.",
      "No hay registro de pruebas, o las pruebas no están ligadas al alcance contratado.",
    ],
    checklist: [
      "Plano actualizado con distribución, rutas y nomenclatura.",
      "Listado de puntos: ubicación, tipo y estado.",
      "Elevación del rack con patch, backbone y etiquetado.",
      "Evidencia de pruebas cuando el contrato la incluye.",
      "Memoria fotográfica de rutas, rack y terminaciones.",
      "Recomendaciones de crecimiento y mantenimiento.",
    ],
    errors: [
      "Cotizar por cantidad de puntos sin visitar el sitio ni revisar el cuarto técnico.",
      "Terminar el cobre y dejar el rack como un mueble improvisado.",
      "Entregar fotografías sueltas en lugar de un paquete con IDs coincidentes.",
      "Prometer certificación de un estándar que el alcance no contrató.",
      "Olvidar el backbone entre pisos y descubrirlo al activar Wi-Fi.",
    ],
    prepare: [
      "Plano o croquis de la planta, aunque sea preliminar.",
      "Número aproximado de puestos, salas y access points previstos.",
      "Ubicación del cuarto de comunicaciones y restricciones de obra.",
      "Horarios en los que se puede intervenir si la sede ya opera.",
      "Si existe planta previa: fotos del rack y cualquier listado antiguo.",
    ],
  },
  wifi: {
    slug: "wifi",
    title: "Cómo evaluar el Wi-Fi de una oficina",
    description:
      "Cobertura, densidad, materiales y backhaul: criterios para decidir si hay que rediseñar o solo reubicar access points.",
    path: `${V85_BASE}/recursos/wifi/`,
    serviceHref: `${V85_BASE}/redes-empresariales/`,
    serviceLabel: "Ver redes empresariales",
    ctaHref: `${V85_BASE}/solicitar-diagnostico/`,
    ctaLabel: "Solicitar un diagnóstico de red",
    intro:
      "Una señal visible en el teléfono no significa que la oficina sostenga reuniones, archivos o dispositivos simultáneos. Evaluar el Wi-Fi es entender cobertura, capacidad y cómo llega el cable hasta cada access point.",
    signals: [
      "Las salas de reunión fallan cuando hay varias videollamadas a la vez.",
      "Hay zonas con SSID visible y throughput insuficiente.",
      "Los access points cuelgan de un switch saturado o de un único punto improvisado.",
      "Invitados y operación comparten el mismo segmento sin criterio.",
      "Cada planta o sucursal tiene una configuración distinta, sin mapa.",
    ],
    checklist: [
      "Plano con paredes, vidrio, áreas abiertas y densidad de puestos.",
      "Inventario de access points y switches que los alimentan.",
      "SSID, segmentos y si el tráfico de invitados debe aislarse.",
      "Ubicación del MDF e IDF por piso, si existen.",
      "Aplicaciones críticas: voz, vídeo, archivos o diseño.",
      "Prueba en horario de ocupación real, no solo en un recinto vacío.",
    ],
    errors: [
      "Comprar access points por metros cuadrados, sin densidad ni materiales.",
      "Mejorar el aire y dejar el backhaul cableado igual de saturado.",
      "Usar un único SSID abierto para operación e invitados.",
      "Colocar APs en pasillos porque el techo de la sala «se veía complicado».",
      "Omitir sucursales: el mismo criterio no sirve si el enlace WAN es el cuello.",
    ],
    prepare: [
      "Croquis o plano, aunque sea a mano.",
      "Conteo aproximado de personas y dispositivos por zona.",
      "Qué aplicaciones no pueden fallar en una mañana de trabajo.",
      "Si ya hay APs: marca, ubicación y foto del switch de acceso.",
      "Si hay varias sedes: cuáles comparten usuarios o sistemas.",
    ],
  },
  equipos: {
    slug: "equipos",
    title: "Cuándo renovar los equipos de una empresa",
    description:
      "Señales operativas para decidir una renovación de puestos, qué verificar antes de cotizar y qué información preparar.",
    path: `${V85_BASE}/recursos/equipos/`,
    serviceHref: `${V85_BASE}/equipos-empresariales/`,
    serviceLabel: "Ver equipos empresariales",
    ctaHref: `${V85_BASE}/solicitar-cotizacion/`,
    ctaLabel: "Solicitar recomendación de equipos",
    intro:
      "Un equipo se renueva cuando deja de sostener el trabajo, la identidad o la garantía con un costo de interrupción mayor que el de reemplazarlo. El catálogo de un fabricante no define el momento; el perfil del puesto sí.",
    signals: [
      "El usuario espera el arranque para entrar a una reunión o a un sistema.",
      "Ya no hay imagen estándar: cada puesto es una excepción.",
      "No hay inventario fiable de serial, usuario y vigencia de garantía.",
      "El sistema o las aplicaciones de trabajo quedaron sin soporte del fabricante.",
      "El dispositivo no puede inscribirse en la identidad corporativa o cifrarse según la política acordada.",
    ],
    checklist: [
      "Listado de usuarios por perfil: administrativo, ejecutivo, ingeniería.",
      "Aplicaciones reales, no las que «deberían» usarse.",
      "Accesorios del puesto: monitor, dock, funda, estación.",
      "Estado de identidad, cifrado e inventario actual.",
      "Garantías vigentes y equipos fuera de servicio repetido.",
      "Ventana de entrega para no cortar la operación.",
    ],
    errors: [
      "Comprar el mismo modelo para todos los roles.",
      "Entregar cajas sin identidad, inventario ni accesorios.",
      "Renovar laptops y dejar servidores o impresión fuera de la conversación cuando sí forman parte del puesto.",
      "Decidir por una campaña comercial en lugar de por carga de trabajo.",
      "Olvidar la baja: equipos que salen deben salir también del directorio y de las licencias.",
    ],
    prepare: [
      "Cuántas personas y qué hacen en un día típico.",
      "Si hay estándar previo o cada área compró por su lado.",
      "Plataforma de identidad y correo en uso.",
      "Si se requiere movilidad, estación fija o ambas.",
      "Fecha en la que los puestos deben estar operativos.",
    ],
  },
} as const;
