"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  aboutLinks,
  company,
  published,
  recursosLinks,
  services,
  solutions,
} from "@/content/site";
import { withBase } from "@/lib/paths";

type Item = { href: string; label: string; pending?: boolean };

function Mega({
  id,
  label,
  items,
}: {
  id: string;
  label: string;
  items: Item[];
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const visible = published(items);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={wrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        <Link
          href={id}
          className="inline-flex min-h-11 items-center px-2 text-[0.95rem] font-medium text-navy hover:text-teal"
        >
          {label}
        </Link>
        <button
          type="button"
          className="nav-chevron"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Cerrar" : "Abrir"} menú de ${label}`}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden>▾</span>
        </button>
      </div>
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-40 min-w-[18rem] border border-line bg-white p-3 shadow-[var(--shadow-lg)]"
      >
        <ul className="m-0 list-none p-0">
          {visible.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-11 items-center px-2 py-2 text-sm text-ink hover:bg-paper"
                onClick={() => setOpen(false)}
              >
                {item.label}
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
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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

        <nav aria-label="Principal" className="nav-desktop">
          <Mega id="/soluciones/" label="Soluciones" items={solutions} />
          <Mega id="/servicios/" label="Servicios" items={services} />
          <Mega id="/nosotros/" label="Nosotros" items={aboutLinks} />
          <Mega id="/recursos/" label="Recursos" items={recursosLinks} />
          <Link href="/contacto/" className="nav-link nav-link-strong">
            Contacto
          </Link>
          <a href={company.supportUrl} className="nav-link nav-link-support">
            Soporte
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="nav-mobile-panel">
          <nav aria-label="Móvil" className="container flex flex-col py-3">
            <MobileGroup
              title="Soluciones"
              href="/soluciones/"
              items={published(solutions)}
              onNavigate={() => setOpen(false)}
            />
            <MobileGroup
              title="Servicios"
              href="/servicios/"
              items={published(services)}
              onNavigate={() => setOpen(false)}
            />
            <MobileGroup
              title="Nosotros"
              href="/nosotros/"
              items={published(aboutLinks)}
              onNavigate={() => setOpen(false)}
            />
            <Link href="/recursos/faqs/" className="min-h-11 py-3 text-navy no-underline" onClick={() => setOpen(false)}>
              Preguntas frecuentes
            </Link>
            <Link href="/contacto/" className="min-h-11 py-3 font-semibold text-navy no-underline" onClick={() => setOpen(false)}>
              Contacto
            </Link>
            <a href={company.supportUrl} className="min-h-11 py-3 text-teal no-underline">
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
  items: Item[];
  onNavigate: () => void;
}) {
  return (
    <details className="border-b border-line py-2">
      <summary className="cursor-pointer py-2 font-medium text-navy">{title}</summary>
      <Link href={href} className="block min-h-11 py-2 text-sm text-teal no-underline" onClick={onNavigate}>
        Ver índice
      </Link>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex min-h-11 items-center py-2 text-sm text-navy no-underline"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </details>
  );
}
