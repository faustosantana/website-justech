import Link from "next/link";
import { Interior } from "@/components/Interior";
import { published, recursosLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Recursos",
  "Preguntas frecuentes y materiales de Justech SRL para organizaciones.",
  "/recursos/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Recursos"
      title="Orientación clara, cuando la necesita"
      lead="Preguntas frecuentes basadas en la operación real de Justech y en los documentos públicos de la empresa."
      path="/recursos/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/recursos/", label: "Recursos" },
      ]}
    >
      <ul className="m-0 list-none p-0">
        {published(recursosLinks)
          .filter((l) => l.href !== "/recursos/")
          .map((l) => (
            <li key={l.href} className="border-b border-line py-4">
              <Link href={l.href} className="text-lg font-medium text-navy no-underline">
                {l.label}
              </Link>
            </li>
          ))}
      </ul>
    </Interior>
  );
}
