import Link from "next/link";
import { Interior } from "@/components/Interior";
import { Pending } from "@/components/Flags";
import { services } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Servicios",
  "Soporte, implants, consultoría e implementación tecnológica en República Dominicana.",
  "/servicios/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Servicios"
      title="Ejecución con responsables, no un buzón genérico"
      lead="Soporte, implants, consultoría e implementación ya se comunican en el sitio actual. MSP, desarrollo y QA esperan validación."
    >
      <ul className="m-0 list-none p-0">
        {services.map((s) => (
          <li key={s.href} className="flex items-center justify-between border-b border-line py-4">
            <Link href={s.href} className="text-lg font-medium text-navy no-underline">
              {s.label}
            </Link>
            {s.pending ? <Pending /> : null}
          </li>
        ))}
      </ul>
    </Interior>
  );
}
