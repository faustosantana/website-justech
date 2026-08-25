"use client";

import { useState } from "react";

export function ProcessTrack({
  steps,
  title,
  onStep,
}: {
  steps: { t: string; d: string }[];
  title: string;
  onStep?: (index: number) => void;
}) {
  const [i, setI] = useState(0);
  const current = steps[i];
  function go(idx: number) {
    setI(idx);
    onStep?.(idx);
  }
  return (
    <div className="process-track">
      <p className="eyebrow">{title}</p>
      <ol className="process-steps">
        {steps.map((s, idx) => (
          <li key={s.t}>
            <button type="button" className={idx === i ? "is-on" : ""} onClick={() => go(idx)}>
              <span className="mono">{String(idx + 1).padStart(2, "0")}</span>
              <strong>{s.t}</strong>
            </button>
          </li>
        ))}
      </ol>
      <div className="process-panel" aria-live="polite">
        <div className="process-bar" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
        <h3>{current.t}</h3>
        <p>{current.d}</p>
      </div>
    </div>
  );
}
