"use client";

import { useState } from "react";
import { TechScene } from "@/components/TechScene";
import { ProcessTrack } from "@/components/ProcessTrack";

const profiles = [
  { t: "Administrativo", d: "Puesto de oficina, movilidad ocasional, pantalla estándar." },
  { t: "Ejecutivo", d: "Ligero, autonomía larga, cifrado y videoconferencia." },
  { t: "Ventas", d: "Móvil, batería, conectividad y presentación." },
  { t: "Diseño", d: "Pantalla fiel, GPU razonable, almacenamiento local." },
  { t: "Ingeniería", d: "CPU/RAM altas, refrigeración, docks." },
  { t: "Móvil intenso", d: "Resistencia, peso, red celular opcional." },
  { t: "Trabajo intensivo", d: "Estación que no viaja: más núcleo que gramos." },
  { t: "Puesto compartido", d: "Imagen limpia, login rápido, menos almacenamiento personal." },
];

const chain = [
  { t: "Necesidad", d: "Qué trabajo debe salir de ese puesto." },
  { t: "Perfil", d: "Quién lo usa, dónde y con qué intensidad." },
  { t: "Especificación", d: "Criterio, no un SKU de catálogo." },
  { t: "Cotización", d: "Alcance, garantía y servicios alrededor." },
  { t: "Adquisición", d: "Compra con trazabilidad de serie." },
  { t: "Configuración", d: "Imagen, identidad, cifrado." },
  { t: "Etiquetado", d: "Inventario que se puede operar." },
  { t: "Entrega", d: "Puesto listo, no una caja." },
  { t: "Garantía y soporte", d: "RMA y mesa de ayuda según contrato." },
];

export function LaptopRig() {
  const [i, setI] = useState(0);
  const p = profiles[i];
  return (
    <div className="live-block">
      <div className="live-split">
        <TechScene scene="laptop" layer={i % 4} story={1} caption={p.t} />
        <div>
          <p className="eyebrow">Perfil de puesto</p>
          <div className="layer-tabs" role="tablist" aria-label="Perfiles de laptop">
            {profiles.map((x, idx) => (
              <button key={x.t} type="button" role="tab" aria-selected={idx === i} onClick={() => setI(idx)}>
                {x.t}
              </button>
            ))}
          </div>
          <h3>{p.t}</h3>
          <p>{p.d}</p>
          <ul className="spec-list">
            <li>Rendimiento y movilidad según el trabajo</li>
            <li>Seguridad de imagen y cifrado</li>
            <li>Conectividad, garantía y accesorios a evaluar</li>
          </ul>
          <p className="text-sm">Sin modelos ni precios. Un especialista cierra la especificación.</p>
        </div>
      </div>
      <ProcessTrack title="Ciclo de aprovisionamiento" steps={chain} />
    </div>
  );
}
