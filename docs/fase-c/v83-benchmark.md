# V8.3 — Benchmark competitivo local

**Fecha de revisión:** 2026-08-25  
**Método:** sitios oficiales de solo lectura, sitemaps y páginas internas. Un logo **no** es partnership de Justech. Las cifras y premios de terceros se registran como *lo que ellos publican*, no como hechos de Justech.  
**Fuentes:** https://www.mattarconsulting.com/ · https://itges.com.do/ · https://redesip.com.do/ · https://multicomputos.com/

## Matriz

| Criterio | Mattar | ITGES | RedesIP | Multicómputos | Justech actual (V8.3) | Objetivo Justech |
| --- | --- | --- | --- | --- | --- | --- |
| Posicionamiento | Licenciamiento y software especializado (M365, Adobe, Autodesk, AEC) desde 2002 | Cloud, ciber, continuidad, SAP, “empresas distribuidas” | Conectividad y protección de la información desde 2001 | Integrador regional Caribe/Centroamérica, escala y premios | Integradora de extremo a extremo: evaluar, diseñar, suministrar, implementar y operar | Integradora de extremo a extremo: evaluar, diseñar, suministrar, implementar y operar |
| Servicios | Consultoría, implementación, soporte, cumplimiento de licencias | Identificar → proveer → soportar; NOC alegado en meta | Cableado, routing/switching, cifrado, DLP | Consultoría, implementación, soporte, DC, virtualización | Soporte, mesa, MSP, implants (en sitio staging) | Ciclo completo visible sin fingir NOC/SOC/24/7 |
| Productos | Software de marcas representadas | Infra, red, seguridad, DC | Foco en conectividad/seguridad, no catálogo de PCs | Amplio portafolio + páginas de marca | Equipos + licencias + infra física | Catálogo de equipos **sin e-commerce** + licencias + cableado |
| Industrias | AEC, educación, creatividad, gobierno (copy) | Seguros, motor, energía (vía testimonios) | Empresarial, telco y gobierno (copy) | Banca, seguros, energía, educación, salud, gobierno | Industrias en sitemap, no publicadas como prueba | Solo verticales con oferta + validación interna |
| Partners | Microsoft, Adobe, Autodesk, SketchUp, Chaos, Blackboard, Kaspersky, Veeam, Fortinet, WatchGuard (en sitio) | Fortinet (premios), Trend Micro, Huawei, SAP (noticias) | Aliados poco legibles en HTML; especialización en red/seguridad | Oracle, Nutanix, Fortinet, Veritas, Teramind, OneSpan, HPE… | Marcas en `/tecnologias/` **pending** | Páginas de marca en borrador hasta autorización |
| Clientes | No publica logos nominativos en home | Logos en sobre-nosotros (DGII, Poder Judicial, EDEEste, Arias Motors, Ademi, CAEI, TotalEnergies, etc.) | No publica cartera | CardNET, Humano, UASD, Tropigas, Sopesa, BHD León, Unicaribe, Edenorte… | No republicar (C09) | Solo `verified` |
| Casos | Plantillas de portfolio vacías / poco útiles | Testimonios, no casos con alcance | Casi ninguno | Casos nominativos con tecnología y resultado | Estructura vacía `caseStudies: []` | Plantilla lista, no publicada |
| Certificaciones | Página `/certificaciones/` y copy “calidad certificada” | Premios Fortinet/SAP/Trend Micro | No evidenciado en sitemap | GPTW, Oracle Partner Award, Veritas, Teramind | No publicar | Evidencia + vigencia |
| Testimonios | Reseñas/premios (página) | Nominativos (Luis Núñez / Monumental; Milagros Arias / Arias Motors) | No | En casos | No | Permiso escrito |
| Navegación | WordPress: Nosotros, Soluciones, marcas, contacto; hay URLs plantilla en inglés | Home densa, SAP, careers, blog de premios | Pocas páginas reales; “under-contruction”, footer-2 | Mega-sitio; robots bloquea `/clientes/`, `/noticias/`, `/marca/` | Una nav + mega por intención | Clara, sin duplicar slugs |
| Diseño | Corporativo WordPress, denso, autoridad por marcas | Oscuro, premios, testimonios, cifras 100% | Simple, poco profundo, títulos placeholder | Saturado, premios, contadores, logos | Hero diurno, overlay de papel, no bloque negro | Claro, diurno, editorial, no catálogo |
| Motion | Bajo | Bajo | Bajo | Contadores animados | Secuencias de escena | Microinteracción con propósito |
| Conversión | Contáctenos | Cotizar / representante / consultar + form largo | Contacto / soporte | Demo, industrias, casos | Formulario simulado de 2 pasos | Intención adaptativa |
| SEO | Title “Soluciones TI corporativas RD”; Yoast; páginas de marca | Rank Math; meta NOC+SAP; blog de premios | Sitemap mínimo (~11 URLs); H2 placeholder | Escala de URLs; CF bloquea sitemap a bots simples | noindex en staging | Clústeres sin canibalizar |
| SEM | Landing de Copilot/M365 en home | Calculadora de costos (interna) | No evidente | Alto volumen de marca | Landings `/l/*` preparadas, noindex | Activar solo con cuenta y consentimiento |
| Recursos | FAQ, historia | Blog de reconocimientos | Promociones | Noticias (disallow en robots) | FAQ + guía levantamiento | Guías reales, no thin |
| Soporte | Support function (plantilla) | “Soportamos” + 24 h laborables en form | `/soporte/` | Servicios a medida | Portal Odoo en otro host | Portal + horario verificado, sin 24/7 |
| Móvil | Tema WP | Tema WP | Básico | Pesado | Assets propios V8.2 | Copy arriba, escena abajo, CTA visible |
| Rendimiento | WP + Yoast | WP + Rank Math | WP ligero pero pobre | CF + peso de marketing | LCP lab ~3.0 s en V8.2 | <2.5 s sin vaciar la calidad |

