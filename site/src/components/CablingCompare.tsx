"use client";

import { useState } from "react";
import { CablingStory } from "@/components/CablingStory";

export function CablingCompare() {
  const [after, setAfter] = useState(true);
  return (
    <div className="live-block">
      <div className="compare-toggle" role="group" aria-label="Antes y después">
        <button type="button" className={!after ? "is-on" : ""} onClick={() => setAfter(false)}>
          Antes
        </button>
        <button type="button" className={after ? "is-on" : ""} onClick={() => setAfter(true)}>
          Después
        </button>
      </div>
      <div className={`compare-frame ${after ? "is-after" : "is-before"}`}>
        <FloorSketch after={after} />
        {after ? (
          <ul>
            <li>Rutas ordenadas y puntos identificados</li>
            <li>Patch panel y rack etiquetado</li>
            <li>Pruebas y documentos entregables</li>
            <li>Capacidad de crecimiento legible</li>
          </ul>
        ) : (
          <ul>
            <li>Cableado sin identificación</li>
            <li>Rack congestionado</li>
            <li>Sin plano ni certificación a la vista</li>
            <li>Crecer implica improvisar</li>
          </ul>
        )}
        <p className="text-sm">Ilustración, no fotografía de un cliente.</p>
      </div>
      <CablingStory />
    </div>
  );
}

function FloorSketch({ after }: { after: boolean }) {
  return (
    <svg className="floor-sketch" viewBox="0 0 640 220" role="img" aria-label={after ? "Planta ordenada" : "Planta desordenada"}>
      <rect width="640" height="220" fill={after ? "#0c1c2c" : "#1a1412"} />
      <rect x="24" y="28" width="280" height="164" fill="none" stroke={after ? "#5eead4" : "#8a7468"} strokeDasharray={after ? undefined : "6 6"} />
      <text x="36" y="48" fill={after ? "#5eead4" : "#d5c4b8"} fontSize="12">
        {after ? "PLANO · rutas" : "SITIO · sin plano"}
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M40 ${70 + i * 22} C 120 ${60 + i * 18}, 180 ${90 + i * 10}, 280 ${74 + i * 20}`}
          fill="none"
          stroke={after ? "#3ec4d0" : "#c45c4a"}
          strokeWidth={after ? 1.6 : 2.4}
          strokeLinecap="round"
          opacity={after ? 0.9 : 0.55}
        />
      ))}
      <rect x="360" y="36" width="88" height="148" fill="none" stroke={after ? "#3ec4d0" : "#c45c4a"} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          x={370}
          y={48 + i * 18}
          width={68}
          height="12"
          fill={after ? (i % 2 ? "rgba(94,234,212,0.45)" : "rgba(62,196,208,0.2)") : "rgba(196,92,74,0.45)"}
        />
      ))}
      <text x="372" y="200" fill={after ? "#5eead4" : "#d5c4b8"} fontSize="11">
        {after ? "RACK · etiquetado" : "RACK · congestionado"}
      </text>
      <rect x="480" y="48" width="132" height="120" fill="none" stroke={after ? "#5eead4" : "#8a7468"} />
      <text x="492" y="72" fill="#e8eef3" fontSize="12">
        {after ? "Patch panel" : "Puntos NN"}
      </text>
      <text x="492" y="96" fill="#d6e2ea" fontSize="12">
        {after ? "Pruebas PASS" : "Sin certificación"}
      </text>
      <text x="492" y="120" fill="#d6e2ea" fontSize="12">
        {after ? "Documentos" : "Sin entrega"}
      </text>
    </svg>
  );
}
