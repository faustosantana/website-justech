"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { company } from "@/content/site";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

type Mode = "construir" | "modernizar" | "operar";
type Mega = "soluciones" | "servicios" | "productos" | "industrias" | null;

const HERO_MS = 1200;
const SCENE_MS = 1400;

const heroBeats = [
  "El rack se energiza.",
  "Los puertos se encienden.",
  "El tráfico llega al core.",
  "Se conecta un puesto.",
  "Se habilita una aplicación.",
  "Aparece protección.",
  "Se sincroniza la nube.",
  "Soporte confirma operación.",
];

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
const modernizar = [
  "Preparando equipo",
  "Registrando identidad",
  "Aplicando seguridad",
  "Instalando aplicaciones",
  "Conectando servicios",
  "Listo para entregar",
];
const operar = [
  "Tráfico por ISP principal",
  "Se pierde el enlace",
  "Estado degradado",
  "Ruta secundaria activa",
  "Tráfico redirigido",
  "Usuarios conectados",
  "Monitoreo alerta",
  "Soporte recibe el caso",
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

function stepsOf(mode: Mode) {
  if (mode === "construir") return construir;
  if (mode === "modernizar") return modernizar;
  return operar;
}

export function ExperienceV8() {
  const [menu, setMenu] = useState(false);
  const [megaKey, setMegaKey] = useState<Mega>(null);
  const [heroBeat, setHeroBeat] = useState(0);
  const [heroPlay, setHeroPlay] = useState(true);
  const [heroRest, setHeroRest] = useState(false);
  const [mode, setMode] = useState<Mode>("construir");
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focus, setFocus] = useState(false);
  const [sent, setSent] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);

  const current = modes.find((m) => m.id === mode) ?? modes[0];
  const steps = stepsOf(mode);
  const frame = Math.min(beat, steps.length - 1);

  function go(next: Mode, open = false) {
    setMode(next);
    setBeat(0);
    setPlaying(!reduce);
    setMegaKey(null);
    setMenu(false);
    setFocus(open);
    if (open) setPlaying(!reduce);
    const q = new URLSearchParams({ experiencia: next });
    if (open) q.set("demo", "1");
    window.history.replaceState(null, "", `?${q}`);
    if (!open) document.getElementById("experiencias")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function closeFocus() {
    setFocus(false);
    window.history.replaceState(null, "", `?experiencia=${mode}`);
  }

  useEffect(() => {
    document.body.classList.add("landing-mode");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduce(mq.matches);
      if (mq.matches) {
        setHeroPlay(false);
        setHeroRest(true);
        setPlaying(false);
        setHeroBeat(heroBeats.length - 1);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    const params = new URLSearchParams(window.location.search);
    const exp = params.get("experiencia") as Mode | null;
    if (exp && modes.some((m) => m.id === exp)) setMode(exp);
    if (params.get("demo") === "1") setFocus(true);
    setReady(true);
    return () => {
      document.body.classList.remove("landing-mode");
      mq.removeEventListener("change", apply);
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
        if (reduce) return;
        setPlaying(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [focus, reduce]);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => setBeat((n) => (n + 1) % steps.length), SCENE_MS);
    return () => window.clearInterval(id);
  }, [playing, reduce, steps.length, mode]);

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

  const showTicket = mode === "operar" && frame >= 6;

  return (
    <div className={styles.page} data-ready={ready ? "1" : "0"}>
      <header className={styles.head}>
        <a className={styles.brand} href="#inicio" onClick={() => setFocus(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBase("/brand/justech-mark-white.png")} alt="" width={28} height={20} />
          Justech
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
          <Scene mode={mode} beat={frame} focused />
          <aside className={styles.sheet}>
            <p className={styles.kicker}>{current.t}</p>
            <p className={styles.state} aria-live="polite">
              {steps[frame]}
            </p>
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
                {current.cta}
              </a>
            </div>
            <button type="button" className={styles.quiet} onClick={closeFocus}>
              Cerrar · Esc
            </button>
          </aside>
          {showTicket ? <Ticket /> : null}
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
            <picture>
              <source media="(max-width: 720px)" srcSet={withBase("/visual/v8/v81-hero-mobile.webp")} type="image/webp" />
              <source media="(max-width: 720px)" srcSet={withBase("/visual/v8/v81-hero-mobile.jpg")} />
              <source srcSet={withBase("/visual/v8/v81-hero.webp")} type="image/webp" />
              <img
                src={withBase("/visual/v8/v81-hero.jpg")}
                alt="Instalación empresarial: rack, puestos y ciudad. Sin textos en la imagen."
                width={1600}
                height={1066}
                fetchPriority="high"
              />
            </picture>
            <HeroDemo beat={heroRest ? -1 : heroBeat} />
          </div>
        </section>

        <section className={styles.proposal} aria-labelledby="propuesta">
          <p className={styles.kicker}>Propuesta</p>
          <h2 id="propuesta">Una sola estrategia para lo que hoy está separado.</h2>
          <p>
            Justech integra equipos, obra, red, licenciamiento, nube, seguridad y soporte. Santo Domingo, desde {company.founded}.
            Sin cifras inventadas. El portal de casos vive en otro host.
          </p>
        </section>

        <section className={styles.experiences} id="experiencias" aria-labelledby="exp-title">
          <div className={styles.expHead}>
            <p className={styles.kicker}>Cómo entra</p>
            <h2 id="exp-title">Tres caminos. Una escena.</h2>
            <div className={styles.tabs} role="tablist" aria-label="Experiencias">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === m.id}
                  className={mode === m.id ? styles.on : undefined}
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
            <Scene mode={mode} beat={frame} />
            <div className={styles.expCopy}>
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
          <h2>Ver. Diseñar. Poner en marcha. Acompañar.</h2>
          <ol>
            <li>Levantamiento de lo que ya existe.</li>
            <li>Una solución con dueño y alcance.</li>
            <li>Obra, equipos, red y software en el mismo plan.</li>
            <li>
              Mesa y portal. {company.hours.split("(")[0].trim()}.
            </li>
          </ol>
        </section>

        <section className={styles.talk} id="conversar">
          <h2>Diseñar mi solución</h2>
          <p>
            {company.phoneDisplay} · {company.email}
          </p>
          {sent ? (
            <p role="status">Registrado en este entorno de prueba. En el sitio público responde {company.email}. Aquí no se envía correo.</p>
          ) : (
            <form onSubmit={onSubmit}>
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
              <p className={styles.legal}>Formulario de demostración. No hay envío real en staging.</p>
              <button type="submit" className={styles.cta}>
                Enviar en este entorno
              </button>
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
          <p>Concepto V8. El sitio público permanece en www.justech.do.</p>
        </footer>
      )}
    </div>
  );
}

function HeroDemo({ beat }: { beat: number }) {
  return (
    <svg className={styles.heroSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={i}
          className={`${styles.led} ${beat >= 1 ? styles.on : ""}`}
          x={16.4 + (i % 2) * 2.6}
          y={26 + Math.floor(i / 2) * 7.2}
          width="1.1"
          height="0.7"
          rx="0.15"
        />
      ))}
      <path className={`${styles.heroFlow} ${beat >= 2 && beat < 8 ? styles.on : ""}`} d="M18 48 C32 47 46 54 62 64" />
      {beat >= 2 && beat < 8 ? (
        <circle className={styles.pkt} r="0.45">
          <animateMotion dur="1.2s" repeatCount="indefinite" path="M18 48 C32 47 46 54 62 64" />
        </circle>
      ) : null}
      <rect className={`${styles.screen} ${beat >= 4 ? styles.on : ""}`} x="61" y="60" width="10" height="7" rx="0.3" />
      <circle className={`${styles.ok} ${beat >= 7 ? styles.on : ""}`} cx="84" cy="76" r="1.1" />
    </svg>
  );
}

