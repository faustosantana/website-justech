import Link from "next/link";

export default function NotFound() {
  return (
    <main id="contenido" className="container py-24">
      <p className="eyebrow">404</p>
      <h1 className="text-4xl tracking-tight">Esta ruta no existe en el preview</h1>
      <p>Vuelva al inicio o use el menú. El código HTTP debe ser 404 en el servidor de staging.</p>
      <p>
        <Link className="btn btn-primary" href="/">
          Ir al inicio
        </Link>
      </p>
    </main>
  );
}
