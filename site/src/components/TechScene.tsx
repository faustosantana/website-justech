"use client";

import { useEffect, useRef, useState } from "react";
import { drawScene, type DrawState } from "@/visual/draw";
import type { SceneName } from "@/visual/motion";

export function TechScene({
  scene,
  className = "",
  story = 1,
  layer = 0,
  caption,
}: {
  scene: SceneName;
  className?: string;
  story?: number;
  layer?: number;
  caption?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ptr = useRef({ x: 0.5, y: 0.5 });
  const storyRef = useRef(story);
  const layerRef = useRef(layer);
  const [canvasOk, setCanvasOk] = useState(true);
  storyRef.current = story;
  layerRef.current = layer;

  useEffect(() => {
    const hostEl = wrapRef.current;
    const canvasEl = canvasRef.current;
    if (!hostEl || !canvasEl) return;
    const host: HTMLDivElement = hostEl;
    const canvas: HTMLCanvasElement = canvasEl;
    const context = canvas.getContext("2d");
    if (!context) {
      setCanvasOk(false);
      return;
    }
    const ctx: CanvasRenderingContext2D = context;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        kick();
      },
      { threshold: 0.08 },
    );
    io.observe(host);

    function size() {
      return host.getBoundingClientRect();
    }

    function paint(now: number) {
      const { width, height } = size();
      const w = Math.max(280, width);
      const h = Math.max(200, height);
      const elapsed = (now - t0) / 1000;
      const state: DrawState = {
        w,
        h,
        t: reduce ? 0 : elapsed,
        ptr: ptr.current,
        story: reduce ? 1 : Math.min(1, storyRef.current === 1 && scene === "hero" ? elapsed / 5.2 : storyRef.current),
        layer: layerRef.current,
        reduce,
        scene,
      };
      drawScene(ctx, state);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { width, height } = size();
      const w = Math.max(280, width);
      const h = Math.max(200, height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
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

    function onMove(e: PointerEvent) {
      const b = host.getBoundingClientRect();
      ptr.current = {
        x: (e.clientX - b.left) / Math.max(1, b.width),
        y: (e.clientY - b.top) / Math.max(1, b.height),
      };
    }

    function onVis() {
      kick();
    }

    resize();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    document.addEventListener("visibilitychange", onVis);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, [scene]);

  return (
    <div className={`tech-scene ${className}`.trim()} ref={wrapRef} data-scene={scene}>
      <svg className="scene-fallback" viewBox="0 0 400 240" aria-hidden>
        <rect width="400" height="240" fill="#0c1826" />
        <circle cx="80" cy="140" r="8" fill="#5eead4" />
        <circle cx="200" cy="80" r="8" fill="#3ec4d0" />
        <circle cx="320" cy="130" r="8" fill="#5eead4" />
        <path d="M80 140 L200 80 L320 130" fill="none" stroke="#5eead4" strokeOpacity="0.45" />
      </svg>
      <canvas ref={canvasRef} aria-hidden hidden={!canvasOk} />
      {caption ? <p className="scene-cap">{caption}</p> : null}
    </div>
  );
}
