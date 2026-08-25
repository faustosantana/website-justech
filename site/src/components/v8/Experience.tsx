"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { company } from "@/content/site";
import { publicEvidence } from "@/content/evidence";
import {
  cableJourney,
  featuredResources,
  formIntents,
  labActions,
  labNodes,
  licenseJourney,
  pillars,
  productDoors,
  sucursalSteps,
  trustStrip,
  type FormIntent,
} from "@/content/v83";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

type Mode = "construir" | "modernizar" | "operar";
type Mega = "soluciones" | "servicios" | "productos" | "industrias" | null;

const HERO_MS = 1400;
const SCENE_MS = 1400;
const CABLE_MS = 1200;

const heroBeats = [
  "Infraestructura en servicio.",
  "La red llega al puesto.",
  "Las personas trabajan.",
  "El negocio sigue operando.",
];
const heroDesk = ["v83-hero-rack", "v83-hero-ops", "v83-hero-ops", "v83-hero-result"];

const modes: {
  id: Mode;
  t: string;
  problem: string;
  solution: string;
  result: string;
  cta: string;
  href: string;
  hrefLabel: string;
}[] = [
  {
    id: "construir",
    t: "Construir",
    problem: "Una sede nueva no puede abrir con cable suelto, Wi-Fi improvisado y equipos sin inventario.",
    solution: "Levantamos, diseñamos la planta, suministramos e instalamos con un responsable.",
    result: "El primer día hay red, puestos y documentación.",
    cta: "Planificar una sede",
    href: "/infraestructura-fisica/",
    hrefLabel: "Infraestructura física",
  },
  {
    id: "modernizar",
    t: "Modernizar",
    problem: "Equipos al límite, licencias dispersas e identidad sin gobierno.",
    solution: "Renovamos puestos, licenciamiento, seguridad y nube en un mismo alcance.",
    result: "El usuario entra y trabaja. La renovación queda calendarizada.",
    cta: "Preparar un puesto",
    href: "/licenciamiento/",
    hrefLabel: "Licenciamiento",
  },
  {
    id: "operar",
    t: "Operar",
    problem: "Cuando cae el enlace, nadie sabe quién responde ni qué quedó documentado.",
    solution: "Mesa, mantenimiento y un proceso visible: de la falla al cierre.",
    result: "El respaldo sostiene. El caso queda en el historial.",
    cta: "Ver falla y respaldo",
    href: "/soporte/",
    hrefLabel: "Soporte",
  },
];

const construir = ["Plano", "Cableado", "Rack y red", "Puestos activos"];
const construirFrames = ["v82-sede-vacio", "v82-sede-cables", "v82-sede-rack", "v82-sede-activa"];

const modernizar = [
  "Preparando equipo",
  "Registrando identidad",
  "Aplicando seguridad",
  "Instalando aplicaciones",
  "Conectando servicios",
  "Listo para entregar",
];
const modernizarFrames = [
  "v82-modern-old",
  "v82-modern-id",
  "v82-modern-sec",
  "v82-modern-apps",
  "v82-modern-cloud",
  "v82-puesto-listo",
];

const operar = ["Operación normal", "Cuarto técnico", "Infraestructura en servicio", "Continuidad lista"];
const operarFrames = ["v82-sede-activa", "v82-sede-focus-mdf", "v82-ops-normal", "v82-ops-normal"];

