import { CloudMigrate } from "@/components/CloudMigrate";
import { Stage } from "@/components/Stage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Nube y migraciones",
  "Evaluación, oleadas, sincronización y validación. No un “subir todo”. Justech SRL.",
  "/nube/",
);

export default function Page() {
  return (
    <Stage
      family="process"
      kicker="Nube"
      title="Migrar es una oleada con dueño, no una nube con flechas."
      lead="Identidad, correo, archivos, aplicaciones y lo que debe quedarse local. Validación antes de cortar."
      scene="cloud"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/nube/", label: "Nube" },
      ]}
      ctaHref="/contacto/diagnostico/?need=nube"
      ctaLabel="Pedir evaluación de migración"
    >
      <div className="container section">
        <h2 className="section-title">Qué se mueve, en qué orden, con qué prueba.</h2>
        <CloudMigrate />
      </div>
    </Stage>
  );
}
