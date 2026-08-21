export function StagingBanner() {
  return (
    <div role="status" className="staging-banner">
      Entorno de previsualización Justech · El sitio público permanece en www.justech.do
    </div>
  );
}

/** Reservado para notas internas de desarrollo. No renderiza en la UI pública. */
export function Pending() {
  return null;
}
