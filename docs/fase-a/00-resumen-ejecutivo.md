# Fase A — Resumen ejecutivo

**Fecha de auditoría:** 2026-08-21  
**Entorno:** Cloud Agent, rama `cursor/fase-a-auditoria-017a`, repo `github.com/faustosantana/website-justech`  
**Alcance:** solo lectura de producción, DNS público y sitios de competidores. **Cero cambios en producción.**

## 1. Entorno y rama

| Ítem | Valor |
| --- | --- |
| Repo | `https://github.com/faustosantana/website-justech` |
| Rama de trabajo | `cursor/fase-a-auditoria-017a` (desde `main`) |
| Contenido de `main` | Un archivo `initial` vacío. No hay código del sitio. |
| Producción | `https://www.justech.do` — WordPress **fuera de este repo** |
| Staging | No existe en el repo ni se detectó subdominio de staging |
| Autorización de producción | No hay. No se tocará. |

## 2. Stack detectado (producción)

| Capa | Hallazgo | Versión / evidencia | Riesgo |
| --- | --- | --- | --- |
| CMS | WordPress | 7.1 (`meta generator`, `ver=7.1` en login) | Core reciente; superficie WP clásica |
| Tema | **Teba** (Motivoweb, ThemeForest) | `wp-content/themes/teba` | Tema comprado + demo (Australia en footer legal) |
| Page builder | WPBakery (JS Composer) | 6.9.0 | EOL relativo, HTML inflado |
| Slider | Slider Revolution | 6.5.31 | Historial de CVEs; LCP pésimo |
| E-commerce | WooCommerce **activo en home** | **6.8.2 (2022)** | Crítico: versión abandonada, tienda no publicada |
| Formularios | Contact Form 7 | 5.6.3 (2022) | Sin reCAPTCHA/hCaptcha visible |
| WhatsApp | NinjaTeam WhatsApp for WordPress | 3.1.8 / handle 7.1 | Widget; números inconsistentes |
| Instagram | Smash Balloon Instagram Feed | 6.0.7 | JS de terceros |
| Hosting web | BanaHosting shared | `hd-4934.banahosting.com` · IP `50.31.188.22` Chicago | Shared, cabeceras de seguridad ausentes en home |
| DNS | `ns4934/ns4935.banahosting.com` | | |
| Correo | Microsoft 365 | MX `justech-do.mail.protection.outlook.com` · SPF `-all` | Conservar |
| TLS | Let's Encrypt `*.justech.do` | Válido hasta 2026-09-26 | Renovación en ~5 semanas |
| Analítica | GA4 + GTM + Meta Pixel | `G-3QER18Q85V` · `GTM-P6XLSFFZ` · pixel `4128864347396906` | Sin Consent Mode v2 visible en home |
| Soporte | Odoo detrás de nginx 1.24.0 | `soporte.justech.do` → `/web/database/selector` | Selector de DB expuesto |
| Search Console | Token en TXT | `google-site-verification=9lT-VOQsgl5HHshgXyk8-85qZUrmoytEDoblEEEzeZA` | Acceso no verificado aquí |

## 3. Estado actual (en una frase)

Justech tiene **políticas legales recientes de calidad institucional** (13 jul 2026) pegadas a un **one-pager de tema comprado**, con WooCommerce y Revolution Slider innecesarios, **SEO casi nulo**, **`/legal/` hackeada con spam de apuestas**, y un portal Odoo que abre el selector de bases. El repositorio GitHub está vacío: el rediseño no es un cambio de tema, es construir el sitio desde cero.

## 4. Riesgos críticos

