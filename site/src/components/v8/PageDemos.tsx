"use client";

import { useEffect, useState } from "react";
import { DeviceDemo, LicenseDemo, NetworkDemo, SupportDemo } from "@/components/v8/Studios";

export function RedesLab() {
  const [beat, setBeat] = useState(0);
  const [play, setPlay] = useState(false);
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  useEffect(() => {
    if (!play || reduce) return;
    const id = window.setInterval(() => setBeat((n) => (n + 1) % 10), 1400);
    return () => window.clearInterval(id);
  }, [play, reduce]);
  return (
    <NetworkDemo
      beat={beat}
      playing={play}
      onPlay={() => setPlay((v) => !v)}
      onBeat={(n) => {
        setBeat(n);
        setPlay(false);
      }}
    />
  );
}

export function EquiposLab() {
  return <DeviceDemo />;
}

export function LicenciasLab() {
  return <LicenseDemo />;
}

export function SoporteLab() {
  const [beat, setBeat] = useState(6);
  return (
    <SupportDemo
      beat={beat}
      onWatchNet={() => {
        setBeat(6);
        document.getElementById("red")?.scrollIntoView({ behavior: "smooth" });
      }}
    />
  );
}
