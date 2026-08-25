import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TechScene } from "@/components/TechScene";
import type { SceneName } from "@/visual/motion";
import { withBase } from "@/lib/paths";

export type HeroFamily = "panoramic" | "layers" | "interface" | "object" | "process";

export function Stage({
  family,
  kicker,
  title,
  lead,
  visual,
  scene,
  photo,
  photoAlt,
  crumbs,
  children,
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
  note,
  story = 1,
  layer = 0,
}: {
  family: HeroFamily;
  kicker: string;
  title: string;
  lead: string;
  visual?: ReactNode;
  scene?: SceneName;
  photo?: string;
  photoAlt?: string;
  crumbs: { href: string; label: string }[];
  children: ReactNode;
  ctaHref: string;
  ctaLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  note?: string;
  story?: number;
  layer?: number;
}) {
  const media = visual ?? (scene ? <TechScene scene={scene} story={story} layer={layer} /> : null);

  return (
    <main id="contenido" className={`flagship family-${family}`}>
      <header className={`stage stage-${family}`}>
        {family === "panoramic" ? (
          <div className="stage-media" aria-hidden>
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="stage-photo" src={withBase(photo)} alt="" width={1920} height={1080} fetchPriority="high" />
            ) : null}
            {media}
          </div>
        ) : null}
        <div className="stage-copy copy-safe">
          <p className="eyebrow">{kicker}</p>
          <h1>{title}</h1>
          <p className="deck">{lead}</p>
          <div className="hero-actions">
            <Link
              className="btn btn-primary"
              href={ctaHref}
              {...(ctaHref.startsWith("http") ? { target: "_self" } : {})}
            >
              {ctaLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link className="btn btn-ghost" href={secondaryHref}>
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
          {note ? <p className="stage-note">{note}</p> : null}
        </div>
        {family !== "panoramic" ? (
          <div className="stage-visual" data-visual>
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="stage-photo inset" src={withBase(photo)} alt={photoAlt ?? ""} width={1200} height={800} />
            ) : null}
            {media}
          </div>
        ) : null}
      </header>
      <div className="container pt-6">
        <Breadcrumbs items={crumbs} />
      </div>
      {children}
    </main>
  );
}
