"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { company } from "@/content/site";
import { withBase } from "@/lib/paths";
import { NetworkBoard } from "./NetworkBoard";

const layers = ["Infraestructura", "Red", "Dispositivos", "Software", "Seguridad", "Soporte"];

const caps = [
  { t: "Equipos", d: "Selección, imagen y entrega por puesto, con inventario y garantía." },
  { t: "Redes", d: "Sede, sucursales y acceso documentados, con enlace de respaldo." },
  { t: "Licencias", d: "Identidad y aplicaciones bajo un tenant, no como compras sueltas." },
  { t: "Seguridad", d: "Controles en cada capa, sin apagar la operación." },
  { t: "Nube", d: "Colaboración, datos y respaldo con dueño y recorrido claro." },
  { t: "Soporte", d: "Un caso, un responsable, un cierre. Portal aparte, en Odoo." },
];

const netViews = [
  { id: "general", t: "Vista general", d: "Sede, sucursal, nube y el hilo que las une." },
  { id: "red", t: "Red", d: "ISP, borde, firewall, core, acceso y APs." },
  { id: "seguridad", t: "Seguridad", d: "El tráfico pasa por el firewall. Piso y servidores se separan." },
  { id: "sucursales", t: "Sucursales", d: "Enlace propio. El secundario espera y entra si hace falta." },
] as const;

const netStory = [
  "Entra la conectividad",
  "Se activa el firewall",
  "Se conecta el core",
  "Entran los switches de acceso",
  "Se encienden los APs",
  "Aparecen los puestos",
  "Se conectan los servidores",
  "Se enlaza la nube",
  "Falla el enlace principal",
  "Entra el respaldo",
  "Se abre el caso",
];

const profiles = [
  { t: "Administrativo", d: "Oficina, imagen estándar, cifrado y mesa de ayuda." },
  { t: "Ejecutivo", d: "Ligero, autonomía larga, reuniones sin fricción." },
  { t: "Ingeniería", d: "Cómputo local, docks y refrigeración sostenida." },
  { t: "Movilidad", d: "Peso, batería y conectividad de campo." },
  { t: "Diseño", d: "Color, pantalla y almacenamiento, a cotizar." },
];

const cycle = ["Selección", "Configuración", "Seguridad", "Inventario", "Entrega", "Garantía"];

const ticketSteps = [
  { t: "Señal", d: "La sede pierde el enlace primario." },
  { t: "Respaldo", d: "El secundario sostiene la operación." },
  { t: "Portal", d: "El reporte entra con evidencia." },
  { t: "Caso", d: "Sucursal sin conectividad." },
  { t: "N1", d: "Clasificación y asignación." },
  { t: "Diagnóstico", d: "Se revisa el enlace y el sitio." },
  { t: "Corrección", d: "Se restablece la ruta." },
  { t: "Cierre", d: "Se valida y se documenta." },
];

const scenes = [
  { t: "Sede", d: "Rack, core y mesa en el mismo edificio. La operación se ve, no se adivina." },
  { t: "Sucursal", d: "Mismo acceso, enlace propio y un respaldo que entra sin teatro." },
  { t: "Puesto", d: "Equipo, identidad y aplicaciones listos antes de sentarse." },
];

const needs = [
  { id: "equipos", t: "Equipos" },
  { id: "redes", t: "Redes" },
  { id: "cableado", t: "Cableado" },
  { id: "licencias", t: "Licencias" },
  { id: "seguridad", t: "Seguridad" },
  { id: "nube", t: "Nube" },
  { id: "soporte", t: "Soporte" },
  { id: "proyecto", t: "Proyecto integral" },
];

