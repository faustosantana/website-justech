import Link from "next/link";
import { Interior } from "@/components/Interior";
import { Pending } from "@/components/Flags";
import { industryLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Industrias",
  "Verticales objetivo de Justech SRL. No se publican como experiencia comprobada hasta validación comercial.",
  "/industrias/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Industrias"
      title="Sectores en validación"
      lead="El mandato lista verticales. Hasta confirmar cuáles se atienden de forma repetible, no las vendemos como especialidad."
      pending
    >
      <ul className="m-0 list-none p-0">
        {industryLinks.map((l) => (
          <li key={l.href} className="flex items-center justify-between border-b border-line py-3">
            <Link href={l.href} className="text-navy no-underline">
              {l.label}
            </Link>
            <Pending>C15</Pending>
          </li>
        ))}
      </ul>
    </Interior>
  );
}
