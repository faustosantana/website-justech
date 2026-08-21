import { CtaBand, PageHero } from "@/components/PageHero";
import type { ReactNode } from "react";

export function Interior({
  eyebrow,
  title,
  lead,
  pending,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  pending?: boolean;
  children: ReactNode;
}) {
  return (
    <main id="contenido">
      <PageHero eyebrow={eyebrow} title={title} lead={lead} pending={pending} />
      <div className="container prose py-12">{children}</div>
      <CtaBand />
    </main>
  );
}
