"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TechScene } from "@/components/TechScene";
import { verifiedSignals } from "@/content/site";
import { withBase } from "@/lib/paths";

const beats = [
  "Infraestructura se activa.",
  "Las redes conectan sedes.",
  "El software habilita usuarios.",
  "La seguridad protege las capas.",
  "El soporte recibe señales.",
  "El monitoreo mantiene visibilidad.",
  "Justech integra todo.",
];

export function HomeHero() {
  const wrap = useRef<HTMLElement>(null);
  const [story, setStory] = useState(0.12);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStory(1);
      return;
    }
    const el = wrap.current;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    }, { threshold: 0.05 });
    if (el) io.observe(el);
    function tick(now: number) {
      if (!visible || document.hidden) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = (now - t0) / 1000;
      const auto = Math.min(1, elapsed / 7.2);
      let scroll = 0;
      if (el) {
        const r = el.getBoundingClientRect();
        scroll = Math.min(1, Math.max(0, -r.top / Math.max(240, r.height * 0.45)));
      }
      setStory(Math.max(auto, scroll));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const beat = beats[Math.min(beats.length - 1, Math.floor(story * beats.length))];

  return (
    <section className="stage stage-panoramic" ref={wrap}>
      <div className="stage-media" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="stage-photo"
          src={withBase("/visual/city-mesh.webp")}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <TechScene scene="hero" story={story} />
      </div>
      <div className="stage-copy copy-safe">
        <p className="eyebrow">Justech · Santo Domingo · Desde 2018</p>
        <h1>La capa que mantiene el negocio en movimiento.</h1>
        <p className="deck">
          Infraestructura, software y soporte, conectados y operados como un sistema.
        </p>
        <p className="beat" aria-live="polite">
          {beat}
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/contacto/diagnostico/">
            Solicitar diagnóstico
          </Link>
          <Link className="btn btn-ghost" href="#sistema">
            Ver el sistema
          </Link>
        </div>
        <ul className="trust-inline">
          {verifiedSignals.map((s) => (
            <li key={s.k}>
              <strong>{s.k}</strong>
              <span>{s.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