function Scene({ mode, beat, focused }: { mode: Mode; beat: number; focused?: boolean }) {
  const usePuesto = mode === "modernizar" && beat >= 1;
  return (
    <figure className={styles.scene} data-mode={mode} data-beat={beat} data-focus={focused ? "1" : "0"}>
      <picture>
        <source srcSet={withBase(usePuesto ? "/visual/v8/v81-puesto.webp" : "/visual/v8/v81-campus.webp")} type="image/webp" />
        <img
          src={withBase(usePuesto ? "/visual/v8/v81-puesto.jpg" : "/visual/v8/v81-campus.jpg")}
          alt={usePuesto ? "Puesto empresarial: laptop, monitor y dock. Sin textos en la imagen." : "Campus empresarial con cuarto técnico, rack y sucursal. Sin textos en la imagen."}
          width={usePuesto ? 1400 : 1600}
          height={usePuesto ? 934 : 1066}
          loading={focused ? "eager" : "lazy"}
        />
      </picture>
      {mode === "construir" ? <BuildOverlay beat={beat} /> : null}
      {mode === "modernizar" ? <DeskOverlay beat={beat} /> : null}
      {mode === "operar" ? <Network beat={beat} /> : null}
    </figure>
  );
}

function BuildOverlay({ beat }: { beat: number }) {
  return (
    <svg className={styles.overlay} viewBox="0 0 100 62" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className={beat >= 0 ? styles.on : undefined}>
        <path className={styles.plan} d="M18 40 h22 v14 h-22z M42 36 h28 v18 h-28z M72 38 h16 v12 h-16z" />
      </g>
      <path className={`${styles.cable} ${beat >= 1 ? styles.on : ""}`} d="M30 48 C38 44 46 40 54 38 C62 36 70 40 78 44" />
      <g className={beat >= 2 ? styles.on : undefined}>
        <rect className={styles.rackGlow} x="44" y="28" width="8" height="16" rx="0.4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} className={styles.port} x="45.2" y={30 + i * 2.4} width="5.4" height="1.1" rx="0.2" />
        ))}
      </g>
      <g className={beat >= 3 ? styles.on : undefined}>
        <circle className={styles.ap} cx="58" cy="34" r="1.1" />
        <circle className={styles.ap} cx="66" cy="34" r="1.1" />
      </g>
      {beat >= 2 ? (
        <text className={styles.label} x="44" y="26">
          Rack
        </text>
      ) : null}
      {beat >= 3 ? (
        <text className={styles.label} x="72" y="37">
          Sucursal
        </text>
      ) : null}
    </svg>
  );
}

