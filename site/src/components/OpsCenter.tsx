"use client";

import { useEffect, useRef, useState } from "react";

const cycle = [
  "Señal detectada en un activo",
  "Se convierte en actividad con dueño",
  "Seguimiento y evidencia",
  "Se documenta el cierre",
  "La operación queda más legible",
];

const tiles = [
  ["Estado", "estable · simulado"],
  ["Activos", "inventario en revisión"],
  ["Tickets", "cola con responsable"],
  ["Respaldos", "ciclo a validar"],
  ["Licencias", "puestos a conciliar"],
  ["Mantenimientos", "ronda programada"],
  ["Alertas", "señales con umbral"],
  ["Proyectos", "cambios con ventana"],
];

export function OpsCenter() {
  const [i, setI] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = wrap.current;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    }, { threshold: 0.2 });
    if (el) io.observe(el);
    const id = window.setInterval(() => {
      if (document.hidden || !visible) return;
      setI((n) => (n + 1) % cycle.length);
    }, 2400);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);
  return (
    <div className="ops-center" data-visual ref={wrap}>
      <p className="eyebrow">Centro de operaciones · simulación</p>
      <p className="beat" aria-live="polite">
        {cycle[i]}
      </p>
      <ul className="ops-grid">
        {tiles.map((t) => (
          <li key={t[0]}>
            <strong>{t[0]}</strong>
            <span>{t[1]}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm">No es un producto de consola en venta. Ilustra el control de un servicio administrado.</p>
    </div>
  );
}
