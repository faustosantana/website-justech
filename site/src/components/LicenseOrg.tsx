"use client";

import { LicenseStudio } from "@/components/LicenseStudio";
import { TechScene } from "@/components/TechScene";
import { ProcessTrack } from "@/components/ProcessTrack";

const steps = [
  { t: "Descubrimiento", d: "Tenants, cuentas personales, puestos reales." },
  { t: "Selección", d: "Plan según el trabajo, no según el folleto." },
  { t: "Asignación", d: "Dirección, finanzas, ventas, operaciones, móviles." },
  { t: "Activación", d: "Correo, archivos, reuniones, administración." },
  { t: "Migración", d: "Identidad y datos con validación." },
  { t: "Gobierno", d: "Altas, bajas, excepciones con dueño." },
  { t: "Renovación", d: "Optimizar antes de firmar de nuevo." },
  { t: "Soporte", d: "Mesa de ayuda sobre el tenant, no sobre un chat." },
];

export function LicenseOrg() {
  return (
    <div className="live-block">
      <div className="live-split">
        <TechScene scene="license" story={1} caption="De departamentos a un tenant" />
        <LicenseStudio />
      </div>
      <ProcessTrack title="Ciclo de licenciamiento" steps={steps} />
    </div>
  );
}
