"use client";

import { useState } from "react";
import Link from "next/link";
import { TechScene } from "@/components/TechScene";

const steps = [
  "Plano",
  "Levantamiento",
  "Rutas",
  "Canalización",
  "Tendido",
  "Puntos",
  "Rack",
  "Etiquetas",
  "Certificación",
  "Documentos",
  "Entrega",
  "Soporte",
];

export function CablingStory() {
  const [step, setStep] = useState(0);
  return (
    <div className="cab-story">
      <TechScene scene="cabling" story={(step + 1) / 12} />
      <ol className="cab-steps">
        {steps.map((name, i) => (
          <li key={name}>
            <button type="button" className={i === step ? "is-on" : ""} onClick={() => setStep(i)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {name}
            </button>
          </li>
        ))}
      </ol>
      <p>
        <Link className="btn btn-primary" href="/contacto/levantamiento/">
          Solicitar levantamiento
        </Link>
      </p>
    </div>
  );
}
