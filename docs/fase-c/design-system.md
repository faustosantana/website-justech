# Fase C — Design system (v1)

Implementado en `site/` y visible en el preview. No es un tema WordPress.

## Intención

Integrador enterprise editorial: papel cálido (`#f6f3ec`), marino (`#071525`), teal accesible (`#0a5c64`). Evita vitrina de PCs, hologramas y sliders.

## Tokens

| Token | Valor | Uso |
| --- | --- | --- |
| Navy | `#071525` | Header bandas, footer, hero |
| Teal | `#0a5c64` | CTA, enlaces, eyebrows sobre papel (≥4.5:1) |
| Teal bright | `#3ec4d0` | Acentos sobre navy |
| Paper / foam | `#f6f3ec` / `#fbfaf7` | Fondos |
| Ink / muted | `#1a2430` / `#4b5563` | Texto |
| Focus | 3px teal | `:focus-visible` |

Tipografía: IBM Plex Sans (next/font, subset latin, `display: swap`). Escala de títulos con tracking negativo.

Espaciado: container 1160px; secciones ~5rem; botones min-height 48px. Radios 2–4px. Sombras `--shadow` / `--shadow-lg`. Motion 400ms, anulado con `prefers-reduced-motion`.

Breakpoints: mega menú y nav completa desde 1024px. El botón Menú usa `.nav-toggle` (no `.btn`) para no pisar `display`.

## Componentes

Skip link, banner de previsualización, header con mega (Escape, aria-expanded, cierre al cambiar de ruta), Contacto/Soporte diferenciados, cards, botones, iconografía lineal, hero canvas, formulario simulado, breadcrumbs, TrustSlots desactivados (`GATES`), page hero, legal, footer, 404.

## Wireframe home (ya en código)

1. Banner de previsualización  
2. Nav (solo oferta confirmada)  
3. Hero + composición SVG + hechos 2018 / Santo Domingo / N1–N3  
4. Resultados (01–04)  
5. Capacidades y servicios confirmados  
6. Metodología 01–05  
7. Escenarios empresariales  
8. Plataformas (nombres, sin logos)  
9. Soporte / portal  
10. Valores  
11. CTA  
12. Footer institucional  

10. CTA final  
11. Footer legal  

## Motion

Sin sliders. `prefers-reduced-motion` anula transiciones.
