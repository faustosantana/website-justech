/**
 * Alcances tipo, anonimizados. No identifican clientes.
 * No son testimonios ni casos nominativos. Se publican como patrones de servicio.
 */
export type AnonCase = {
  id: string;
  sector: string;
  need: string;
  problem: string;
  work: string;
  outcome: string;
  publish: boolean;
};

export const ANON_CASES: AnonCase[] = [
  {
    id: "sede-servicios",
    sector: "Servicios profesionales · Santo Domingo",
    need: "Abrir o renovar una sede",
    problem: "La oficina nueva no tenía plano de puntos, cuarto técnico ni Wi-Fi dimensionado.",
    work: "Levantamiento, cableado, rack, switching y puestos listos para el primer día.",
    outcome: "La operación arrancó con identificación de puntos y un responsable de planta.",
    publish: true,
  },
  {
    id: "renovacion-admin",
    sector: "Administración y finanzas · República Dominicana",
    need: "Actualizar tecnología y plataformas",
    problem: "Equipos al límite y licencias asignadas sin mapa de usuarios.",
    work: "Perfiles de puesto, configuración, identidad y reordenamiento de licencias.",
    outcome: "El alta de un colaborador quedó como un proceso, no como una compra suelta.",
    publish: true,
  },
  {
    id: "sucursal-enlace",
    sector: "Operación multisucursal · interior del país",
    need: "Mantener la operación funcionando",
    problem: "Una sucursal perdía el enlace y el reporte no llegaba a un caso documentado.",
    work: "Topología con respaldo, mesa de ayuda y cierre con nota de red.",
    outcome: "El incidente quedó trazable: falla, conmutación, diagnóstico y validación.",
    publish: true,
  },
];

export function publishedAnonCases() {
  return ANON_CASES.filter((c) => c.publish);
}
