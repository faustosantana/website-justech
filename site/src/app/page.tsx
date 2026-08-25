import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { World } from "@/components/v6/World";
import { company } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "La capa que mantiene el negocio en movimiento",
  "Justech conecta infraestructura, redes, software, seguridad y soporte para que la operación no se detenga. Integradora en Santo Domingo, desde 2018.",
  "/",
);

export default function HomePage() {
  return (
    <main id="contenido">
      <World />
      <section className="v6-end v6">
        <p className="v6-kicker">Conversación</p>
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
