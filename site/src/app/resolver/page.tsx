import { NeedPicker } from "@/components/NeedPicker";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "¿Qué necesita resolver?",
  "Elija una necesidad operativa y continúe al formulario adecuado. Justech SRL, staging simulado.",
  "/resolver/",
);

export default function Page() {
  return (
    <main id="contenido">
      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Conversión</p>
          <h1>¿Qué necesita resolver?</h1>
          <p className="lead m-0 max-w-2xl">
            La visual cambia con la necesidad. El envío, en este entorno, no sale del navegador.
          </p>
        </div>
      </header>
      <div className="container section">
        <NeedPicker />
      </div>
    </main>
  );
}
