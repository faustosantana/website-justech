import Link from "next/link";
import { withBase } from "@/lib/paths";

export function FilmHero({
  kicker,
  title,
  lead,
  ctaHref,
  ctaLabel,
  photo,
}: {
  kicker: string;
  title: string;
  lead: string;
  ctaHref: string;
  ctaLabel: string;
  photo: string;
  photoAlt?: string;
}) {
  return (
    <section className="v5-film">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBase(photo)} alt="" width={1600} height={1067} fetchPriority="high" />
      <div className="v5-copy">
        <p className="v5-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        <Link className="btn btn-primary" href={ctaHref}>
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
