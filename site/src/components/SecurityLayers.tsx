"use client";

import { useState } from "react";
import Link from "next/link";
import { TechScene } from "@/components/TechScene";
import { ProcessTrack } from "@/components/ProcessTrack";

const layers = [
  { t: "Personas", r: "Excepciones eternas “porque es gerencia”.", p: "Hábitos que el soporte puede sostener.", cta: "Diagnóstico de hábitos y acceso" },
  { t: "Identidad", r: "Cuentas compartidas, sin MFA.", p: "Directorio, altas/bajas, autenticación.", cta: "Ordenar identidad" },
  { t: "Dispositivos", r: "Laptops sin cifrado ni parches.", p: "Imagen, parches, inventario.", cta: "Aprovisionar con control" },
  { t: "Correo", r: "Buzones personales y reenvíos opacos.", p: "Tenant corporativo y gobierno.", cta: "Evaluar correo" },
  { t: "Red", r: "VLAN inexistente, Wi-Fi de visita en producción.", p: "Segmentación y diseño de piso.", cta: "Revisar la red" },
  { t: "Perímetro", r: "Router del ISP como único control.", p: "Firewall, políticas y registro.", cta: "Diseñar perímetro" },
  { t: "Aplicaciones", r: "SaaS en cuentas de un empleado.", p: "Inventario, SSO y dueños.", cta: "Inventariar aplicaciones" },
  { t: "Nube", r: "Cargas en cuentas personales.", p: "Identidad corporativa y copias.", cta: "Evaluar nube" },
  { t: "Datos", r: "Archivos en USB y chats.", p: "Clasificación razonable y acceso.", cta: "Ordenar datos" },
  { t: "Respaldo", r: "Un disco en un cajón.", p: "Copias que se restauran.", cta: "Probar restauración" },
];

const story = [
  { t: "Actividad normal", d: "La operación corre. Las capas están en su sitio, no en alarma permanente." },
  { t: "Señal inusual", d: "Algo no coincide: un acceso, un dispositivo, un reenvío." },
  { t: "Detección", d: "Se nombra el evento. Se deja de improvisar." },
  { t: "Aislamiento", d: "Se contiene el alcance. El resto del negocio sigue." },
  { t: "Continuidad", d: "Usuarios trabajan. El incidente no apaga sucursales." },
  { t: "Revisión", d: "Qué falló, qué se cambia, quién lo sostiene." },
];

export function SecurityLayers() {
  const [i, setI] = useState(1);
  const L = layers[i];
  return (
    <div className="live-block">
      <div className="sec-layers">
        <TechScene scene="security" story={(i + 1) / layers.length} layer={i} caption={L.t} />
        <div>
          <div className="layer-tabs" role="tablist" aria-label="Capas de seguridad">
            {layers.map((l, idx) => (
              <button key={l.t} type="button" role="tab" aria-selected={idx === i} onClick={() => setI(idx)}>
                {l.t}
              </button>
            ))}
          </div>
          <h3>{L.t}</h3>
          <p>
            <strong>Riesgo habitual.</strong> {L.r}
          </p>
          <p>
            <strong>Qué se implementa.</strong> {L.p}
          </p>
          <p className="text-sm">No afirmamos SOC 24/7 ni respuesta a incidentes como servicio permanente.</p>
          <Link className="btn btn-primary" href="/contacto/diagnostico/?need=seguridad">
            {L.cta}
          </Link>
        </div>
      </div>
      <ProcessTrack title="Microhistoria de un evento" steps={story} />
    </div>
  );
}
