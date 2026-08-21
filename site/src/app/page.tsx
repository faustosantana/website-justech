import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Chapters } from "@/components/v5/Chapters";
import { FilmHero } from "@/components/v5/FilmHero";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "La capa que mantiene el negocio en movimiento",
  "Justech conecta infraestructura, redes, software, seguridad y soporte para que la operación no se detenga. Integradora en Santo Domingo, desde 2018.",
  "/",
);

export default function HomePage() {
  return (
    <main id="contenido" className="v5">
      <FilmHero
        kicker="Justech · Santo Domingo · Desde 2018"
        title="La capa que mantiene el negocio en movimiento."
        lead="Infraestructura, software y soporte, operados como un sistema."
        ctaHref="/contacto/diagnostico/"
        ctaLabel="Solicitar diagnóstico"
        photo="/visual/v5/home-still.jpg"
        photoAlt=""
      />
      <Chapters />
      <section className="v5-end">
        <p className="v5-kicker" style={{ color: "#0a5c64" }}>
          Conversación
        </p>
        <h2 className="section-title">Un diagnóstico ordena el alcance.</h2>
        <p>
          {company.phoneDisplay} · {company.email}
        </p>
        <p>
          <Link className="btn btn-primary" href="/contacto/diagnostico/">
            Escribir a Justech
          </Link>
        </p>
        <ContactForm landing="/" intent="diagnostico" />
      </section>
    </main>
  );
}
