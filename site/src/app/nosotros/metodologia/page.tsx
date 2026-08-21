import { Interior } from "@/components/Interior";
import { method } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Metodología",
  "Estrategia, aprovisionamiento, implementación, operación y mejora continua en Justech SRL.",
  "/nosotros/metodologia/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Metodología"
      lead="Cinco pasos para pasar de la decisión a un entorno en operación."
      path="/nosotros/metodologia/"
    >
      <ol>
        {method.map(([n, t, d]) => (
          <li key={n}>
            <strong>
              {n} {t}.
            </strong>{" "}
            {d}
          </li>
        ))}
      </ol>
    </Interior>
  );
}
