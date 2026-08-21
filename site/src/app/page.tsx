import Link from "next/link";
import { CtaBand } from "@/components/PageHero";
import { Pending } from "@/components/Flags";
import { company, services, solutions, values } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "La tecnología correcta mueve su negocio hacia adelante",
  "Justech SRL diseña, implementa y gestiona soluciones tecnológicas para empresas e instituciones en República Dominicana.",
  "/",
);

export default function HomePage() {
  return (
    <main id="contenido">
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(900px 420px at 80% -10%, rgba(62,196,208,0.35), transparent), linear-gradient(180deg, #071525 0%, #0c2340 100%)",
          }}
        />
        <div className="container relative grid gap-10 py-20 md:grid-cols-[1.2fr_0.8fr] md:py-28">
          <div>
            <p className="eyebrow text-teal-bright">Justech SRL · Santo Domingo · Desde 2018</p>
            <h1 className="mt-4 mb-5 max-w-3xl text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.04em]">
              La tecnología correcta mueve su negocio hacia adelante.
            </h1>
            <p className="m-0 max-w-2xl text-lg text-[#c9d5dd]">
              Diseñamos, implementamos y gestionamos infraestructura, soporte, licenciamiento y
              equipamiento para organizaciones que no pueden detenerse.
            </p>
            <p className="mt-3">
              <Pending>narrativa del hero</Pending>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn btn-primary" href="/contacto/">
                Hablar con un especialista
              </Link>
              <Link className="btn btn-ghost" href="/soluciones/">
                Explorar soluciones
              </Link>
            </div>
          </div>
          <aside className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <p className="eyebrow text-teal-bright">Señales verificadas</p>
            <ul className="mt-4 mb-0 list-none space-y-4 p-0">
              <li>
                <strong className="block text-white">Fundada en 2018</strong>
                <span className="text-sm text-[#b7c4cc]">Santo Domingo, República Dominicana</span>
              </li>
              <li>
                <strong className="block text-white">Soporte y operación</strong>
                <span className="text-sm text-[#b7c4cc]">
                  Portal en soporte.justech.do · N1 a N3 según el contrato
                </span>
              </li>
              <li>
                <strong className="block text-white">Sin cifras infladas</strong>
                <span className="text-sm text-[#b7c4cc]">
                  No publicamos clientes, partners ni SLA 24/7 hasta validarlos.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="container py-16">
        <p className="eyebrow">Resultados, luego tecnología</p>
        <h2 className="mt-2 max-w-2xl text-3xl tracking-tight">
          Un integrador cercano que conecta el requerimiento con una solución ejecutada.
        </h2>
        <div className="grid-cards cols-3 mt-10">
          {solutions
            .filter((s) => !s.pending)
            .map((s) => (
              <article key={s.href} className="card">
                <h3>{s.label}</h3>
                <p>
                  {s.href.includes("software")
                    ? "Aprovisionamiento y renovación de software empresarial, con acompañamiento de adopción."
                    : "Equipos, servidores, redes y accesorios con criterio de calidad y tiempo de entrega."}
                </p>
                <Link className="more" href={s.href}>
                  Ver oferta
                </Link>
              </article>
            ))}
          <article className="card">
            <h3>Capacidades en validación</h3>
            <p>
              Nube, ciberseguridad, IA y desarrollo constan en credenciales internas. No se
              publican como oferta activa hasta confirmación comercial.
            </p>
            <Pending>C14</Pending>
          </article>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="container">
          <p className="eyebrow">Por qué Justech</p>
          <h2 className="mt-2 text-3xl tracking-tight">De la estrategia a la operación</h2>
          <ol className="mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-5">
            {[
              ["01", "Estrategia", "Entender el negocio y el riesgo operativo."],
              ["02", "Aprovisionamiento", "Licencias y equipos con trazabilidad."],
              ["03", "Implementación", "Puesta en marcha con responsables claros."],
              ["04", "Operación", "Soporte N1–N3 y tickets en portal propio."],
              ["05", "Mejora", "Ajustar lo que ya corre, no reinventar por moda."],
            ].map(([n, t, d]) => (
              <li key={n} className="border border-line bg-white p-4">
                <p className="eyebrow m-0">{n}</p>
                <h3 className="mt-2 mb-2 text-lg">{t}</h3>
                <p className="m-0 text-sm text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Servicios</p>
            <h2 className="mt-2 text-3xl tracking-tight">Ejecución, no catálogo de humo</h2>
            <p className="text-muted">
              Lo que ya aparece en el sitio público actual, reescrito para un comprador
              empresarial. El resto espera validación.
            </p>
          </div>
          <ul className="m-0 list-none p-0">
            {services.map((s) => (
              <li key={s.href} className="flex items-center justify-between border-b border-line py-3">
                <Link href={s.href} className="font-medium text-navy no-underline">
                  {s.label}
                </Link>
                {s.pending ? <Pending /> : <span className="text-sm text-teal">Disponible</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container pb-8">
        <p className="eyebrow">Valores</p>
        <h2 className="mt-2 text-3xl tracking-tight">Cómo decidimos</h2>
        <div className="grid-cards cols-3 mt-8">
          {values.map((v) => (
            <article key={v.name} className="card">
              <h3>{v.name}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="border border-line bg-white p-6 md:p-10">
          <p className="eyebrow">Testimonio</p>
          <blockquote className="m-0 max-w-3xl text-2xl leading-snug tracking-tight">
            «Justech ha sido un aliado estratégico, con una respuesta oportuna y precisa.»
          </blockquote>
          <p className="mt-4 mb-2 text-sm text-muted">
            Carlos Feliz, Gerente de Operaciones, Leja Car Rental — texto ya publicado en el
            sitio actual.
          </p>
          <Pending>autorización de publicación</Pending>
        </div>
      </section>

      <section className="container py-8">
        <p className="text-sm text-muted">
          Clientes y marcas: no se muestran logos hasta permiso y clasificación de relación
          (partner ≠ marca comercializada). Contacto actual:{" "}
          <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a> ·{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </section>

      <CtaBand />
    </main>
  );
}
