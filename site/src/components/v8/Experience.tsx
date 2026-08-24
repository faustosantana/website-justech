"use client";

import Link from "next/link";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { company } from "@/content/site";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

const heroLayers = [
  { id: "rack", t: "Rack", x: "16%", y: "58%", hint: "Los puertos responden." },
  { id: "red", t: "Red", x: "42%", y: "46%", hint: "El tráfico circula." },
  { id: "equipo", t: "Equipos", x: "58%", y: "62%", hint: "El puesto se prepara." },
  { id: "seguridad", t: "Seguridad", x: "72%", y: "38%", hint: "Una conexión queda aislada." },
  { id: "nube", t: "Nube", x: "84%", y: "28%", hint: "Los datos se sincronizan." },
  { id: "soporte", t: "Soporte", x: "78%", y: "72%", hint: "Llega una alerta." },
] as const;

const jump = [
  { id: "equipos", t: "Equipos" },
  { id: "red", t: "Redes" },
  { id: "oficina", t: "Cableado" },
  { id: "red", t: "Servidores" },
  { id: "licencias", t: "Licenciamiento" },
  { id: "migrar", t: "Nube" },
  { id: "proteger", t: "Seguridad" },
  { id: "incidencias", t: "Soporte" },
  { id: "msp", t: "Servicios administrados" },
  { id: "cotizar", t: "Cotización" },
];

const scenarios = [
  {
    id: "oficina",
    t: "Abrir una nueva oficina",
    sit: "Una sede nueva debe operar el primer día, no a las tres semanas.",
    cta: "Planificar nueva sede",
    photo: "/visual/v8/v8-scene-network.jpg",
    alt: "Sede con rack, red, puestos y sucursal.",
    parts: ["Levantamiento", "Cableado", "Rack", "Wi-Fi", "Equipos", "Licencias", "Seguridad", "Soporte"],
    result: "La oficina entra en servicio con un responsable y un plano documentado.",
  },
  {
    id: "equipos",
    t: "Renovar equipos",
    sit: "Los puestos se entregan con imagen, identidad y garantía. No como cajas sueltas.",
    cta: "Preparar puestos",
    photo: "/visual/v8/v8-scene-puesto.jpg",
    alt: "Portátil empresarial listo para aprovisionar.",
    parts: ["Perfil", "Imagen", "Cifrado", "Aplicaciones", "Inventario", "Entrega"],
    result: "El usuario se sienta y trabaja. El activo queda registrado.",
  },
  {
    id: "red",
    t: "Mejorar la red",
    sit: "Sede, sucursal y respaldo tienen que verse y poder operarse.",
    cta: "Ver la topología",
    photo: "/visual/v8/v8-scene-network.jpg",
    alt: "Topología con ISP, firewall, core, APs y sucursal.",
    parts: ["ISP", "Firewall", "Core", "Acceso", "APs", "Sucursal", "Respaldo"],
    result: "Si cae el enlace principal, el secundario sostiene y se abre el caso.",
  },
  {
    id: "licencias",
    t: "Organizar licencias",
    sit: "Identidad y aplicaciones bajo un tenant, no compras sueltas.",
    cta: "Ordenar el tenant",
    photo: "/visual/v5/license.jpg",
    alt: "Puesto de trabajo con identidad y aplicaciones.",
    parts: ["Usuario", "Departamento", "Licencia", "Aplicaciones", "Política"],
    result: "Cada persona tiene lo que necesita. Sobran las cuentas huérfanas.",
  },
  {
    id: "proteger",
    t: "Proteger la empresa",
    sit: "Una conexión intenta llegar a un recurso. Las capas responden en orden.",
    cta: "Simular un evento",
    photo: "/visual/v5/security.jpg",
    alt: "Controles de seguridad en un entorno de operación.",
    parts: ["Identidad", "Endpoint", "Red", "Firewall", "Datos"],
    result: "El evento se aísla. No afirmamos un SOC que Justech no opera.",
  },
  {
    id: "migrar",
    t: "Migrar servicios",
    sit: "Una carga tiene origen, destino, dueño y respaldo. No un ícono flotante.",
    cta: "Diseñar la migración",
    photo: "/visual/v5/cloud.jpg",
    alt: "Arquitectura híbrida con origen local y destino en nube.",
    parts: ["Origen", "Destino", "Identidad", "Respaldo", "Prueba"],
    result: "La operación continúa. La carga queda con responsable.",
  },
  {
    id: "incidencias",
    t: "Resolver incidencias",
    sit: "Un caso tiene etapa, responsable y cierre. El portal vive en otro host.",
    cta: "Ver el caso",
    photo: "/visual/v8/v8-scene-soporte.jpg",
    alt: "Consola de caso Sucursal sin conectividad.",
    parts: ["Reporte", "Clasificación", "Diagnóstico", "Corrección", "Cierre"],
    result: "El visitante entiende el flujo. No es una plataforma propiedad de Justech.",
  },
  {
    id: "msp",
    t: "Externalizar TI",
    sit: "Un interlocutor cubre operación diaria, no un ticket huérfano.",
    cta: "Hablar de operación",
    photo: "/visual/v5/support.jpg",
    alt: "Mesa de operación y seguimiento de casos.",
    parts: ["Alcance", "Mesa", "Cambios", "Informes"],
    result: "La empresa sabe a quién llamar y qué queda fuera.",
  },
] as const;

