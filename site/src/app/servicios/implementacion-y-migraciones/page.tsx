import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Implementación y migraciones",
  "Puesta en marcha de tecnologías que su organización ya decidió adoptar.",
  "/servicios/implementacion-y-migraciones/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Servicios"
      title="Implementación y migraciones"
      lead="Si ya tiene la tecnología y necesita que alguien la deje funcionando, ese es el trabajo."
    >
      <p>
        Incluye acompañamiento post-puesta en marcha. Los destinos de nube específicos se
        detallan cuando C14 confirme cada plataforma.
      </p>
    </Interior>
  );
}
