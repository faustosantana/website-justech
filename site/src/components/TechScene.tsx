"use client";

import { useEffect, useRef } from "react";
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
  storyRef.current = story;
  layerRef.current = layer;

  useEffect(() => {
    const hostEl = wrapRef.current;
    const canvasEl = canvasRef.current;
    if (!hostEl || !canvasEl) return;
    const host: HTMLDivElement = hostEl;
    const canvas: HTMLCanvasElement = canvasEl;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    }, { threshold: 0.08 });
    io.observe(host);

    function size() {
      return host.getBoundingClientRect();
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
    }

    function frame(now: number) {
      const hidden = document.hidden;
      if (!visible || hidden) {
        raf = requestAnimationFrame(frame);
        return;
      }
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
      raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      const b = host.getBoundingClientRect();
      ptr.current = {
        x: (e.clientX - b.left) / Math.max(1, b.width),
        y: (e.clientY - b.top) / Math.max(1, b.height),
      };
    }

    resize();
    window.addEventListener("resize", resize);
    host.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, [scene]);

  return (
    <div className={`tech-scene ${className}`.trim()} ref={wrapRef}>
      <canvas ref={canvasRef} aria-hidden />
      {caption ? <p className="scene-cap">{caption}</p> : null}
    </div>
  );
}
