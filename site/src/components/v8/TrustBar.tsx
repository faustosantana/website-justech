import { trustStrip } from "@/content/v83";
import styles from "./experience.module.css";

/** Franja de confianza en HTML de servidor para no desplazar el hero al hidratar. */
export function TrustBar() {
  const facts = trustStrip();
  return (
    <section className={styles.trust} id="confianza" aria-label="Confianza verificable">
      <ul>
        {facts.map((item) => (
          <li key={item.id}>
            {item.href ? (
              <a href={item.href} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
