"use client";

import { useEffect } from "react";

/** Oculta Header/Footer del sitio raíz antes y después de hydratar /concepto-v8/. */
export function LandingLock() {
  useEffect(() => {
    document.documentElement.classList.add("landing-mode");
    document.body.classList.add("landing-mode");
    return () => {
      document.documentElement.classList.remove("landing-mode");
      document.body.classList.remove("landing-mode");
    };
  }, []);
  return null;
}
