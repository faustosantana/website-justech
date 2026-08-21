import Link from "next/link";
import { Interior } from "@/components/Interior";
import { Pending } from "@/components/Flags";
import { recursosLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Recursos",
  "Preguntas frecuentes de Justech SRL. Blog y guías se publican cuando exista contenido propio.",
  "/recursos/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Recursos"
      title="Material útil, no relleno para buscadores"
      lead="Solo publicamos lo que ya podemos sostener. Hoy: preguntas frecuentes reales. Blog, guías y eventos esperan piezas propias."
    >
      <ul className="m-0 list-none p-0">
        {recursosLinks
          .filter((l) => l.href !== "/recursos/")
          .map((l) => (
            <li key={l.href} className="flex items-center justify-between border-b border-line py-4">
              <Link href={l.href} className="text-lg font-medium text-navy no-underline">
                {l.label}
              </Link>
              {l.pending ? <Pending>sin piezas propias</Pending> : <span className="text-sm text-teal">Disponible</span>}
            </li>
          ))}
      </ul>
    </Interior>
  );
}
