import type { ReactNode } from "react";

export function StagingBanner() {
  return (
    <div
      role="status"
      className="bg-navy px-4 py-2 text-center text-xs tracking-wide text-[#d7e3ea]"
    >
      Entorno de pruebas Justech. No indexable. Los formularios no envían leads reales.
      Producción: www.justech.do
    </div>
  );
}

export function Pending({ children }: { children?: ReactNode }) {
  return (
    <span className="pending-flag">
      PENDIENTE_VALIDACION{children ? ` · ${children}` : ""}
    </span>
  );
}
