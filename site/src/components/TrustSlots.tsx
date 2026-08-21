import { GATES } from "@/content/site";

/**
 * Huecos de prueba social. Permanecen desactivados hasta validar
 * clientes, marcas, certificaciones, cifras y casos (C07–C13).
 */
export function TrustSlots() {
  if (
    !GATES.clients &&
    !GATES.partners &&
    !GATES.certifications &&
    !GATES.metrics &&
    !GATES.caseStudies &&
    !GATES.testimonials
  ) {
    return null;
  }
  return (
    <section className="container py-16" aria-label="Prueba social">
      {GATES.metrics ? <div data-slot="metrics" /> : null}
      {GATES.clients ? <div data-slot="clients" /> : null}
      {GATES.partners ? <div data-slot="partners" /> : null}
      {GATES.certifications ? <div data-slot="certs" /> : null}
      {GATES.caseStudies ? <div data-slot="cases" /> : null}
      {GATES.testimonials ? <div data-slot="quotes" /> : null}
    </section>
  );
}