## Qué hace bien / mal

### Mattar Consulting
- **Bien:** Autoridad de licenciamiento; páginas por marca; copy de ciclo evaluación→licencia→implementación→optimización; sectores AEC/educación/creatividad; 20+ años en el mensaje.
- **Mal:** Home sin H1; typo “Contáctenoa”; URLs de plantilla en inglés (`marketing-research`, `portfolio-masonry`); poco hardware, cableado y mesa de ayuda; prueba de clientes débil en home.
- **Keywords:** soluciones TI corporativas RD, Microsoft 365, Autodesk, Adobe, Copilot.
- **Oportunidad libre:** equipos + cableado + redes + soporte operativo alrededor del licenciamiento.

### ITGES
- **Bien:** Posicionamiento cloud/ciber/continuidad; testimonios con nombre y cargo; premios Fortinet repetidos; proceso 3 pasos; SAP.
- **Mal:** Cifras “100% experiencia / 100% satisfacción”; meta menciona NOC sin demostrarlo en UI; páginas test (`/test/`, `/elementor-32556/`, `/presupuesto-test/`); blog casi solo premios.
- **Clientes públicos (sobre-nosotros / sitemap):** DGII, Poder Judicial, EDEEste, Arias Motors, Ademi, CAEI, TotalEnergies, Lantica Media, Santa Cruz, Agua Planeta, Monumental de Seguros (testimonio).
- **Oportunidad libre:** Honestidad operativa (sin 100%); ciclo suministro+instalación; demostración visual de falla; cableado.

### RedesIP
- **Bien:** Foco nítido desde 2001; cableado + routing/switching + protección de datos; contacto directo.
- **Mal:** Profundidad mínima; `under-contruction`; H2 “THIS IS SOME TITLE”; aliados no extraíbles; sin casos; sin catálogo de equipos.
- **Oportunidad libre:** Mejor laboratorio de red del mercado local + landings SEO de redes/Wi-Fi/HA **sin duplicar** `/redes/`.

### Multicómputos
- **Bien:** Escala percibida; casos nominativos; páginas de marca; industrias; premios; presencia regional.
- **Mal:** Saturación; robots oculta clientes/noticias; sitemap 403 a clientes simples; contadores genéricos; no es cercano ni cotizable en un clic.
- **Oportunidad libre:** Claridad mid-market, cotización sencilla, acompañamiento local, no fingir el mismo tamaño.

## Justech — whitespace
No imitar Gold/ISO/38 años. Ocupar: **un responsable de extremo a extremo**, cableado que ellos no profundizan, equipos que Mattar no lidera, honestidad que ITGES infla, y una experiencia de red mejor que RedesIP.
