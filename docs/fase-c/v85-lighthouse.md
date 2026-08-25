# V8.5 — Lighthouse (local, `serve out` :4173)

Fecha: 2026-08-25. Ruta: `/concepto-v8/`. Staging con `noindex` (SEO no llega a 100).

## Desktop (`--preset=desktop`)

| Categoría | Score |
| --- | --- |
| Performance | 98 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 69 (noindex) |
| LCP | 0.7 s |
| CLS | 0.081 |

## Mobile (throttling simulado)

| Categoría | Score |
| --- | --- |
| Performance | 91 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 69 (noindex) |
| LCP | 3.4 s |
| CLS | 0.072 |

El LCP móvil permanece por encima de 2.5 s en throttling Lighthouse porque el titular va **antes** de la foto (claridad > 100). No se sacrifica el H1 para ganar décimas.

Axe WCAG A/AA en las 7 URLs V8.5: sin violaciones serious/critical. Enlaces internos de esas rutas: HTTP 200.
