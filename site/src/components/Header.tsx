"use client";

import Link from "next/link";
import { useState } from "react";
import {
  aboutLinks,
  company,
  recursosLinks,
  services,
  solutions,
} from "@/content/site";
import { withBase } from "@/lib/paths";

function Mega({
  id,
  label,
  items,
}: {
  id: string;
  label: string;
  items: { href: string; label: string; pending?: boolean }[];
}) {
  return (
    <div className="group relative">
      <Link
        href={id}
        className="inline-flex min-h-11 items-center px-2 text-[0.95rem] font-medium text-navy hover:text-teal"
        aria-haspopup="true"
      >
        {label}
      </Link>
      <div className="invisible absolute left-0 top-full z-40 min-w-[18rem] border border-line bg-white p-3 opacity-0 shadow-[var(--shadow)] transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="m-0 list-none p-0" role="list">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-3 px-2 py-2 text-sm text-ink hover:bg-paper"
              >
                <span>{item.label}</span>
                {item.pending ? <span className="pending-flag">Pendiente</span> : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[color:var(--foam)]/95 backdrop-blur">
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-2 no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase("/brand/justech-logo.png")}
            alt="Justech"
            width={150}
            height={36}
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          <Mega id="/soluciones/" label="Soluciones" items={solutions} />
          <Mega id="/servicios/" label="Servicios" items={services} />
          <Mega id="/nosotros/" label="Nosotros" items={aboutLinks} />
          <Mega id="/recursos/" label="Recursos" items={recursosLinks} />
          <Link
            href="/contacto/"
            className="inline-flex min-h-11 items-center px-2 text-[0.95rem] font-medium text-navy hover:text-teal"
          >
            Contacto
          </Link>
          <a
            href={company.supportUrl}
            className="inline-flex min-h-11 items-center px-2 text-[0.95rem] font-medium text-navy hover:text-teal"
          >
            Soporte
          </a>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link className="btn btn-primary" href="/contacto/">
            Hablar con un especialista
          </Link>
        </div>

        <button
          type="button"
          className="btn btn-ghost min-h-11 px-3 text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Móvil" className="container flex flex-col py-3">
            <MobileGroup title="Soluciones" href="/soluciones/" items={solutions} onNavigate={() => setOpen(false)} />
            <MobileGroup title="Servicios" href="/servicios/" items={services} onNavigate={() => setOpen(false)} />
            <MobileGroup title="Nosotros" href="/nosotros/" items={aboutLinks} onNavigate={() => setOpen(false)} />
            <Link href="/recursos/faqs/" className="py-3 text-navy no-underline" onClick={() => setOpen(false)}>
              Preguntas frecuentes
            </Link>
            <Link href="/contacto/" className="py-3 font-semibold text-navy no-underline" onClick={() => setOpen(false)}>
              Contacto
            </Link>
            <Link href="/legal/" className="py-3 text-navy no-underline" onClick={() => setOpen(false)}>
              Centro legal
            </Link>
            <a href={company.supportUrl} className="py-3 text-navy no-underline">
              Portal de soporte
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function MobileGroup({
  title,
  href,
  items,
  onNavigate,
}: {
  title: string;
  href: string;
  items: { href: string; label: string; pending?: boolean }[];
  onNavigate: () => void;
}) {
  return (
    <details className="border-b border-line py-2">
      <summary className="cursor-pointer py-2 font-medium text-navy">{title}</summary>
      <Link href={href} className="block py-2 text-sm text-teal no-underline" onClick={onNavigate}>
        Ver índice
      </Link>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center justify-between py-2 text-sm text-navy no-underline"
          onClick={onNavigate}
        >
          <span>{item.label}</span>
          {item.pending ? <span className="pending-flag">Pendiente</span> : null}
        </Link>
      ))}
    </details>
  );
}
