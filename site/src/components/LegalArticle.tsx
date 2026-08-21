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
          <p className="m-0 text-[#c5d0d8]">Justech SRL · República Dominicana · Documento público.</p>
        </div>
      </header>
      <div className="container prose py-12">
        {productionPath ? (
          <p className="notice">
            Versión publicada el 13 de julio de 2026:{" "}
            <a href={`${company.production}${productionPath}`}>
              {company.production}
              {productionPath}
            </a>
            .
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
