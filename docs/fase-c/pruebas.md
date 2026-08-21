# Pruebas — iteración v3 (2026-08-21)

Objetivo: `site/out` en `http://127.0.0.1:4173`. Playwright Chromium + Lighthouse + axe-core.

## Automatizado

| Comando | Resultado |
| --- | --- |
| `npm --prefix site run lint` (en `next build`) | OK |
| `npm --prefix site run build` | 147 rutas, home First Load JS **134 kB** (shared 103 kB) |
| `npm --prefix site run test:staging` | 145 HTML, banner + `noindex` en todas, `robots` Disallow:/ |
| `npm --prefix site run test:e2e` | **6/6** passed |

Playwright cubre: un solo H1, ausencia de `PENDIENTE_VALIDACION`, seis insignia + `/resolver/`, teclado (skip link), `prefers-reduced-motion`, escenas **sin WebGL**, axe WCAG 2 A/AA (impact serious/critical = 0).

## Lighthouse (laboratorio, sin red de producción)

SEO 69: `is-crawlable` falla por `noindex` (correcto en staging).

| Página | Formato | Perf. | A11y | Best practices | SEO | Transfer | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Desktop | 100 | 100 | 100 | 69 | 527 KiB | 0.7 s | 0 | 0 |
| Home | Mobile (simulado Slow 4G) | 90 | 100 | 100 | 69 | 481 KiB | 3.6 s | 0 | — |
| `/redes/` | Desktop | 100 | 100 | 100 | 69 | 436 KiB | 0.7 s | 0 | 0 |

LCP = `img.cine-photo` (city-mesh.webp). En móvil el grueso del LCP es *render delay* bajo throttling, no el peso del WebP. El header navy unifica la primera pantalla (mejor dirección de arte; LCP de laboratorio móvil no es verde). Informes: `/opt/cursor/artifacts/lighthouse/`.

## Peso por experiencia

| Capa | Peso |
| --- | --- |
| JS inicial home (Next First Load) | 134 kB |
| JS transferido (Lighthouse desktop, gzip) | ~147 kB |
| Foto hero `city-mesh.webp` | 116 KB |
| Fotos de escena (5 WebP) | 62–116 KB c/u |
| Canvas 2D | en el chunk de página (~4–7 kB extra vs. fichas) |
| Three.js / WebGL / video | **0** |

Presupuesto: no se carga WebGL. Canvas pausa fuera de viewport y en pestaña oculta.

## Capturas y video

`docs/fase-c/captures/` y `/opt/cursor/artifacts/screenshots/` · `/opt/cursor/artifacts/videos/`

- Home desktop 1440×900, tablet 768×1024, móvil 390×844 (+ full page desktop)
- Insignia desktop: redes, seguridad, licenciamiento, soporte, MSP, cableado, resolver
- Recorrido desktop y móvil (mp4)
- Producción `www.justech.do` para comparación (si el fetch responde)

## Pruebas de experiencia

| Prueba | Resultado |
| --- | --- |
| Reduced-motion | H1 y canvas visibles; `t=0` / `story=1` (fotograma completo) |
| Sin WebGL | `getContext('webgl')` anulado; canvas 2D pinta; cero `pageerror` |
| Teclado | Primer Tab = «Saltar al contenido»; Enter lleva a `#contenido` |
| Consola | Cero `pageerror` en home (Playwright) |
| axe | Cero violaciones serious/critical en 8 rutas insignia |

## Notas

Sin Safari/Firefox reales. Formularios sin POST. Producción no se tocó. Túnel: `https://buf-courage-glossary-designation.trycloudflare.com/` (efímero). GitHub Pages sigue 404.
