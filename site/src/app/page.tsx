import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HomeHero } from "@/components/HomeHero";
import { LayerSystem } from "@/components/LayerSystem";
import { NeedPicker } from "@/components/NeedPicker";
import { TicketPreview } from "@/components/TicketPreview";
import { TrustSlots } from "@/components/TrustSlots";
import { company, problems, technologyLinks } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "La capa que mantiene el negocio en movimiento",
  "Justech conecta infraestructura, redes, software, seguridad y soporte para que la operación no se detenga. Integradora en Santo Domingo, desde 2018.",
  "/",
);

export default function HomePage() {
  return (
    <main id="contenido">
      <HomeHero />

      <div className="seq-bridge" aria-hidden />

      <section className="section" id="sistema">
        <div className="container">
          <p className="eyebrow">Sistema Justech</p>
          <h2 className="section-title">Seis capas. Un hilo de ejecución.</h2>
          <p className="lead-copy">
            No son productos aislados. La red, la seguridad, las licencias, el soporte, la planta
            física y la nube se diseñan para convivir.
          </p>
          <div className="mt-10">
            <LayerSystem />
          </div>
        </div>
      </section>

      <section className="section seq-dark">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Redes y seguridad</p>
            <h2 className="section-title">Conectar no basta. Hay que contener.</h2>
            <p>
              El tráfico debe llegar. Un evento no debe apagar sucursales. Ver{" "}
              <Link href="/redes/">redes</Link> y <Link href="/seguridad/">seguridad</Link>.
            </p>
          </div>
          <TicketPreview />
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Escenarios</p>
            <h2 className="section-title">Lo que suele estar roto.</h2>
          </div>
          <ol className="problem-list">
            {problems.map((p, i) => (
              <li key={p.title}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="mt-0 mb-2 text-xl">{p.title}</h3>
                  <p className="m-0 text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band-paper">
        <div className="container">
          <p className="eyebrow">Ecosistema</p>
          <h2 className="section-title">Fabricantes, por nombre.</h2>
          <p className="lead-copy">Sin sellos de alianza hasta tener documentos.</p>
          <ul className="ecosystem">
            {technologyLinks.map((t) => (
              <li key={t.href}>
                <Link href={t.href}>{t.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TrustSlots />

      <section className="section">
        <div className="container">
          <NeedPicker />
        </div>
      </section>

      <section className="section seq-dark">
        <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow">Conversación</p>
            <h2 className="section-title">Un diagnóstico honesto vale más que un folleto.</h2>
            <p>
              {company.phoneDisplay} · {company.email}
            </p>
          </div>
          <Link className="btn btn-primary" href="/contacto/diagnostico/">
            Escribir a Justech
          </Link>
        </div>
      </section>

      <div className="container py-12">
        <ContactForm landing="/" intent="diagnostico" />
      </div>
    </main>
  );
}