const mega = {
  soluciones: [
    { mode: "construir" as Mode, t: "Construir una sede", d: "De la obra al primer día." },
    { mode: "modernizar" as Mode, t: "Modernizar la operación", d: "Equipos, identidad y nube." },
    { mode: "operar" as Mode, t: "Operar con soporte", d: "Continuidad y mesa de ayuda." },
  ],
  servicios: [
    { href: "/infraestructura-fisica/cableado-estructurado/", t: "Cableado estructurado" },
    { href: "/redes/", t: "Redes empresariales" },
    { href: "/servicios/servicios-administrados/", t: "Servicios administrados" },
    { href: "/soporte/", t: "Soporte y mesa" },
  ],
  productos: [
    { href: "/productos/laptops/", t: "Laptops" },
    { href: "/productos/servidores/", t: "Servidores" },
    { href: "/productos/redes/", t: "Networking" },
    { href: "/productos/licencias/", t: "Software y licencias" },
  ],
  industrias: [
    { href: "/industrias/", t: "Sectores con oferta aplicable" },
    { href: "/industrias/multisucursal/", t: "Empresas con sucursales" },
    { href: "/nosotros/", t: "Quiénes somos" },
  ],
} as const;

function stepsOf(mode: Mode, focused: boolean) {
  if (mode === "construir") return construir;
  if (mode === "modernizar") return modernizar;
  return focused ? sucursalSteps.map((s) => s.t) : operar;
}

function framesOf(mode: Mode, focused: boolean) {
  if (mode === "construir") return construirFrames;
  if (mode === "modernizar") return modernizarFrames;
  return focused ? sucursalSteps.map((s) => s.frame) : operarFrames;
}

