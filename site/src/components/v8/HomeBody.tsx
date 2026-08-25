"use client";

import dynamic from "next/dynamic";
import styles from "./experience.module.css";

const ExperienceV8 = dynamic(
  () => import("@/components/v8/Experience").then((m) => m.ExperienceV8),
  { ssr: false },
);

export function HomeBody() {
  return (
    <div className={styles.hydrate}>
      <ExperienceV8 />
    </div>
  );
}
