import type { ReactNode } from "react";
import { Stage, type HeroFamily } from "@/components/Stage";
import type { SceneName } from "@/visual/motion";

/** Adaptador: las páginas nuevas usan Stage con familia explícita. */
export function Flagship(props: {
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
  family?: HeroFamily;
}) {
  return (
    <Stage
      family={props.family ?? "layers"}
      kicker={props.kicker}
      title={props.title}
      lead={props.lead}
      scene={props.scene}
      crumbs={props.crumbs}
      ctaHref={props.ctaHref}
      ctaLabel={props.ctaLabel}
    >
      {props.children}
    </Stage>
  );
}
