import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="page-hero">
      <div className="container">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p className="lead m-0 max-w-2xl">{lead}</p>
      </div>
    </header>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Diagnóstico</p>
          <h2 className="mt-3 mb-0 max-w-xl text-3xl tracking-tight">
            Un levantamiento honesto vale más que un catálogo.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/contacto/diagnostico/">
            Pedir diagnóstico
          </Link>
          <Link className="btn btn-ghost" href="/contacto/">
            Hablar con un especialista
          </Link>
        </div>
      </div>
    </section>
  );
}
