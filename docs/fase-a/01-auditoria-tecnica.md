# Auditoría técnica (solo lectura)

**Fecha:** 2026-08-21  
**Método:** `curl`, DNS, HTML de producción. Sin login, sin exploits, sin cambios.  
**User-Agent de muestreo:** solicitudes HTTPS estándar a `www.justech.do`.

## 1. Disponibilidad y transporte

| Comprobación | Resultado |
| --- | --- |
| `https://www.justech.do/` | HTTP/2 **200**, HTML 177 234 bytes |
| `https://justech.do/` | **301** WordPress → `https://www.justech.do/` |
| `http://www.justech.do/` | **301** WordPress → HTTPS www |
| TTFB (esta red) | ~0,75 s starttransfer; total ~0,96 s (laboratorio, no CrUX) |
| TLS | CN `*.justech.do`, Let's Encrypt YR1, **28 jun 2026 – 26 sep 2026** |
| HTTP/3 | `alt-svc: h3` anunciado |
| Cabeceras de seguridad en **home** | **Ausentes**: no HSTS, no CSP, no X-Frame-Options, no X-Content-Type-Options, no Referrer-Policy, no Permissions-Policy, no `Server` |
| Cookies en home | Ninguna `Set-Cookie` |
| Cabeceras en **wp-login** | `X-Frame-Options: SAMEORIGIN`, `CSP: frame-ancestors 'self'`, `Referrer-Policy: strict-origin-when-cross-origin`, cookie `wordpress_test_cookie` Secure+HttpOnly |

HTTPS funciona. El endurecimiento no está aplicado al front.

## 2. CMS, tema y plugins (evidencia en HTML)

```
<meta name="generator" content="WordPress 7.1" />
<meta name="generator" content="WooCommerce 6.8.2" />
<meta name="generator" content="Powered by WPBakery Page Builder..." />
<meta name="generator" content="Powered by Slider Revolution 6.5.31 ..." />
```

| Componente | Ruta / handle | Versión vista | Notas |
| --- | --- | --- | --- |
| WordPress | `/wp-login.php`, `/wp-includes/` | 7.1 | Login en inglés (`locale-en-us`) |
| Tema Teba | `/wp-content/themes/teba/` | CSS `ver=7.1` (no es versión del tema) | Motivoweb; title bar apunta a `motivoweb.com/teba/.../bg-titlebar.jpg` |
| Teba Core | `teba_core` | 1.0 | |
| WPBakery | `js_composer` | 6.9.0 | |
| RevSlider | `revslider` | 6.5.31 (asset 6.5.18 mezclado) | Hero lazyload con `dummy.png`; LCP comprometido |
| WooCommerce | `woocommerce` | **6.8.2** | CSS/JS en **home**; no hay `/shop/` (404) |
| Contact Form 7 | `contact-form-7` | **5.6.3** | Formulario home; `_wpcf7_locale` presente |
| WhatsApp for WP | `whatsapp-for-wordpress` | 3.1.8 | `wa.me/18094552372` y `wa.link/vppb2a` |
| Instagram Feed | `instagram-feed` | 6.0.7 | |

Página de inicio: `page-id-190`, `parent-pageid-192`, template `page-no-title-bar`. El padre `?page_id=192` redirige a `/home/` (**404**). One-page huérfano.

## 3. Hosting y DNS

| Ítem | Valor |
| --- | --- |
| A | `50.31.188.22` |
| PTR/hostname | `hd-4934.banahosting.com` |
| ASN | AS23352 DEFT.COM, Chicago, IL |
| NS | `ns4934.banahosting.com` / `ns4935.banahosting.com` |
| MX | `justech-do.mail.protection.outlook.com` (prioridad 0) |
| TXT SPF | `v=spf1 include:spf.protection.outlook.com -all` |
| TXT GSC | `google-site-verification=9lT-VOQsgl5HHshgXyk8-85qZUrmoytEDoblEEEzeZA` |

Shared hosting en EE. UU. El correo ya está en Microsoft 365: conviene **no mover el mail** con el sitio.

## 4. SEO técnico

