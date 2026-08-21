import Link from "next/link";
import { Interior } from "@/components/Interior";
import { technologyLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Tecnologías empresariales",
  "Plataformas de software e infraestructura con las que Justech licencia, implementa y da soporte.",
  "/tecnologias/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Tecnologías"
      title="Plataformas de uso empresarial"
      lead="Licenciamiento, implementación y soporte sobre tecnologías que las organizaciones ya utilizan."
      path="/tecnologias/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/tecnologias/", label: "Tecnologías" },
      ]}
    >
      <ul className="m-0 list-none p-0">
        {technologyLinks.map((l) => (
          <li key={l.href} className="border-b border-line py-3">
            <Link href={l.href} className="text-lg text-navy no-underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </Interior>
  );
}