export function ExperienceV8() {
  const [menu, setMenu] = useState(false);
  const [megaKey, setMegaKey] = useState<Mega>(null);
  const [heroBeat, setHeroBeat] = useState(0);
  const [heroPlay, setHeroPlay] = useState(false);
  const [heroRest, setHeroRest] = useState(false);
  const [heroExtra, setHeroExtra] = useState(false);
  const [mode, setMode] = useState<Mode>("construir");
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [focus, setFocus] = useState(false);
  const [sent, setSent] = useState(false);
  const [intent, setIntent] = useState<FormIntent | "">("");
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);
  const [sceneExtra, setSceneExtra] = useState(false);
  const [wide, setWide] = useState(true);
  const [cableBeat, setCableBeat] = useState(0);
  const [cablePlay, setCablePlay] = useState(false);
  const [licenseBeat, setLicenseBeat] = useState(0);

  const current = modes.find((m) => m.id === mode) ?? modes[0];
  const steps = stepsOf(mode, focus);
  const frames = framesOf(mode, focus);
  const frame = Math.min(beat, steps.length - 1);
  const plate = frames[Math.min(frame, frames.length - 1)];
  const heroPlate = heroRest || reduce ? "v83-hero-day" : heroDesk[heroBeat] ?? "v83-hero-day";
  const progress = ((frame + 1) / steps.length) * 100;
  const facts = useMemo(() => trustStrip(), []);
  const verifiedSlots = useMemo(() => publicEvidence(), []);
  const intentCfg = formIntents.find((item) => item.id === intent);
  const cable = cableJourney[Math.min(cableBeat, cableJourney.length - 1)];
  const license = licenseJourney[Math.min(licenseBeat, licenseJourney.length - 1)];

  const heroDeskUniq = useMemo(
    () => ["v83-hero-day", "v83-hero-rack", "v83-hero-ops", "v83-hero-result"],
    [],
  );

  function talk(next: FormIntent) {
    setIntent(next);
    setFocus(false);
    setMegaKey(null);
    setMenu(false);
    document.getElementById("conversar")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function go(next: Mode, open = false) {
    setMode(next);
    setBeat(0);
    setPlaying(!reduce);
    setMegaKey(null);
    setMenu(false);
    setFocus(open);
    const q = new URLSearchParams({ experiencia: next });
    if (open) q.set("demo", "1");
    window.history.replaceState(null, "", `?${q}`);
    if (!open) document.getElementById("capacidades")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function closeFocus() {
    setFocus(false);
    setBeat(0);
    window.history.replaceState(null, "", `?experiencia=${mode}`);
  }

  useEffect(() => {
    document.body.classList.add("landing-mode");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wideMq = window.matchMedia("(min-width: 721px)");
    const apply = () => {
      setReduce(mq.matches);
      if (mq.matches) {
        setHeroPlay(false);
        setHeroRest(true);
        setPlaying(false);
        setCablePlay(false);
        setHeroBeat(heroBeats.length - 1);
      }
    };
    const applyWide = () => setWide(wideMq.matches);
    apply();
    applyWide();
    mq.addEventListener("change", apply);
    wideMq.addEventListener("change", applyWide);
    const params = new URLSearchParams(window.location.search);
    const exp = params.get("experiencia") as Mode | null;
    if (exp && modes.some((m) => m.id === exp)) setMode(exp);
    if (params.get("demo") === "1") setFocus(true);
    setReady(true);
    const start = window.setTimeout(() => {
      if (!mq.matches) setHeroPlay(true);
    }, 2500);
    const extras = window.setTimeout(() => setHeroExtra(true), 4000);
    return () => {
      document.body.classList.remove("landing-mode");
      mq.removeEventListener("change", apply);
      wideMq.removeEventListener("change", applyWide);
      window.clearTimeout(start);
      window.clearTimeout(extras);
    };
  }, []);

  useEffect(() => {
    if (!heroPlay || reduce || heroRest || focus) return;
    const id = window.setInterval(() => {
      setHeroBeat((n) => {
        if (n >= heroBeats.length - 1) {
          setHeroRest(true);
          setHeroPlay(false);
          return n;
        }
        return n + 1;
      });
    }, HERO_MS);
    return () => window.clearInterval(id);
  }, [heroPlay, reduce, heroRest, focus]);

  useEffect(() => {
    if (focus) return;
    const el = document.getElementById("capacidades");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSceneExtra(true);
        if (reduce) return;
        setPlaying(entry.isIntersecting);
      },
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [focus, reduce]);

  useEffect(() => {
    const el = document.getElementById("cableado");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        setCablePlay(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => setBeat((n) => (n + 1) % steps.length), SCENE_MS);
    return () => window.clearInterval(id);
  }, [playing, reduce, steps.length, mode, focus]);

  useEffect(() => {
    if (!cablePlay || reduce) return;
    const id = window.setInterval(() => setCableBeat((n) => (n + 1) % cableJourney.length), CABLE_MS);
    return () => window.clearInterval(id);
  }, [cablePlay, reduce]);

  useEffect(() => {
    if (mode !== "modernizar" || reduce || focus) return;
    const id = window.setInterval(() => setLicenseBeat((n) => (n + 1) % licenseJourney.length), 1600);
    return () => window.clearInterval(id);
  }, [mode, reduce, focus]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (megaKey || menu) {
          setMegaKey(null);
          setMenu(false);
          return;
        }
        if (focus) closeFocus();
      }
      if (e.code === "Space" && focus) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "BUTTON" || tag === "A" || tag === "TEXTAREA" || tag === "SELECT") return;
        e.preventDefault();
        setPlaying((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- closeFocus only uses setters and mode
  }, [focus, megaKey, menu, mode]);

  function replayHero() {
    setHeroBeat(0);
    setHeroRest(false);
    setHeroPlay(!reduce);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const showTicket = focus && mode === "operar" && frame >= 4;
  const failBeat = focus && mode === "operar" ? frame : -1;

  return (
    <div className={styles.page} data-ready={ready ? "1" : "0"} data-v="83">
      <header className={styles.head}>
        <a className={styles.brand} href="#inicio" aria-label="Justech" onClick={() => setFocus(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/brand/justech-logo.png")} alt="Justech" width={300} height={72} />
        </a>
        <nav className={styles.nav} aria-label="Principal">
          {(
            [
              ["soluciones", "Soluciones"],
              ["servicios", "Servicios"],
              ["productos", "Productos"],
              ["industrias", "Industrias"],
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
          <a href="#metodo" onClick={() => setMegaKey(null)}>
            Nosotros
          </a>
          <a href={company.supportUrl}>Soporte</a>
        </nav>
        <div className={styles.headActions}>
          <a className={styles.cta} href="#conversar" onClick={() => setIntent("especialista")}>
            Hablar con un especialista
          </a>
          <button type="button" className={styles.menu} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
            {menu ? "Cerrar" : "Menú"}
          </button>
        </div>
        {megaKey ? (
          <div className={styles.mega}>
            {mega[megaKey].map((item) =>
              "mode" in item ? (
                <button key={item.t} type="button" onClick={() => go(item.mode)}>
                  <strong>{item.t}</strong>
                  {"d" in item ? <span>{item.d}</span> : null}
                </button>
              ) : (
                <Link key={item.t} href={item.href} onClick={() => setMegaKey(null)}>
                  <strong>{item.t}</strong>
                </Link>
              ),
            )}
          </div>
        ) : null}
        {menu ? (
          <div className={styles.drawer}>
            {modes.map((m) => (
              <button key={m.id} type="button" onClick={() => go(m.id)}>
                {m.t}
              </button>
            ))}
            <a href="#productos" onClick={() => setMenu(false)}>
              Productos
            </a>
            <a href="#cableado" onClick={() => setMenu(false)}>
              Cableado
            </a>
            <a href="#metodo" onClick={() => setMenu(false)}>
              Nosotros
            </a>
            <a href={company.supportUrl}>Soporte</a>
            <a href="#conversar" onClick={() => setMenu(false)}>
              Hablar con un especialista
            </a>
          </div>
        ) : null}
      </header>

      {focus ? (
        <div className={styles.focus} role="dialog" aria-modal="true" aria-label={current.t}>
          <Scene mode={mode} plate={plate} beat={frame} focused extra />
          {showTicket ? <Ticket beat={frame} /> : null}
          <aside className={styles.sheet}>
            <p className={styles.kicker}>{current.t}</p>
            <p className={styles.state} aria-live="polite">
              {steps[frame]}
            </p>
            {mode === "operar" ? (
              <>
                <p className={styles.demoNote}>Demostración de arquitectura y proceso.</p>
                <RouteRead beat={failBeat} />
                <LabActions
                  current={frame}
                  onPick={(step) => {
                    setBeat(step);
                    setPlaying(false);
                  }}
                />
              </>
            ) : null}
            <div className={styles.sheetActions}>
              <button type="button" onClick={() => setPlaying((v) => !v)}>
                {playing ? "Pausar" : "Reproducir"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setBeat((n) => (n + 1) % steps.length);
                  setPlaying(false);
                }}
              >
                Siguiente
              </button>
              <button type="button" className={styles.cta} onClick={() => talk("especialista")}>
                Conversar
              </button>
            </div>
            <button type="button" className={styles.quiet} onClick={closeFocus}>
              Cerrar · Esc
            </button>
          </aside>
        </div>
      ) : null}

      <main id="contenido" hidden={focus}>
        <section className={styles.hero} id="inicio" aria-label="Hero">
          <div className={styles.heroStage} data-beat={heroRest ? "rest" : heroBeat} data-motion={reduce ? "reduce" : "ok"}>
            <Plate
              name="v83-hero-day"
              mobile="v83-hero-mobile"
              alt="Oficina empresarial de día: rack, puestos de trabajo y ciudad."
              width={1600}
              height={900}
              priority
              active={wide ? heroPlate === "v83-hero-day" : heroRest || reduce || heroBeat < 1}
              avif
            />
            {heroExtra
              ? wide
                ? heroDeskUniq
                    .filter((n) => n !== "v83-hero-day")
                    .map((n) => (
                      <Plate key={n} name={n} alt="" width={1600} height={900} active={heroPlate === n} />
                    ))
                : (
                    <Plate
                      name="v83-hero-mobile-live"
                      alt=""
                      width={900}
                      height={1600}
                      active={!heroRest && !reduce && heroBeat >= 1}
                    />
                  )
              : null}
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.trustLine}>Integración tecnológica empresarial desde Santo Domingo.</p>
            <h1>Tecnología empresarial de extremo a extremo.</h1>
            <p>
              Diseñamos, suministramos, conectamos y soportamos la infraestructura, los equipos y las plataformas que
              mantienen su negocio operando.
            </p>
            <div className={styles.heroCtas}>
              <a className={styles.cta} href="#conversar" onClick={() => setIntent("disenar")}>
                Diseñar mi solución
              </a>
              <a className={styles.text} href="#capacidades">
                Explorar capacidades
              </a>
            </div>
            <p className={styles.caption} aria-live="polite">
              {heroRest ? "Operación en curso." : heroBeats[heroBeat]}
            </p>
            {heroRest ? (
              <button type="button" className={styles.quiet} onClick={replayHero}>
                Reproducir de nuevo
              </button>
            ) : null}
          </div>
        </section>

        <section className={styles.trust} aria-label="Hechos confirmados">
          <ul>
            {facts.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <a href={item.href} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.proposal} aria-labelledby="propuesta">
          <div className={styles.proposalCopy}>
            <p className={styles.kicker}>Propuesta</p>
            <h2 id="propuesta">Tecnología empresarial de extremo a extremo, con un solo responsable.</h2>
            <p>
              Justech evalúa, diseña, suministra, implementa y soporta la operación. No es solo redes, ni solo equipos,
              ni solo licencias, ni solo mesa de ayuda.
            </p>
          </div>
          <ol className={styles.cycle} aria-label="Ciclo de trabajo">
            {pillars.map((p) => (
              <li key={p.id}>
                <strong>{p.t}</strong>
                <span>{p.d}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.experiences} id="capacidades" aria-labelledby="exp-title">
          <div className={styles.expHead}>
            <p className={styles.kicker}>Capacidades</p>
            <h2 id="exp-title">Tres puertas comerciales. Un ciclo.</h2>
            <div className={styles.paths} role="tablist" aria-label="Experiencias">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === m.id}
                  className={mode === m.id ? styles.pathOn : styles.path}
                  onClick={() => {
                    setMode(m.id);
                    setBeat(0);
                    setPlaying(!reduce);
                    window.history.replaceState(null, "", `?experiencia=${m.id}`);
                  }}
                >
                  {m.t}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.expBody}>
            <Scene mode={mode} plate={plate} beat={frame} extra={sceneExtra} />
            <div className={styles.expCopy} data-mode={mode}>
              <div className={styles.meter} aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
              <h3>{current.t}</h3>
              <p>
                <strong>Problema. </strong>
                {current.problem}
              </p>
              <p>
                <strong>Solución. </strong>
                {current.solution}
              </p>
              <p>
                <strong>Resultado. </strong>
                {current.result}
              </p>
              <p className={styles.state} aria-live="polite">
                {steps[frame]}
              </p>
              {mode === "modernizar" ? (
                <LicensePath beat={licenseBeat} onPick={setLicenseBeat} current={license} />
              ) : null}
              {mode === "operar" ? <p className={styles.demoNote}>Demostración de arquitectura y proceso.</p> : null}
              <div className={styles.doorCtas}>
                {mode === "operar" ? (
                  <button type="button" className={styles.cta} onClick={() => go(mode, true)}>
                    Ver falla y respaldo
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className={styles.cta}
                      onClick={() => talk(mode === "construir" ? "levantamiento" : "disenar")}
                    >
                      {current.cta}
                    </button>
                    <button type="button" className={styles.text} onClick={() => go(mode, true)}>
                      Ver la demostración
                    </button>
                  </>
                )}
                <Link href={current.href}>{current.hrefLabel}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.products} id="productos" aria-labelledby="prod-title">
          <p className={styles.kicker}>Suministro</p>
          <h2 id="prod-title">Productos y equipos, con criterio. No un catálogo de precios.</h2>
          <p>
            Explore, compare perfiles, pida una recomendación o cotice. La puesta en marcha forma parte del mismo
            responsable.
          </p>
          <ul className={styles.prodGrid}>
            {productDoors.map((p) => (
              <li key={p.t}>
                <Link href={p.href}>
                  <strong>{p.t}</strong>
                  <span>{p.d}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.rowCtas}>
            <button type="button" className={styles.cta} onClick={() => talk("equipos")}>
              Cotizar equipos
            </button>
            <button type="button" className={styles.text} onClick={() => talk("disenar")}>
              Diseñar solución
            </button>
          </div>
        </section>

        <section className={styles.cable} id="cableado" aria-labelledby="cable-title">
          <div className={styles.cableCopy}>
            <p className={styles.kicker}>Infraestructura física</p>
            <h2 id="cable-title">Cableado que se puede mantener.</h2>
            <p>
              Plano, rutas, puntos, rack, certificación, documentación y entrega. Una ventaja que el mercado local
              casi no demuestra.
            </p>
            <ol className={styles.cableSteps} aria-label="Proceso de cableado">
              {cableJourney.map((step, i) => (
                <li key={step.t}>
                  <button
                    type="button"
                    aria-current={i === cableBeat ? "step" : undefined}
                    onClick={() => {
                      setCableBeat(i);
                      setCablePlay(false);
                    }}
                  >
                    {step.t}
                  </button>
                </li>
              ))}
            </ol>
            <p className={styles.state} aria-live="polite">
              {cable.t}: {cable.d}
            </p>
            <div className={styles.rowCtas}>
              <button type="button" className={styles.cta} onClick={() => talk("levantamiento")}>
                Solicitar levantamiento
              </button>
              <Link href="/l/cableado-estructurado/">Cotizar proyecto</Link>
              <button type="button" className={styles.text} onClick={() => talk("especialista")}>
                Hablar con especialista
              </button>
            </div>
          </div>
          <figure className={styles.scene}>
            <Plate
              name={cable.frame}
              alt="Obra de cableado e infraestructura en una sede empresarial."
              width={1600}
              height={900}
              active
            />
          </figure>
        </section>

        <section className={styles.method} id="metodo">
          <p className={styles.kicker}>Método</p>
          <h2>De un requerimiento a una operación en marcha.</h2>
          <ol>
            {pillars.map((p) => (
              <li key={p.id}>{p.t}</li>
            ))}
          </ol>
          <p>
            <Link href="/nosotros/metodologia/">Ver metodología</Link>
          </p>
        </section>

        <section className={styles.evidence} id="confianza" aria-labelledby="ev-title">
          <p className={styles.kicker}>Confianza verificable</p>
          <h2 id="ev-title">Solo publicamos lo que está autorizado, vigente y con fuente.</h2>
          <ul className={styles.evList}>
            {verifiedSlots
              .filter((item) => item.kind === "fact" || item.kind === "channel" || item.kind === "legal")
              .map((item) => (
                <li key={item.id}>
                  <strong>{item.label}</strong>
                  {item.detail ? <span>{item.detail}</span> : null}
                </li>
              ))}
          </ul>
          <p>
            Fabricantes, certificaciones, clientes, testimonios y casos aparecen aquí cuando tengan autorización,
            evidencia y fecha de verificación. No usamos placeholders ni anuncios vacíos.
          </p>
        </section>

        <section className={styles.resources} aria-labelledby="res-title">
          <p className={styles.kicker}>Recursos</p>
          <h2 id="res-title">Material propio, no un blog de premios.</h2>
          <ul className={styles.resGrid}>
            {featuredResources.map((r) => (
              <li key={r.href}>
                <Link href={r.href}>
                  <strong>{r.t}</strong>
                  <span>{r.d}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.talk} id="conversar">
          <h2>Cuéntenos la intención. El formulario se adapta.</h2>
          <p>
            {company.phoneDisplay} · {company.email}
          </p>
          {sent ? (
            <p role="status">Gracias. Un especialista le escribe a {company.email}.</p>
          ) : (
            <form onSubmit={onSubmit}>
              <fieldset className={styles.need}>
                <legend>¿Qué necesita?</legend>
                {formIntents.map((item) => (
                  <label key={item.id} className={intent === item.id ? styles.needOn : undefined}>
                    <input
                      type="radio"
                      name="intent"
                      value={item.id}
                      checked={intent === item.id}
                      onChange={() => setIntent(item.id)}
                      required
                    />
                    {item.label}
                  </label>
                ))}
              </fieldset>
              {intentCfg ? (
                <>
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
                  <label>
                    Teléfono <span>(opcional)</span>
                    <input name="phone" type="tel" autoComplete="tel" />
                  </label>
                  <label>
                    {intentCfg.extra.label}
                    <select name={intentCfg.extra.name} required defaultValue="">
                      <option value="" disabled>
                        Seleccione
                      </option>
                      {intentCfg.extra.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                  {intent === "renovar" ? (
                    <label>
                      Usuarios aproximados <span>(opcional)</span>
                      <input name="usuarios" inputMode="numeric" />
                    </label>
                  ) : null}
                  {intent === "soporte" ? (
                    <p>
                      Si ya es cliente, el canal operativo es{" "}
                      <a href={company.supportUrl}>soporte.justech.do</a>.
                    </p>
                  ) : null}
                  <label>
                    Descripción breve
                    <textarea name="note" rows={3} />
                  </label>
                  <p className={styles.consent}>
                    Al enviar acepta ser contactado sobre esta solicitud. Usaremos estos datos solo para responderle.
                  </p>
                  <button type="submit" className={styles.cta}>
                    Enviar
                  </button>
                </>
              ) : null}
            </form>
          )}
        </section>
      </main>

      {focus ? null : (
        <footer className={styles.foot}>
          <div>
            <strong>{company.legalName}</strong>
            <p>
              {company.city} · desde {company.founded}
            </p>
            <p>{company.hours}</p>
            <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.supportUrl}>Portal de soporte</a>
          </div>
          <div>
            <a href="#capacidades">Construir</a>
            <a href="#capacidades">Modernizar</a>
            <a href="#capacidades">Operar</a>
            <Link href="/productos/">Productos</Link>
            <Link href="/infraestructura-fisica/">Infraestructura</Link>
            <Link href="/nosotros/">Nosotros</Link>
            <Link href="/legal/">Legal</Link>
            <Link href="/politica-de-privacidad/">Privacidad</Link>
          </div>
        </footer>
      )}
    </div>
  );
}

function LicensePath({
  beat,
  onPick,
  current,
}: {
  beat: number;
  onPick: (n: number) => void;
  current: (typeof licenseJourney)[number];
}) {
  return (
    <div className={styles.license}>
      <p className={styles.kicker}>Licenciamiento</p>
      <ol>
        {licenseJourney.map((step, i) => (
          <li key={step.t}>
            <button type="button" aria-current={i === beat ? "step" : undefined} onClick={() => onPick(i)}>
              {step.t}
            </button>
          </li>
        ))}
      </ol>
      <p>
        {current.t}: {current.d}
      </p>
    </div>
  );
}

function LabActions({ current, onPick }: { current: number; onPick: (step: number) => void }) {
  return (
    <div className={styles.lab}>
      {labActions.map((action) => (
        <button
          key={action.id}
          type="button"
          aria-pressed={current === action.step}
          onClick={() => onPick(action.step)}
        >
          {action.t}
        </button>
      ))}
    </div>
  );
}

function Plate({
  name,
  mobile,
  alt,
  width,
  height,
  priority,
  active,
  avif,
}: {
  name: string;
  mobile?: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  active: boolean;
  avif?: boolean;
}) {
  const desk = withBase(`/visual/v8/${name}`);
  const mob = mobile ? withBase(`/visual/v8/${mobile}`) : null;
  return (
    <picture className={`${styles.plate} ${priority ? styles.lcp : ""} ${active ? styles.plateOn : ""}`}>
      {mob && avif ? <source media="(max-width: 720px)" srcSet={`${mob}.avif`} type="image/avif" /> : null}
      {mob ? <source media="(max-width: 720px)" srcSet={`${mob}.webp`} type="image/webp" /> : null}
      {mob ? <source media="(max-width: 720px)" srcSet={`${mob}.jpg`} /> : null}
      {avif ? <source srcSet={`${desk}.avif`} type="image/avif" /> : null}
      <source srcSet={`${desk}.webp`} type="image/webp" />
      <img
        src={`${desk}.jpg`}
        alt={alt}
        width={width}
        height={height}
        fetchPriority={priority ? "high" : "low"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

function Scene({
  mode,
  plate,
  beat,
  focused,
  extra,
}: {
  mode: Mode;
  plate: string;
  beat: number;
  focused?: boolean;
  extra: boolean;
}) {
  const catalog =
    mode === "construir"
      ? construirFrames
      : mode === "modernizar"
        ? modernizarFrames
        : focused
          ? Array.from(new Set(sucursalSteps.map((s) => s.frame)))
          : Array.from(new Set(operarFrames));
  const uniq = extra ? catalog : Array.from(new Set([catalog[0], plate]));

  return (
    <figure className={styles.scene} data-mode={mode} data-beat={beat} data-focus={focused ? "1" : "0"}>
      {uniq.map((name, i) => (
        <Plate
          key={name}
          name={name}
          alt={
            i === 0
              ? mode === "modernizar"
                ? "Puesto de trabajo empresarial."
                : "Sede empresarial mediana: cuarto técnico, rack y puestos."
              : ""
          }
          width={1600}
          height={900}
          priority={Boolean(focused && i === 0)}
          active={name === plate}
        />
      ))}
    </figure>
  );
}

function RouteRead({ beat }: { beat: number }) {
  const primaryLive = beat <= 0;
  const primaryDead = beat >= 1 && beat < 10;
  const backup = beat >= 2;
  const route = primaryLive ? "ISP principal" : backup ? "ISP de respaldo" : "Enlace principal caído";
  const liveOf = (name: (typeof labNodes)[number]) => {
    if (name === "ISP principal") return primaryLive ? "1" : "0";
    if (name === "ISP secundario") return backup ? "1" : "0";
    if (name === "Monitoreo") return beat >= 3 ? "1" : "0";
    if (name === "Sucursal") return backup || beat >= 8 ? "1" : "0";
    return primaryLive || backup ? "1" : "0";
  };
  return (
    <div className={styles.route} aria-live="polite">
      <p>
        <strong>Ruta activa</strong>
        <span>{route}</span>
      </p>
      <ul>
        {labNodes.map((name) => (
          <li
            key={name}
            data-live={liveOf(name)}
            data-dead={name === "ISP principal" && primaryDead ? "1" : "0"}
            data-wait={name === "ISP secundario" && beat < 1 ? "1" : "0"}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Ticket({ beat }: { beat: number }) {
  const items = ["Abierto", "Asignado", "Diagnóstico", "Corrección", "Validación", "Cierre"];
  const idx = beat < 5 ? 0 : beat < 6 ? 1 : beat < 7 ? 2 : beat < 8 ? 3 : beat < 10 ? 4 : 5;
  return (
    <aside className={styles.ticket} aria-label="Caso de soporte">
      <p>Sucursal sin conectividad</p>
      <ol>
        {items.map((label, i) => (
          <li key={label} className={i <= idx ? styles.done : undefined}>
            {label}
          </li>
        ))}
      </ol>
    </aside>
  );
}