import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/PageHero";

export function Interior({
  eyebrow,
  title,
  lead,
  crumbs,
  path,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
    crumbs?: { href: string; label: string }[];
  path?: string;
  children: ReactNode;
}) {
  const trail = crumbs ?? [
    { href: "/", label: "Inicio" },
    { href: path ?? "", label: title },
  ];
  return (
    <main id="contenido">
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />
      <div className="container pt-6">
        <Breadcrumbs items={trail} />
      </div>
      <div className="container prose py-10">{children}</div>
      <CtaBand />
    </main>
  );
}
