import { GateChrome } from "@/components/v8/GateChrome";
import { withBase } from "@/lib/paths";
import { pageMeta } from "@/lib/seo";
import styles from "./gate.module.css";

export const metadata = pageMeta(
  "Gate creativo V8",
  "Tres direcciones visuales para Justech. No sustituye la home ni el concepto V7. Muestra de dirección, no implementación.",
  "/gate-v8/",
);

function Shot({ src, alt, caption, className }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <figure className={className ?? styles.shot}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBase(src)} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <GateChrome>
      <div className={styles.page}>
        <div className={styles.bar}>
          <a href="/concepto-v7/">V7 congelada</a>
          <span>Gate V8 · no implementar todavía</span>
        </div>
        <main id="contenido" className={styles.wrap}>
          <p className={styles.kicker}>Justech · Santo Domingo · Gate creativo</p>
          <h1>Tres direcciones. Una decisión. Cero página completa.</h1>
          <p className={styles.lead}>
            V7 permanece aislada en /concepto-v7/. Esto no es un rediseño programado. Es el material para elegir dirección
            antes de escribir interfaz.
          </p>

          <h2>Benchmark, en una frase cada uno</h2>
          <ul className={styles.list}>
            <li>WWT / Insight / Presidio: autoridad de integradora, fotografía de operación, no catálogo infinito en el hero.</li>
            <li>Apple / Stripe / Linear: un objeto, aire, tipo contemporáneo, un movimiento por escena.</li>
            <li>NVIDIA / Cisco / Cloudflare: profundidad técnica reconocible: rack, puerto, enlace, consola.</li>
            <li>Justech: sede, sucursal, puesto, caso. Sin fingir escala de hyperscaler ni inventar clientes.</li>
          </ul>

          <h2>Moodboard</h2>
          <Shot
            src="/visual/v8/v8-moodboard.jpg"
            alt="Tablero de dirección: sede, NOC, portátil, cableado, AP, switch, servidores, consola, fibra, sucursal, cifrado y tipo."
            caption="Papel, midnight y teal de señal. Equipo real, no cubos. El eslogan del tablero es de mood, no copy oficial."
          />

          <h2>A · Precisión institucional</h2>
          <p className={styles.note}>Luz de día, piedra, rack detrás de vidrio, tipo navy sobre papel. Autoridad de integradora con claridad Apple.</p>
          <div className={styles.split}>
            <Shot src="/visual/v8/v8-a-hero-desktop.jpg" alt="Hero desktop dirección A: sede diurna y rack visible." caption="Desktop A" />
            <Shot src="/visual/v8/v8-a-hero-mobile.jpg" alt="Hero móvil dirección A." caption="Móvil A" />
          </div>

          <h2>B · Infraestructura cinematográfica</h2>
          <p className={styles.note}>Noche, rack, NOC, ciudad. Profundidad NVIDIA. Riesgo: volver a una web entera midnight y vacía, como V6.</p>
          <div className={styles.split}>
            <Shot src="/visual/v8/v8-b-hero-desktop.jpg" alt="Hero desktop dirección B: NOC nocturno." caption="Desktop B" />
            <Shot src="/visual/v8/v8-b-hero-mobile.jpg" alt="Hero móvil dirección B." caption="Móvil B" />
          </div>

          <h2>C · Sistema operativo empresarial</h2>
          <p className={styles.note}>
            El producto es el sistema: topología, ticket, inventario sobre un portátil real. La still de desktop aún tiene ruido de
            navegación generado; se usa como dirección, no como UI final.
          </p>
          <div className={styles.split}>
            <Shot src="/visual/v8/v8-c-hero-desktop.jpg" alt="Hero desktop dirección C: portátil y consola." caption="Desktop C" />
            <Shot src="/visual/v8/v8-c-hero-mobile.jpg" alt="Hero móvil dirección C." caption="Móvil C" />
          </div>

          <h2>Escenas maestras</h2>
          <Shot
            src="/visual/v8/v8-scene-network.jpg"
            alt="Topología isométrica con ISP, firewall, core, APs, puestos, rack, sucursal y nube."
            caption="Red: equipos reconocibles y enlace de respaldo, no nodos idénticos."
          />
          <Shot
            src="/visual/v8/v8-scene-puesto.jpg"
            alt="Portátil empresarial grafito en estudio."
            caption="Puesto: render de producto, no una cuña CSS."
          />
          <Shot
            src="/visual/v8/v8-scene-soporte.jpg"
            alt="Consola de soporte con ticket de sucursal sin conectividad."
            caption="Soporte: interfaz de producto, no un rectángulo negro."
          />

          <h2>Storyboard de movimiento</h2>
          <Shot
            src="/visual/v8/v8-storyboard.jpg"
            alt="Ocho fotogramas: conectividad, firewall, core, APs, identidad, falla, respaldo y cierre del caso."
            caption="Un acto: conectar, proteger, asignar, resolver. Sin partículas ni cursor con glow."
          />

          <h2>Inventario y técnica</h2>
          <ul className={styles.list}>
            <li>Stills generados de concepto. No son fotografía de obra Justech ni marcas de fabricante.</li>
            <li>Sustitución futura: Blender/Octane o Spline para la red; producto real o render licenciado para el portátil; Rive/Lottie para el ticket.</li>
            <li>Código solo después de elegir dirección. No reciclar canvas 2D de V6 ni capítulos 100vh.</li>
          </ul>

          <section className={styles.pick}>
            <p className={styles.kicker}>Recomendación</p>
            <h2>A como sistema. C para las demos. B como un acto, no como el sitio.</h2>
            <p>
              A resuelve header, papel, jerarquía y confianza de integradora. C es la única que muestra red, equipo y soporte como
              producto operable. B aporta profundidad de infraestructura, pero si pinta toda la web de noche vuelve el vacío de V6.
              Esperar selección. No implementar V8 todavía.
            </p>
          </section>
        </main>
      </div>
    </GateChrome>
  );
}
