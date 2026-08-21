"use client";

import { useState } from "react";
import Link from "next/link";
import { TechScene } from "@/components/TechScene";
import { ProcessTrack } from "@/components/ProcessTrack";

const steps = [
  { t: "Plano", d: "El sitio se dibuja. Nada se tiende a ciegas." },
  { t: "Puntos", d: "Se marcan tomas, APs y posiciones de rack." },
  { t: "Rutas", d: "Caminos que se pueden mantener, no nudos." },
  { t: "Canalización", d: "La obra civil sostiene el cable, no al revés." },
  { t: "Tendido", d: "El cable entra cuando la ruta ya existe." },
  { t: "Terminación", d: "Cada punto cierra. No hay “ya después”." },
  { t: "Rack", d: "Patch panel, energía y aire con cabeza." },
  { t: "Etiquetado", d: "Lo que no se nombra no se opera." },
  { t: "Prueba", d: "Se mide. No se asume." },
  { t: "Certificación", d: "El resultado queda, no se recita." },
  { t: "Documentación", d: "Plano as-built y evidencias de prueba." },
  { t: "Entrega", d: "Una planta que otro técnico puede entender." },
];

export function CablingStory() {
  const [step, setStep] = useState(0);
  return (
    <div className="cab-story">
      <TechScene scene="cabling" story={(step + 1) / 12} caption={steps[step].t} />
      <div>
        <ProcessTrack title="La obra, en doce pasos" steps={steps} onStep={setStep} />
        <p>
          <Link className="btn btn-primary" href="/contacto/levantamiento/">
            Solicitar levantamiento
          </Link>
        </p>
      </div>
    </div>
  );
}
