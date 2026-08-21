# Redirecciones y plan de contenido

## 301 al cutover (producción WP → sitio nuevo)

| Origen actual | Destino | Notas |
| --- | --- | --- |
| `/` | `/` | |
| `/politica-de-privacidad/` | mismo slug | no anidar, conserva señal 2026-07-13 |
| `/politica-de-proteccion-de-datos/` | mismo | |
| `/politica-de-cookies/` | mismo | |
| `/politica-de-seguridad-de-la-informacion/` | mismo | |
| `/politica-de-contingencia/` | mismo | |
| `/canales-de-asistencia/` | mismo | |
| `/acuerdo-de-nivel-de-servicio/` | mismo | |
| `/legal/` | `/legal/` | **solo** cuando el HTML sea Justech, no OK88 |
| `/documentos-legales/` | `/documentos-legales/` o `/legal/` | hoy 97 bytes que apuntan a `/legal/` |
| PDFs `/documentos-legales/*.pdf` | misma ruta | |
| `/home/` | `/` | padre WP 404 |
| `#servicios` etc. | no hay 301 de hash | nuevas URLs de servicio |
| `/feed/` `/comments/feed/` | 410 o quitar del sitemap | |
| `/wp-login.php` `/readme.html` | no redirigir al sitio nuevo | quedan en el origen viejo o 410 |

Anclas actuales no transfieren SEO: el valor está en home + legales.

## Contenido v1 vs pendiente

**Se puede redactar en staging con etiqueta `PENDIENTE_VALIDACION`:** copy de home, servicios ya publicados (6), nosotros (misión/valores reescritos), FAQs a partir de JT-SOP/SLA, legales (migración del HTML auténtico).

**No se publica sin C:** partners, logos de clientes, cifras, nube/ciber/IA/QA/dev, equipo, casos con ROI, 24/7.

## Inventario de redacción (v1)

| Pieza | Fuente | Estado |
| --- | --- | --- |
| Hero + apoyo | mandato §5 + C22 | Aprobar texto |
| 4 servicios P del sitemap | web actual, reescritura ejecutiva | Borrador |
| Licenciamiento / equipos | web actual | Borrador; sin badge |
| Metodología | mandato “estrategia…mejora continua” | Borrador |
| FAQs | JT-SOP + SLA | Extraer, no inventar tiempos |
| Legales | JT-POL-* 1.0 | Conservar; quitar footer Australia del tema |
| Testimonios | home WP | C10 |
| Clientes | home WP | C09 omitir |

## Search Console (post contención `/legal/`)

1. Inspeccionar `/legal/`.  
2. Si el cache es OK88: Removal temporal + recrawl tras restaurar índice Justech.  
3. Security Issues / Manual Actions.  
4. Sitemap limpio.  
5. No enviar URLs de staging.
