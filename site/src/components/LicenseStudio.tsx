"use client";

import { useState } from "react";
import Link from "next/link";

export function LicenseStudio() {
  const [users, setUsers] = useState(25);
  const [mail, setMail] = useState(true);
  const [files, setFiles] = useState(true);
  const [meet, setMeet] = useState(true);
  const [sec, setSec] = useState(false);
  const [storage, setStorage] = useState("estándar");

  return (
    <form
      className="license-studio"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <p className="eyebrow">Configurador de demostración</p>
      <h3>No muestra precios ni una recomendación definitiva.</h3>
      <label>
        Puestos aproximados
        <input
          type="range"
          min={5}
          max={400}
          value={users}
          onChange={(e) => setUsers(Number(e.target.value))}
        />
        <span className="mono">{users}</span>
      </label>
      <fieldset>
        <legend>Aplicaciones</legend>
        <label><input type="checkbox" checked={mail} onChange={(e) => setMail(e.target.checked)} /> Correo</label>
        <label><input type="checkbox" checked={files} onChange={(e) => setFiles(e.target.checked)} /> Archivos</label>
        <label><input type="checkbox" checked={meet} onChange={(e) => setMeet(e.target.checked)} /> Videoconferencia</label>
        <label><input type="checkbox" checked={sec} onChange={(e) => setSec(e.target.checked)} /> Seguridad adicional</label>
      </fieldset>
      <label>
        Almacenamiento
        <select value={storage} onChange={(e) => setStorage(e.target.value)}>
          <option>estándar</option>
          <option>ampliado</option>
          <option>a evaluar</option>
        </select>
      </label>
      <p className="notice">
        Lectura de esta demostración: {users} puestos
        {mail ? ", correo" : ""}
        {files ? ", archivos" : ""}
        {meet ? ", reuniones" : ""}
        {sec ? ", capa de seguridad a diseñar" : ""}. Un especialista valida el tenant y el licenciamiento real.
      </p>
      <Link className="btn btn-primary" href={`/contacto/licenciamiento/?users=${users}`}>
        Solicitar evaluación de licenciamiento
      </Link>
    </form>
  );
}
