"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { QuoteFlow } from "@/components/v8/Studios";
import { company } from "@/content/site";
import { publicEvidence } from "@/content/evidence";
import { publishedAnonCases } from "@/content/cases-anonymized";
import { publicClaims } from "@/content/justech-source-of-truth";
import { trustStrip } from "@/content/v83";
import {
  AREAS,
  BRANDS,
  BRANDS_COPY,
  BRANDS_NOTE,
  NEEDS,
  RELATION_LABEL,
  RESOURCES,
  V85,
  V85_BASE,
  type NeedId,
} from "@/content/v85";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

const CableDemo = dynamic(() => import("@/components/v8/CableDemo").then((m) => m.CableDemo), { ssr: false });
const CloudDemo = dynamic(() => import("@/components/v8/StoryDemos").then((m) => m.CloudDemo), { ssr: false });
const SecurityDemo = dynamic(() => import("@/components/v8/StoryDemos").then((m) => m.SecurityDemo), { ssr: false });
const DeviceDemo = dynamic(() => import("@/components/v8/Studios").then((m) => m.DeviceDemo), { ssr: false });
const LicenseDemo = dynamic(() => import("@/components/v8/Studios").then((m) => m.LicenseDemo), { ssr: false });
const NetworkDemo = dynamic(() => import("@/components/v8/Studios").then((m) => m.NetworkDemo), { ssr: false });
const SupportDemo = dynamic(() => import("@/components/v8/Studios").then((m) => m.SupportDemo), { ssr: false });

const SCENE_MS = 1400;

const sedeFrames = ["v82-sede-vacio", "v82-sede-cables", "v82-sede-rack", "v82-sede-activa"];
const modernFrames = [
  "v82-modern-old",
  "v82-modern-id",
  "v82-modern-sec",
  "v82-modern-apps",
  "v82-modern-cloud",
  "v82-puesto-listo",
];
const operateFrames = ["v82-sede-activa", "v82-sede-focus-mdf", "v82-ops-normal", "v82-ops-normal"];

function framesOf(need: NeedId) {
  if (need === "sede") return sedeFrames;
  if (need === "modernizar") return modernFrames;
  return operateFrames;
}

const quoteByNeed: Record<NeedId, string> = {
  sede: "sede",
  modernizar: "modernizacion",
  operar: "soporte",
};

