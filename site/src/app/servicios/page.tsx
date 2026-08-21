import Link from "next/link";
import { Interior } from "@/components/Interior";
import { serviceCaps } from "@/content/capabilities";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Servicios tecnológicos de extremo a extremo",
  "Consultoría, implementación, cableado, soporte, mesa de ayuda, servicios administrados y más. Justech SRL.",
  "/servicios/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Servicios"
      title="Ejecución con responsables, de la evaluación al mantenimiento"
      lead="Justech no se limita a seis paquetes. El ciclo cubre diagnóstico, diseño, suministro, implementación, soporte y operación."
      path="/servicios/"
    >
      <ul className="m-0 list-none p-0">
        {serviceCaps.map((s) => (
          <li key={s.href} className="border-b border-line py-5">
            <Link href={s.href} className="text-lg font-medium text-navy no-underline">
              {s.title}
            </Link>
            <p className="mt-2 mb-0 text-sm text-muted">{s.lead}</p>
          </li>
        ))}
      </ul>
    </Interior>
  );
}