| Ítem | Estado |
| --- | --- |
| `<html lang>` | **`en-US`** en sitio en español |
| Title | `JUSTECH – Alternativas Tecnológicas` |
| Meta description | **Ausente** |
| Canonical | `https://www.justech.do/` (home OK) |
| Open Graph / X Cards | **Ausentes** |
| JSON-LD | **Ausente** |
| hreflang | **Ausente** (correcto: no hay EN) |
| H1 | **Ninguno** en home |
| Skip link | **Ausente** |
| `robots` home | solo `max-image-preview:large` (indexable) |
| `robots.txt` | Permite `/` y lista políticas; declara dos sitemaps |
| Sitemap | `sitemap.xml` (xml-sitemaps.com) last-mod **25 jul 2026**; `sitemap-legal.xml` last-mod URLs **13 jul 2026** |
| Feeds en sitemap | `/feed/` y `/comments/feed/` → **404** (basura) |
| Búsqueda | `/?s=test` **200** con `noindex, follow` |
| 404 | Código **404** correcto; cuerpo **794 bytes**, título genérico `404 Not Found`, **sin** navegación Justech (no es la 404 del tema; parece error de origen/CDN) |
| wp-sitemap.xml | 404 (WP nativo desactivado o bloqueado) |
| REST `wp-json` | **404** HTML (bloqueado) pese a `Link: rel=https://api.w.org/` |
| Indexación observada | Home visible en búsqueda; inventario orgánico pobre. `site:` no devolvió un corpus amplio en esta corrida |

### `robots.txt` (completo)

```
User-agent: *
Allow: /
Allow: /legal/
Allow: /politica-de-proteccion-de-datos/
...
Sitemap: https://www.justech.do/sitemap.xml
Sitemap: https://www.justech.do/sitemap-legal.xml
```

No hay `Disallow` de `/wp-admin/`, `/wp-login.php` ni de búsqueda. `/legal/` está **explícitamente permitida** — y es la URL comprometida.

## 5. Rendimiento (laboratorio, no Lighthouse de campo)

| Señal | Valor |
| --- | --- |
| HTML | 177 KB |
| `<script>` | 47 |
| stylesheets | 17 |
| Imágenes en DOM | 49 (srcset parcial; logos PNG) |
| Hero | RevSlider + `fetchpriority="high"` sobre **dummy.png** y `data-lazyload` del JPG 1920×1080 |
| Fuentes | Google Fonts: IBM Plex Sans, Roboto, Noto Serif, **Poppins** extra; `font-display` inconsistente |
| JS de terceros | gtag, GTM, fbevents, jQuery, RevSlider, WC, Instagram, WhatsApp |
| Animaciones WPBakery | `data-custom-animations` 3D (`rotateX`, `translateZ`) **sin** `prefers-reduced-motion` |
| Overlay | `#loading` / `loading-wrap` (CLS e INP en móvil) |
| WooCommerce | CSS+JS de carrito en home aunque no hay tienda |

**No se declara “Core Web Vitals cumplidos”.** Falta CrUX/Search Console. Hipótesis: LCP y JS bloquean el umbral 2.5 s / 200 ms en móvil real.

## 6. Accesibilidad (muestreo home)

| Criterio | Hallazgo |
| --- | --- |
| Landmarks | 1 `<header>`, 1 `<footer>`, **0 `<nav>`**, **0 `<main>`** |
| Teclado / skip | No hay skip link |
| Contraste | Turquesa `#4dc5d8` sobre blanco probable OK; texto en hero de slider no auditado en runtime |
| Imágenes | 1 sin `alt`; 5 `alt=""`; la mayoría de logos `alt="image"` (inútil) |
| Idioma | `en-US` vs contenido ES |
| Formularios | CF7: `your-name`, `your-email`, `tel-476`, `menu-824`, `your-message` — labels poco semánticos |
| Movimiento | Animaciones 3D y loader sin respeto a reduced-motion |
| Mega menú | No hay mega menú; anclas one-page |
| Overlay de carga | Interpone contenido |

Objetivo WCAG 2.2 AA: **no cumplido** en la plantilla actual.

## 7. Formularios, CTAs y medición

**Formulario CF7** (`/#wpcf7-f701-p190-o1`): nombre, email, teléfono, select de servicio (6 + Otros), mensaje. **Sin captcha visible.** Destino no verificable sin enviar (no se envió spam de prueba).

**CTAs:** “Consultant” → `#contacto`; tel `809-455-2372`; mail `info@justech.do`; WhatsApp `18094552372` y `(809) 870-3783` en bloque de contacto.

**Analítica home:**

```
gtag('config', 'G-3QER18Q85V');
GTM-P6XLSFFZ
facebook.com/tr?id=4128864347396906
```

**Analítica en `/legal/` comprometida (distinta):** `G-0LSM1YJSPZ` con linker a `plazait.co.id`. Eso **no es** la etiqueta de Justech.

No se observó banner de consentimiento real ni Consent Mode v2 en home (`consent` count 0; `cookie` solo en copy). Las políticas de cookies existen; el banner no opera como CMP.

## 8. Seguridad y privacidad

### 8.1 Incidente P0 — `/legal/`

