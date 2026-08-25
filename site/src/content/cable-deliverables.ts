export const CABLE_DELIVERABLES = [
  { id: "plano", title: "Plano actualizado", kind: "DWG / PDF", note: "Distribución, rutas y nomenclatura." },
  { id: "nom", title: "Nomenclatura", kind: "Registro", note: "Identificación de puntos y patch." },
  { id: "puntos", title: "Listado de puntos", kind: "Hoja", note: "Ubicación, tipo y estado." },
  { id: "rack", title: "Elevación del rack", kind: "Esquema", note: "Patch, backbone y etiquetado." },
  { id: "pruebas", title: "Evidencia de pruebas", kind: "Cuando aplique", note: "Resultados de certificación." },
  { id: "foto", title: "Memoria fotográfica", kind: "Archivo", note: "Rutas, rack y terminaciones." },
  { id: "reco", title: "Recomendaciones", kind: "Informe", note: "Ampliación y mantenimiento." },
] as const;
