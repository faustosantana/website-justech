"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { QuoteFlow } from "@/components/v8/Studios";
import { company } from "@/content/site";
import { CASES, CASES_HEADING, CASES_INTRO } from "@/content/cases-anonymized";
import { TECH_GROUPS, TECH_HEADING } from "@/content/technologies";
import { trustStrip } from "@/content/v83";
import { AREAS, NEEDS, RESOURCES, V85, V85_BASE, type NeedId } from "@/content/v85";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

const OperationsDemo = dynamic(
  () => import("@/components/v8/OperationsDemo").then((m) => m.OperationsDemo),
  { ssr: false },
);

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
  const [quoteNeed, setQuoteNeed] = useState("");

  const current = NEEDS[need];
  const frames = framesOf(need);
  const frame = Math.min(beat, frames.length - 1);
  const plate = frames[frame];
  const progress = ((frame + 1) / frames.length) * 100;
  const facts = useMemo(() => trustStrip(), []);

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
      if (mq.matches) setPlaying(false);
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
    if (!playing || reduce) return;
    const id = window.setInterval(() => setBeat((n) => (n + 1) % frames.length), SCENE_MS);
    return () => window.clearInterval(id);
  }, [playing, reduce, frames.length, need]);

  return (
    <div className={styles.body} data-ready={ready ? "1" : "0"}>
      <section className={styles.trust} id="confianza" aria-label="Confianza verificable">
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

      <section className={styles.experiences} id="necesidades" aria-labelledby="exp-title">
        <div className={styles.expHead}>
          <p className={styles.kicker}>Necesidades</p>
          <h2 id="exp-title">Tres formas de empezar. Un solo equipo.</h2>
          <p className={styles.expIntro} id="capacidades">
            Elija la necesidad. Cambian el problema, la solución, el proceso y el siguiente paso.
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
            <ol className={styles.process}>
              {current.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
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
              <a className={styles.text} href="#operacion">
                Ver cómo se conecta
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proposal} id="ecosistema" aria-labelledby="propuesta">
        <div className={styles.proposalCopy}>
          <p className={styles.kicker}>Capacidades</p>
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
        <div className={styles.techBlock} aria-labelledby="brands-title">
          <p className={styles.kicker}>Tecnologías</p>
          <h3 id="brands-title">{TECH_HEADING}</h3>
          <div className={styles.techGroups}>
            {TECH_GROUPS.map((group) => (
              <div key={group.id}>
                <p className={styles.techLabel}>{group.label}</p>
                <ul className={styles.brandList}>
                  {group.names.map((name) => (
                    <li key={name}>
                      <strong>{name}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.opsSlot}>
        {ready ? <OperationsDemo /> : <div className={styles.opsReserve} aria-hidden="true" />}
      </div>

      <section className={styles.cases} aria-labelledby="casos-title">
        <p className={styles.kicker}>Experiencia</p>
        <h2 id="casos-title">{CASES_HEADING}</h2>
        <p className={styles.expIntro}>{CASES_INTRO}</p>
        <ul className={styles.caseGrid}>
          {CASES.map((item) => (
            <li key={item.id}>
              <p className={styles.caseNeed}>{item.title}</p>
              <strong>{item.lead}</strong>
              <p>{item.service}</p>
              <p>
                <Link href={item.href}>Ver el servicio relacionado</Link>
              </p>
            </li>
          ))}
        </ul>
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
