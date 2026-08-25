"use client";

import { useEffect, useState } from "react";
import { heroStages } from "@/content/v84";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";

const extra = ["v83-hero-rack", "v83-hero-ops", "v83-hero-result"] as const;

/** Placas extra tras el LCP. No se pintan en el HTML inicial. Solo escritorio. */
export function HeroMotion() {
  const [on, setOn] = useState(false);
  const [beat, setBeat] = useState(0);
  const [rest, setRest] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 721px)");
    if (mq.matches || !wide.matches) {
      setReduce(true);
      return;
    }
    const idle = window.setTimeout(() => setOn(true), 2800);
    return () => window.clearTimeout(idle);
  }, []);

  useEffect(() => {
    if (!on || reduce || rest) return;
    const id = window.setInterval(() => {
      setBeat((n) => {
        if (n >= extra.length - 1) {
          setRest(true);
          return n;
        }
        return n + 1;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, [on, reduce, rest]);

  if (!on || reduce) return null;
  const plate = rest ? extra[extra.length - 1] : extra[Math.min(beat, extra.length - 1)];
  return (
    <>
      {extra.map((name) => {
        const src = withBase(`/visual/v8/${name}`);
        return (
          <picture key={name} className={`${styles.plate} ${plate === name ? styles.plateOn : ""}`}>
            <source srcSet={`${src}.webp`} type="image/webp" />
            <img src={`${src}.jpg`} alt="" width={1600} height={900} loading="lazy" decoding="async" />
          </picture>
        );
      })}
      <p className={styles.heroLiveCap} aria-live="polite">
        {rest ? "Operación estable." : heroStages[Math.min(beat + 1, heroStages.length - 1)]?.t}
      </p>
    </>
  );
}
