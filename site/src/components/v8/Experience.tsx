"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { company } from "@/content/site";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

type Mode = "construir" | "modernizar" | "operar";
type Mega = "soluciones" | "servicios" | "productos" | "industrias" | null;
type Need = "sede" | "modernizar" | "operar" | "orientacion" | "";

const HERO_MS = 1100;
const SCENE_MS = 1300;

const heroBeats = [
  "El rack se energiza.",
  "Los puertos se encienden.",
  "El tráfico llega al puesto.",
  "Se conecta un puesto.",
  "Se habilita una aplicación.",
  "Aparece protección.",
  "Se sincroniza la nube.",
  "Soporte confirma operación.",
];

const heroDesk = ["v82-hero-rack", "v82-hero-rack", "v82-hero-net", "v82-hero-desk", "v82-hero-desk", "v82-hero-sec", "v82-hero-cloud", "v82-hero-support2"];

const modes: { id: Mode; t: string; d: string; cta: string }[] = [
  {
    id: "construir",
    t: "Construir",
    d: "Nueva sede, cableado, rack, red, Wi-Fi, equipos y servidores. Un plano. Un responsable.",
    cta: "Planificar una sede",
  },
  {
    id: "modernizar",
    t: "Modernizar",
    d: "Renovar equipos, identidad, licencias, seguridad, nube y respaldo. El puesto sale listo.",
    cta: "Preparar un puesto",
  },
  {
    id: "operar",
    t: "Operar",
    d: "Soporte, mesa, mantenimiento y servicios administrados. Si cae un enlace, el respaldo sostiene.",
    cta: "Ver falla y respaldo",
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

const operarFail = [
  "Tráfico por ISP principal",
  "Enlace principal degradado",
  "Se pierde la señal",
  "Ruta principal apagada",
  "Borde detecta la caída",
  "Enlace secundario entra",
  "Tráfico cambia de ruta",
  "Puestos activos",
  "Alerta discreta",
  "Soporte recibe el caso",
  "Continuidad confirmada",
];
const operarFailFrames = [
  "v82-ops-normal",
  "v82-ops-degraded",
  "v82-ops-down",
  "v82-ops-down",
  "v82-ops-down",
  "v82-ops-backup",
  "v82-ops-backup",
  "v82-ops-backup",
  "v82-ops-alert",
  "v82-ops-alert",
  "v82-ops-recovered",
];

const mega = {
  soluciones: [
    { mode: "construir" as Mode, t: "Construir una sede", d: "De la obra al primer día." },
    { mode: "modernizar" as Mode, t: "Modernizar la operación", d: "Equipos, identidad y nube." },
    { mode: "operar" as Mode, t: "Operar con soporte", d: "Continuidad y mesa de ayuda." },
  ],
  servicios: [
    { mode: "construir" as Mode, t: "Cableado e implementación" },
    { mode: "modernizar" as Mode, t: "Configuración y licencias" },
    { mode: "operar" as Mode, t: "Soporte y operación" },
  ],
  productos: [
    { mode: "construir" as Mode, t: "Redes y servidores" },
    { mode: "modernizar" as Mode, t: "Equipos y software" },
    { mode: "operar" as Mode, t: "Impresión y energía" },
  ],
  industrias: [
    { mode: "construir" as Mode, t: "Sede y sucursales" },
    { mode: "modernizar" as Mode, t: "Puestos de trabajo" },
    { mode: "operar" as Mode, t: "Operación diaria" },
  ],
} as const;

const needs: { id: Need; label: string }[] = [
  { id: "sede", label: "Construir una sede." },
  { id: "modernizar", label: "Modernizar tecnología." },
  { id: "operar", label: "Mejorar la operación." },
  { id: "orientacion", label: "Necesito orientación." },
];

function stepsOf(mode: Mode, focused: boolean) {
  if (mode === "construir") return construir;
  if (mode === "modernizar") return modernizar;
  return focused ? operarFail : operar;
}

function framesOf(mode: Mode, focused: boolean) {
  if (mode === "construir") return construirFrames;
  if (mode === "modernizar") return modernizarFrames;
  return focused ? operarFailFrames : operarFrames;
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
  const [need, setNeed] = useState<Need>("");
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);
  const [sceneExtra, setSceneExtra] = useState(false);
  const [wide, setWide] = useState(true);

  const current = modes.find((m) => m.id === mode) ?? modes[0];
  const steps = stepsOf(mode, focus);
  const frames = framesOf(mode, focus);
  const frame = Math.min(beat, steps.length - 1);
  const plate = frames[Math.min(frame, frames.length - 1)];
  const heroPlate = heroRest || reduce ? "v82-hero-rest" : heroDesk[heroBeat] ?? "v82-hero-rest";
  const progress = ((frame + 1) / steps.length) * 100;

  const heroDeskUniq = useMemo(() => ["v82-hero-rest", "v82-hero-rack", "v82-hero-net", "v82-hero-desk", "v82-hero-sec", "v82-hero-cloud", "v82-hero-support2"], []);

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
    if (!open) document.getElementById("experiencias")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
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
    const el = document.getElementById("experiencias");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSceneExtra(true);
        if (reduce) return;
        setPlaying(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [focus, reduce]);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => setBeat((n) => (n + 1) % steps.length), SCENE_MS);
    return () => window.clearInterval(id);
  }, [playing, reduce, steps.length, mode, focus]);

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
        if (tag === "INPUT" || tag === "BUTTON" || tag === "A" || tag === "TEXTAREA") return;
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

  const showTicket = focus && mode === "operar" && frame >= 9;
  const failBeat = focus && mode === "operar" ? frame : -1;

  return (
    <div className={styles.page} data-ready={ready ? "1" : "0"}>
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
          <a className={styles.cta} href="#conversar">
            Hablar con un especialista
          </a>
          <button type="button" className={styles.menu} aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
            {menu ? "Cerrar" : "Menú"}
          </button>
        </div>
        {megaKey ? (
          <div className={styles.mega}>
            {mega[megaKey].map((item) => (
              <button key={item.t} type="button" onClick={() => go(item.mode)}>
                <strong>{item.t}</strong>
                {"d" in item ? <span>{item.d}</span> : null}
              </button>
            ))}
          </div>
        ) : null}
        {menu ? (
          <div className={styles.drawer}>
            {modes.map((m) => (
              <button key={m.id} type="button" onClick={() => go(m.id)}>
                {m.t}
              </button>
            ))}
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
            {mode === "operar" ? <RouteRead beat={failBeat} /> : null}
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
              <a className={styles.cta} href="#conversar" onClick={closeFocus}>
                Conversar
              </a>
            </div>
            <button type="button" className={styles.quiet} onClick={closeFocus}>
              Cerrar · Esc
            </button>
          </aside>
        </div>
      ) : null}

      <main id="contenido" hidden={focus}>
        <section className={styles.hero} id="inicio" aria-label="Hero">
          <div className={styles.heroCopy}>
            <h1>Tecnología empresarial, conectada de extremo a extremo.</h1>
            <p>Equipos, infraestructura, redes, licencias, nube, seguridad y soporte bajo una sola estrategia.</p>
            <div className={styles.heroCtas}>
              <a className={styles.cta} href="#conversar">
                Diseñar mi solución
              </a>
              <a className={styles.text} href="#experiencias">
                Explorar lo que hacemos
              </a>
            </div>
            <p className={styles.caption} aria-live="polite">
              {heroRest ? "Operación en reposo." : heroBeats[heroBeat]}
            </p>
            {heroRest ? (
              <button type="button" className={styles.quiet} onClick={replayHero}>
                Reproducir de nuevo
              </button>
            ) : null}
          </div>
          <div className={styles.heroStage} data-beat={heroRest ? "rest" : heroBeat} data-motion={reduce ? "reduce" : "ok"}>
            <Plate
              name="v82-hero-rest"
              mobile="v82-hero-mobile"
              alt="Sede empresarial: rack, puesto y ciudad al anochecer."
              width={1600}
              height={900}
              priority
              active={wide ? heroPlate === "v82-hero-rest" : heroRest || reduce || heroBeat < 1}
              avif
            />
            {heroExtra
              ? wide
                ? heroDeskUniq
                    .filter((n) => n !== "v82-hero-rest")
                    .map((n) => (
                      <Plate key={n} name={n} alt="" width={1600} height={900} active={heroPlate === n} />
                    ))
                : (
                    <Plate
                      name="v82-hero-mobile-live"
                      alt=""
                      width={900}
                      height={1600}
                      active={!heroRest && !reduce && heroBeat >= 1}
                    />
                  )
              : null}
          </div>
        </section>

        <section className={styles.proposal} aria-labelledby="propuesta">
          <div className={styles.proposalCopy}>
            <p className={styles.kicker}>Propuesta</p>
            <h2 id="propuesta">Una sola estrategia para lo que hoy está separado.</h2>
            <p>
              Justech integra infraestructura, equipos, redes, licenciamiento, nube, seguridad y soporte bajo una sola
              estrategia tecnológica.
            </p>
            <p>
              Desde el levantamiento hasta la operación, unificamos proveedores, procesos y responsabilidades para reducir
              complejidad.
            </p>
          </div>
          <ol className={styles.cycle} aria-label="Ciclo de trabajo">
            <li>Evaluar</li>
            <li>Diseñar</li>
            <li>Implementar</li>
            <li>Operar</li>
          </ol>
        </section>

        <section className={styles.experiences} id="experiencias" aria-labelledby="exp-title">
          <div className={styles.expHead}>
            <p className={styles.kicker}>Cómo entra</p>
            <h2 id="exp-title">Tres caminos. Una escena.</h2>
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
              <p>{current.d}</p>
              <p className={styles.state} aria-live="polite">
                {steps[frame]}
              </p>
              <button type="button" className={styles.cta} onClick={() => go(mode, true)}>
                {mode === "operar" ? "Ver falla y respaldo" : "Ver la demostración"}
              </button>
            </div>
          </div>
        </section>

        <section className={styles.method} id="metodo">
          <p className={styles.kicker}>Método</p>
          <h2>Tecnología alineada con su operación.</h2>
          <ol>
            <li>Levantamiento</li>
            <li>Diseño</li>
            <li>Suministro</li>
            <li>Implementación</li>
            <li>Acompañamiento</li>
          </ol>
        </section>

        <section className={styles.talk} id="conversar">
          <h2>Diseñar mi solución</h2>
          <p>
            {company.phoneDisplay} · {company.email}
          </p>
          {sent ? (
            <p role="status">Gracias. Un especialista le escribe a {company.email}.</p>
          ) : (
            <form onSubmit={onSubmit}>
              <fieldset className={styles.need}>
                <legend>¿Qué necesita resolver?</legend>
                {needs.map((item) => (
                  <label key={item.id} className={need === item.id ? styles.needOn : undefined}>
                    <input
                      type="radio"
                      name="need"
                      value={item.id}
                      checked={need === item.id}
                      onChange={() => setNeed(item.id)}
                      required
                    />
                    {item.label}
                  </label>
                ))}
              </fieldset>
              {need ? (
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
                    Descripción breve
                    <textarea name="note" rows={3} />
                  </label>
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
              {company.city} · {company.phoneDisplay}
            </p>
            <p>{company.hours}</p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.supportUrl}>Soporte</a>
          </div>
          <div>
            <a href="#experiencias">Construir</a>
            <a href="#experiencias">Modernizar</a>
            <a href="#experiencias">Operar</a>
            <Link href="/legal/">Legal</Link>
            <Link href="/politica-de-privacidad/">Privacidad</Link>
          </div>
        </footer>
      )}
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
          ? Array.from(new Set(operarFailFrames))
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
  const primaryLive = beat < 2;
  const primaryDead = beat >= 2 && beat < 10;
  const backup = beat >= 5;
  const route = primaryLive ? "ISP principal" : backup ? "ISP de respaldo" : "Enlace principal caído";
  return (
    <div className={styles.route} aria-live="polite">
      <p>
        <strong>Ruta activa</strong>
        <span>{route}</span>
      </p>
      <ul>
        <li data-live={primaryLive ? "1" : "0"} data-dead={primaryDead ? "1" : "0"}>
          ISP principal
        </li>
        <li data-live={beat >= 0 && !primaryDead ? "1" : backup ? "1" : "0"}>Borde</li>
        <li data-live={beat >= 0 && (primaryLive || backup) ? "1" : "0"}>Firewall</li>
        <li data-live={beat >= 0 && (primaryLive || backup) ? "1" : "0"}>Core</li>
        <li data-live="1">Acceso · puestos</li>
        <li data-live={backup ? "1" : "0"} data-wait={beat < 5 ? "1" : "0"}>
          ISP de respaldo
        </li>
      </ul>
    </div>
  );
}

function Ticket({ beat }: { beat: number }) {
  return (
    <aside className={styles.ticket} aria-label="Caso de soporte">
      <p>Caso asignado · Enlace principal</p>
      <ol>
        <li className={styles.done}>Recibido</li>
        <li className={beat >= 10 ? styles.done : undefined}>Continuidad</li>
        <li className={beat >= 10 ? styles.done : undefined}>Resuelto</li>
      </ol>
    </aside>
  );
}
