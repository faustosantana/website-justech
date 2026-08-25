"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TechScene } from "@/components/TechScene";
import type { SceneName } from "@/visual/motion";

const needs: {
  id: string;
  label: string;
  href: string;
  scene: SceneName;
  prompt: string;
}[] = [
  { id: "equipos", label: "Renovar equipos", href: "/contacto/cotizacion/?need=equipos", scene: "rack", prompt: "Flota, garantía y puesta en marcha." },
  { id: "red", label: "Mejorar la red", href: "/contacto/diagnostico/?need=red", scene: "network", prompt: "Sede, sucursales y Wi-Fi con diseño." },
  { id: "cableado", label: "Implementar cableado", href: "/contacto/levantamiento/?need=cableado", scene: "cabling", prompt: "Levantamiento y planta certificable." },
  { id: "seguridad", label: "Proteger la operación", href: "/contacto/diagnostico/?need=seguridad", scene: "security", prompt: "Capas que el equipo puede cumplir." },
  { id: "licencias", label: "Gestionar licencias", href: "/contacto/licenciamiento/?need=licencias", scene: "license", prompt: "Puestos, identidad y renovación." },
  { id: "nube", label: "Migrar a la nube", href: "/contacto/proyecto/?need=nube", scene: "cloud", prompt: "Oleadas y validación, no un corte ciego." },
  { id: "soporte", label: "Contratar soporte", href: "/contacto/soporte/?need=soporte", scene: "support", prompt: "Portal, N1–N3, horario publicado." },
  { id: "msp", label: "Administrar la tecnología", href: "/contacto/servicio-administrado/?need=msp", scene: "msp", prompt: "Rutinas, no héroes ocasionales." },
  { id: "sucursal", label: "Abrir una sucursal", href: "/contacto/proyecto/?need=sucursal", scene: "network", prompt: "Un estándar repetible por local." },
  { id: "proyecto", label: "Ejecutar un proyecto", href: "/contacto/proyecto/?need=proyecto", scene: "hero", prompt: "Un responsable de extremo a extremo." },
  { id: "otro", label: "No estoy seguro", href: "/contacto/diagnostico/?need=explorar", scene: "hero", prompt: "Empezamos por el resultado de negocio." },
];

export function NeedPicker() {
  const router = useRouter();
  const [sel, setSel] = useState(needs[0]);

  return (
    <div className="need-picker">
      <TechScene scene={sel.scene} story={1} caption={sel.prompt} />
      <div>
        <p className="eyebrow">¿Qué necesita resolver?</p>
        <h2 className="section-title">Una necesidad, una conversación.</h2>
        <ul className="need-grid">
          {needs.map((n) => (
            <li key={n.id}>
              <button type="button" className={sel.id === n.id ? "is-on" : ""} onClick={() => setSel(n)}>
                {n.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="text-muted">{sel.prompt}</p>
        <button type="button" className="btn btn-primary" onClick={() => router.push(sel.href)}>
          Continuar
        </button>
      </div>
    </div>
  );
}
