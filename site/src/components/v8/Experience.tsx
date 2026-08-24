"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { company } from "@/content/site";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

type View = "inicio" | "explorar" | "demo" | "metodo" | "hablar";
type SceneId = (typeof scenarios)[number]["id"];
type DemoId = (typeof demos)[number]["id"];

const heroLayers = [
  { id: "rack", t: "Rack", x: "18%", y: "62%", hint: "Los puertos responden." },
  { id: "red", t: "Red", x: "44%", y: "48%", hint: "El tráfico circula." },
  { id: "equipo", t: "Equipos", x: "60%", y: "66%", hint: "El puesto se prepara." },
  { id: "seguridad", t: "Seguridad", x: "74%", y: "36%", hint: "Una conexión queda aislada." },
  { id: "nube", t: "Nube", x: "86%", y: "24%", hint: "Los datos se sincronizan." },
  { id: "soporte", t: "Soporte", x: "80%", y: "78%", hint: "Llega una alerta." },
] as const;

const jump: { t: string; view: View; scene?: SceneId; demo?: DemoId }[] = [
  { t: "Equipos", view: "explorar", scene: "equipos" },
  { t: "Redes", view: "demo", demo: "falla" },
  { t: "Cableado", view: "explorar", scene: "oficina" },
  { t: "Servidores", view: "demo", demo: "sede" },
  { t: "Licenciamiento", view: "explorar", scene: "licencias" },
  { t: "Nube", view: "explorar", scene: "migrar" },
  { t: "Seguridad", view: "explorar", scene: "proteger" },
  { t: "Soporte", view: "explorar", scene: "incidencias" },
  { t: "Servicios administrados", view: "explorar", scene: "msp" },
  { t: "Cotización", view: "hablar" },
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
    svc: "Levantamiento, cableado y puesta en marcha.",
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
    svc: "Aprovisionamiento de puestos.",
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
    svc: "Diseño y operación de la red.",
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
    svc: "Orden del tenant y asignación.",
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
    svc: "Protección por capas, sin afirmar un SOC.",
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
    svc: "Migración con origen, destino y dueño.",
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
    svc: "Mesa de ayuda. El portal vive en otro host.",
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
    svc: "Servicios administrados con alcance escrito.",
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
  industrias: [
    { id: "oficina", t: "Sede y sucursales", d: "Una operación en varios puntos." },
    { id: "equipos", t: "Puestos de trabajo", d: "Equipos listos para operar." },
    { id: "red", t: "Infraestructura", d: "Rack, red y continuidad." },
  ],
} as const;

const megaPhoto: Record<keyof typeof mega, string> = {
  soluciones: "/visual/v8/v8-scene-network.jpg",
  servicios: "/visual/v8/v8-scene-soporte.jpg",
  productos: "/visual/v8/v8-scene-puesto.jpg",
  industrias: "/visual/v7/v7-hero.jpg",
};

const labs = [
  { t: "Redes", demo: "falla" as DemoId },
  { t: "Equipos", scene: "equipos" as SceneId },
  { t: "Licenciamiento", scene: "licencias" as SceneId },
  { t: "Nube", scene: "migrar" as SceneId },
  { t: "Seguridad", scene: "proteger" as SceneId },
  { t: "Soporte", scene: "incidencias" as SceneId },
  { t: "Infraestructura", demo: "sede" as DemoId },
];

const needs = ["Equipos", "Redes", "Cableado", "Licencias", "Seguridad", "Nube", "Soporte", "Proyecto integral"];
const views: { id: View; t: string }[] = [
  { id: "inicio", t: "Inicio" },
  { id: "explorar", t: "Explorar" },
  { id: "demo", t: "Operación" },
  { id: "metodo", t: "Método" },
  { id: "hablar", t: "Conversar" },
];

