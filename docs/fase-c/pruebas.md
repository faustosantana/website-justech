# Pruebas — iteración premium (2026-08-21)

Objetivo: `site/out` en `http://127.0.0.1:4173`. Chrome headless.

## Automatizado

`npm --prefix site run lint` · `build` · `test:staging`

Guardas: `robots.txt` Disallow:/, banner de previsualización, `noindex`, sin GA/GTM/Pixel, sin OK88, sin `PENDIENTE_VALIDACION` ni tono defensivo en HTML.

## Lighthouse

| Página | Formato | Perf. | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | desktop | 1.00 | 1.00 | 1.00 | 0.69 |
| `/` | mobile 390 | 0.99 | 1.00 | — | 0.69 |
| `/contacto/` | desktop | — | 1.00 | 1.00 | 0.69 |

SEO 0.69 porque `is-crawlable` falla por `noindex` (correcto en staging).

## Capturas

`docs/fase-c/captures/` y `/opt/cursor/artifacts/screenshots/`

- `justech-home-desktop.png` (1440×900)
- `justech-home-tablet.png` (768×1024)
- `justech-home-mobile.png` (390×844)

Desktop: menú hamburger ausente; Contacto y Soporte diferenciados.
Móvil: botón Menú visible.

## Notas

No se ejecutaron Safari/Firefox reales en este entorno (Linux + Chrome). Contraste AA verificado por Lighthouse. Formularios sin POST. Producción no se tocó.