const demos = [
  {
    id: "sede",
    t: "Apertura de una sede",
    beats: [
      { t: "Plano", d: "Se marca la planta y las rutas.", on: ["sede"] },
      { t: "Cableado", d: "Entran los puntos de red.", on: ["sede", "acceso"] },
      { t: "Rack", d: "Energía, patch y core.", on: ["sede", "acceso", "core"] },
      { t: "Borde", d: "ISP, router y firewall.", on: ["sede", "isp", "fw", "core", "acceso"] },
      { t: "Puestos", d: "APs y usuarios encienden.", on: ["sede", "isp", "fw", "core", "acceso", "ap", "users"] },
      { t: "Lista", d: "Servidores, nube y mesa quedan enlazados.", on: ["sede", "isp", "fw", "core", "acceso", "ap", "users", "srv", "cloud"] },
    ],
  },
  {
    id: "falla",
    t: "Falla de enlace",
    beats: [
      { t: "Normal", d: "El primario sostiene la sucursal.", on: ["isp", "fw", "core", "branch", "cloud"], fail: false, backup: false },
      { t: "Caída", d: "El ISP principal deja de responder.", on: ["isp", "fw", "core", "branch"], fail: true, backup: false },
      { t: "Respaldo", d: "El secundario entra sin teatro.", on: ["fw", "core", "branch", "cloud"], fail: true, backup: true },
      { t: "Caso", d: "La mesa recibe la señal.", on: ["fw", "core", "branch", "cloud"], fail: true, backup: true, ticket: true },
    ],
  },
  {
    id: "empleado",
    t: "Incorporación de empleado",
    beats: [
      { t: "Perfil", d: "Se elige el puesto, no un modelo suelto.", on: ["users"] },
      { t: "Identidad", d: "La cuenta entra al tenant.", on: ["users", "cloud"] },
      { t: "Cifrado", d: "El disco queda protegido antes de salir.", on: ["users"] },
      { t: "Aplicaciones", d: "El conjunto estándar se asigna.", on: ["users", "cloud"] },
      { t: "Red", d: "El equipo ve sede y sucursal.", on: ["users", "ap", "core", "fw"] },
      { t: "Inventario", d: "Activo, garantía y mesa quedan ligados.", on: ["users", "srv"] },
    ],
  },
] as const;

const nodes = [
  { id: "isp", t: "ISP", x: 8, y: 18 },
  { id: "fw", t: "Firewall", x: 22, y: 20 },
  { id: "core", t: "Core", x: 40, y: 16 },
  { id: "acceso", t: "Access", x: 58, y: 40 },
  { id: "ap", t: "APs", x: 46, y: 32 },
  { id: "users", t: "Puestos", x: 36, y: 52 },
  { id: "srv", t: "Servidores", x: 34, y: 76 },
  { id: "cloud", t: "Nube", x: 78, y: 16 },
  { id: "branch", t: "Sucursal", x: 84, y: 74 },
  { id: "sede", t: "Sede", x: 14, y: 70 },
] as const;

