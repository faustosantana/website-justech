import { ConceptShell } from "@/components/v8/Chrome";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { company } from "@/content/site";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";
import Link from "next/link";

export const metadata = pageMeta(
  "Cómo dimensionar el Wi-Fi de una oficina",
  "Criterios prácticos de cobertura, densidad y backhaul antes de comprar access points para una oficina en Santo Domingo.",
  `${V85_BASE}/recursos/wifi/`,
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cómo dimensionar el Wi-Fi de una oficina",
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
            { href: `${V85_BASE}/recursos/wifi/`, label: "Dimensionar Wi-Fi" },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Guía</p>
          <h1>Cómo dimensionar el Wi-Fi de una oficina</h1>
          <p className={styles.lead}>
            Comprar access points por el área en metros cuadrados suele fallar. Importan materiales, densidad de
            usuarios, aplicaciones y cómo llega el cable hasta el techo.
          </p>
          <h2>Cobertura no es capacidad</h2>
          <p>
            Una señal visible en el teléfono no significa que una sala de reuniones sostenga videollamadas. Hay que
            preguntar cuántos dispositivos simultáneos y qué hacen: correo, voz, archivos o diseño.
          </p>
          <h2>El backhaul manda</h2>
          <p>
            Cada AP necesita un punto de red documentado y un switch con margen. Un Wi-Fi «nuevo» sobre un backbone
            saturado solo mueve el cuello de botella.
          </p>
          <h2>Antes de cotizar</h2>
          <ul>
            <li>Plano con paredes, vidrio y áreas abiertas.</li>
            <li>Puestos fijos versus visitas y salas.</li>
            <li>SSID, segmentos y si invitados deben aislarse.</li>
            <li>Dónde está el MDF y si hay IDF por piso.</li>
          </ul>
          <h2>Lo que no prometemos en una guía</h2>
          <p>
            No hay una cifra universal de APs por oficina. El diseño se valida en el sitio. Esta página existe para que
            la conversación empiece con datos, no con catálogo.
          </p>
          <p>
            <Link href={`${V85_BASE}/redes-empresariales/`}>Ver redes empresariales</Link>
          </p>
        </article>
      </main>
    </ConceptShell>
  );
}
