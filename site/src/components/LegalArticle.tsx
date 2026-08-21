import type { ReactNode } from "react";
import Link from "next/link";
import { company, legalLinks } from "@/content/site";

export function LegalArticle({
  code,
  title,
  children,
  productionPath,
}: {
  code: string;
  title: string;
  children: ReactNode;
  productionPath?: string;
}) {
  return (
    <main id="contenido">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow text-teal-bright">Centro legal · {code}</p>
          <h1>{title}</h1>
          <p className="m-0 text-[#c5d0d8]">
            Justech SRL · República Dominicana · Documento público. Staging no sustituye el
            PDF firmado.
          </p>
        </div>
      </header>
      <div className="container prose py-12">
        {productionPath ? (
          <p className="notice">
            Texto de referencia para este preview. Versión publicada el 13 jul 2026:{" "}
            <a href={`${company.production}${productionPath}`}>
              {company.production}
              {productionPath}
            </a>
            . No enlazamos la /legal/ de producción mientras permanezca comprometida.
          </p>
        ) : null}
        {children}
        <nav className="mt-10 text-sm">
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="mr-3">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
