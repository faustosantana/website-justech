import { ConceptShell } from "@/components/v8/Chrome";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { company } from "@/content/site";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";
import Link from "next/link";

export const metadata = pageMeta(
  "Señales de que una empresa debe renovar sus equipos",
  "Indicadores operativos para decidir una renovación de laptops y desktops: soporte, identidad, inventario y continuidad. Guía Justech.",
  `${V85_BASE}/recursos/equipos/`,
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Señales de que una empresa debe renovar sus equipos",
  datePublished: "2026-08-25",
  author: { "@type": "Organization", name: company.legalName },
};

export default function Page() {
  return (
    <ConceptShell>
      <main id="contenido">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/recursos/`, label: "Recursos" },
            { href: `${V85_BASE}/recursos/equipos/`, label: "Renovar equipos" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Guía</p>
          <h1>Señales de que una empresa debe renovar sus equipos</h1>
          <p className={styles.lead}>
            El equipo no se renueva porque el catálogo cambió. Se renueva cuando deja de sostener el trabajo, la
            identidad o la garantía con un costo de interrupción mayor que el de reemplazarlo.
          </p>
          <h2>Señales operativas</h2>
          <ul>
            <li>El usuario espera a que arranque el equipo para entrar a una reunión.</li>
            <li>Ya no hay imagen estándar: cada puesto es una excepción.</li>
            <li>No hay inventario fiable de serial, usuario y vigencia de garantía.</li>
            <li>El sistema operativo o las aplicaciones de trabajo quedaron sin soporte del fabricante.</li>
            <li>No se puede cifrar o inscribir el dispositivo en la identidad corporativa.</li>
          </ul>
          <h2>Lo que no es una señal</h2>
          <p>
            Una campaña de un fabricante o el deseo de «verse moderno» no definen el alcance. El perfil del puesto sí:
            administración, dirección e ingeniería no cargan lo mismo.
          </p>
          <h2>Cómo decidir el lote</h2>
          <p>
            Empiece por quienes bloquean la operación o quedan fuera de política de seguridad. Documente identidad,
            aplicaciones, accesorios y garantía en la misma entrega. Renovar sin incorporar es comprar cajas.
          </p>
          <p>
            <Link href={`${V85_BASE}/equipos-empresariales/`}>Ver equipos empresariales</Link>
          </p>
        </article>
      </main>
    </ConceptShell>
  );
}