export function ExperienceV8() {
  const [view, setView] = useState<View>("inicio");
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<keyof typeof mega | null>(null);
  const [layer, setLayer] = useState<(typeof heroLayers)[number]["id"] | null>(null);
  const [scene, setScene] = useState<SceneId>("oficina");
  const [demoId, setDemoId] = useState<DemoId>("sede");
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

  function syncUrl(next: View, nextScene = scene, nextDemo = demoId) {
    const q = new URLSearchParams({ vista: next });
    if (next === "explorar") q.set("resolver", nextScene);
    if (next === "demo") q.set("demo", nextDemo);
    window.history.replaceState(null, "", `?${q.toString()}`);
  }

  function show(next: View) {
    setView(next);
    setPanel(null);
    setOpen(false);
    syncUrl(next);
  }

  function goScene(id: SceneId) {
    setScene(id);
    setView("explorar");
    setPanel(null);
    setOpen(false);
    syncUrl("explorar", id);
  }

  function goDemo(id: DemoId) {
    setDemoId(id);
    setBeat(0);
    setPlaying(!reduce);
    setView("demo");
    setPanel(null);
    setOpen(false);
    syncUrl("demo", scene, id);
  }

  useEffect(() => {
    document.body.classList.add("landing-mode", "v8-shell");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduce(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    apply();
    mq.addEventListener("change", apply);
    const params = new URLSearchParams(window.location.search);
    const vista = params.get("vista") as View | null;
    const resolver = params.get("resolver");
    const demoParam = params.get("demo");
    if (vista && views.some((v) => v.id === vista)) setView(vista);
    if (resolver && scenarios.some((s) => s.id === resolver)) {
      setScene(resolver as SceneId);
      if (!vista) setView("explorar");
    }
    if (demoParam && demos.some((d) => d.id === demoParam)) {
      setDemoId(demoParam as DemoId);
      if (!vista) setView("demo");
    }
    return () => {
      document.body.classList.remove("landing-mode", "v8-shell");
      mq.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (!playing || reduce || view !== "demo") return;
    const id = window.setInterval(() => setBeat((n) => (n + 1) % demo.beats.length), 1600);
    return () => window.clearInterval(id);
  }, [playing, reduce, demo.beats.length, view]);

  useEffect(() => setBeat(0), [demoId]);

  const activeNodes = useMemo(() => new Set(frame.on), [frame]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (e.key === "Escape") {
        if (panel || open) {
          setPanel(null);
          setOpen(false);
          return;
        }
        if (view !== "inicio") show("inicio");
      }
      if (typing) return;
      if (e.code === "Space" && view === "demo" && tag !== "BUTTON" && tag !== "A") {
        e.preventDefault();
        setPlaying((v) => !v);
      }
      if (view === "demo" && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        e.preventDefault();
        setBeat((n) => {
          const len = demo.beats.length;
          return e.key === "ArrowRight" ? (n + 1) % len : (n - 1 + len) % len;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- show() only uses setters
  }, [view, panel, open, demo.beats.length]);

  return (
    <div className={styles.app}>
      <header className={styles.head}>
        <div className={styles.headInner}>
          <button type="button" className={styles.brand} onClick={() => show("inicio")} aria-label="Justech, inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase("/brand/justech-mark-white.png")} alt="" width={28} height={20} />
            Justech
          </button>
          <nav className={styles.nav} aria-label="Principal">
            {(
              [
                ["soluciones", "Soluciones"],
                ["servicios", "Servicios"],
                ["productos", "Productos"],
                ["industrias", "Industrias"],
              ] as const
            ).map(([key, label]) => (
              <button key={key} type="button" className={panel === key ? styles.on : ""} aria-expanded={panel === key} onClick={() => setPanel((p) => (p === key ? null : key))}>
                {label}
              </button>
            ))}
            <button type="button" onClick={() => show("metodo")}>
              Recursos
            </button>
            <button type="button" onClick={() => show("metodo")}>
              Nosotros
            </button>
            <a href={company.supportUrl}>Soporte</a>
          </nav>
          <div className={styles.actions}>
            <a className={styles.phone} href={`tel:${company.phoneTel}`}>
              {company.phoneDisplay}
            </a>
            <button type="button" className={styles.cta} onClick={() => show("hablar")}>
              Hablar con un especialista
            </button>
            <button type="button" className={styles.menu} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
        {panel ? (
          <div className={styles.mega}>
            <div className={styles.megaGrid}>
              {mega[panel].map((item) => (
                <button key={item.t} type="button" onClick={() => goScene(item.id)}>
                  <strong>{item.t}</strong>
                  {"d" in item ? <span>{item.d}</span> : null}
                </button>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase(megaPhoto[panel])} alt="" />
          </div>
        ) : null}
        {open ? (
          <div className={styles.drawer}>
            {views.map((v) => (
              <button key={v.id} type="button" onClick={() => show(v.id)}>
                {v.t}
              </button>
            ))}
            {jump.map((item) => (
              <button
                key={`m-${item.t}`}
                type="button"
                onClick={() => {
                  if (item.scene) goScene(item.scene);
                  else if (item.demo) goDemo(item.demo);
                  else show(item.view);
                }}
              >
                {item.t}
              </button>
            ))}
          </div>
        ) : null}
      </header>

      <nav className={styles.rail} aria-label="Experiencia">
        {views.map((v) => (
          <button key={v.id} type="button" className={view === v.id ? styles.on : ""} aria-current={view === v.id ? "page" : undefined} onClick={() => show(v.id)}>
            {v.t}
          </button>
        ))}
        <span className={styles.railJump}>
          {jump.map((item) => (
            <button
              key={item.t}
              type="button"
              onClick={() => {
                if (item.scene) goScene(item.scene);
                else if (item.demo) goDemo(item.demo);
                else show(item.view);
              }}
            >
              {item.t}
            </button>
          ))}
        </span>
      </nav>

      <main id="contenido" className={styles.stage} data-view={view}>
        {view === "inicio" ? (
          <section className={styles.hero} aria-label="Hero">
            <div className={styles.heroCopy}>
              <p className={styles.kicker}>Justech Technology Experience</p>
              <h1>Tecnología empresarial, conectada de extremo a extremo.</h1>
              <p className={styles.lead}>Equipos, infraestructura, redes, licencias, nube, seguridad y soporte bajo una sola estrategia.</p>
              <div className={styles.row}>
                <button type="button" className={styles.cta} onClick={() => show("explorar")}>
                  Diseñar mi solución
                </button>
                <button type="button" className={styles.ghost} onClick={() => show("demo")}>
                  Explorar lo que hacemos
                </button>
              </div>
              <p className={styles.hint} aria-live="polite">
                {heroHint ? `${heroHint.t}: ${heroHint.hint}` : "Recorra los puntos de la instalación. Cada capa responde."}
              </p>
            </div>
            <div className={styles.heroVisual}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase("/visual/v7/v7-hero.jpg")} alt="Instalación empresarial: rack, operación y ciudad." width={1536} height={1024} fetchPriority="high" />
              <div className={styles.heroShade} data-layer={layer ?? ""} />
              <svg className={styles.heroNet} viewBox="0 0 100 56" preserveAspectRatio="none" aria-hidden="true">
                <path className={`${styles.flow} ${layer === "red" || layer === "rack" ? styles.flowOn : ""}`} d="M12 40 L28 32 L44 30 L70 22 L86 16" />
                <path className={`${styles.flow} ${layer === "seguridad" ? styles.flowBlock : ""}`} d="M70 22 L78 34" />
                <path className={`${styles.flow} ${layer === "nube" ? styles.flowOn : ""}`} d="M70 22 L88 12" />
                <path className={`${styles.flow} ${layer === "soporte" ? styles.flowAlert : ""}`} d="M44 30 L80 46" />
              </svg>
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
                      <span className={styles.dot} />
                      <span className={styles.hotLabel}>{h.t}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {view === "explorar" ? (
          <section className={styles.explorer} aria-label="Explorador">
            <div className={styles.side}>
              <p className={styles.kicker}>¿Qué necesita resolver?</p>
              <div className={styles.sceneList} role="tablist" aria-label="Escenarios">
                {scenarios.map((s) => (
                  <button key={s.id} type="button" role="tab" aria-selected={scene === s.id} className={scene === s.id ? styles.on : ""} onClick={() => goScene(s.id)}>
                    {s.t}
                  </button>
                ))}
              </div>
            </div>
            <figure className={styles.canvas}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(current.photo)} alt={current.alt} width={1536} height={1024} />
              <ol className={styles.parts}>
                {current.parts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </figure>
            <div className={styles.panel}>
              <h2>{current.t}</h2>
              <p>{current.sit}</p>
              <p>
                <strong>Servicio.</strong> {current.svc}
              </p>
              <p className={styles.kicker}>Proceso</p>
              <ol className={styles.process}>
                {current.parts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
              <p>
                <strong>Resultado.</strong> {current.result}
              </p>
              <button type="button" className={styles.cta} onClick={() => show("hablar")}>
                {current.cta}
              </button>
              <button type="button" className={styles.ghostDark} onClick={() => show("inicio")}>
                Volver al inicio
              </button>
            </div>
          </section>
        ) : null}

        {view === "demo" ? (
          <section className={styles.demo} aria-label="Demostración">
            <div className={styles.transport} role="toolbar" aria-label="Controles">
              <p className={styles.kicker}>Una operación conectada</p>
              <button type="button" onClick={() => setPlaying((v) => !v)}>
                {playing ? "Pausar" : "Reproducir"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setBeat(0);
                  setPlaying(!reduce);
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
              <figure className={styles.canvas}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBase("/visual/v8/v8-scene-network.jpg")} alt="Operación conectada: sede, sucursal y nube." width={1536} height={1024} />
                <svg className={styles.topo} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className={`${styles.link} ${activeNodes.has("isp") ? styles.linkOn : ""} ${"fail" in frame && frame.fail ? styles.linkFail : ""}`} d="M8 18 L22 20 L40 16" />
                  <path className={`${styles.link} ${activeNodes.has("acceso") ? styles.linkOn : ""}`} d="M40 16 L58 40 L46 32 L36 52" />
                  <path className={`${styles.link} ${activeNodes.has("srv") ? styles.linkOn : ""}`} d="M40 16 L34 76" />
                  <path className={`${styles.link} ${activeNodes.has("cloud") ? styles.linkOn : ""}`} d="M40 16 L78 16" />
                  <path className={`${styles.link} ${"backup" in frame && frame.backup ? styles.linkBackup : ""}`} d="M22 20 C48 88 70 88 84 74" />
                </svg>
                <ul className={styles.pins}>
                  {nodes.map((n) => (
                    <li key={n.id} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                      <button type="button" className={`${activeNodes.has(n.id) ? styles.pinOn : ""} ${focus === n.id ? styles.pinFocus : ""}`} onClick={() => setFocus(n.id)}>
                        {n.t}
                      </button>
                    </li>
                  ))}
                </ul>
                {"ticket" in frame && frame.ticket ? <p className={styles.flag}>Caso abierto · sucursal sin enlace primario</p> : null}
              </figure>
              <aside className={styles.panel}>
                <p className={styles.count}>
                  {String(beat + 1).padStart(2, "0")} / {String(demo.beats.length).padStart(2, "0")}
                </p>
                <h2>{frame.t}</h2>
                <p>{frame.d}</p>
                <p className={styles.hint}>Pulse un equipo para inspeccionarlo. Espacio pausa.</p>
                {focus ? (
                  <p>
                    <strong>{nodes.find((n) => n.id === focus)?.t}.</strong> Activo en esta operación.
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
                <button type="button" className={styles.ghostDark} onClick={() => show("inicio")}>
                  Volver al inicio
                </button>
              </aside>
            </div>
          </section>
        ) : null}

        {view === "metodo" ? (
          <section className={styles.method}>
            <div>
              <p className={styles.kicker}>Cómo trabajamos</p>
              <h2>Ver. Diseñar. Poner en marcha. Acompañar.</h2>
              <ol>
                <li>
                  <strong>Ver</strong> Levantamiento de lo que ya existe.
                </li>
                <li>
                  <strong>Diseñar</strong> Una solución con dueño y alcance.
                </li>
                <li>
                  <strong>Poner en marcha</strong> Obra, equipos, red y software en el mismo plan.
                </li>
                <li>
                  <strong>Acompañar</strong> Mesa y portal. {company.hours.split("(")[0].trim()}.
                </li>
              </ol>
            </div>
            <aside className={styles.panel}>
              <p className={styles.kicker}>Confianza</p>
              <h2>
                {company.city}, desde {company.founded}.
              </h2>
              <p>
                Integradora tecnológica. Sin cifras inventadas. Portal:{" "}
                <a href={company.supportUrl}>{company.supportUrl.replace("https://", "")}</a>
              </p>
              <p className={styles.kicker}>Laboratorios futuros</p>
              <div className={styles.labs}>
                {labs.map((lab) => (
                  <button key={lab.t} type="button" onClick={() => (lab.demo ? goDemo(lab.demo) : lab.scene ? goScene(lab.scene) : show("demo"))}>
                    {lab.t}
                  </button>
                ))}
              </div>
              <button type="button" className={styles.ghostDark} onClick={() => show("inicio")}>
                Volver al inicio
              </button>
            </aside>
          </section>
        ) : null}

        {view === "hablar" ? (
          <section className={styles.talk}>
            <div>
              <p className={styles.kicker}>Conversación</p>
              <h2>Diseñar mi solución</h2>
              <p>
                {company.phoneDisplay} · {company.email}
              </p>
            </div>
            {sent ? (
              <p role="status">
                Registrado en este entorno de prueba. En el sitio público responde {company.email}. Aquí no se envía correo.
              </p>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                {step === 0 ? (
                  <>
                    <p>¿Qué necesita resolver?</p>
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
          </section>
        ) : null}
      </main>

      <footer className={styles.foot}>
        <p>
          {company.legalName} · {company.city} ·{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
        <p>
          <Link href="/legal/">Legal</Link>
          <Link href="/politica-de-privacidad/">Privacidad</Link>
          <span>Concepto V8. El sitio público permanece en www.justech.do.</span>
        </p>
      </footer>
    </div>
  );
}
