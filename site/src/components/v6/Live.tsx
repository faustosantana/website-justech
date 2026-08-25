"use client";

import { useEffect, useRef } from "react";
import { drawAssign, drawCampus, drawOperation, drawRackBuild, type V6State } from "@/visual/v6";

type Scene = "operation" | "campus" | "assign" | "rack";

export function Live({
  scene,
  chapter = 0,
  view = "fisica",
  className = "",
}: {
  scene: Scene;
  chapter?: number;
  view?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ch = useRef(chapter);
  const vw = useRef(view);
  ch.current = chapter;
  vw.current = view;

  useEffect(() => {
    const hostEl = wrap.current;
    const canvasEl = canvas.current;
    if (!hostEl || !canvasEl) return;
    const host: HTMLDivElement = hostEl;
    const el: HTMLCanvasElement = canvasEl;
    const context = el.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      kick();
    }, { threshold: 0.08 });
    io.observe(host);

    function paint(now: number) {
      const { width, height } = host.getBoundingClientRect();
      const w = Math.max(280, width);
      const h = Math.max(200, height);
      const state: V6State = {
        w,
        h,
        t: reduce ? 0 : (now - t0) / 1000,
        chapter: ch.current,
        view: vw.current,
        reduce,
        scene,
      };
      if (scene === "operation") drawOperation(ctx, state);
      else if (scene === "campus") drawCampus(ctx, state);
      else if (scene === "assign") drawAssign(ctx, state);
      else drawRackBuild(ctx, state);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = host.getBoundingClientRect();
      const w = Math.max(280, width);
      const h = Math.max(200, height);
      el.width = Math.floor(w * dpr);
      el.height = Math.floor(h * dpr);
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(performance.now());
    }

    function frame(now: number) {
      if (!visible || document.hidden) return;
      paint(now);
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    function kick() {
      cancelAnimationFrame(raf);
      if (visible && !document.hidden) {
        paint(performance.now());
        if (!reduce) raf = requestAnimationFrame(frame);
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    document.addEventListener("visibilitychange", kick);
    window.addEventListener("resize", resize);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("resize", resize);
    };
  }, [scene]);

  return (
    <div ref={wrap} className={`v6-live ${className}`} data-visual>
      <canvas ref={canvas} aria-hidden />
    </div>
  );
}
