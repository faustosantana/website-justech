# Superposiciones y QA visual — v4

## Corregido

| Página | Problema v3 | Estado v4 |
| --- | --- | --- |
| `/productos/laptops/` | Canvas/rack absoluto sobre el H1 | Grid objeto: copy \| `.stage-visual` laptop. Playwright: sin solape a 1440×900 |
| `/seguridad/` | Hero navy vacío | Capas concéntricas + 10 capas seleccionables |
| `/licenciamiento/` | Hero vacío, texto | Organización + configurador |
| `/soporte/` | Hero vacío | Consola de ticket en el hero |
| `/infraestructura-fisica/` | Hero vacío | Plano / 12 pasos / antes-después |
| `/redes/` | Misma ciudad que la home | Topología propia (sede, sucursales, APs, nube) |
| Home | Copy sobre foto oscura | Glass `.copy-safe`, nodos a la derecha |

## Detecciones automáticas (Playwright 11/11)

- Overflow horizontal 390 / 768 / 1440: 0
- H1 único por insignia
- Solape H1 vs `.stage-visual` en las 9 split: 0
- IDs duplicados: 0
- Errores de consola: 0
- Controles táctiles ≥ 40 px
- axe WCAG A/AA serious/critical: 0 (diez insignia + resolver)
- Reduced-motion: canvas visible
- Sin WebGL

## Pendiente de inspección humana

- Matriz completa 14 viewports (laboratorio cubrió 390, 768, 1440 y móvil selecto).
- Zoom 200% y texto aumentado.
- LCP móvil (foto `city-mesh.webp`).
- Long-tail `[slug]` sigue ficha.
