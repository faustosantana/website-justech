import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Software y licenciamiento",
  "Aprovisionamiento y renovación de software empresarial con Justech SRL.",
  "/soluciones/software-y-licenciamiento/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Soluciones"
      title="Software y licenciamiento"
      lead="Aprovisionamos software nuevo y renovamos el que ya usa su organización, con criterio de continuidad — no de vitrina de logos."
    >
      <h2>Para qué existe esta línea</h2>
      <p>
        Compras y TI necesitan renovar y adoptar herramientas sin improvisar el canal. Justech
        intermedia licenciamiento y acompaña la puesta en marcha.
      </p>
      <h2>Qué no afirmamos aquí</h2>
      <p>
        No nos presentamos como partner certificado de Microsoft, Google u otros fabricantes
        hasta que exista designation vigente y autorización de logo.
      </p>
      <h2>Siguiente paso</h2>
      <p>Una cotización con inventario de productos, vencimientos y usuarios.</p>
    </Interior>
  );
}
