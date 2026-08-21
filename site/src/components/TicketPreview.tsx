export function TicketPreview() {
  return (
    <div className="ticket" aria-hidden>
      <header>
        <span>portal · soporte.justech.do</span>
        <span>N2 · en atención</span>
      </header>
      <p className="mt-4 mb-1 text-white">Incidencia de conectividad · sucursal</p>
      <p className="m-0 text-sm opacity-80">
        Clasificada, con responsable y horario de atención publicado. Simulación visual — no es un caso real.
      </p>
      <ol>
        <li>
          <span>N1</span>
          <span>Recepción y evidencia</span>
        </li>
        <li>
          <span>N2</span>
          <span>Red / identidad</span>
        </li>
        <li>
          <span>N3</span>
          <span>Cambio controlado</span>
        </li>
      </ol>
    </div>
  );
}
