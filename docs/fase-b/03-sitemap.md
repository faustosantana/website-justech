# Sitemap objetivo (español, estable)

Host canónico: `https://www.justech.do`. Staging: `https://staging.justech.do` (cuando exista) con noindex.

Leyenda: **P** publicar en v1 · **D** draft / `PENDIENTE_VALIDACION` hasta C14/C15 · **L** legal a conservar slug · **X** no existe hasta contenido real.

## Árbol

```
/                                    P  Inicio
/soluciones/                         P  índice
  /soluciones/infraestructura-y-redes/     D
  /soluciones/ciberseguridad/              D
  /soluciones/nube-y-data-center/          D
  /soluciones/productividad-y-colaboracion/ D
  /soluciones/automatizacion-e-ia/         D
  /soluciones/continuidad-y-respaldo/      D
  /soluciones/software-y-licenciamiento/   P  (oferta web actual)
  /soluciones/equipamiento-empresarial/    P  (oferta web actual)
/servicios/                          P  índice
  /servicios/servicios-administrados/      D  (productizar soporte)
  /servicios/soporte-tecnico/              P
  /servicios/outsourcing-e-implants/       P
  /servicios/consultoria-tecnologica/      P
  /servicios/desarrollo-de-software/       D
  /servicios/qa-y-automatizacion/          D
  /servicios/implementacion-y-migraciones/ P
/industrias/                         D  índice solo si ≥2 verticales C15
  /industrias/gobierno/                    D
  /industrias/banca-finanzas-seguros/      D
  /industrias/salud/                       D
  /industrias/educacion/                   D
  /industrias/retail-y-servicios/          D
  /industrias/hoteleria-y-turismo/         D
  /industrias/industria-construccion-logistica/ D
/tecnologias/                        D  sin badges de partner
  /tecnologias/microsoft/                  D
  /tecnologias/google/                     D
  /tecnologias/huawei/                     D
  /tecnologias/aws/                        D
  /tecnologias/cisco/                      D
  /tecnologias/fortinet/                   D
  /tecnologias/action1/                    D
/casos/                              D  404 o índice vacío hasta C11
/nosotros/                           P
  /nosotros/historia/                      P
  /nosotros/equipo/                        D  sin LinkedIn “1 employee”
  /nosotros/metodologia/                   P
  /nosotros/partners/                      D  inventario C07–C08
  /nosotros/cumplimiento/                  P  enlaza legales
/recursos/                           D
  /recursos/blog/                          X  hasta haber 1 artículo real
  /recursos/guias/                         X
  /recursos/faqs/                          P  preguntas reales, no thin
  /recursos/eventos/                       X
/contacto/                           P
/soporte/                            P  302/enlace a https://soporte.justech.do (no clonar Odoo)
/legal/                              L  índice Centro Legal (contenido Justech, nunca el spam)
/politica-de-proteccion-de-datos/    L
/politica-de-privacidad/             L
/politica-de-cookies/                L
/politica-de-seguridad-de-la-informacion/ L
/politica-de-contingencia/           L
/canales-de-asistencia/              L
/acuerdo-de-nivel-de-servicio/       L
/documentos-legales/                 L  índice de PDFs
/404                                 P
```

Landings SEM (más adelante, no v1): `/l/{campaña}/` noindex o no en nav, message-match, form.

## Navegación pública v1 (si C14 sigue abierto)

**Header:** Inicio · Soluciones · Servicios · Nosotros · Contacto · Soporte  
Mega: Soluciones (8, las D con copy “capacidad en validación” **no se publican**; se ocultan).  
**Footer:** contacto canónico, soporte, legales, redes validadas.

## Propósito por URL v1 (mínimo)

| URL | Intención | Audiencia | CTA principal | CTA secundario |
| --- | --- | --- | --- | --- |
| `/` | Conocer / confianza | P1–P3 | Hablar con especialista | Explorar soluciones |
| `/soluciones/` | Comercial | P1–P2 | Evaluación | Contacto |
| `/soluciones/software-y-licenciamiento/` | Transaccional | P2 | Cotización | WhatsApp |
| `/soluciones/equipamiento-empresarial/` | Transaccional | P2 | Cotización | Teléfono |
| `/servicios/soporte-tecnico/` | Comercial | P1 | Abrir conversación | Portal soporte |
| `/servicios/outsourcing-e-implants/` | Comercial | P3 | Solicitar implant | Contacto |
| `/servicios/consultoria-tecnologica/` | Comercial | P1 | Evaluación | FAQs |
| `/servicios/implementacion-y-migraciones/` | Comercial | P1 | Hablar con especialista | Metodología |
| `/nosotros/` | Marca / E-E-A-T | P3–P4 | Contacto | Cumplimiento |
| `/contacto/` | Transaccional | Todas | Enviar formulario | Tel / WA / mail |
| `/soporte/` | Soporte ≠ ventas | Cliente actual | Portal | canales-de-asistencia |
| Legales | Informativa / cumplimiento | P4 | — | Contacto privacidad |

Inglés: no hreflang hasta traducción profesional completa.
