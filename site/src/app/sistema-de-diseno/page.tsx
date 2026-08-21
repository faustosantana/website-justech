import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Sistema de diseño",
  "Tokens y componentes del preview de Justech. Página interna de staging.",
  "/sistema-de-diseno/",
);

const tokens = [
  ["Navy", "#071525", "Hero, footer, banner"],
  ["Navy 2", "#0c2340", "Degradado hero"],
  ["Teal", "#0e7c88", "CTA y enlaces"],
  ["Teal bright", "#3ec4d0", "Acento sobre navy"],
  ["Paper", "#f6f3ec", "Fondos de sección"],
  ["Foam", "#fbfaf7", "Fondo de página"],
  ["Ink", "#1a2430", "Texto"],
  ["Muted", "#4b5563", "Secundario"],
  ["Line", "#d9d3c7", "Bordes"],
];

export default function Page() {
  return (
    <main id="contenido">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow text-teal-bright">Fase C</p>
          <h1>Sistema de diseño (staging)</h1>
          <p className="m-0 max-w-2xl text-[#c5d0d8]">
            Referencia visual del sitio nuevo. IBM Plex Sans, editorial, sin sliders. No es un
            tema WordPress.
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
        <h2 className="mt-12">Tarjeta</h2>
        <article className="card max-w-sm">
          <h3>Licenciamiento</h3>
          <p>Texto de apoyo en muted. Sin iconos decorativos obligatorios.</p>
          <Link className="more" href="/soluciones/">
            Ver oferta
          </Link>
        </article>
        <p className="mt-8 text-sm text-muted">
          Espaciado: container 1120px. Botones min-height 48px. Mega menú desde breakpoint lg.
          Motion reducido se respeta en CSS.
        </p>
      </div>
    </main>
  );
}
