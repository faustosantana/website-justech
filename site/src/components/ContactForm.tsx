"use client";

import { FormEvent, useState } from "react";
import { Pending } from "./Flags";

const motives = [
  "Soporte técnico",
  "Licenciamiento",
  "Equipamiento",
  "Implants / outsourcing",
  "Consultoría",
  "Implementación",
  "Otro",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="notice" role="status">
        <p className="mt-0 font-semibold">Simulación registrada en este navegador.</p>
        <p>
          En staging no se envía correo ni se crea oportunidad en CRM. Cuando producción
          esté autorizada, este flujo irá a {`info@justech.do`} / Odoo.
        </p>
        <Pending>formulario de prueba</Pending>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit} noValidate={false}>
      <p className="notice m-0 text-sm">
        <Pending /> Este formulario no transmite datos. Es una prueba de interfaz.
      </p>
      <label>
        Nombre
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Empresa
        <input name="company" autoComplete="organization" required />
      </label>
      <label>
        Correo
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Teléfono
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        Servicio de interés
        <select name="motive" required defaultValue="">
          <option value="" disabled>
            Seleccione
          </option>
          {motives.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label>
        Mensaje
        <textarea name="message" required />
      </label>
      <input type="hidden" name="utm_source" defaultValue="" />
      <input type="hidden" name="utm_medium" defaultValue="" />
      <input type="hidden" name="utm_campaign" defaultValue="" />
      <input type="hidden" name="landing" defaultValue="/contacto/" />
      <label className="flex items-start gap-2 font-normal">
        <input type="checkbox" required className="mt-1" />
        <span>
          Acepto el tratamiento de datos según la política de privacidad (simulado en
          staging).
        </span>
      </label>
      <button className="btn btn-primary max-w-xs" type="submit">
        Enviar (simulado)
      </button>
    </form>
  );
}
