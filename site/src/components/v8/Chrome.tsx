"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { company } from "@/content/site";
import { NAV, V85_BASE, type NeedId } from "@/content/v85";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

type Mega = "soluciones" | "servicios" | "productos" | null;

export function Chrome({
  onNeed,
  onTalk,
}: {
  onNeed?: (id: NeedId) => void;
  onTalk?: () => void;
}) {
  const [menu, setMenu] = useState(false);
  const [megaKey, setMegaKey] = useState<Mega>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaKey(null);
        setMenu(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function close() {
    setMegaKey(null);
    setMenu(false);
  }

  return (
    <header className={styles.head}>
      <Link className={styles.brand} href={`${V85_BASE}/`} aria-label="Justech" onClick={close}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={withBase("/brand/justech-logo.png")} alt="Justech" width={300} height={72} />
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        {(
          [
            ["soluciones", "Soluciones"],
            ["servicios", "Servicios"],
            ["productos", "Productos"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-expanded={megaKey === key}
            onClick={() => setMegaKey((p) => (p === key ? null : key))}
          >
            {label}
          </button>
        ))}
        <Link href={`${V85_BASE}/contacto/?motivo=industrias`} onClick={close}>
          Industrias
        </Link>
        <Link href={`${V85_BASE}/recursos/`} onClick={close}>
          Recursos
        </Link>
        <Link href={`${V85_BASE}/#metodo`} onClick={close}>
          Nosotros
        </Link>
        <a href={company.supportUrl} rel="noreferrer">
          Soporte
        </a>
      </nav>
      <div className={styles.headActions}>
        {onTalk ? (
          <a className={styles.cta} href="#conversar" onClick={onTalk}>
            {NAV.cta.label}
          </a>
        ) : (
          <Link className={styles.cta} href={NAV.cta.href}>
            {NAV.cta.label}
          </Link>
        )}
        <button type="button" className={styles.menu} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
          {menu ? "Cerrar" : "Menú"}
        </button>
      </div>
      {megaKey ? (
        <div className={styles.mega} data-cols={megaKey === "soluciones" ? "4" : "3"}>
          {megaKey === "soluciones"
            ? NAV.soluciones.needs.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    if (onNeed && item.label.startsWith("Abrir")) onNeed("sede");
                    if (onNeed && item.label.startsWith("Actualizar")) onNeed("modernizar");
                    close();
                  }}
                >
                  <strong>{item.label}</strong>
                </Link>
              ))
            : megaKey === "servicios"
              ? NAV.servicios.map((item) => (
                  <Link key={item.label} href={item.href} onClick={close}>
                    <strong>{item.label}</strong>
                  </Link>
                ))
              : NAV.productos.map((item) => (
                  <Link key={item.label} href={item.href} onClick={close}>
                    <strong>{item.label}</strong>
                    <span>Solicitar cotización</span>
                  </Link>
                ))}
        </div>
      ) : null}
      {menu ? (
        <div className={styles.drawer}>
          <Link href={`${V85_BASE}/#necesidades`} onClick={close}>
            Abrir o renovar una sede
          </Link>
          <Link href={`${V85_BASE}/#necesidades`} onClick={close}>
            Actualizar tecnología
          </Link>
          <Link href={`${V85_BASE}/#necesidades`} onClick={close}>
            Mantener la operación
          </Link>
          <Link href={`${V85_BASE}/cableado-estructurado/`} onClick={close}>
            Cableado
          </Link>
          <Link href={`${V85_BASE}/redes-empresariales/`} onClick={close}>
            Redes
          </Link>
          <Link href={`${V85_BASE}/equipos-empresariales/`} onClick={close}>
            Equipos
          </Link>
          <Link href={`${V85_BASE}/licenciamiento/`} onClick={close}>
            Licenciamiento
          </Link>
          <Link href={`${V85_BASE}/soporte-tecnico-empresarial/`} onClick={close}>
            Soporte técnico
          </Link>
          <Link href={`${V85_BASE}/recursos/`} onClick={close}>
            Recursos
          </Link>
          <a href={company.supportUrl} rel="noreferrer">
            Portal de soporte
          </a>
          <Link href={NAV.cta.href} onClick={close}>
            {NAV.cta.label}
          </Link>
        </div>
      ) : null}
    </header>
  );
}

export function Foot() {
  return (
    <footer className={styles.foot}>
      <div>
        <strong>{company.legalName}</strong>
        <p>
          {company.city} · desde {company.founded}
        </p>
        <p>{company.hours}</p>
        <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
        <a href={`mailto:${company.email}`}>{company.email}</a>
        <a href={company.supportUrl} rel="noreferrer">
          Portal de soporte
        </a>
      </div>
      <div>
        <Link href={`${V85_BASE}/cableado-estructurado/`}>Cableado</Link>
        <Link href={`${V85_BASE}/redes-empresariales/`}>Redes</Link>
        <Link href={`${V85_BASE}/equipos-empresariales/`}>Equipos</Link>
        <Link href={`${V85_BASE}/licenciamiento/`}>Licenciamiento</Link>
        <Link href={`${V85_BASE}/soporte-tecnico-empresarial/`}>Soporte</Link>
        <Link href={`${V85_BASE}/contacto/`}>Contacto</Link>
        <Link href="/politica-de-privacidad/">Privacidad</Link>
      </div>
    </footer>
  );
}

export function ConceptShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("landing-mode");
    return () => document.body.classList.remove("landing-mode");
  }, []);
  return (
    <div className={styles.page} data-v="85">
      <Chrome />
      {children}
      <Foot />
    </div>
  );
}
