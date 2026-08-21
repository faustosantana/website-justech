# Pendientes de contenido

Pregunta, página afectada, impacto, responsable sugerido y estado. Sin estos ítems no se puede publicar un sitio enterprise sin violar las reglas de no invención.

Leyenda de impacto: **P0** bloquea confianza/seguridad · **P1** bloquea páginas clave · **P2** degrada conversión/SEO · **P3** mejora.

| ID | Pregunta | Página | Impacto | Responsable sugerido | Estado |
| --- | --- | --- | --- | --- | --- |
| C01 | ¿Quién tiene acceso a BanaHosting, wp-admin y backups? ¿Hay backup verificable de archivos + DB de los últimos 7 días? | Incidente `/legal/` + rollback | P0 | Operaciones / Fausto | Abierto |
| C02 | ¿Se puede poner `/legal/` en mantenimiento o restaurar el Centro Legal **hoy**? | `/legal/` | P0 | Operaciones | Abierto |
| C03 | Correo comercial canónico: `ventas@justech.do` vs `info@justech.do`. ¿Ambos existen y se leen? | Contacto, schema, CTAs | P1 | Comercial | Abierto |
| C04 | ¿`soporte@justech.do` está operativo? El documento JT-SOP-ATN-001 lo marca “sujeto a confirmación”. | Soporte / legal | P1 | Operaciones | Abierto |
| C05 | WhatsApp canónico: `(809) 870-3783` vs widget `+1 809 455 2372`. ¿Cuál se mide y se publica? | Header, contacto, eventos | P1 | Comercial | Abierto |
| C06 | Dirección física, RNC, horario de oficina y si se publica en LocalBusiness. | Footer, SEO local, schema | P1 | Gerencia | Abierto |
| C07 | Inventario marca × categoría × vigencia × URL de verificación × autorización de logo. | Tecnologías / home | P1 | Comercial + partners | Abierto |
| C08 | Partnerships reales (Microsoft CSP, Google, Huawei, Ingram, etc.): nivel, vigencia, si el logo puede usarse. | Partners, Tecnologías | P1 | Comercial | Abierto. Por defecto: **no publicar badges** |
| C09 | Lista de clientes con permiso escrito de logo y vigencia. Home actual muestra logos (INFOTEP, Leja, Newlink, The Lab, El Mitin, MCCD, Pardo, Maka, Fondo Agua SD, Capital, Diversiones Tours, Banco Unión, MCS, Rattan, más JPGs 2025/06). | Home, casos | P1 | Comercial / legal | Abierto. Por defecto: **no republicar** |
| C10 | Autorización de testimonios: Maurice Sánchez (Pardo), Diana Cabrera (MCCD), Daniel Santana (Remodeco), Carlos Feliz (Leja), Paola Tejeda (El Mitin). El mandato añade Clary Castro (IDCP) no visible en home. | Home, casos | P1 | Comercial | Abierto |
| C11 | ¿Hay un caso de éxito con resultado **verificable** (antes/después, alcance, permiso)? | Home, Casos | P1 | Comercial | Abierto. Sin esto la sección “caso principal” no se publica con cifras |
| C12 | Equipo: nombres, cargos, fotos, consentimiento. LinkedIn público lista “1 employee” — no usar. | Nosotros / equipo | P1 | RRHH / Gerencia | Abierto |
| C13 | Cifras publicables: años (2018), n.º de clientes, tickets, cobertura nacional, SLAs. Solo 2018 está en el sitio. | Home, confianza | P1 | Gerencia | Abierto. Sin cifras no hay contadores |
| C14 | Capacidades del mandato no visibles en la web (nube AWS/Azure/GCP, ciberseguridad, RPA, IA, QA, CI/CD, desarrollo). ¿Cuáles se ofrecen **hoy** con evidencia? | Soluciones / Servicios | P1 | Gerencia comercial | Abierto |
| C15 | Industrias realmente atendidas vs. lista objetivo del mandato. | Industrias | P2 | Comercial | Abierto |
| C16 | Fotografía propia (personas, instalaciones, RD) vs. stock. | Todo el sitio | P2 | Marketing | Abierto |
| C17 | Acceso a GA4 `G-3QER18Q85V`, GTM `GTM-P6XLSFFZ`, Search Console (token `google-site-verification=9lT-VOQsgl5HHshgXyk8-85qZUrmoytEDoblEEEzeZA`), Facebook Pixel `4128864347396906`. | Medición | P2 | Marketing | Abierto |
| C18 | ¿Hay Google Ads activo? Cuenta, conversiones, consent mode. | SEM | P2 | Marketing | Abierto |
| C19 | Integración de formularios: ¿Odoo CRM, correo, ambos? Campos obligatorios y retención. | Contacto, landings | P2 | Operaciones | Abierto |
| C20 | Redes oficiales vigentes: Facebook `justechrd`, Instagram `justechrd`. ¿LinkedIn, YouTube, X? | Footer | P2 | Marketing | Abierto |
| C21 | ¿El footer de Teba (dirección Australia, `info@domain.com`, teléfonos `+ (066) 0760 0260`) debe ignorarse? Aparece en plantillas legales. | Legal / confianza | P0 (contenido demo) | Operaciones | Detectado — **eliminar en sitio nuevo; limpiar en WP si sigue en prod** |
| C22 | Aprobación de narrativa: “La tecnología correcta mueve su negocio hacia adelante.” | Home hero | P2 | Dirección | Abierto |
| C23 | ¿Existe blog, casos escritos, FAQs o descargables reales? | Recursos | P2 | Marketing | Abierto — no hay blog en prod |
| C24 | Horario de soporte 8:00–17:30 (JT-SOP-ATN-001) vs. emergencias 24/7. ¿Se promete 24/7? | SLA, soporte | P1 | Operaciones | No afirmar 24/7 sin contrato |
| C25 | Autorización para conservar/enlazar PDFs legales de ` /documentos-legales/` | Centro legal | P1 | Legal / Gerencia | Abierto |
