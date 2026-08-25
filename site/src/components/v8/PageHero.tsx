import { withBase } from "@/lib/paths";
import styles from "./article.module.css";

export function PageHero({
  kicker,
  title,
  lead,
  image,
  alt,
}: {
  kicker: string;
  title: string;
  lead: string;
  image: string;
  alt: string;
}) {
  const src = withBase(`/visual/v8/${image}`);
  return (
    <header className={styles.pageHero}>
      <div className={styles.pageHeroCopy}>
        <p className={styles.kicker}>{kicker}</p>
        <h1>{title}</h1>
        <p className={styles.lead}>{lead}</p>
      </div>
      <figure className={styles.pageHeroFig}>
        <picture>
          <source srcSet={`${src}.webp`} type="image/webp" />
          <img src={`${src}.jpg`} alt={alt} width={1600} height={900} loading="eager" decoding="async" />
        </picture>
      </figure>
    </header>
  );
}
