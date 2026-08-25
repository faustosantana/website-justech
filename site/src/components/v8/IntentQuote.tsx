"use client";

import { useEffect, useState } from "react";
import { QuoteFlow } from "@/components/v8/Studios";

const Motivo: Record<string, string> = {
  sede: "sede",
  solucion: "sede",
  modernizacion: "modernizacion",
  soporte: "soporte",
  cableado: "cableado",
  redes: "redes",
  equipos: "equipos",
  licencias: "licencias",
  seguridad: "seguridad",
  nube: "licencias",
  administrado: "soporte",
  implementacion: "sede",
  consultoria: "sede",
  levantamiento: "cableado",
  energia: "equipos",
  industrias: "sede",
  nosotros: "sede",
};

export function IntentQuote({ initial, intents }: { initial?: string; intents?: readonly { id: string; t: string; extra: string; options: readonly string[] }[] }) {
  const [need, setNeed] = useState(initial ?? "");
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const m = q.get("motivo") || q.get("intencion") || initial;
    if (m && Motivo[m]) setNeed(Motivo[m]);
    else if (m) setNeed(m);
  }, [initial]);
  if (sent) {
    return (
      <section id="conversar">
        <h2>Solicitud registrada</h2>
        <p role="status">En este entorno no se envía correo ni se crea un caso real.</p>
      </section>
    );
  }
  return <QuoteFlow initial={need} intents={intents} onDone={() => setSent(true)} />;
}