const mega = {
  soluciones: [
    { id: "red", t: "Modernizar mi infraestructura", d: "Rack, red y operación en un plano." },
    { id: "oficina", t: "Conectar una sede", d: "De la obra al primer día de trabajo." },
    { id: "oficina", t: "Abrir una sucursal", d: "Mismo acceso, enlace propio y respaldo." },
    { id: "proteger", t: "Proteger mi operación", d: "Capas, sin afirmar un SOC." },
    { id: "migrar", t: "Migrar a la nube", d: "Origen, destino y dueño." },
    { id: "equipos", t: "Preparar puestos", d: "Imagen, identidad y entrega." },
    { id: "licencias", t: "Administrar licencias", d: "Un tenant, no compras sueltas." },
    { id: "incidencias", t: "Mejorar soporte", d: "Un caso, un cierre." },
  ],
  productos: [
    { id: "equipos", t: "Laptops" },
    { id: "equipos", t: "Desktops" },
    { id: "red", t: "Servidores" },
    { id: "red", t: "Redes" },
    { id: "incidencias", t: "Impresión" },
    { id: "equipos", t: "Accesorios" },
    { id: "oficina", t: "Energía" },
    { id: "licencias", t: "Software" },
  ],
  servicios: [
    { id: "oficina", t: "Consultoría" },
    { id: "oficina", t: "Levantamiento" },
    { id: "red", t: "Diseño" },
    { id: "oficina", t: "Implementación" },
    { id: "oficina", t: "Cableado" },
    { id: "equipos", t: "Configuración" },
    { id: "incidencias", t: "Soporte" },
    { id: "msp", t: "Servicios administrados" },
  ],
} as const;

const labs = [
  { t: "Redes", d: "Laboratorio: tráfico, falla y respaldo." },
  { t: "Equipos", d: "Estudio de puesto y aprovisionamiento." },
  { t: "Licenciamiento", d: "Usuario, licencia y política." },
  { t: "Nube", d: "Migración híbrida explorable." },
  { t: "Seguridad", d: "Evento conceptual por capas." },
  { t: "Soporte", d: "Consola de caso, no un dashboard falso." },
  { t: "Infraestructura", d: "Planta, rutas y rack." },
];

const needs = ["Equipos", "Redes", "Cableado", "Licencias", "Seguridad", "Nube", "Soporte", "Proyecto integral"];

type MegaKey = keyof typeof mega | "industrias" | "recursos" | "nosotros" | "soporte";

