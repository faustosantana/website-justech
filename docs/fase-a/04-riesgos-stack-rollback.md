# Riesgos, stack recomendado y rollback

## 1. Riesgos (producción actual)

| ID | Riesgo | Prob. | Impacto | Mitigación inmediata | Mitigación estructural |
| --- | --- | --- | --- | --- | --- |
| R01 | `/legal/` sirve spam de apuestas | Hecho | Crítico (reputación, SEO, cumplimiento) | Restaurar página, noindex, rotar credenciales | Sacar el sitio de WP compartido |
| R02 | WooCommerce 6.8.2 + RevSlider 6.5 + CF7 5.6 en WP 7.1 | Alta | RCE/XSS/spam histórico en ese combo | Desactivar Woo y RevSlider si no se usan; actualizar o retirar CF7 | Rebuild |
| R03 | Login, readme, license públicos | Alta | Fuerza bruta, fingerprint | Fail2ban/WAF, borrar readme | Origen estático |
| R04 | Selector de DB Odoo público | Media | Abuso / enumeración | Restringir `/web/database/*` a VPN/IP; login de tickets con marca | Hardening nginx |
| R05 | TLS caduca 2026-09-26 | Cierta | Caída HTTPS | Auto-renew Let's Encrypt en BanaHosting | Cert en CDN/plataforma nueva |
| R06 | Sitemap con 404 de feeds + `/legal/` spam | Alta | Crawl budget / trust | Editar sitemaps ahora | Generar sitemap limpio en sitio nuevo |
| R07 | Pixel/GA sin consentimiento | Media | Incumplimiento vs. propia política de cookies | CMP o no disparar ads hasta consentimiento | Consent Mode v2 |
| R08 | Logos clientes/marcas sin permiso | Media | Reclamo de marca | Quitar o recabar autorización | Inventario C07–C09 |
| R09 | Cutover sin 301 legales | Media | Pérdida de las únicas URLs con señal 2026 | Mapa 301 (inventario §12) | QA post-lanzamiento |
| R10 | Shared hosting Chicago | Media | Rendimiento RD, vecinos ruidosos, malware WP | WAF | PaaS + CDN |
| R11 | Sin backup verificable en este entorno | Alta | Imposible rollback forense | Pedir backup a BanaHosting **hoy** (C01) | Backups versionados del sitio nuevo |
| R12 | Contenido demo Australia en legales | Hecho | Destruye credibilidad institucional | Quitar widgets Teba del footer | Plantillas propias |

## 2. Plan de respaldo y rollback

### 2.1 Hoy (WordPress, fuera de este repo)

1. Snapshot de archivos + MySQL en BanaHosting (descarga local cifrada).
2. Export XML de WordPress (contenido).
3. Copia de PDFs legales y de `wp-content/uploads` (logos Justech).
4. Documentar DNS (NS BanaHosting, MX M365, TXT SPF+GSC).
5. **No** apuntar el dominio a un preview de este repo hasta Fase F.

Rollback WP: restaurar snapshot de hosting. Este GitHub **no puede** rollbackear producción porque no la contiene.

### 2.2 Cuando exista el sitio nuevo

| Evento | Rollback |
| --- | --- |
| Preview/staging | URL `*.vercel.app` / `pages.dev` con `X-Robots-Tag: noindex` y auth básica |
| DNS cutover | TTL bajo 300 s antes; revertir A/CNAME a `50.31.188.22` si 5xx > umbral |
| 301 mal hechos | Revertir `next.config` redirects; restaurar lista anterior |
| Formulario caído | Feature flag → mailto `info@` / `ventas@` |
| Certificado | Plataforma gestiona; no depender del LE de BanaHosting |

Criterio de abortar lanzamiento: formularios muertos, legales 404, `/legal/` otra vez spam, o correo MX tocado por error.

## 3. Recomendación de stack (sitio nuevo)

### 3.1 Qué no hacer

- No “cambiar el color del tema Teba”.
- No WordPress headless sobre **esta** instancia (comprometida + deuda).
- No WooCommerce (no hay catálogo público).
- No mezclar RevSlider/WPBakery en el front nuevo.

### 3.2 Propuesta A (recomendada para este repo y este equipo)

| Capa | Tecnología | Motivo |
| --- | --- | --- |
| Front | **Next.js (App Router) + TypeScript** | HTML semántico, metadata, sitemap, redirects, RSC; nivel “multinacional” |
| Estilos | CSS modules o Tailwind **con tokens del design system** (Fase C) | Control de contraste y densidad; no theme shop |
| Contenido v1 | MDX/JSON tipado en `/content` (servicios, industrias, FAQs, legales) | Justech puede PR; staging etiquetable `PENDIENTE_VALIDACION` |
| CMS v1.1 | Payload o Sanity **si** rechazan Git | Campos obligatorios, estados draft/review/publish |
| Forms | Route Handler + validación Zod + honeypot + rate limit | Destino: correo M365 y/o webhook Odoo |
| Analítica | GTM + GA4 existentes, eventos documentados | No duplicar GA del hack (`G-0LSM1YJSPZ`) |
| Hosting | Vercel o Cloudflare Pages | HTTPS, preview, cabeceras, CDN; RD vía PoP |
| Dominio | Seguir en registrador actual; CNAME www; **MX intacto** | |
| i18n | `es` only hasta traducción profesional | |

### 3.3 Propuesta B (si Gerencia exige WP)

WordPress **nuevo** (instancia limpia, Twenty/FSE o tema custom, sin Teba), WP Rocket, form nativo, Wordfence, hosting WordPress administrado (no Bana shared). **Inferior** en seguridad y rendimiento al mandato; solo si el equipo no puede operar Git.

### 3.4 Presupuesto de rendimiento (plantillas clave)

- JS de terceros: GTM + 1 pixel máximo hasta CMP.
- Hero: imagen AVIF/WebP con dimensiones, **sin** slider.
- Fuentes: IBM Plex Sans **self-hosted** subset + `font-display: swap`; no Poppins+Noto+Roboto juntos.
- Lighthouse laboratorio: Performance ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 en home y un servicio. Campo CrUX: objetivo LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 — **sin garantía de ranking**.

## 4. Seguridad objetivo (sitio nuevo)

- HSTS, CSP estricta gradual, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'self'`.
- Sin generator meta de WP/Woo/RevSlider.
- Formularios: CSRF de framework, sanitización, no store PII en ads.
- Cookies clasificadas; CMP si se mantienen GTM+pixel.
- Staging `noindex`.

## 5. Dependencias externas a no romper

- MX Microsoft 365  
- Portal Odoo (enlace)  
- Search Console verification TXT hasta revalidar  
- PDFs legales  

## 6. Evidencia de comandos de solo lectura usados

```
curl -sI -L https://www.justech.do/
curl -sL https://www.justech.do/robots.txt
curl -sL https://www.justech.do/sitemap.xml
curl -sL https://www.justech.do/sitemap-legal.xml
curl -sI https://www.justech.do/{wp-login.php,readme.html,legal/,politica-de-privacidad/,...}
dig +short www.justech.do A NS MX TXT
curl -sI -L https://soporte.justech.do
```

No se ejecutó autenticación, fuzzing ni envío de formularios.
