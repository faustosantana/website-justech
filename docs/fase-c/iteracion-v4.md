# Iteración v4 — unificación visual

No es el sitio final. Es el corte que elimina la brecha entre portada y fichas.

## URL

Staging: export estático en `site/out`. Preview por túnel/Pages cuando el owner lo habilite. Producción `www.justech.do` no se toca.

## Qué cambia vs v3

- Cinco familias de hero (`Stage`): panorámico, capas, interfaz, objeto, proceso. El canvas **ya no se monta encima del titular** en las familias split.
- Logo: wordmark oficial `justech-logo.png` sobre chip de papel. El isotipo de circuito `justech-mark-white.png` permanece en el footer (activo existente, no un monograma nuevo).
- Home: copy en zona segura (glass), nodos del canvas a la derecha, narrativa por beats, **un canvas** en el hero + uno en el sistema.
- Diez páginas prioritarias con demostración viva.
- Tokens semánticos de color, anti-solape por grid, transiciones `seq-bridge`.
- Playwright: overflow, solape H1/visual, IDs duplicados, controles táctiles, axe AA.

## Inventario de experiencias

| Ruta | Familia | Demo viva |
| --- | --- | --- |
| `/` | Panorámico | Beats 1–7 + malla a la derecha |
| `/redes/` | Capas | Topología explorable, caída, LAN/WAN |
| `/seguridad/` | Capas | 10 capas + microhistoria |
| `/licenciamiento/` | Proceso | Organización + configurador |
| `/soporte/` | Interfaz | Consola de ticket + stepper |
| `/servicios/servicios-administrados/` | Interfaz | Centro de operaciones |
| `/infraestructura-fisica/` | Proceso | Plano, 12 pasos, antes/después |
| `/productos/laptops/` | Objeto | Laptop reconocible + perfiles + wizard |
| `/productos/servidores/` | Objeto | Rack por carga |
| `/nube/` | Proceso | Oleada de migración |

## Inventario de animación

- Canvas 2D por escena, pausado fuera de viewport y con `document.hidden`.
- Reduced-motion: un frame estático.
- Fallback SVG bajo el canvas.
- Un foco dominante por viewport (beats, paquete de red, ticket, ciclo MSP).
- Sin Three.js, sin video de fondo, sin partículas genéricas.

## QA de laboratorio (este corte)

| | Desktop home (`--preset=desktop`) | Mobile home (emulación Lighthouse) |
| --- | --- | --- |
| Performance | 100 | ~90 (LCP foto hero) |
| Accessibility | 100 | 100 |
| Best practices | 100 | — |
| SEO | 69 (`noindex`, correcto) | 69 |
| LCP | 0.7 s | ~3.3 s render delay de `city-mesh.webp` |
| CLS | 0 | 0 |

- Playwright **11/11**. axe AA serious = 0. Staging 146 HTML, banner, robots Disallow.
- First Load JS home: **136 kB**. Canvas 2D; cero WebGL.

- El long-tail `[slug]` sigue siendo ficha. No se expandieron rutas nuevas.
- LCP móvil de laboratorio puede seguir por encima de 2.5 s por `city-mesh.webp`.
- Sin foto de obra real ni modelos cotizados.
- Wordmark PNG; falta SVG limpio aprobado.
- GitHub Pages 404 hasta que el owner habilite Actions.
- V4 no se declara terminada solo porque compile.