function DeskOverlay({ beat }: { beat: number }) {
  return (
    <svg className={styles.overlay} viewBox="0 0 100 67" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect className={`${styles.screenFill} ${beat >= 0 ? styles.on : ""}`} x="38" y="22" width="28" height="18" rx="0.6" />
      <g className={beat >= 1 ? styles.on : undefined}>
        <circle className={styles.id} cx="72" cy="18" r="3.2" />
      </g>
      <g className={beat >= 2 ? styles.on : undefined}>
        <path className={styles.shield} d="M22 20 l5 2 v6 c0 4-2.4 7-5 8.4 c-2.6-1.4-5-4.4-5-8.4 v-6z" />
      </g>
      <rect className={`${styles.app} ${beat >= 3 ? styles.on : ""}`} x="42" y="26" width="8" height="6" rx="0.4" />
      <rect className={`${styles.app} ${beat >= 3 ? styles.on : ""}`} x="52" y="26" width="8" height="6" rx="0.4" />
      <path className={`${styles.cable} ${beat >= 4 ? styles.on : ""}`} d="M68 48 C78 50 84 46 90 40" />
      {beat >= 5 ? (
        <text className={styles.label} x="38" y="14">
          Listo
        </text>
      ) : null}
    </svg>
  );
}

function Node({ x, y, w, h, label, tone = "box" }: { x: number; y: number; w: number; h: number; label: string; tone?: "box" | "idle" | "bad" }) {
  return (
    <g className={styles.node} transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="2" className={styles[tone]} />
      <text x={w / 2} y={h / 2 + 4}>
        {label}
      </text>
    </g>
  );
}

function Network({ beat }: { beat: number }) {
  const fail = beat >= 1 && beat < 4;
  const backup = beat >= 3;
  const okUsers = beat >= 5 || beat === 0;
  const show = (from: number, to = 8) => beat >= from && beat <= to;
  return (
    <svg className={styles.net} viewBox="0 0 640 320" role="img" aria-label="Topología: ISP, borde, firewall, core y acceso.">
      <path className={`${styles.link} ${beat === 0 || beat >= 5 ? styles.live : ""} ${fail ? styles.dead : ""}`} d="M70 70 L150 110" />
      <path className={`${styles.link} ${backup ? styles.backup : ""}`} d="M70 190 L150 130" />
      <path className={`${styles.link} ${beat >= 0 ? styles.live : ""} ${fail && !backup ? styles.dim : ""}`} d="M170 120 L250 120 L330 120 L420 120" />
      <path className={`${styles.link} ${beat >= 0 ? styles.live : ""}`} d="M440 120 L520 70" />
      <path className={`${styles.link} ${okUsers ? styles.live : styles.dim}`} d="M440 120 L520 150" />
      <path className={`${styles.link} ${beat >= 0 ? styles.live : ""}`} d="M420 140 L420 210" />
      <path className={`${styles.link} ${backup || beat === 0 ? styles.live : styles.dim}`} d="M520 170 C560 200 580 220 600 250" />
      {beat === 0 || (backup && beat >= 4) ? (
        <circle className={styles.dot} r="2.4">
          <animateMotion dur="1.5s" repeatCount="indefinite" path={backup && beat >= 4 ? "M70 190 L150 130 L250 120 L330 120 L420 120 L520 150" : "M70 70 L150 110 L250 120 L330 120 L420 120 L520 150"} />
        </circle>
      ) : null}
      {show(0, 3) ? <Node x={40} y={54} w={48} h={26} label="ISP principal" tone={fail ? "bad" : "box"} /> : null}
      {show(3, 5) ? <Node x={40} y={176} w={52} h={26} label="ISP respaldo" tone={backup ? "box" : "idle"} /> : null}
      {show(0, 5) ? <Node x={140} y={106} w={48} h={26} label="Borde" /> : null}
      {show(0, 2) ? <Node x={236} y={106} w={58} h={26} label="Firewall" /> : null}
      {show(0, 4) ? <Node x={318} y={106} w={44} h={26} label="Core" /> : null}
      {show(4, 6) ? <Node x={404} y={106} w={48} h={26} label="Acceso" /> : null}
      {show(5, 7) ? <Node x={490} y={136} w={52} h={26} label="Puestos" tone={okUsers ? "box" : "idle"} /> : null}
      {show(6, 7) ? <Node x={560} y={248} w={58} h={26} label="Sucursal" /> : null}
    </svg>
  );
}

function Ticket() {
  return (
    <aside className={styles.ticket} aria-label="Caso de soporte">
      <p>Caso 1042 · Enlace primario</p>
      <ol>
        <li className={styles.done}>Asignado</li>
        <li className={styles.done}>Diagnóstico</li>
        <li>Resuelto</li>
      </ol>
    </aside>
  );
}
