import Link from "next/link";
import { Interior } from "@/components/Interior";
import { values } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Nosotros",
  "Justech SRL, empresa de servicios y soluciones tecnológicas fundada en 2018 en Santo Domingo.",
  "/nosotros/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="El puente entre el requerimiento y una solución ejecutada"
      lead="Justech es una empresa de servicios y soluciones tecnológicas fundada en 2018, con sede en Santo Domingo, República Dominicana."
    >
      <p>
        La finalidad es ser el aliado que las organizaciones necesitan en materia de
        tecnología: cercanía, agilidad e integración, sin el teatro de una multinacional de
        catálogo.
      </p>
      <h2>Valores</h2>
      {values.map((v) => (
        <p key={v.name}>
          <strong>{v.name}.</strong> {v.body}
        </p>
      ))}
      <p>
        <Link href="/nosotros/historia/">Historia</Link> ·{" "}
        <Link href="/nosotros/metodologia/">Metodología</Link> ·{" "}
        <Link href="/nosotros/cumplimiento/">Cumplimiento</Link>
      </p>
    </Interior>
  );
}
