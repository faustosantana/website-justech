import Link from "next/link";
import { Interior } from "@/components/Interior";
import { published, serviceCopy, services } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Servicios tecnológicos",
  "Soporte, implants, consultoría e implementación tecnológica con Justech SRL.",
  "/servicios/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Servicios"
      title="Ejecución con responsables y alcance definido"
      lead="Soporte técnico, implants, consultoría e implementación para que la tecnología quede en operación."
      path="/servicios/"
      crumbs={[
        { href: "/", label: "Inicio" },
        { href: "/servicios/", label: "Servicios" },
      ]}
    >
      <ul className="m-0 list-none p-0">
        {published(services).map((s) => (
          <li key={s.href} className="border-b border-line py-5">
            <Link href={s.href} className="text-lg font-medium text-navy no-underline">
              {s.label}
            </Link>
            <p className="mt-2 mb-0 text-sm text-muted">{serviceCopy[s.href]}</p>
          </li>
        ))}
      </ul>
    </Interior>
  );
}
