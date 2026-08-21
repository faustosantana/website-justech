# Estado del proyecto — Justech web nueva

Fuente oficial: `faustosantana/website-justech`. Producción `www.justech.do` **no se modifica** desde este trabajo.

## Fases

| Fase | Qué | Estado |
| --- | --- | --- |
| A | Auditoría de producción | Hecha — `docs/fase-a/` |
| B | Estrategia, sitemap, SEO, staging | Hecha — `docs/fase-b/` |
| C | Design system + wireframes + preview | Hecha en código — `docs/fase-c/`, `/sistema-de-diseno/` |
| D | Home, nav, páginas P y stubs D | Hecha en `site/` (copy provisional) |
| E | SEO técnico staging, a11y, rendimiento, seguridad, analítica off, forms simulados, pruebas | Checks OK — `docs/fase-c/pruebas.md` |
| F | Cutover a www | **Bloqueado** — requiere su autorización |

## Preview

Ver URL vigente en `docs/fase-c/preview.md`. El túnel Cloudflare es temporal. GitHub Pages / Vercel son la vía durable (repo público, sin tocar DNS de justech.do).

## Qué hay navegable

- Home responsive, hero, metodología, valores, CTA.
- Soluciones y servicios (oferta actual + fichas `PENDIENTE_VALIDACION`).
- Nosotros (historia, metodología, cumplimiento; equipo/partners vacíos a propósito).
- Recursos (FAQs reales; blog/guías reservados).
- Industrias y tecnologías: arquitectura SEO, sin logos ni especialidades inventadas.
- Casos: índice vacío.
- Contacto: formulario **simulado**.
- Centro legal limpio (no clona el spam de producción `/legal/`).
- Banner de staging, `noindex`, `robots.txt` Disallow:/, sin GA/GTM/Pixel.

## Contenido que no se publica todavía

Todo lo marcado `PENDIENTE_VALIDACION` y la lista `docs/PENDIENTES_CONTENIDO.md` (C03–C16, C19, C22, etc.).

## Bloqueos que sí requieren a una persona

1. Importar el repo en **Vercel** (un clic; root del proyecto `site/` o usar `vercel.json` de la raíz) **o** activar **GitHub Pages** (Settings → Pages → GitHub Actions) para un hostname estable. Sin token de PaaS en este entorno no puedo crear el proyecto en Vercel yo mismo.
2. Rotar la clave FTPS que circuló en el chat y enjaular esa cuenta.
3. Autorizar el plan de limpieza de `/legal/` **con backup**, si va a tocar producción.
4. Validar copy, logos, partners, cifras, correo canónico, WhatsApp, RNC y dirección.
5. Cutover DNS / sustituir www.

Nada de lo anterior detiene el desarrollo en Git.
