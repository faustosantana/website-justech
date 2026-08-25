import Link from "next/link";
import { Interior } from "@/components/Interior";
import { industryCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Industrias",
  "Tecnología empresarial para finanzas, gobierno, educación, salud, comercio, manufactura y más. Justech SRL.",
  "/industrias/",
);

export default function Page() {
  const published = industryCaps.filter((c) => c.slug !== "hoteleria-y-turismo");
  return (
    <Interior
      eyebrow="Industrias"
      title="El sector importa. El caso se publica cuando esté autorizado."
      lead="Estas páginas describen el tipo de operación. No hay logotipos de clientes ni historias inventadas."
      path="/industrias/"
    >
      <ul className="m-0 list-none p-0">
        {published.map((c) => (
          <li key={c.href} className="border-b border-line py-5">
            <Link href={c.href} className="text-lg text-navy no-underline">
              {c.title}
            </Link>
            <p className="mt-2 mb-0 text-sm text-muted">{c.lead}</p>
          </li>
        ))}
      </ul>
    </Interior>
  );
}
