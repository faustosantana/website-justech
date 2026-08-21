import Link from "next/link";
import { Interior } from "@/components/Interior";
import { Pending } from "@/components/Flags";
import { technologyLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Tecnologías",
  "Marcas que Justech puede comercializar o implementar. No son partnerships certificados hasta inventario C07–C08.",
  "/tecnologias/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Tecnologías"
      title="Marcas en inventario, no un muro de partners"
      lead="Listar un fabricante no equivale a partnership. Los logos y niveles se publican solo con vigencia y autorización."
      pending
    >
      <ul className="m-0 list-none p-0">
        {technologyLinks.map((l) => (
          <li key={l.href} className="flex items-center justify-between border-b border-line py-3">
            <Link href={l.href} className="text-navy no-underline">
              {l.label}
            </Link>
            <Pending>C07–C08</Pending>
          </li>
        ))}
      </ul>
    </Interior>
  );
}
