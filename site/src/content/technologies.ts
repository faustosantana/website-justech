export const TECH_HEADING = "Tecnologías con las que trabajamos";
export const TECH_LICENSE_HEADING =
  "Tecnologías que comercializamos, implementamos o administramos según el alcance.";

export const TECH_GROUPS = [
  {
    id: "productividad",
    label: "Productividad",
    names: ["Microsoft", "Google", "Adobe"],
  },
  {
    id: "infra",
    label: "Equipos e infraestructura",
    names: ["Lenovo", "Dell", "HP", "Huawei", "Cisco"],
  },
  {
    id: "nube",
    label: "Nube, gestión y seguridad",
    names: ["AWS", "Fortinet", "Action1"],
  },
] as const;

export const LICENSE_FILTERS = ["Productividad", "Identidad", "Gestión", "Seguridad", "Nube"] as const;

export const LICENSE_CATALOG = [
  {
    name: "Microsoft 365",
    filters: ["Productividad", "Identidad"],
    role: "Correo, colaboración, identidad y licencias de usuario.",
  },
  {
    name: "Google Workspace",
    filters: ["Productividad", "Identidad"],
    role: "Identidad y aplicaciones de colaboración.",
  },
  {
    name: "Adobe",
    filters: ["Productividad"],
    role: "Licencias creativas según el perfil.",
  },
  {
    name: "Action1",
    filters: ["Gestión", "Seguridad"],
    role: "Gestión y actualización de endpoints.",
  },
  {
    name: "AWS",
    filters: ["Nube"],
    role: "Servicios de nube según el alcance.",
  },
  {
    name: "Huawei",
    filters: ["Nube"],
    role: "Infraestructura y nube según el proyecto.",
  },
] as const;
