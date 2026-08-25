import { V85 } from "@/content/v85";
import { withBase } from "@/lib/paths";
import styles from "./experience.module.css";
import { HeroMotion } from "./HeroMotion";

/** Hero estático: el LCP vive en el HTML del servidor, no espera al bundle de Experience. */
export function HomeHero() {
  const desk = withBase("/visual/v8/v83-hero-day");
  const mobile = withBase("/visual/v8/v83-hero-mobile");
  return (
    <section className={styles.hero} id="inicio" aria-label="Hero" data-lcp="86">
      <div className={styles.heroStage} data-motion="ok">
        <picture className={`${styles.plate} ${styles.lcp} ${styles.plateOn}`}>
          <source media="(max-width: 720px)" srcSet={`${mobile}.avif`} type="image/avif" />
          <source media="(max-width: 720px)" srcSet={`${mobile}.webp`} type="image/webp" />
          <source media="(max-width: 720px)" srcSet={`${mobile}.jpg`} />
          <source srcSet={`${desk}.avif`} type="image/avif" />
          <source srcSet={`${desk}.webp`} type="image/webp" />
          <img
            src={`${desk}.jpg`}
            alt="Oficina empresarial de día: rack, puestos de trabajo y ciudad en Santo Domingo."
            width={1600}
            height={900}
            sizes="(max-width: 720px) 100vw, 58vw"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </picture>
        <HeroMotion />
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.trustLine}>{V85.hero.kicker}</p>
        <h1>{V85.hero.h1}</h1>
        <p>{V85.hero.lead}</p>
        <div className={styles.heroCtas}>
          <a className={styles.cta} href={V85.hero.primary.href}>
            {V85.hero.primary.label}
          </a>
          <a className={styles.text} href="#capacidades">
            {V85.hero.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
