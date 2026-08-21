"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  aboutLinks,
  cablingLinks,
  company,
  industryLinks,
  productGroups,
  recursosLinks,
  services,
  solutions,
} from "@/content/site";
import { withBase } from "@/lib/paths";

type Item = { href: string; label: string; hint?: string };

function Mega({
  id,
  label,
  items,
  wide = false,
}: {
  id: string;
  label: string;
  items: Item[];
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const panelId = useId();

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
      <div className="nav-item">
        <Link href={id} className="nav-link">
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
      <div id={panelId} hidden={!open} className={`mega-panel${wide ? " wide" : ""}`}>
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                <span>
                  {item.label}
                  {item.hint ? <span className="mega-hint">{item.hint}</span> : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MegaProducts() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const panelId = useId();

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
      <div className="nav-item">
        <Link href="/productos/" className="nav-link">
          Productos
        </Link>
        <button
          type="button"
          className="nav-chevron"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Cerrar" : "Abrir"} menú de productos`}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden>▾</span>
        </button>
      </div>
      <div id={panelId} hidden={!open} className="mega-panel wide">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productGroups.map((g) => (
            <div key={g.title}>
              <p className="eyebrow m-0">{g.title}</p>
              <ul className="mt-2">
                {g.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mb-0 mt-3 text-sm">
          <Link href="/infraestructura-fisica/" className="text-teal no-underline" onClick={() => setOpen(false)}>
            Infraestructura física y cableado →
          </Link>
        </p>
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
    <header className="site-header">
      <div className="container">
        <div className="header-utility">
          <Link href="/" className="brand-lockup" aria-label="Justech, inicio">
            <span className="brand-chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase("/brand/justech-logo.png")}
                alt="Justech"
                width={150}
                height={36}
              />
            </span>
          </Link>

          <div className="header-actions">
            <a className="nav-link" href={`tel:${company.phoneTel}`}>
              {company.phoneDisplay}
            </a>
            <a href={company.supportUrl} className="nav-link nav-link-support">
              Soporte
            </a>
            <Link href="/contacto/" className="nav-link nav-link-strong">
              Solicitar asesoría
            </Link>
          </div>

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

        <nav aria-label="Principal" className="nav-desktop">
          <Mega id="/soluciones/" label="Soluciones" items={solutions} wide />
          <Mega id="/servicios/" label="Servicios" items={services} wide />
          <MegaProducts />
          <Mega id="/industrias/" label="Industrias" items={industryLinks} />
          <Mega id="/recursos/" label="Recursos" items={recursosLinks} />
          <Mega id="/nosotros/" label="Nosotros" items={aboutLinks} />
          <Link href="/infraestructura-fisica/" className="nav-link">
            Infraestructura
          </Link>
          <Link href="/contacto/" className="nav-link">
            Contacto
          </Link>
        </nav>
      </div>

      {open ? (
        <div id="mobile-nav" className="nav-mobile-panel">
          <nav aria-label="Móvil" className="container flex flex-col py-3">
            <MobileGroup title="Soluciones" href="/soluciones/" items={solutions} onNavigate={() => setOpen(false)} />
            <MobileGroup title="Servicios" href="/servicios/" items={services} onNavigate={() => setOpen(false)} />
            <MobileGroup
              title="Productos"
              href="/productos/"
              items={productGroups.flatMap((g) => g.items)}
              onNavigate={() => setOpen(false)}
            />
            <MobileGroup
              title="Infraestructura física"
              href="/infraestructura-fisica/"
              items={cablingLinks}
              onNavigate={() => setOpen(false)}
            />
            <MobileGroup title="Industrias" href="/industrias/" items={industryLinks} onNavigate={() => setOpen(false)} />
            <MobileGroup title="Recursos" href="/recursos/" items={recursosLinks} onNavigate={() => setOpen(false)} />
            <MobileGroup title="Nosotros" href="/nosotros/" items={aboutLinks} onNavigate={() => setOpen(false)} />
            <Link href="/contacto/" className="min-h-11 py-3 font-semibold no-underline" onClick={() => setOpen(false)}>
              Solicitar asesoría
            </Link>
            <a href={company.supportUrl} className="min-h-11 py-3 no-underline">
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
    <details className="border-b border-white/10 py-2">
      <summary className="cursor-pointer py-2 font-medium">{title}</summary>
      <Link href={href} className="block min-h-11 py-2 text-sm no-underline" onClick={onNavigate}>
        Ver índice
      </Link>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex min-h-11 items-center py-2 text-sm no-underline"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </details>
  );
}