export function ExperienceV8() {
  const [need, setNeed] = useState<NeedId>("sede");
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [sent, setSent] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);
  const [sceneExtra, setSceneExtra] = useState(false);
  const [netBeat, setNetBeat] = useState(0);
  const [netPlay, setNetPlay] = useState(false);
  const [quoteNeed, setQuoteNeed] = useState("");

  const current = NEEDS[need];
  const frames = framesOf(need);
  const frame = Math.min(beat, frames.length - 1);
  const plate = frames[frame];
  const progress = ((frame + 1) / frames.length) * 100;
  const facts = useMemo(() => trustStrip(), []);
  const verifiedSlots = useMemo(() => publicEvidence(), []);
  const cases = useMemo(() => publishedAnonCases(), []);
  const corporate = useMemo(() => publicClaims(), []);

  function talk(id?: string) {
    if (id) setQuoteNeed(id);
    document.getElementById("conversar")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function selectNeed(next: NeedId) {
    setNeed(next);
    setBeat(0);
    setPlaying(!reduce);
    window.history.replaceState(null, "", `?necesidad=${next}`);
  }

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduce(mq.matches);
      if (mq.matches) {
        setPlaying(false);
        setNetPlay(false);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    const params = new URLSearchParams(window.location.search);
    const exp = params.get("necesidad") || params.get("experiencia");
    if (exp === "sede" || exp === "construir") setNeed("sede");
    if (exp === "modernizar") setNeed("modernizar");
    if (exp === "operar") setNeed("operar");
    setReady(true);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = document.getElementById("necesidades");
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
  }, [reduce]);

  useEffect(() => {
    if (!netPlay || reduce) return;
    const id = window.setInterval(() => setNetBeat((n) => (n + 1) % 10), 1400);
    return () => window.clearInterval(id);
  }, [netPlay, reduce]);

  useEffect(() => {
    if (!playing || reduce) return;
    const id = window.setInterval(() => setBeat((n) => (n + 1) % frames.length), SCENE_MS);
    return () => window.clearInterval(id);
  }, [playing, reduce, frames.length, need]);

  function startNet(n = 0) {
    setNetBeat(n);
    setNetPlay(!reduce);
    document.getElementById("red")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className={styles.body} data-ready={ready ? "1" : "0"}>
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
          <h2 id="propuesta">{V85.corporate.title}</h2>
          <p>{V85.corporate.body}</p>
          <p className={styles.quiet}>
            {corporate.find((c) => c.id === "capability")?.text}. Atención local en República Dominicana.
          </p>
        </div>
        <ol className={styles.cycle} aria-label="Cinco áreas de oferta">
          {AREAS.map((a) => (
            <li key={a.id}>
              <Link href={a.href}>
                <strong>{a.title}</strong>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.experiences} id="necesidades" aria-labelledby="exp-title">
        <div className={styles.expHead}>
          <p className={styles.kicker}>Necesidades</p>
          <h2 id="exp-title">Tres formas de empezar. Un solo equipo.</h2>
          <p className={styles.expIntro} id="capacidades">
            Elija la necesidad. Cambian el problema, la solución, el proceso, los servicios y el siguiente paso. Las
            listas completas no se muestran a la vez.
          </p>
          <div className={styles.paths} role="tablist" aria-label="Necesidades">
            {(Object.keys(NEEDS) as NeedId[]).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={need === id}
                className={need === id ? styles.pathOn : styles.path}
                onClick={() => selectNeed(id)}
              >
                {NEEDS[id].title}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.expBody}>
          {ready ? <Scene need={need} plate={plate} beat={frame} extra={sceneExtra} /> : <figure className={styles.scene} />}
          <div className={styles.expCopy} data-mode={need}>
            <div className={styles.meter} aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <p className={styles.kicker}>{current.kicker}</p>
            <h3>{current.title}</h3>
            <p>
              <strong>Problema. </strong>
              {current.problem}
            </p>
            <p>
              <strong>Solución. </strong>
              {current.solution}
            </p>
            <p>
              <strong>Proceso. </strong>
            </p>
            <ol className={styles.process}>
              {current.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p>
              <strong>Caso de uso. </strong>
              {current.useCase}
            </p>
            <ul className={styles.related}>
              {current.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className={styles.doorCtas}>
              <a className={styles.cta} href={current.cta.href} onClick={() => talk(quoteByNeed[need])}>
                {current.cta.label}
              </a>
              {need === "operar" ? (
                <button type="button" className={styles.text} onClick={() => startNet(0)}>
                  Ver la red
                </button>
              ) : need === "sede" ? (
                <a className={styles.text} href="#cableado">
                  Ver el cableado
                </a>
              ) : (
                <a className={styles.text} href="#equipos">
                  Ver la incorporación
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <CableDemo compact />

      <NetworkDemo
        beat={netBeat}
        playing={netPlay}
        onPlay={() => setNetPlay((v) => !v)}
        onBeat={(n) => {
          setNetBeat(n);
          setNetPlay(false);
        }}
      />

      <div className={styles.summaries}>
        <DeviceDemo compact />
        <LicenseDemo compact />
      </div>
      <div className={styles.summaries}>
        <SecurityDemo />
        <CloudDemo />
      </div>

      <SupportDemo beat={netBeat} onWatchNet={() => startNet(6)} />

      <section className={styles.cases} aria-labelledby="casos-title">
        <p className={styles.kicker}>Alcances tipo</p>
        <h2 id="casos-title">Ejemplos de alcance, sin identificar organizaciones.</h2>
        <p className={styles.expIntro}>
          Patrones de servicio preparados a partir de trabajo típico. No son testimonios ni clientes publicados. Los
          nombres reales permanecen fuera de este entorno hasta haber permiso escrito.
        </p>
        <ul className={styles.caseGrid}>
          {cases.map((item) => (
            <li key={item.id}>
              <p className={styles.caseNeed}>{item.need}</p>
              <strong>{item.sector}</strong>
              <p>
                <span>Situación. </span>
                {item.problem}
              </p>
              <p>
                <span>Trabajo. </span>
                {item.work}
              </p>
              <p>
                <span>Resultado. </span>
                {item.outcome}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.method} id="metodo">
        <p className={styles.kicker}>{V85.methodInternal.label}</p>
        <h2>Cómo entregamos, por dentro.</h2>
        <ol>
          {V85.methodInternal.steps.map((s) => (
            <li key={s.id}>
              <strong>{s.title}. </strong>
              {s.text}
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.brands} aria-labelledby="brands-title">
        <p className={styles.kicker}>Tecnologías</p>
        <h2 id="brands-title">Tecnologías con las que trabajamos</h2>
        <p>{BRANDS_COPY}</p>
        <ul className={styles.brandList}>
          {BRANDS.filter((b) => b.public).map((b) => (
            <li key={b.name}>
              <strong>{b.name}</strong>
              <span>{RELATION_LABEL[b.relation]}</span>
            </li>
          ))}
        </ul>
        <p className={styles.quiet}>{BRANDS_NOTE}</p>
      </section>

      <section className={styles.evidence} id="confianza" aria-labelledby="ev-title">
        <p className={styles.kicker}>Confianza verificable</p>
        <h2 id="ev-title">Publicamos hechos con fuente. Nada más.</h2>
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
          Clientes, logos, testimonios y partnerships aparecen cuando exista permiso escrito, evidencia y fecha. Los
          componentes existen y permanecen desactivados.
        </p>
      </section>

      <section className={styles.resources} aria-labelledby="res-title">
        <p className={styles.kicker}>Recursos</p>
        <h2 id="res-title">Guías para decidir con criterio técnico.</h2>
        <ul className={styles.resGrid}>
          {RESOURCES.map((r) => (
            <li key={r.slug}>
              <Link href={`${V85_BASE}/recursos/${r.slug}/`}>
                <strong>{r.title}</strong>
                <span>{r.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {sent ? (
        <section className={styles.talk} id="conversar">
          <h2>Solicitud registrada</h2>
          <p role="status">
            Gracias. En producción un especialista escribiría a {company.email}. En este entorno no se envía correo.
          </p>
        </section>
      ) : (
        <QuoteFlow initial={quoteNeed} onDone={() => setSent(true)} />
      )}
    </div>
  );
}

function Plate({
  name,
  alt,
  width,
  height,
  active,
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  active: boolean;
}) {
  const desk = withBase(`/visual/v8/${name}`);
  return (
    <picture className={`${styles.plate} ${active ? styles.plateOn : ""}`}>
      <source srcSet={`${desk}.webp`} type="image/webp" />
      <img
        src={`${desk}.jpg`}
        alt={alt}
        width={width}
        height={height}
        fetchPriority="low"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

function Scene({
  need,
  plate,
  beat,
  extra,
}: {
  need: NeedId;
  plate: string;
  beat: number;
  extra: boolean;
}) {
  const catalog = framesOf(need);
  const uniq = extra ? Array.from(new Set(catalog)) : Array.from(new Set([catalog[0], plate]));
  return (
    <figure className={styles.scene} data-mode={need} data-beat={beat}>
      {uniq.map((name, i) => (
        <Plate
          key={name}
          name={name}
          alt={
            i === 0
              ? need === "modernizar"
                ? "Puesto de trabajo empresarial en proceso de incorporación."
                : "Sede empresarial: cuarto técnico, rack y puestos."
              : ""
          }
          width={1600}
          height={900}
          active={name === plate}
        />
      ))}
    </figure>
  );
}
