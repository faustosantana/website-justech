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
      title="El puente entre el requerimiento y una solución en operación"
      lead="Justech es una empresa de servicios y soluciones tecnológicas fundada en 2018, con sede en Santo Domingo, República Dominicana."
      path="/nosotros/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/nosotros/", label: "Nosotros" },
      ]}
    >
      <p>
        Acompañamos a las organizaciones con cercanía, agilidad e integración: de la decisión
        técnica a la operación cotidiana.
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
