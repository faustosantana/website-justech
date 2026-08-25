import { ConceptShell } from "@/components/v8/Chrome";
import { IntentQuote } from "@/components/v8/IntentQuote";
import { Crumbs } from "@/components/v8/ServiceArticle";
import { V85_BASE } from "@/content/v85";
import { pageMeta } from "@/lib/seo";
import styles from "@/components/v8/article.module.css";
import { notFound } from "next/navigation";

const landings = {
  "cableado-estructurado": {
    title: "Cableado estructurado para sedes que tienen que operar",
    lead: "Levantamiento, rutas, puntos, rack y documentación. Una intención: dejar una planta mantenible.",
    need: "cableado",
  },
  "redes-empresariales": {
    title: "Redes empresariales con continuidad en mente",
    lead: "Borde, firewall, switching, Wi-Fi y sucursal. Diseñamos para que la operación siga conectada.",
    need: "redes",
  },
  "soporte-tecnico-empresarial": {
    title: "Soporte técnico que cierra el caso",
    lead: "Mesa de ayuda, responsable y documentación. Horario hábil en República Dominicana.",
    need: "soporte",
  },
  "microsoft-365": {
    title: "Organizar Microsoft 365 alrededor de usuarios reales",
    lead: "Selección, asignación, identidad y renovación. Sin sello de partner hasta tener documento.",
    need: "licencias",
  },
  "google-workspace": {
    title: "Google Workspace con identidad y correo bajo control",
    lead: "Usuarios, departamentos y políticas. El diseño parte de cómo trabaja la organización.",
    need: "licencias",
  },
  "equipos-empresariales": {
    title: "Equipos listos para el primer día de trabajo",
    lead: "Perfil, configuración, inventario y garantía. Cotizamos; no vendemos en carrito.",
    need: "equipos",
  },
  "servicios-administrados": {
    title: "Acompañar la operación tecnológica",
    lead: "Mantenimiento, administración y mesa. Un plan, no un eslogan de 24/7.",
    need: "soporte",
  },
} as const;

type Slug = keyof typeof landings;

export function generateStaticParams() {
  return Object.keys(landings).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = landings[slug as Slug];
  if (!item) return {};
  return pageMeta(item.title, item.lead, `${V85_BASE}/l/${slug}/`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = landings[slug as Slug];
  if (!item) notFound();
  return (
    <ConceptShell>
      <main id="contenido">
        <Crumbs
          items={[
            { href: `${V85_BASE}/`, label: "Inicio" },
            { href: `${V85_BASE}/l/${slug}/`, label: item.title },
          ]}
        />
        <article className={styles.article}>
          <p className={styles.kicker}>Landing de campaña · inactiva</p>
          <h1>{item.title}</h1>
          <p className={styles.lead}>{item.lead}</p>
          <p>
            Esta ruta está preparada para SEM. No hay campaña activa, ni medición real, ni envío de leads. El
            formulario es simulado.
          </p>
          <h2>Proceso</h2>
          <ol>
            <li>Cuenta el problema y el sitio.</li>
            <li>Definimos alcance y responsable.</li>
            <li>Entregamos propuesta según lo acordado.</li>
          </ol>
        </article>
        <IntentQuote initial={item.need} />
      </main>
    </ConceptShell>
  );
}
