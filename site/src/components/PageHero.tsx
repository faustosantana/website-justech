import Link from "next/link";
import { Pending } from "./Flags";

export function PageHero({
  eyebrow,
  title,
  lead,
  pending,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  pending?: boolean;
}) {
  return (
    <header className="page-hero">
      <div className="container">
        {eyebrow ? <p className="eyebrow text-teal-bright">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="prose m-0 text-[1.05rem] text-[#c5d0d8]">{lead}</p>
        {pending ? (
          <p className="mt-4">
            <Pending>copy y alcance</Pending>
          </p>
        ) : null}
      </div>
    </header>
  );
}

export function CtaBand() {
  return (
    <section className="mt-16 bg-navy py-14 text-white">
      <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="eyebrow text-teal-bright">Siguiente paso</p>
          <h2 className="mt-2 mb-0 text-2xl tracking-tight">
            Cuéntenos el requerimiento. Nosotros armamos el camino.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/contacto/">
            Hablar con un especialista
          </Link>
          <Link className="btn btn-ghost" href="/soluciones/">
            Ver soluciones
          </Link>
        </div>
      </div>
    </section>
  );
}
