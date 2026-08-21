# Pruebas técnicas (staging)

Fecha: 2026-08-21. Objetivo: `site/out` servido en `http://127.0.0.1:4173`. Chrome headless.

## Automatizado

```bash
npm --prefix site run lint
npm --prefix site run build
npm --prefix site run test:staging
```

`test:staging` exige: `robots.txt` Disallow:/, banner de pruebas y `noindex` en todo HTML, ausencia de GA4/GTM/Pixel de producción, de `G-0LSM1YJSPZ`/OK88, y de canónicas hacia `www.justech.do`.

## Lighthouse 12 (local)

| Página | Formato | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | desktop | 1.00 | 1.00 | 1.00 | 0.69 |
| `/` | mobile 375 | 0.99 | 1.00 | — | 0.69 |
| `/contacto/` | desktop | — | 1.00 | — | 0.69 |

El SEO no llega a 1.00 **a propósito**: `is-crawlable` falla por `noindex` + robots Disallow. Correcto en staging.

## Manual rápido

- Home, menú lg y menú móvil (`<details>`).
- `/legal/` es índice Justech, no apuestas.
- Contacto: submit no sale de la página; mensaje de simulación.
- Sin scripts a `googletagmanager.com` ni `connect.facebook.net`.
