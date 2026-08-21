# Changelog

## 2026-08-21 (páginas D, tests, Pages)

- Sitemap D: industrias, tecnologías, casos, equipo, partners, recursos.
- Sistema de diseño navegable (`/sistema-de-diseno/`).
- `npm run test:staging` (noindex, robots, sin tags de prod, sin OK88).
- Workflow GitHub Pages + `vercel.json` de raíz corregido.
- Menú móvil con grupos; `basePath` opcional para Pages.

## 2026-08-21 (sitio nuevo + preview)

- App Next.js 15.5.23 en `site/` (export estático, noindex, formularios simulados).
- Design system editorial (navy/teal/papel). Home y páginas P del sitemap.
- Preview temporal: `docs/fase-c/preview.md`.
- CI: `.github/workflows/preview.yml`.
- Producción y FTPS de cPanel: sin escrituras.

## 2026-08-21 (FTPS + Fase B)

- Verificación FTPS de solo lectura: el usuario no está enjaulado (ve `public_html` y el home cPanel). **Cero escrituras en servidor.**
- `ftp.justechrd.com` no resuelve; el login TLS funcionó en el host FTP de Justech.
- Plan de staging: jaula FTP o PaaS; noindex; sin tags de producción.
- Fase B: sitemap, SEO, conversiones, 301, audiencias, KPIs.

## 2026-08-21 (P0 `/legal/`)

- Expediente de incidente: evidencia pública (hash estable, sin cloaking por UA), hipótesis de `legal/index.php` físico, plan de limpieza **en espera de autorización**.
- Instrucciones de entrega de acceso por secretos (SFTP/cPanel/WP/DB); `.gitignore` para secretos y dumps.
- Confirmación: el plan WP no toca MX/SPF/DKIM/DMARC.
- Odoo selector documentado como P1 en otro host; sin cambios.
- Fase B de IA/SEO pausada.

## 2026-08-21

- Creación de rama `cursor/fase-a-auditoria-017a`.
- Auditoría de solo lectura de `https://www.justech.do` y `https://soporte.justech.do`.
- Inventario de URLs, plugins, analítica, legal y superficie de ataque.
- Benchmark competitivo local e internacional (fuentes públicas, 2026-08-21).
- Hallazgo P0: `/legal/` comprometida con spam de apuestas.
- Recomendación de stack para reconstrucción (no parche del tema Teba).
- Registro de pendientes de contenido y decisiones.
