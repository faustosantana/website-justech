"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/content/site";
import { NAV, V85_BASE, type NeedId } from "@/content/v85";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

type Mega = "soluciones" | "servicios" | "productos" | null;

function onHome(path: string) {
  return path === V85_BASE || path === `${V85_BASE}/`;
}

export function Chrome({
  onNeed,
  onTalk,
}: {
  onNeed?: (id: NeedId) => void;
  onTalk?: () => void;
}) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [megaKey, setMegaKey] = useState<Mega>(null);
  const [solid, setSolid] = useState(!onHome(path));

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

  useEffect(() => {
    if (!onHome(path)) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  function close() {
    setMegaKey(null);
    setMenu(false);
  }

  const serviciosOpen =
    path.includes("/cableado") ||
    path.includes("/redes") ||
    path.includes("/soporte-tecnico") ||
    path.includes("motivo=seguridad") ||
    path.includes("motivo=nube");
  const productosOpen = path.includes("/equipos") || path.includes("/licenciamiento");
  const recursosOpen = path.includes("/recursos");
  const contactoOpen = path.includes("/contacto") || path.includes("/solicitar");

  return (
    <header className={`${styles.head} ${solid ? styles.headSolid : ""}`}>
      <Link className={styles.brand} href={`${V85_BASE}/`} aria-label="Justech" onClick={close}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase("/brand/justech-logo.png")}
          alt="Justech"
          width={300}
          height={72}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </Link>
      <nav className={styles.nav} aria-label="Principal">
        <button
          type="button"
          aria-expanded={megaKey === "soluciones"}
          data-active={onHome(path) && path.includes("necesidad") ? "1" : undefined}
          onClick={() => setMegaKey((p) => (p === "soluciones" ? null : "soluciones"))}
        >
          Soluciones
        </button>
        <button
          type="button"
          aria-expanded={megaKey === "servicios"}
          data-active={serviciosOpen ? "1" : undefined}
          onClick={() => setMegaKey((p) => (p === "servicios" ? null : "servicios"))}
        >
          Servicios
        </button>
        <button
          type="button"
          aria-expanded={megaKey === "productos"}
          data-active={productosOpen ? "1" : undefined}
          onClick={() => setMegaKey((p) => (p === "productos" ? null : "productos"))}
        >
          Productos
        </button>
        <Link href={`${V85_BASE}/contacto/?motivo=industrias`} onClick={close}>
          Industrias
        </Link>
        <Link href={`${V85_BASE}/recursos/`} aria-current={recursosOpen ? "page" : undefined} onClick={close}>
          Recursos
        </Link>
        <Link href={`${V85_BASE}/#ecosistema`} onClick={close}>
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
          <Link className={styles.cta} href={NAV.cta.href} aria-current={contactoOpen ? "page" : undefined}>
            {NAV.cta.label}
          </Link>
        )}
        <button type="button" className={styles.menu} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
          {menu ? "Cerrar" : "Menú"}
        </button>
      </div>
      {megaKey ? (
        <div className={styles.mega} data-cols={megaKey === "soluciones" ? "3" : "3"}>
          {megaKey === "soluciones"
            ? NAV.soluciones.needs.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    if (onNeed && item.label.startsWith("Abrir")) onNeed("sede");
                    if (onNeed && item.label.startsWith("Actualizar")) onNeed("modernizar");
                    if (onNeed && item.label.startsWith("Mantener")) onNeed("operar");
                    close();
                  }}
                >
                  <strong>{item.label}</strong>
                  <span>{item.hint}</span>
                </Link>
              ))
            : megaKey === "servicios"
              ? NAV.servicios.map((item) => (
                  <Link key={item.label} href={item.href} onClick={close}>
                    <strong>{item.label}</strong>
                    <span>{item.hint}</span>
                  </Link>
                ))
              : NAV.productos.map((item) => (
                  <Link key={item.label} href={item.href} onClick={close}>
                    <strong>{item.label}</strong>
                    <span>{item.hint}</span>
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
  return (
    <div className={styles.page} data-v="87">
      <Chrome />
      {children}
      <Foot />
    </div>
  );
}
