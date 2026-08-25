"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "justech-equip-wizard";

const types = ["Laptop", "Desktop", "Workstation", "Monitor", "Servidor", "Otro"];
const profiles = [
  "Administrativo",
  "Ejecutivo",
  "Ventas",
  "Diseño",
  "Ingeniería",
  "Móvil",
  "Trabajo intensivo",
  "Puesto compartido",
];

export function EquipWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(empty);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ ...empty(), ...JSON.parse(raw) });
    } catch {
      /* demo */
    }
  }, []);

  function save(next: ReturnType<typeof empty>) {
    setData(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* demo */
    }
  }

  const labels = ["Tipo", "Cantidad", "Perfil", "Requerimientos", "Fecha", "Contacto", "Resumen"];

  if (done) {
    return (
      <div className="notice" role="status">
        <p className="mt-0 font-semibold">Solicitud de equipos registrada en este entorno de prueba.</p>
        <p className="mb-0">No se envía correo ni se crea un caso. Un especialista cierra la especificación.</p>
      </div>
    );
  }

  return (
    <form
      className="wizard"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 6) {
          setStep(step + 1);
          return;
        }
        setDone(true);
      }}
    >
      <p className="eyebrow">Solicitud de equipos · demostración</p>
      <ol className="wizard-steps" aria-label="Progreso">
        {labels.map((l, i) => (
          <li key={l}>
            <button type="button" className={i === step ? "is-on" : ""} onClick={() => setStep(i)}>
              {l}
            </button>
          </li>
        ))}
      </ol>
      {step === 0 ? (
        <label>
          Tipo de equipo
          <select value={data.type} onChange={(e) => save({ ...data, type: e.target.value })} required>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      ) : null}
      {step === 1 ? (
        <label>
          Cantidad aproximada
          <input
            type="number"
            min={1}
            max={500}
            value={data.qty}
            onChange={(e) => save({ ...data, qty: Number(e.target.value) })}
          />
        </label>
      ) : null}
      {step === 2 ? (
        <label>
          Perfil de usuario
          <select value={data.profile} onChange={(e) => save({ ...data, profile: e.target.value })}>
            {profiles.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      ) : null}
      {step === 3 ? (
        <label>
          Requerimientos
          <textarea
            value={data.need}
            onChange={(e) => save({ ...data, need: e.target.value })}
            placeholder="Movilidad, pantalla, cifrado, docks, software…"
          />
        </label>
      ) : null}
      {step === 4 ? (
        <label>
          Fecha necesaria
          <input type="date" value={data.date} onChange={(e) => save({ ...data, date: e.target.value })} />
        </label>
      ) : null}
      {step === 5 ? (
        <>
          <label>
            Empresa
            <input value={data.company} onChange={(e) => save({ ...data, company: e.target.value })} required />
          </label>
          <label>
            Contacto
            <input value={data.contact} onChange={(e) => save({ ...data, contact: e.target.value })} required />
          </label>
        </>
      ) : null}
      {step === 6 ? (
        <div className="notice">
          <p>
            {data.qty} × {data.type} · perfil {data.profile}
            {data.date ? ` · para ${data.date}` : ""}.
          </p>
          <p>{data.need || "Sin detalle adicional."}</p>
          <p className="mb-0">
            {data.company} · {data.contact}. Sin precios. Un especialista valida.
          </p>
        </div>
      ) : null}
      <div className="hero-actions">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>
            Atrás
          </button>
        ) : null}
        <button className="btn btn-primary" type="submit">
          {step < 6 ? "Continuar" : "Registrar en staging"}
        </button>
        <Link className="btn btn-ghost" href="/contacto/cotizacion/?need=equipos">
          Ir al formulario completo
        </Link>
      </div>
    </form>
  );
}

function empty() {
  return {
    type: "Laptop",
    qty: 10,
    profile: "Administrativo",
    need: "",
    date: "",
    company: "",
    contact: "",
  };
}
