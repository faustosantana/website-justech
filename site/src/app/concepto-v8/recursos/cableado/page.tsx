import { ConceptShell } from "@/components/v8/Chrome";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { company } from "@/content/site";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";
import Link from "next/link";

export const metadata = pageMeta(
  "Qué debe entregar un proyecto de cableado estructurado",
  "Entregables de un proyecto de cobre y fibra para que la sede no quede con puntos activos y sin memoria técnica. Guía Justech, Santo Domingo.",
  `${V85_BASE}/recursos/cableado/`,
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Qué debe entregar un proyecto de cableado estructurado",
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
            { href: `${V85_BASE}/recursos/cableado/`, label: "Entrega de cableado" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Guía</p>
          <h1>Qué debe entregar un proyecto de cableado estructurado</h1>
          <p className={styles.lead}>
            Un punto activo no es una entrega. Si otro técnico no puede encontrar el puerto, el ID y la ruta, la planta
            no está terminada: está prestada.
          </p>
          <h2>Antes de instalar</h2>
          <p>
            El levantamiento tiene que fijar puestos, distancias, cuarto técnico, restricciones de obra y nomenclatura.
            Cotizar sin eso convierte el proyecto en una lista de cajas.
          </p>
          <h2>Durante la obra</h2>
          <p>
            Rutas, bandejas, bajantes y separación de servicios deben poder mantenerse. El rack no es un mueble: es el
            índice de la red. Patch panels, organizadores y alimentación se documentan al mismo tiempo que se
            terminan.
          </p>
          <h2>Al cerrar</h2>
          <ul>
            <li>Plano actualizado, no el CAD de la mudanza anterior.</li>
            <li>Listado de puntos con identificación y ubicación.</li>
            <li>Elevación o foto del rack con etiquetas legibles.</li>
            <li>Evidencia de pruebas según el alcance contratado, sin fingir un estándar no acordado.</li>
            <li>Memoria fotográfica y recomendaciones de crecimiento.</li>
          </ul>
          <h2>Pregunta útil</h2>
          <p>
            Si mañana hay que añadir cuatro puestos, ¿se puede hacer sin abrir cielo raso a ciegas? Si la respuesta es
            no, falta documentación.
          </p>
          <p>
            <Link href={`${V85_BASE}/cableado-estructurado/`}>Ver el servicio de cableado</Link>
          </p>
        </article>
      </main>
    </ConceptShell>
  );
}
