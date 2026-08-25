"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { IntentId } from "@/content/capabilities";
import { getIntent } from "@/content/capabilities";
import { company } from "@/content/site";
import { track } from "@/lib/events";

const generalCategories = [
  "Soporte técnico",
  "Licenciamiento",
  "Equipamiento",
  "Cableado / infraestructura",
  "Proyecto",
  "Servicio administrado",
  "Otro",
];

export function ContactForm({
  landing = "/contacto/",
  intent = "general",
}: {
  landing?: string;
  intent?: IntentId | "general";
}) {
  const [sent, setSent] = useState(false);
  const [utm, setUtm] = useState({ source: "", medium: "", campaign: "" });
  const cfg = intent === "general" ? null : getIntent(intent);
  const categories = cfg?.categories ?? generalCategories;
  const extras = cfg?.extras ?? ["role"];

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setUtm({
      source: q.get("utm_source") ?? "",
      medium: q.get("utm_medium") ?? "",
      campaign: q.get("utm_campaign") ?? "",
    });
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    track("contact_submit", { landing, intent });
    setSent(true);
  }

  if (sent) {
    return (
      <div className="notice" role="status">
        <p className="mt-0 font-semibold">Solicitud registrada en este entorno de prueba.</p>
        <p className="mb-0">
          En el sitio público, un especialista responderá a {company.email} en horario laboral. Aquí no se envía
          correo ni se crea un caso.
        </p>
      </div>
    );
  }

  return (
    <form className="form-grid two" onSubmit={onSubmit}>
      <p className="notice span-2 m-0 text-sm">
        Formulario de demostración: los datos permanecen en su navegador. No hay envío real en staging.
      </p>
      <label>
        Nombre
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Empresa
        <input name="company" autoComplete="organization" required />
      </label>
      {extras.includes("role") ? (
        <label>
          Cargo
          <input name="role" autoComplete="organization-title" />
        </label>
      ) : null}
      <label>
        Correo corporativo
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Teléfono
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label className="span-2">
        {cfg?.categoryLabel ?? "Motivo"}
        <select name="category" required defaultValue="">
          <option value="" disabled>
            Seleccione
          </option>
          {categories.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      {extras.includes("quantity") ? (
        <label>
          Cantidad aproximada
          <input name="quantity" inputMode="numeric" placeholder="Puestos, equipos o sitios" />
        </label>
      ) : null}
      {extras.includes("location") ? (
        <label>
          Ubicación del sitio
          <input name="location" placeholder="Ciudad o referencia" />
        </label>
      ) : null}
      {extras.includes("neededBy") ? (
        <label>
          Fecha requerida
          <input name="neededBy" type="date" />
        </label>
      ) : null}
      <label className="span-2">
        Descripción
        <textarea name="message" required />
      </label>
      <input type="hidden" name="utm_source" value={utm.source} readOnly />
      <input type="hidden" name="utm_medium" value={utm.medium} readOnly />
      <input type="hidden" name="utm_campaign" value={utm.campaign} readOnly />
      <input type="hidden" name="landing" defaultValue={landing} />
      <input type="hidden" name="intent" defaultValue={intent} />
      <label className="span-2 flex items-start gap-2 font-normal">
        <input type="checkbox" required className="mt-1" name="consent" />
        <span>
          Acepto el tratamiento de datos según la{" "}
          <Link href="/politica-de-privacidad/">política de privacidad</Link>.
        </span>
      </label>
      <button className="btn btn-primary max-w-xs" type="submit">
        {cfg?.submitLabel ?? "Enviar mensaje"}
      </button>
    </form>
  );
}