| Campo | Valor |
| --- | --- |
| URL | `https://www.justech.do/legal/` (y `/legal` 301) |
| HTTP | 200, ~256 KB |
| Title | `OK88 : Panduan Lengkap Permainan Slot Digital...` |
| Contenido | Spam de casino/slots IDR, “Autorized Situs SLOT88” |
| GA | `G-0LSM1YJSPZ` ≠ GA de Justech |
| Justech en HTML | **No** |
| `robots.txt` | `Allow: /legal/` |
| `sitemap-legal.xml` | Incluye `/legal/` con lastmod 2026-07-13 |

Interpretación: la URL del Centro Legal fue **reemplazada o inyectada**. Compatible con compromiso WordPress (plugin/tema/upload), no con un “error de copy”. Las otras políticas `/politica-de-*` siguen sirviendo documentos JT-* de Justech.

**Acción inmediata recomendada (operaciones, no este repo):** aislamiento, backup forense, restaurar índice legal, rotar claves wp-admin/FTP/BanaHosting, auditar usuarios y `wp-content/uploads`, quitar WooCommerce/RevSlider/CF7 obsoletos o endurecer, noindex temporal de `/legal/` si el spam sigue vivo.

### 8.2 Superficie WordPress

| URL | Código | Comentario |
| --- | --- | --- |
| `/wp-login.php` | 200 | Login público, inglés, “Powered by WordPress” |
| `/wp-admin/` | 302 → login | Esperado |
| `/xmlrpc.php` | 403 | Mitigado |
| `/readme.html` | 200 | Divulgación |
| `/license.txt` | 200 | Divulgación |
| `/wp-content/` | 200 | Listing o placeholder; no se enumeró árbol útil en esta corrida |
| `/wp-includes/` | 404 | |
| `/wp-json/` | 404 | API cortada (inconsistente con Link header) |

### 8.3 Portal de soporte (Odoo)

`https://soporte.justech.do` → 303 `/odoo` → 303 `/web/database/selector` → **200** página “Odoo” con:

- Mensaje: “The database manager has been disabled by the administrator”
- UI de **Create Database** (master password, nombre, email, password, teléfono, idioma)
- UI de restore

Nginx 1.24.0 Ubuntu. Cookie `session_id` HttpOnly, Max-Age 1 año. `X-Content-Type-Options: nosniff`. Sin HSTS visto.

**Riesgo:** enumeración y abuso del selector; no es un portal de tickets de marca Justech.

### 8.4 Contenido demo en plantillas legales

En políticas vigentes aparece el footer Teba:

- “let’s make something together”
- PO Box 16122 Collins Street West, Victoria 8007 **Australia**
- `info@domain.com` / `example@domain.com`
- `+ (066) 0760 0260` / `+ (057) 0760 0560`

Eso contradice el propio Centro Legal y parece **plantilla de ThemeForest**, no datos de Justech.

## 9. Integraciones

| Sistema | Evidencia | Conservar |
| --- | --- | --- |
| Correo M365 | MX + SPF | Sí |
| WhatsApp | Plugin + wa.me + wa.link | Sí, unificar número |
| Facebook | `facebook.com/justechrd` + pixel | Sí, si la página es oficial |
| Instagram | `Instagram.com/justechrd` + plugin | Perfil sí; plugin no necesariamente |
| Odoo soporte | Subdominio | Enlace sí; endurecer instancia |
| Google Fonts / jQuery CDN | ajax.googleapis.com | Reemplazar por self-host |
| Motivoweb | Imágenes remotas del demo | Eliminar |
| Ingram, BDRSuite | Logos | Solo si hay relación real |

## 10. Contenido duplicado, thin y huérfanas

- Un solo URL comercial fuerte: `/`.
- Servicios solo como `#servicios` (no indexables como landing).
- Padre `/home/` 404 — jerarquía rota.
- Políticas bien escritas vs. home de tema: **dos registros de calidad distintos**.
- `/documentos-legales/` es un HTML estático de 97 bytes que apunta a `/legal/` (**ahora spam**).
- Sitemap duplica políticas entre `sitemap.xml` y `sitemap-legal.xml` (no es grave; ruido).

## 11. Limitaciones de esta auditoría

- Sin wp-admin: no hay inventario real de plugins inactivos, usuarios, medios, revisions.
- Sin Search Console: no hay cobertura, 404 de campo ni queries.
- Sin CrUX/PSI API en esta corrida: no hay LCP/INP/CLS de usuarios.
- No se envió el formulario (evitar lead basura).
- No se descargaron PDFs para hash/forense.
- Competidores: ver `03-benchmark-competitivo.md` (páginas públicas, 2026-08-21).