1. **P0 — Compromiso de `/legal/`** (contenido OK88 / slots, GA de `plazait.co.id`). Centro de cumplimiento reemplazado por spam. Ver auditoría.
2. **P0 — Plugins abandonados** (WooCommerce 6.8.2, CF7 5.6.3, RevSlider 6.5.x) en un WordPress 7.1.
3. **P0 — Superficie de ataque**: `wp-login.php` 200, `readme.html` 200, `license.txt` 200, `wp-content/` 200, XML-RPC 403, REST API 404 inconsistente, **cero** HSTS/CSP/X-Frame en home.
4. **P0 — Odoo database selector** público en soporte.
5. **P1 — Contenido demo del tema** (dirección Australia, `info@domain.com`) en plantillas legales.
6. **P1 — Certificado TLS caduca 26 sep 2026**.
7. **P1 — Sitemap incluye `/feed/` y `/comments/feed/` que responden 404**.
8. **P1 — Autoridad SEO mínima**: una URL comercial indexable, sin meta description, sin OG, sin JSON-LD, `lang="en-US"` en sitio en español.
9. **P1 — Logos de marcas y clientes sin clasificación ni permiso documentado**.
10. **P2 — Medición incompleta**: hay GA4/GTM/pixel; no hay eventos de conversión verificados ni consent banner real.

## 5. Conservar vs reemplazar

### Conservar (migrar)

- Dominio `justech.do` / `www.justech.do` y redirección apex → www.
- Correo Microsoft 365 y SPF.
- Token de Search Console (revalidar tras cutover).
- IDs de GA4/GTM/pixel **si marketing confirma propiedad** (no el GA de `/legal/` comprometida: `G-0LSM1YJSPZ`).
- Documentos legales JT-POL-* / JT-SLA-001 / JT-SOP-ATN-001 y PDFs (tras verificar que no estén alterados).
- Teléfonos y correos **una vez canónicos**.
- Enlace a `soporte.justech.do` (endureciendo Odoo aparte).
- Testimonios y clientes **solo con permiso**.
- Relato fundacional: 2018, Santo Domingo, puente requerimiento → solución.
- Identidad cromática (marino `#14133b` / turquesa `#4dc5d8`) como punto de partida accesible.

### Reemplazar por completo

- Tema Teba, WPBakery, Slider Revolution, WooCommerce, feed de Instagram, one-page anchors.
- Hosting shared BanaHosting para el sitio público (el correo puede quedarse en M365).
- Arquitectura de una sola página sin URLs de soluciones/servicios.
- Muros de logos sin taxonomía.
- Copy genérico (“gran variedad de servicios”), inglés accidental y footer demo.
- 404 genérico de 794 bytes sin utilidad.

### Reescribir

- Home, servicios, nosotros, contacto.
- Centro Legal (la URL `/legal/` debe volver a ser el índice, no spam).
- Mensajes de WhatsApp/teléfono unificados.

### Redirigir (301) en el cutover

- `/` permanece.
- Políticas `/politica-de-*`, `/canales-de-asistencia/`, `/acuerdo-de-nivel-de-servicio/`, `/documentos-legales/` → equivalentes nuevos.
- Anchors actuales (`#servicios`, `#contacto`) no transfieren SEO; las **nuevas** URLs de servicios se crean, no redirigen desde `#`.

### Eliminar / noindex

- Feeds 404 en sitemap, búsqueda `?s=`, `readme.html`, `license.txt`, listing, login indexable, tienda Woo no usada, URLs de demo Teba si reaparecen.

## 6. Recomendación de stack (sitio nuevo)

Ver detalle en `04-riesgos-stack-rollback.md`.

**Propuesta:** Next.js (App Router) + TypeScript + contenido estructurado en el repo (MDX/JSON con esquema) + despliegue en Vercel o Cloudflare Pages. Formularios por servidor con validación, honeypot y destino correo/Odoo. **No WordPress.**

## 7. Puntos de aprobación

No se inicia Fase B (estrategia de IA/SEO) ni mucho menos código de UI hasta que Gerencia confirme:

1. Tratamiento del incidente `/legal/` (limpieza WP ahora vs. esperar sitio nuevo).
2. Aprobación de **reconstruir** vs. parchear Teba.
3. Lista mínima de capacidades e industrias **reales** (C14/C15).
4. Correos, WhatsApp y cifra “2018” como únicas pruebas publicables por ahora.

## Siguiente paso

Si se aprueba D01–D03: Fase B (sitemap, mapa SEO, conversiones, redirecciones) en la misma rama o en `cursor/fase-b-estrategia-017a`.
