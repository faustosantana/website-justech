# Pruebas — iteración v2 (2026-08-21)

Objetivo: `site/out` en `http://127.0.0.1:4173`. Chrome headless.

## Automatizado

`npm --prefix site run lint` · `build` · `test:staging`

140 HTML, banner y `noindex` en todas, `robots` Disallow:/, sin GA/GTM/Pixel, sin OK88, sin etiquetas internas.

## Lighthouse (home)

| Formato | Perf. | A11y | Best practices | SEO | Peso transferido |
| --- | --- | --- | --- | --- | --- |
| Desktop | 100 | 100 (tras min-height en tel/mail del footer; medición previa 97) | 100 | 69 | 307 KiB |
| Mobile | 100 | 97→corregido mismo target-size | — | 69 | 271 KiB |

SEO 69: `is-crawlable` falla por `noindex` (correcto en staging). LCP/FCP ~0.1 s en laboratorio sin throttling de red; CLS 0.

First Load JS home: 131 kB (build Next).

## Capturas

`docs/fase-c/captures/` y `/opt/cursor/artifacts/screenshots/`

- `justech-home-desktop.png` (1440×900) — dos filas de nav, sin botón Menú
- `justech-home-tablet.png` (768×1024) — Menú compacto, red como atmósfera
- `justech-home-mobile.png` (390×844) — hero con diagrama de fondo, no columna apilada

## Notas

Sin Safari/Firefox reales. Formularios sin POST. Producción no se tocó. Túnel: `https://buf-courage-glossary-designation.trycloudflare.com/` (efímero).