export function ExperienceV8() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<MegaKey | null>(null);
  const [layer, setLayer] = useState<(typeof heroLayers)[number]["id"] | null>(null);
  const [scene, setScene] = useState<(typeof scenarios)[number]["id"]>("oficina");
  const [demoId, setDemoId] = useState<(typeof demos)[number]["id"]>("sede");
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focus, setFocus] = useState<(typeof nodes)[number]["id"] | null>(null);
  const [need, setNeed] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [reduce, setReduce] = useState(false);

  const current = scenarios.find((s) => s.id === scene) ?? scenarios[0];
  const demo = demos.find((d) => d.id === demoId) ?? demos[0];
  const frame = demo.beats[Math.min(beat, demo.beats.length - 1)];
  const heroHint = heroLayers.find((h) => h.id === layer);

  useEffect(() => {
    document.body.classList.add("landing-mode");
    const onScroll = () => setSolid(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduce(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    apply();
    mq.addEventListener("change", apply);
    const params = new URLSearchParams(window.location.search);
    const resolver = params.get("resolver");
    const demoParam = params.get("demo");
    if (resolver && scenarios.some((s) => s.id === resolver)) setScene(resolver as (typeof scenarios)[number]["id"]);
    if (demoParam && demos.some((d) => d.id === demoParam)) setDemoId(demoParam as (typeof demos)[number]["id"]);
    return () => {
      document.body.classList.remove("landing-mode");
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => {
      setBeat((n) => (n + 1) % demo.beats.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [playing, reduce, demo.beats.length]);

  useEffect(() => {
    setBeat(0);
  }, [demoId]);

  const activeNodes = useMemo(() => new Set(frame.on), [frame]);

  function goScene(id: (typeof scenarios)[number]["id"]) {
    setScene(id);
    setPanel(null);
    setOpen(false);
    document.getElementById("explorar")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function goDemo(id: (typeof demos)[number]["id"]) {
    setDemoId(id);
    setBeat(0);
    setPlaying(true);
    setPanel(null);
    document.getElementById("demo")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function jumpTo(item: (typeof jump)[number]) {
    if (item.t === "Cotización") {
      document.getElementById("conversar")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      return;
    }
    if (item.t === "Servidores") {
      goDemo("sede");
      setFocus("srv");
      return;
    }
    if (item.id === "red") {
      goDemo("falla");
      return;
    }
    goScene(item.id as (typeof scenarios)[number]["id"]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  function onRootKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setPanel(null);
      setOpen(false);
    }
    if (e.code === "Space" && (e.target as HTMLElement).tagName !== "INPUT") {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "BUTTON" || tag === "A") return;
      e.preventDefault();
      setPlaying((v) => !v);
    }
  }

  return (
    <div className={styles.root} onKeyDown={onRootKey}>
      <header className={`${styles.head} ${solid ? styles.solid : ""}`}>
        <div className={styles.headInner}>
          <Link href="/concepto-v8/" className={styles.brand} aria-label="Justech, concepto V8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/brand/justech-mark-white.png")} alt="" width={28} height={20} />
            Justech
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
                className={panel === key ? styles.on : ""}
                aria-expanded={panel === key}
                onClick={() => setPanel((p) => (p === key ? null : key))}
              >
                {label}
              </button>
            ))}
            <a href="#labs">Industrias</a>
            <a href="#metodo">Recursos</a>
            <a href="#confianza">Nosotros</a>
            <a href={company.supportUrl}>Soporte</a>
          </nav>
          <div className={styles.actions}>
            <a className={styles.phone} href={`tel:${company.phoneTel}`}>
              {company.phoneDisplay}
            </a>
            <a className={styles.cta} href="#conversar">
              Hablar con un especialista
            </a>
            <button type="button" className={styles.menu} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
        {panel && panel in mega ? (
          <div className={styles.mega} onMouseLeave={() => setPanel(null)}>
            <p>{panel}</p>
            <div className={styles.megaGrid}>
              {mega[panel as keyof typeof mega].map((item) => (
                <button key={item.t} type="button" onClick={() => goScene(item.id)}>
                  <strong>{item.t}</strong>
                  {"d" in item ? <span>{item.d}</span> : null}
                </button>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase(current.photo)} alt="" />
          </div>
        ) : null}
        {open ? (
          <div className={styles.drawer}>
            {scenarios.map((s) => (
              <button key={s.id} type="button" onClick={() => goScene(s.id)}>
                {s.t}
              </button>
            ))}
            <a href="#demo" onClick={() => setOpen(false)}>
              Demostración
            </a>
            <a href="#conversar" onClick={() => setOpen(false)}>
              Hablar con un especialista
            </a>
          </div>
        ) : null}
      </header>

      <main id="contenido">
        <section className={styles.hero} aria-label="Hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.heroPhoto} src={withBase("/visual/v7/v7-hero.jpg")} alt="" width={1536} height={1024} fetchPriority="high" />
          <div className={styles.heroShade} data-layer={layer ?? ""} />
          <svg className={styles.heroNet} viewBox="0 0 100 56" preserveAspectRatio="none" aria-hidden="true">
            <path className={`${styles.flow} ${layer === "red" || layer === "rack" ? styles.flowOn : ""}`} d="M12 40 L28 32 L44 30 L70 22 L86 16" />
            <path className={`${styles.flow} ${layer === "seguridad" ? styles.flowBlock : ""}`} d="M70 22 L78 34" />
            <path className={`${styles.flow} ${layer === "nube" ? styles.flowOn : ""}`} d="M70 22 L88 12" />
            <path className={`${styles.flow} ${layer === "soporte" ? styles.flowAlert : ""}`} d="M44 30 L80 46" />
          </svg>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Justech Technology Experience</p>
            <h1>Tecnología empresarial, conectada de extremo a extremo.</h1>
            <p className={styles.lead}>
              Equipos, infraestructura, redes, licencias, nube, seguridad y soporte bajo una sola estrategia.
            </p>
            <div className={styles.row}>
              <a className={styles.cta} href="#explorar">
                Diseñar mi solución
              </a>
              <a className={styles.ghost} href="#demo">
                Explorar lo que hacemos
              </a>
            </div>
            <p className={styles.hint} aria-live="polite">
              {heroHint ? `${heroHint.t}: ${heroHint.hint}` : "Toque o recorra los puntos. Cada capa responde."}
            </p>
          </div>
          <ul className={styles.hotspots} aria-label="Capas de la instalación">
            {heroLayers.map((h) => (
              <li key={h.id} style={{ left: h.x, top: h.y }}>
                <button
                  type="button"
                  className={layer === h.id ? styles.hotOn : ""}
                  aria-pressed={layer === h.id}
                  onMouseEnter={() => setLayer(h.id)}
                  onFocus={() => setLayer(h.id)}
                  onClick={() => setLayer((v) => (v === h.id ? null : h.id))}
                >
                  <span />
                  {h.t}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <nav className={styles.jump} aria-label="Acceso rápido">
          <p>Ir a</p>
          <div>
            {jump.map((item) => (
              <button key={item.t} type="button" onClick={() => jumpTo(item)}>
                {item.t}
              </button>
            ))}
          </div>
        </nav>

        <section className={styles.block} id="explorar">
          <div className={styles.wrap}>
            <p className={styles.kicker}>Explorador</p>
            <h2>¿Qué necesita resolver?</h2>
            <p className={styles.note}>Una escena. Un escenario. El visual cambia de verdad.</p>
            <div className={styles.explorer}>
              <div className={styles.sceneList} role="tablist" aria-label="Escenarios">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={scene === s.id}
                    className={scene === s.id ? styles.on : ""}
                    onClick={() => setScene(s.id)}
                  >
                    {s.t}
                  </button>
                ))}
              </div>
              <div className={styles.stage}>
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase(current.photo)} alt={current.alt} width={1536} height={1024} />
                  <ol className={styles.parts} aria-label="Componentes">
                    {current.parts.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ol>
                </figure>
                <div className={styles.stageCopy}>
                  <h3>{current.t}</h3>
                  <p>{current.sit}</p>
                  <p>
                    <strong>Resultado.</strong> {current.result}
                  </p>
                  <a className={styles.cta} href="#conversar">
                    {current.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.block} ${styles.alt}`} id="demo">
          <div className={styles.wrap}>
            <p className={styles.kicker}>Demostración</p>
            <h2>Una operación conectada.</h2>
            <p className={styles.note}>Usted reproduce, pausa, reinicia y elige el escenario. El scroll no es el control.</p>
            <div className={styles.transport} role="toolbar" aria-label="Controles de la demostración">
              <button type="button" onClick={() => setPlaying((v) => !v)}>
                {playing ? "Pausar" : "Reproducir"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setBeat(0);
                  setPlaying(true);
                }}
              >
                Reiniciar
              </button>
              {demos.map((d) => (
                <button key={d.id} type="button" className={demoId === d.id ? styles.on : ""} onClick={() => goDemo(d.id)}>
                  {d.t}
                </button>
              ))}
            </div>
            <div className={styles.theater}>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBase("/visual/v8/v8-scene-network.jpg")} alt="Operación conectada: sede, sucursal y nube." width={1536} height={1024} />
                <svg className={styles.topo} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className={`${styles.link} ${activeNodes.has("isp") ? styles.linkOn : ""} ${"fail" in frame && frame.fail ? styles.linkFail : ""}`} d="M8 18 L22 20 L40 16" />
                  <path className={`${styles.link} ${activeNodes.has("acceso") ? styles.linkOn : ""}`} d="M40 16 L58 40 L46 32 L36 52" />
                  <path className={`${styles.link} ${activeNodes.has("srv") ? styles.linkOn : ""}`} d="M40 16 L34 76" />
                  <path className={`${styles.link} ${activeNodes.has("cloud") ? styles.linkOn : ""}`} d="M40 16 L78 16" />
                  <path
                    className={`${styles.link} ${"backup" in frame && frame.backup ? styles.linkBackup : ""}`}
                    d="M22 20 C48 88 70 88 84 74"
                  />
                </svg>
                <ul className={styles.pins}>
                  {nodes.map((n) => (
                    <li key={n.id} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                      <button
                        type="button"
                        className={`${activeNodes.has(n.id) ? styles.pinOn : ""} ${focus === n.id ? styles.pinFocus : ""}`}
                        onClick={() => setFocus(n.id)}
                      >
                        {n.t}
                      </button>
                    </li>
                  ))}
                </ul>
                {"ticket" in frame && frame.ticket ? <p className={styles.flag}>Caso abierto · sucursal sin enlace primario</p> : null}
              </figure>
              <aside>
                <p className={styles.count}>
                  {String(beat + 1).padStart(2, "0")} / {String(demo.beats.length).padStart(2, "0")}
                </p>
                <h3>{frame.t}</h3>
                <p>{frame.d}</p>
                <p className={styles.note}>Explorar componentes: pulse un equipo en la escena.</p>
                {focus ? (
                  <p>
                    <strong>{nodes.find((n) => n.id === focus)?.t}.</strong> Parte de esta operación. Pulse otro para comparar.
                  </p>
                ) : null}
                <ol className={styles.beats}>
                  {demo.beats.map((b, i) => (
                    <li key={b.t}>
                      <button type="button" className={i === beat ? styles.on : ""} onClick={() => setBeat(i)}>
                        {b.t}
                      </button>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.block} id="labs">
          <div className={styles.wrap}>
            <p className={styles.kicker}>Laboratorios</p>
            <h2>Páginas de experiencia, después de este gate.</h2>
            <p className={styles.note}>Aquí se entra. Aún no se construyen. Cada una tendrá un control propio.</p>
            <ul className={styles.labs}>
              {labs.map((lab) => (
                <li key={lab.t}>
                  <a href="#demo">
                    <strong>{lab.t}</strong>
                    <span>{lab.d}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.block} ${styles.alt}`} id="metodo">
          <div className={styles.wrapNarrow}>
            <p className={styles.kicker}>Cómo trabajamos</p>
            <h2>Ver. Diseñar. Poner en marcha. Acompañar.</h2>
            <ol className={styles.method}>
              <li>
                <strong>Ver</strong>
                <span>Levantamiento de lo que ya existe.</span>
              </li>
              <li>
                <strong>Diseñar</strong>
                <span>Una solución con dueño y alcance.</span>
              </li>
              <li>
                <strong>Poner en marcha</strong>
                <span>Obra, equipos, red y software en el mismo plan.</span>
              </li>
              <li>
                <strong>Acompañar</strong>
                <span>Mesa, portal y operación. Horario laboral.</span>
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.band} id="confianza">
          <div className={styles.wrap}>
            <p className={styles.kicker}>Confianza</p>
            <h2>Integradora en {company.city}, desde {company.founded}.</h2>
            <ul className={styles.facts}>
              <li>
                <strong>{company.city}</strong>
                <span>{company.country}</span>
              </li>
              <li>
                <strong>{company.hours.split("(")[0].trim()}</strong>
                <span>Sin afirmar 24/7.</span>
              </li>
              <li>
                <strong>Portal</strong>
                <span>
                  <a href={company.supportUrl}>{company.supportUrl.replace("https://", "")}</a>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.block} id="conversar">
          <div className={styles.wrapNarrow}>
            <p className={styles.kicker}>Conversación</p>
            <h2>Diseñar mi solución</h2>
            {sent ? (
              <p role="status">
                Registrado en este entorno de prueba. En el sitio público responde {company.email}. Aquí no se envía correo.
              </p>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                {step === 0 ? (
                  <>
                    <p className={styles.note}>¿Qué necesita resolver?</p>
                    <div className={styles.needs}>
                      {needs.map((n) => (
                        <button key={n} type="button" className={need === n ? styles.on : ""} onClick={() => setNeed(n)}>
                          {n}
                        </button>
                      ))}
                    </div>
                    <button type="button" className={styles.cta} disabled={!need} onClick={() => setStep(1)}>
                      Continuar
                    </button>
                  </>
                ) : (
                  <>
                    <p>
                      Tema: <strong>{need}</strong>
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
                    <p className={styles.legal}>Formulario de demostración. No hay envío real en staging.</p>
                    <div className={styles.row}>
                      <button type="button" className={styles.ghostDark} onClick={() => setStep(0)}>
                        Atrás
                      </button>
                      <button type="submit" className={styles.cta}>
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

      <footer className={styles.foot}>
        <div className={styles.wrapFoot}>
          <div>
            <p className={styles.brandText}>Justech</p>
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
            <p>Experiencia</p>
            <a href="#explorar">Explorador</a>
            <a href="#demo">Demostración</a>
            <a href="#labs">Laboratorios</a>
          </div>
          <div>
            <p>Contacto</p>
            <a href={company.supportUrl}>Portal</a>
            <Link href="/soporte/">Mesa de ayuda</Link>
            <Link href="/nosotros/">Nosotros</Link>
          </div>
          <div>
            <p>Legal</p>
            <Link href="/legal/">Centro legal</Link>
            <Link href="/politica-de-privacidad/">Privacidad</Link>
          </div>
        </div>
        <p className={styles.end}>
          © {new Date().getFullYear()} {company.legalName}. Concepto V8. El sitio público permanece en www.justech.do.
        </p>
      </footer>
    </div>
  );
}
