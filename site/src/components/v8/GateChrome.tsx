"use client";

import { useEffect } from "react";

export function GateChrome({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("landing-mode");
    return () => document.body.classList.remove("landing-mode");
  }, []);
  return <>{children}</>;
}
