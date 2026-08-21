import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Sistema de diseño",
  "Tokens y componentes v2 del preview de Justech.",
  "/sistema-de-diseno/",
);

const tokens = [
  ["Navy", "#050d18", "Hero, footer, profundidad"],
  ["Navy mid", "#0c2340", "Barra de confianza"],
  ["Teal", "#0a5c64", "CTA sobre papel"],
  ["Signal", "#5eead4", "Trazas sobre navy"],
  ["Teal bright", "#3ec4d0", "Acento secundario"],
  ["Paper", "#f3eee4", "Bandas de lectura"],
  ["Foam", "#f7f4ee", "Fondo"],
  ["Ink", "#121820", "Texto"],
];

export default function Page() {
  return (
    <main id="contenido">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Dirección v2</p>
          <h1>La red que sostiene el negocio</h1>
          <p className="m-0 max-w-2xl text-[#c5d0d8]">
            IBM Plex Serif en titulares, Sans en cuerpo. Header de dos filas. Motion en
            transform/opacity. Sin plantilla de tarjetas como unidad básica.
          </p>
        </div>
      </header>
      <div className="container py-12">
        <h2>Color</h2>
        <div className="grid-cards cols-3">
          {tokens.map(([name, hex, use]) => (
            <article key={hex} className="card">
              <div className="mb-3 h-16 border border-line" style={{ background: hex }} />
              <h3>{name}</h3>
              <p>
                <code>{hex}</code> — {use}
              </p>
            </article>
          ))}
        </div>
        <h2 className="mt-12">Botones</h2>
        <div className="flex flex-wrap gap-3 bg-navy p-6">
          <a className="btn btn-primary" href="#contenido">
            Primario
          </a>
          <a className="btn btn-ghost text-white" href="#contenido">
            Ghost
          </a>
        </div>
        <p className="mt-8 text-sm text-muted">
          Container 1240px. Nav completa desde 1024px (el control Menú usa .nav-toggle).
          Header de dos filas. Reduced motion anula canvas y revelados.
        </p>
        <p>
          <Link href="/">Ver home</Link>
        </p>
      </div>
    </main>
  );
}
