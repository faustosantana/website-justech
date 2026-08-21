"use client";

import { FormEvent, useState } from "react";
import { company } from "@/content/site";
import { track } from "@/lib/events";

const motives = [
  "Soporte técnico",
  "Licenciamiento",
  "Equipamiento",
  "Implants / outsourcing",
  "Consultoría",
  "Implementación",
  "Otro",
];

export function ContactForm({ landing = "/contacto/" }: { landing?: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    track("contact_submit", { landing });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="notice" role="status">
        <p className="mt-0 font-semibold">Mensaje registrado en este entorno de prueba.</p>
        <p className="mb-0">
          En el sitio público, un especialista responderá a {company.email}. Aquí no se envía
          correo ni se crea un caso.
        </p>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <p className="notice m-0 text-sm">
        Formulario de demostración: los datos permanecen en su navegador.
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
      <input type="hidden" name="landing" defaultValue={landing} />
      <label className="flex items-start gap-2 font-normal">
        <input type="checkbox" required className="mt-1" name="consent" />
        <span>
          Acepto el tratamiento de datos según la{" "}
          <a href="/politica-de-privacidad/">política de privacidad</a>.
        </span>
      </label>
      <button className="btn btn-primary max-w-xs" type="submit">
        Enviar mensaje
      </button>
    </form>
  );
}
