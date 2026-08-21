import Link from "next/link";
import { cablingCaps } from "@/content/capabilities";
import { cablingProcess } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand, PageHero } from "@/components/PageHero";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Cableado e infraestructura física",
  "Cableado estructurado, fibra, certificación, racks, Wi-Fi y cuartos técnicos para empresas en República Dominicana. Justech SRL.",
  "/infraestructura-fisica/",
);

export default function Page() {
  return (
    <main id="contenido">
      <PageHero
        eyebrow="Infraestructura física"
        title="La planta que sostiene redes, voz y datos"
        lead="Un proceso visible: levantamiento, diseño, presupuesto, instalación, certificación, documentación y soporte. Sin CCTV ni control de acceso como oferta publicada."
      />
      <div className="container pt-6">
        <Breadcrumbs
          items={[
            { href: "/", label: "Inicio" },
            { href: "/infraestructura-fisica/", label: "Infraestructura física" },
          ]}
        />
      </div>
      <div className="container py-12">
        <ol className="rail">
          {cablingProcess.map(([n, t, d]) => (
            <li key={n}>
              <p className="n m-0">{n}</p>
              <h3>{t}</h3>
              <p className="m-0 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {cablingCaps.map((c) => (
            <article key={c.href} className="border-t-2 border-teal pt-4">
              <h2 className="mt-0 mb-2 text-xl">
                <Link href={c.href} className="text-navy no-underline">
                  {c.title}
                </Link>
              </h2>
              <p className="m-0 text-muted">{c.lead}</p>
            </article>
          ))}
        </div>
        <p className="mt-12">
          <Link className="btn btn-primary" href="/contacto/levantamiento/">
            Solicitar levantamiento
          </Link>
        </p>
      </div>
      <CtaBand />
    </main>
  );
}
