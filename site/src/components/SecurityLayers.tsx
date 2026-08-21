"use client";

import { useState } from "react";
import Link from "next/link";
import { TechScene } from "@/components/TechScene";

const layers = [
  { t: "Identidad", r: "Cuentas compartidas, sin MFA.", p: "Directorio, altas/bajas, autenticación." },
  { t: "Endpoints", r: "Laptops sin cifrado ni parches.", p: "Imagen, parches, inventario." },
  { t: "Correo", r: "Buzones personales y reenvíos opacos.", p: "Tenant corporativo y gobierno." },
  { t: "Perímetro", r: "Router del ISP como único control.", p: "Firewall, segmentación, Wi-Fi." },
  { t: "Nube", r: "Cargas en cuentas de un empleado.", p: "Identidad corporativa y copias." },
  { t: "Datos", r: "Archivos en USB y chats.", p: "Clasificación razonable y acceso." },
  { t: "Respaldo", r: "Un disco en un cajón.", p: "Copias que se restauran." },
  { t: "Usuarios", r: "Excepciones eternas “porque es gerencia”.", p: "Hábitos que el soporte puede sostener." },
];

export function SecurityLayers() {
  const [i, setI] = useState(0);
  const L = layers[i];
  return (
    <div className="sec-layers">
      <TechScene scene="security" story={(i + 1) / layers.length} layer={i} />
      <div>
        <div className="layer-tabs" role="tablist" aria-label="Capas de seguridad">
          {layers.map((l, idx) => (
            <button key={l.t} type="button" role="tab" aria-selected={idx === i} onClick={() => setI(idx)}>
              {l.t}
            </button>
          ))}
        </div>
        <h3>{L.t}</h3>
        <p><strong>Riesgo habitual.</strong> {L.r}</p>
        <p><strong>Qué se implementa.</strong> {L.p}</p>
        <p className="text-sm text-muted">No afirmamos SOC 24/7 ni respuesta a incidentes como servicio permanente.</p>
        <Link className="btn btn-primary" href="/contacto/diagnostico/?need=seguridad">
          Pedir diagnóstico
        </Link>
      </div>
    </div>
  );
}
