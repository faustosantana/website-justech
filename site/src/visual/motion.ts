/** Motion tokens. CSS y canvas leen la misma gramática. */
export const motion = {
  enter: 680,
  exit: 420,
  connect: 900,
  pulse: 1600,
  flow: 2200,
  contain: 740,
  assign: 520,
  resolve: 800,
  build: 1100,
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const pal = {
  ink: "#050d18",
  mid: "#0a1a2c",
  signal: "#5eead4",
  teal: "#3ec4d0",
  paper: "rgba(232, 238, 243, 0.92)",
  dim: "rgba(165, 186, 198, 0.7)",
  warn: "#d4a373",
  alert: "#c45c4a",
  metal: "rgba(186, 198, 208, 0.35)",
} as const;

export type SceneName =
  | "hero"
  | "network"
  | "security"
  | "license"
  | "support"
  | "cabling"
  | "msp"
  | "cloud"
  | "rack";
