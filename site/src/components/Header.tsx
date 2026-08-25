"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { company } from "@/content/site";
import { withBase } from "@/lib/paths";

type Item = { href: string; label: string; external?: boolean };

const intents: { title: string; items: Item[] }[] = [
  {
    title: "Quiero mejorar",
    items: [
      { href: "/soluciones/modernizacion-de-infraestructura/", label: "Modernizar infraestructura" },
      { href: "/soluciones/continuidad-operacional/", label: "Continuidad operacional" },
    ],
  },
  {
    title: "Necesito implementar",
    items: [
      { href: "/redes/", label: "Redes" },
      { href: "/infraestructura-fisica/", label: "Infraestructura física" },
      { href: "/nube/", label: "Nube" },
    ],
  },
  {
    title: "Necesito comprar",
    items: [
      { href: "/productos/laptops/", label: "Equipos" },
      { href: "/licenciamiento/", label: "Licenciamiento" },
    ],
  },
  {
    title: "Necesito soporte",
    items: [
      { href: "/soporte/", label: "Mesa de ayuda" },
      { href: company.supportUrl, label: "Portal de clientes", external: true },
    ],
  },
  {
    title: "Quiero administrar",
    items: [{ href: "/servicios/servicios-administrados/", label: "Servicios administrados" }],
  },
];

const caps: { title: string; items: Item[] }[] = [
  {
    title: "Productos",
    items: [
      { href: "/productos/laptops/", label: "Equipos" },
      { href: "/productos/servidores/", label: "Servidores" },
    ],
  },
  {
    title: "Infraestructura",
    items: [
      { href: "/redes/", label: "Redes" },
      { href: "/infraestructura-fisica/", label: "Cableado y planta" },
    ],
  },
  {
    title: "Software y nube",
    items: [
      { href: "/licenciamiento/", label: "Licenciamiento" },
      { href: "/nube/", label: "Nube" },
    ],
  },
  {
    title: "Seguridad",
    items: [{ href: "/seguridad/", label: "Capas de seguridad" }],
  },
  {
    title: "Servicios",
    items: [
      { href: "/servicios/servicios-administrados/", label: "Servicios administrados" },
      { href: "/soporte/", label: "Soporte" },
    ],
  },
];

const empresa: Item[] = [
  { href: "/nosotros/", label: "Nosotros" },
  { href: "/recursos/", label: "Recursos" },
  { href: "/contacto/", label: "Contacto" },
];

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
    <header className="site-header v5-nav">
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
                loading="lazy"
                decoding="async"
                fetchPriority="low"
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
          <IntentMega />
          <Link href="/productos/" className="nav-link">
            Productos
          </Link>
          <SimpleMega label="Empresa" href="/nosotros/" items={empresa} />
          <Link href="/soporte/" className="nav-link">
            Soporte
          </Link>
        </nav>
      </div>
      {open ? (
        <div id="mobile-nav" className="nav-mobile-panel">
          <nav aria-label="Móvil" className="container flex flex-col py-3">
            {intents.map((g) => (
              <details key={g.title} className="border-b border-white/10 py-2">
                <summary className="cursor-pointer py-2 font-medium">{g.title}</summary>
                {g.items.map((item) =>
                  item.external ? (
                    <a key={item.href} href={item.href} className="flex min-h-11 items-center py-2 text-sm no-underline">
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex min-h-11 items-center py-2 text-sm no-underline"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </details>
            ))}
            <Link href="/productos/" className="min-h-11 py-3 no-underline" onClick={() => setOpen(false)}>
              Productos
            </Link>
            <Link href="/nosotros/" className="min-h-11 py-3 no-underline" onClick={() => setOpen(false)}>
              Nosotros
            </Link>
            <Link href="/contacto/" className="min-h-11 py-3 font-semibold no-underline" onClick={() => setOpen(false)}>
              Solicitar asesoría
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function IntentMega() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"need" | "cap">("need");
  const wrap = useRef<HTMLDivElement>(null);
  const panelId = useId();
  useDismiss(wrap, () => setOpen(false));
  const groups = mode === "need" ? intents : caps;
  return (
    <div className="relative" ref={wrap} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="nav-item">
        <Link href="/soluciones/" className="nav-link">
          Capacidades
        </Link>
        <button
          type="button"
          className="nav-chevron"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Cerrar" : "Abrir"} menú de capacidades`}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden>▾</span>
        </button>
      </div>
      <div id={panelId} hidden={!open} className="mega-panel wide">
        <div className="mega-modes" role="tablist" aria-label="Modo de navegación">
          <button type="button" role="tab" aria-selected={mode === "need"} className={mode === "need" ? "is-on" : ""} onClick={() => setMode("need")}>
            Por necesidad
          </button>
          <button type="button" role="tab" aria-selected={mode === "cap"} className={mode === "cap" ? "is-on" : ""} onClick={() => setMode("cap")}>
            Por capacidad
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="eyebrow m-0">{g.title}</p>
              <ul className="mt-2">
                {g.items.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a href={item.href}>{item.label}</a>
                    ) : (
                      <Link href={item.href} onClick={() => setOpen(false)}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SimpleMega({ label, href, items }: { label: string; href: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const panelId = useId();
  useDismiss(wrap, () => setOpen(false));
  return (
    <div className="relative" ref={wrap} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="nav-item">
        <Link href={href} className="nav-link">
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
      <div id={panelId} hidden={!open} className="mega-panel">
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function useDismiss(wrap: RefObject<HTMLDivElement | null>, close: () => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onClick(e: MouseEvent) {
      if (!wrap.current?.contains(e.target as Node)) close();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [wrap, close]);
}
