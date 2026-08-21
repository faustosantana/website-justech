import { Interior } from "@/components/Interior";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Partners",
  "Justech no publica partnerships hasta inventario de vigencia y autorización de logo.",
  "/nosotros/partners/",
);

export default function Page() {
  return (
    <Interior
      eyebrow="Nosotros"
      title="Partners y fabricantes"
      lead="Comercializar una marca no es lo mismo que ser partner certificado. Esta página permanece vacía a propósito."
      pending
    >
      <p>
        El muro de logos del WordPress actual no se copia. Ver también Tecnologías: fichas sin
        badges.
      </p>
    </Interior>
  );
}
