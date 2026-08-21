import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Cómo se hace un levantamiento de red",
  "Guía editorial: qué se observa en sitio, qué se documenta y qué viene después. Justech SRL.",
  "/recursos/guia-levantamiento/",
);

export default function Page() {
  return (
    <main id="contenido">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Recurso</p>
          <h1>El levantamiento no es una cotización enviada por foto.</h1>
          <p className="lead m-0 max-w-2xl">
            Texto propio, sin promesas de certificación ajena. Sirve para preparar una visita.
          </p>
        </div>
      </header>
      <article className="container prose py-12">
        <p>
          Un presupuesto de puntos de red o de Wi-Fi que no pisa el sitio hereda los errores del
          plano anterior: plafones cerrados, canalizaciones saturadas, un rack que ya no abre.
        </p>
        <h2>Qué se observa</h2>
        <ul>
          <li>Rutas reales, no las del CAD de hace seis años.</li>
          <li>Espacio, energía y temperatura del cuarto técnico.</li>
          <li>Etiquetas —o su ausencia— en el patch panel.</li>
          <li>Ventanas en las que la operación sí permite cortar.</li>
        </ul>
        <h2>Qué se entrega después</h2>
        <p>
          Hallazgos priorizados y un insumo para diseño. El alcance de instalación y certificación
          se cotiza aparte. Solicite la visita en{" "}
          <Link href="/contacto/levantamiento/">levantamiento</Link>.
        </p>
      </article>
    </main>
  );
}
