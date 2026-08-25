"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Chrome, Foot } from "@/components/v8/Chrome";
import { QuoteFlow } from "@/components/v8/Studios";
import { company } from "@/content/site";
import { publicEvidence } from "@/content/evidence";
import { trustStrip } from "@/content/v83";
import { heroStages } from "@/content/v84";
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

const CableDemo = dynamic(() => import("@/components/v8/CableDemo").then((m) => m.CableDemo));
const CloudDemo = dynamic(() => import("@/components/v8/StoryDemos").then((m) => m.CloudDemo));
const SecurityDemo = dynamic(() => import("@/components/v8/StoryDemos").then((m) => m.SecurityDemo));
const DeviceDemo = dynamic(() => import("@/components/v8/Studios").then((m) => m.DeviceDemo));
const LicenseDemo = dynamic(() => import("@/components/v8/Studios").then((m) => m.LicenseDemo));
const NetworkDemo = dynamic(() => import("@/components/v8/Studios").then((m) => m.NetworkDemo));
const SupportDemo = dynamic(() => import("@/components/v8/Studios").then((m) => m.SupportDemo));

const HERO_MS = 1100;
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
  const [heroBeat, setHeroBeat] = useState(0);
  const [heroPlay, setHeroPlay] = useState(false);
  const [heroRest, setHeroRest] = useState(false);
  const [heroExtra, setHeroExtra] = useState(false);
  const [need, setNeed] = useState<NeedId>("sede");
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [sent, setSent] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);
  const [sceneExtra, setSceneExtra] = useState(false);
  const [wide, setWide] = useState(true);
  const [netBeat, setNetBeat] = useState(0);
  const [netPlay, setNetPlay] = useState(false);
  const [quoteNeed, setQuoteNeed] = useState("");

  const current = NEEDS[need];
  const frames = framesOf(need);
  const frame = Math.min(beat, frames.length - 1);
  const plate = frames[frame];
  const stage = heroStages[Math.min(heroBeat, heroStages.length - 1)];
  const heroPlate = !heroExtra || heroRest || reduce ? "v83-hero-day" : stage.plate;
  const progress = ((frame + 1) / frames.length) * 100;
  const facts = useMemo(() => trustStrip(), []);
  const verifiedSlots = useMemo(() => publicEvidence(), []);
  const heroDeskUniq = useMemo(
    () => ["v83-hero-day", "v83-hero-rack", "v83-hero-ops", "v83-hero-result"],
    [],
  );

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
    document.body.classList.add("landing-mode");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wideMq = window.matchMedia("(min-width: 721px)");
    const apply = () => {
      setReduce(mq.matches);
      if (mq.matches) {
        setHeroPlay(false);
        setHeroRest(true);
        setPlaying(false);
        setHeroBeat(heroStages.length - 1);
        setNetPlay(false);
      }
    };
    const applyWide = () => setWide(wideMq.matches);
    apply();
    applyWide();
    mq.addEventListener("change", apply);
    wideMq.addEventListener("change", applyWide);
    const params = new URLSearchParams(window.location.search);
    const exp = params.get("necesidad") || params.get("experiencia");
    if (exp === "sede" || exp === "construir") setNeed("sede");
    if (exp === "modernizar") setNeed("modernizar");
    if (exp === "operar") setNeed("operar");
    setReady(true);
    const extras = window.setTimeout(() => {
      setHeroExtra(true);
      if (!mq.matches) setHeroPlay(true);
    }, 4000);
    return () => {
      document.body.classList.remove("landing-mode");
      mq.removeEventListener("change", apply);
      wideMq.removeEventListener("change", applyWide);
      window.clearTimeout(extras);
    };
  }, []);

  useEffect(() => {
    if (!heroPlay || reduce || heroRest) return;
    const id = window.setInterval(() => {
      setHeroBeat((n) => {
        if (n >= heroStages.length - 1) {
          setHeroRest(true);
          setHeroPlay(false);
          return n;
        }
        return n + 1;
      });
    }, HERO_MS);
    return () => window.clearInterval(id);
  }, [heroPlay, reduce, heroRest]);

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

  function replayHero() {
    setHeroBeat(0);
    setHeroRest(false);
    setHeroPlay(!reduce);
  }

  function startNet(n = 0) {
    setNetBeat(n);
    setNetPlay(!reduce);
    document.getElementById("red")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className={styles.page} data-ready={ready ? "1" : "0"} data-v="85">
      <Chrome onNeed={selectNeed} onTalk={() => talk()} />

      <main id="contenido">
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
            <p className={styles.trustLine}>{V85.hero.kicker}</p>
            <h1>{V85.hero.h1}</h1>
            <p>{V85.hero.lead}</p>
            <div className={styles.heroCtas}>
              <a className={styles.cta} href="#conversar" onClick={() => talk("sede")}>
                {V85.hero.primary.label}
              </a>
              <a className={styles.text} href="#capacidades">
                {V85.hero.secondary.label}
              </a>
            </div>
            <ol className={styles.heroRail} aria-hidden="true">
              {heroStages.map((s, i) => (
                <li key={s.t} data-on={heroRest || reduce || i <= heroBeat ? "1" : "0"} />
              ))}
            </ol>
            <p className={styles.caption} aria-live="polite">
              {heroRest || reduce ? "Operación estable." : stage.t}
            </p>
            <button
              type="button"
              className={styles.quiet}
              onClick={() => {
                if (heroRest) replayHero();
                else setHeroPlay((v) => !v);
              }}
            >
              {heroPlay ? "Pausar escena" : "Reproducir escena"}
            </button>
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
            <h2 id="propuesta">{V85.corporate.title}</h2>
            <p>{V85.corporate.body}</p>
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
            <Scene need={need} plate={plate} beat={frame} extra={sceneExtra} />
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
      </main>

      <Foot />
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
