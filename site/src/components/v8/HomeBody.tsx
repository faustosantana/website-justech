"use client";

import dynamic from "next/dynamic";

const ExperienceV8 = dynamic(
  () => import("@/components/v8/Experience").then((m) => m.ExperienceV8),
  { ssr: false },
);

export function HomeBody() {
  return <ExperienceV8 />;
}
