"use client";

import { useState } from "react";
import { TechScene } from "@/components/TechScene";
import { ProcessTrack } from "@/components/ProcessTrack";

const targets = [
  { t: "Correo y colaboración", d: "Identidad primero, buzones después." },
  { t: "Archivos", d: "Permisos, sincronización y corte controlado." },
  { t: "Aplicaciones", d: "Dependencias, no un lift and shift mágico." },
  { t: "Respaldo", d: "Restauración probada en el destino." },
  { t: "Infraestructura", d: "Qué queda local y qué viaja." },
  { t: "Híbrido", d: "Identidad común, cargas en su sitio." },
];

const steps = [
  { t: "Evaluación", d: "Inventario, identidad, riesgos, oleadas." },
  { t: "Preparación", d: "Cuentas, red, copias, comunicación." },
  { t: "Sincronización", d: "Datos en movimiento con validación." },
  { t: "Migración", d: "Corte por lote, no un viernes entero." },
  { t: "Validación", d: "Acceso, correo, archivos, aplicaciones." },
  { t: "Adopción", d: "Hábitos, soporte, excepciones con dueño." },
  { t: "Operación", d: "Gobierno, copias y mesa de ayuda." },
];

export function CloudMigrate() {
  const [i, setI] = useState(0);
  return (
    <div className="live-block">
      <div className="live-split">
        <TechScene scene="cloud" layer={i} story={(i + 1) / targets.length} caption={targets[i].t} />
        <div>
          <p className="eyebrow">Qué se mueve</p>
          <div className="layer-tabs" role="tablist" aria-label="Objetivos de migración">
            {targets.map((t, idx) => (
              <button key={t.t} type="button" role="tab" aria-selected={idx === i} onClick={() => setI(idx)}>
                {t.t}
              </button>
            ))}
          </div>
          <h3>{targets[i].t}</h3>
          <p>{targets[i].d}</p>
        </div>
      </div>
      <ProcessTrack title="Oleada" steps={steps} />
    </div>
  );
}
