import Link from "next/link";
import { Interior } from "@/components/Interior";
import { Pending } from "@/components/Flags";
import { solutions } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Soluciones",
  "Licenciamiento, equipos y capacidades en validación para empresas en República Dominicana.",
  "/soluciones/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soluciones"
      title="Tecnología al servicio de un resultado de negocio"
      lead="Publicamos primero lo que el sitio actual ya ofrece. El resto aparece como pendiente de validación, no como catálogo inventado."
    >
      <ul className="grid-cards list-none p-0">
        {solutions.map((s) => (
          <li key={s.href} className="card">
            <h2>{s.label}</h2>
            {s.pending ? <Pending>oferta</Pending> : <p>Oferta activa en este preview.</p>}
            <Link className="more" href={s.href}>
              Abrir
            </Link>
          </li>
        ))}
      </ul>
    </Interior>
  );
}