export function ConceptV7() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [layer, setLayer] = useState(0);
  const [view, setView] = useState<(typeof netViews)[number]["id"]>("general");
  const [beat, setBeat] = useState(0);
  const [profile, setProfile] = useState(0);
  const [moreProfiles, setMoreProfiles] = useState(false);
  const [cyc, setCyc] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [need, setNeed] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.body.classList.add("landing-mode");
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.body.classList.remove("landing-mode");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLayer(layers.length - 1);
      setBeat(netStory.length - 1);
      setCyc(cycle.length - 1);
      setTicket(ticketSteps.length - 1);
      return;
    }
    const a = window.setInterval(() => setLayer((n) => (n + 1) % layers.length), 1600);
    const b = window.setInterval(() => setBeat((n) => (n + 1) % netStory.length), 1400);
    const c = window.setInterval(() => setCyc((n) => (n + 1) % cycle.length), 1800);
    const d = window.setInterval(() => setTicket((n) => (n + 1) % ticketSteps.length), 1600);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
      window.clearInterval(c);
      window.clearInterval(d);
    };
  }, []);

  const shownProfiles = moreProfiles ? profiles : profiles.slice(0, 3);
  const p = profiles[profile];
  const net = netViews.find((v) => v.id === view) ?? netViews[0];
  const closed = ticket === ticketSteps.length - 1;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="v7">
      <header className={`v7-head ${solid ? "is-solid" : ""}`}>
        <div className="v7-head-inner">
          <Link href="/concepto-v7/" className="v7-brand" aria-label="Justech, concepto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/brand/justech-mark-white.png")} alt="" width={28} height={20} />
            <span>Justech</span>
          </Link>
          <nav className="v7-nav" aria-label="Principal">
            <div className="v7-mega-wrap">
              <button
                type="button"
                className="v7-mega-btn"
                aria-expanded={mega}
                onClick={() => setMega((v) => !v)}
              >
                Capacidades
              </button>
              {mega ? (
                <div className="v7-mega" onMouseLeave={() => setMega(false)}>
                  {caps.map((c) => (
                    <a key={c.t} href={`#${c.t === "Redes" ? "red" : c.t === "Equipos" ? "equipos" : c.t === "Soporte" ? "soporte" : "capacidades"}`} onClick={() => setMega(false)}>
                      <strong>{c.t}</strong>
                      <span>{c.d}</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <a href="#red">Redes</a>
            <a href="#equipos">Equipos</a>
            <a href="#soporte">Soporte</a>
          </nav>
          <div className="v7-head-actions">
            <a className="v7-phone" href={`tel:${company.phoneTel}`}>
              {company.phoneDisplay}
            </a>
            <a className="v7-cta" href="#conversar">
              Solicitar asesoría
            </a>
            <button type="button" className="v7-menu" aria-expanded={open} aria-controls="v7-drawer" onClick={() => setOpen((v) => !v)}>
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
        <div id="v7-drawer" className={`v7-drawer ${open ? "open" : ""}`}>
          <a href="#capacidades" onClick={() => setOpen(false)}>
            Capacidades
          </a>
          <a href="#red" onClick={() => setOpen(false)}>
            Redes
          </a>
          <a href="#equipos" onClick={() => setOpen(false)}>
            Equipos
          </a>
          <a href="#soporte" onClick={() => setOpen(false)}>
            Soporte
          </a>
          <a href="#conversar" onClick={() => setOpen(false)}>
            Solicitar asesoría
          </a>
        </div>
      </header>

      <main id="contenido">
        <section className="v7-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/visual/v7/v7-hero.jpg")} alt="" width={1536} height={1024} fetchPriority="high" />
          <div className="v7-hero-shade" />
          <div className="v7-hero-copy">
            <p className="v7-kicker">Justech · Santo Domingo · Desde {company.founded}</p>
            <h1>La capa que mantiene el negocio en movimiento.</h1>
            <p className="v7-lead">
              Diseñamos, suministramos, conectamos, protegemos y soportamos la operación empresarial.
            </p>
            <div className="v7-hero-actions">
              <a className="v7-cta" href="#conversar">
                Solicitar diagnóstico
              </a>
              <a className="v7-ghost" href="#red">
                Ver cómo opera
              </a>
            </div>
            <p className="v7-trust-line">Integradora en {company.city}. Un interlocutor. El portal de soporte vive en otro host.</p>
            <ul className="v7-layers" aria-label="Capas de la operación">
              {layers.map((name, i) => (
                <li key={name} className={i === layer ? "is-on" : i < layer ? "is-done" : ""}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="v7-band" id="propuesta">
          <div className="v7-wrap v7-trust">
            <div>
              <p className="v7-kicker">Propuesta</p>
              <h2>Una integradora. Un sistema. Un interlocutor.</h2>
            </div>
            <p className="v7-lead">
              Equipos, redes, licencias, seguridad, nube y soporte se diseñan juntos para que la empresa no se detenga.
            </p>
            <ul className="v7-facts">
              <li>
                <strong>{company.city}</strong>
                <span>{company.country}</span>
              </li>
              <li>
                <strong>Desde {company.founded}</strong>
                <span>Operación local, criterio de integradora.</span>
              </li>
              <li>
                <strong>{company.hours.split("(")[0].trim()}</strong>
                <span>Mesa en horario laboral. Portal {company.supportUrl.replace("https://", "")}.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="v7-block alt" id="capacidades">
          <div className="v7-wrap">
            <p className="v7-kicker">Capacidades conectadas</p>
            <h2>Seis capas, una conversación.</h2>
            <p className="v7-lead dark">No son catálogos paralelos. Cada capa entrega a la siguiente.</p>
            <ul className="v7-caps">
              {caps.map((c) => (
                <li key={c.t}>
                  <strong>{c.t}</strong>
                  <span>{c.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="v7-block" id="red">
          <div className="v7-wrap split">
            <div>
              <p className="v7-kicker">Redes</p>
              <h2>Una topología que se puede ver y operar.</h2>
              <p className="v7-lead dark">Sede, sucursal y nube en el mismo dibujo. Equipos reconocibles, no nodos genéricos.</p>
              <div className="v7-pills" role="tablist" aria-label="Vista de red">
                {netViews.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={view === v.id}
                    className={view === v.id ? "is-on" : ""}
                    onClick={() => setView(v.id)}
                  >
                    {v.t}
                  </button>
                ))}
              </div>
              <p className="v7-note">
                <strong>{net.t}.</strong> {net.d}
              </p>
              <div className="v7-beat" aria-live="polite">
                <span>
                  {String(beat + 1).padStart(2, "0")} / {String(netStory.length).padStart(2, "0")}
                </span>
                <p>{netStory[beat]}</p>
                <ol>
                  {netStory.map((s, i) => (
                    <li key={s} className={i === beat ? "is-on" : i < beat ? "is-done" : ""}>
                      <span className="v7-sr">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <NetworkBoard view={view} beat={beat} />
          </div>
        </section>

        <section className="v7-block alt" id="equipos">
          <div className="v7-wrap split reverse">
            <figure className="v7-shot light">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase("/visual/v7/v7-laptop.jpg")} alt="Portátil empresarial en estudio, listo para imagen y cifrado." width={1536} height={1024} />
              <figcaption>
                {cycle[cyc]} · perfil {p.t}
              </figcaption>
            </figure>
            <div>
              <p className="v7-kicker">Equipos y licenciamiento</p>
              <h2>Un puesto preparado, no una caja.</h2>
              <p className="v7-lead dark">{p.d}</p>
              <div className="v7-pills" role="tablist" aria-label="Perfil de puesto">
                {shownProfiles.map((x) => {
                  const idx = profiles.findIndex((n) => n.t === x.t);
                  return (
                    <button
                      key={x.t}
                      type="button"
                      role="tab"
                      aria-selected={profile === idx}
                      className={profile === idx ? "is-on" : ""}
                      onClick={() => setProfile(idx)}
                    >
                      {x.t}
                    </button>
                  );
                })}
                {moreProfiles ? null : (
                  <button type="button" onClick={() => setMoreProfiles(true)}>
                    Ver más
                  </button>
                )}
              </div>
              <ol className="v7-cycle">
                {cycle.map((name, i) => (
                  <li key={name} className={i === cyc ? "is-on" : i < cyc ? "is-done" : ""}>
                    {name}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="v7-block" id="soporte">
          <div className="v7-wrap split">
            <div>
              <p className="v7-kicker">Soporte y servicios administrados</p>
              <h2>El enlace cae. El caso ya está en marcha.</h2>
              <p className="v7-lead dark">
                Un usuario de sucursal pierde conectividad. El respaldo sostiene. La mesa registra, asigna y cierra.
              </p>
              <p>
                <a className="v7-cta" href={company.supportUrl}>
                  Entrar al portal
                </a>
              </p>
            </div>
            <article className="v7-ticket" aria-label="Caso simulado">
              <header>
                <div>
                  <p className="v7-ticket-id">INC-demo</p>
                  <h3>Sucursal sin conectividad</h3>
                </div>
                <span className={`v7-status ${closed ? "is-done" : ""}`}>{closed ? "Cerrado" : "En curso"}</span>
              </header>
              <dl className="v7-ticket-meta">
                <div>
                  <dt>Sitio</dt>
                  <dd>Sucursal · enlace primario</dd>
                </div>
                <div>
                  <dt>Mesa</dt>
                  <dd>N1 · responsable genérico</dd>
                </div>
                <div>
                  <dt>Etapa</dt>
                  <dd>
                    {ticket + 1} / {ticketSteps.length} · {ticketSteps[ticket].t}
                  </dd>
                </div>
              </dl>
              <div className="v7-progress" aria-hidden="true">
                <span style={{ width: `${((ticket + 1) / ticketSteps.length) * 100}%` }} />
              </div>
              <ol>
                {ticketSteps.map((s, i) => (
                  <li key={s.t} className={i === ticket ? "is-on" : i < ticket ? "is-done" : ""}>
                    <strong>{s.t}</strong>
                    <span>{s.d}</span>
                  </li>
                ))}
              </ol>
              <p className="v7-legal">Simulación. Sin datos de clientes ni de producción.</p>
            </article>
          </div>
        </section>

        <section className="v7-block alt" id="escenarios">
          <div className="v7-wrap">
            <p className="v7-kicker">Experiencia</p>
            <h2>Tres escalas, la misma capa.</h2>
            <ul className="v7-scenes">
              {scenes.map((s) => (
                <li key={s.t}>
                  <strong>{s.t}</strong>
                  <span>{s.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="v7-block" id="conversar">
          <div className="v7-wrap narrow">
            <p className="v7-kicker">Conversación</p>
            <h2>¿Qué necesita resolver?</h2>
            {sent ? (
              <p className="v7-notice" role="status">
                Registrado en este entorno de prueba. En el sitio público responde {company.email}. Aquí no se envía correo.
              </p>
            ) : (
              <form className="v7-form" onSubmit={onSubmit}>
                {step === 0 ? (
                  <>
                    <div className="v7-needs">
                      {needs.map((n) => (
                        <button key={n.id} type="button" className={need === n.id ? "is-on" : ""} onClick={() => setNeed(n.id)}>
                          {n.t}
                        </button>
                      ))}
                    </div>
                    <button type="button" className="v7-cta" disabled={!need} onClick={() => setStep(1)}>
                      Continuar
                    </button>
                  </>
                ) : (
                  <>
                    <p className="v7-note">
                      Tema: <strong>{needs.find((n) => n.id === need)?.t}</strong>
                    </p>
                    <label>
                      Nombre
                      <input name="name" autoComplete="name" required />
                    </label>
                    <label>
                      Empresa
                      <input name="company" autoComplete="organization" required />
                    </label>
                    <label>
                      Correo corporativo
                      <input name="email" type="email" autoComplete="email" required />
                    </label>
                    <p className="v7-legal">Formulario de demostración. No hay envío real en staging.</p>
                    <div className="v7-hero-actions">
                      <button type="button" className="v7-ghost dark" onClick={() => setStep(0)}>
                        Atrás
                      </button>
                      <button type="submit" className="v7-cta">
                        Enviar en este entorno
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="v7-foot">
        <div className="v7-wrap foot">
          <div>
            <p className="v7-brand-text">Justech</p>
            <p>
              Integradora tecnológica. {company.city}, desde {company.founded}.
            </p>
            <p>
              <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
          <div>
            <p>Esta muestra</p>
            <a href="#red">Redes</a>
            <a href="#equipos">Equipos</a>
            <a href="#soporte">Soporte</a>
          </div>
          <div>
            <p>Empresa</p>
            <Link href="/nosotros/">Nosotros</Link>
            <Link href="/soporte/">Mesa de ayuda</Link>
            <a href={company.supportUrl}>Portal</a>
          </div>
          <div>
            <p>Legal</p>
            <Link href="/legal/">Centro legal</Link>
            <Link href="/politica-de-privacidad/">Privacidad</Link>
          </div>
        </div>
        <p className="v7-end">
          © {new Date().getFullYear()} {company.legalName}. Concepto V7. El sitio público permanece en www.justech.do.
        </p>
      </footer>
    </div>
  );
}
