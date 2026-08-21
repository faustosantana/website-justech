import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TechScene } from "@/components/TechScene";
import type { SceneName } from "@/visual/motion";
import { withBase } from "@/lib/paths";

export function Flagship({
  kicker,
  title,
  lead,
  scene,
  photo,
  photoAlt,
  crumbs,
  children,
  ctaHref,
  ctaLabel,
}: {
  kicker: string;
  title: string;
  lead: string;
  scene: SceneName;
  photo?: string;
  photoAlt?: string;
  crumbs: { href: string; label: string }[];
  children: ReactNode;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <main id="contenido" className="flagship">
      <header className="cine-hero">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="cine-photo" src={withBase(photo)} alt={photoAlt ?? ""} width={1600} height={900} fetchPriority="high" />
        ) : null}
        <TechScene scene={scene} className="cine-overlay" />
        <div className="cine-copy container">
          <p className="eyebrow">{kicker}</p>
          <h1>{title}</h1>
          <p className="deck">{lead}</p>
          <Link className="btn btn-primary" href={ctaHref.startsWith("http") ? ctaHref : ctaHref} {...(ctaHref.startsWith("http") ? { target: "_self" } : {})}>
            {ctaLabel}
          </Link>
        </div>
      </header>
      <div className="container pt-6">
        <Breadcrumbs items={crumbs} />
      </div>
      {children}
    </main>
  );
}
