# Fase C — Design system (v1)

Implementado en `site/` y visible en el preview. No es un tema WordPress.

## Intención

Integrador enterprise editorial: papel cálido (`#f6f3ec`), marino (`#071525`), teal accesible (`#0e7c88`). Evita vitrina de PCs, hologramas y sliders.

## Tokens

| Token | Valor | Uso |
| --- | --- | --- |
| Navy | `#071525` | Header bandas, footer, hero |
| Teal | `#0e7c88` | CTA, enlaces (contraste sobre blanco) |
| Teal bright | `#3ec4d0` | Acentos sobre navy |
| Paper / foam | `#f6f3ec` / `#fbfaf7` | Fondos |
| Ink / muted | `#1a2430` / `#4b5563` | Texto |
| Focus | 3px teal | `:focus-visible` |

Tipografía: IBM Plex Sans (next/font, subset latin, `display: swap`). Escala de títulos con tracking negativo.

Espaciado: container 1120px; secciones `py-16`; botones min-height 48px.

Breakpoints: Tailwind defaults; mega menú desde `lg`.

## Componentes

Skip link, banner staging, header + mega (hover/focus-within), cards, botones primary/ghost, flags `PENDIENTE_VALIDACION`, formulario simulado, page hero, legal article, footer, 404.

## Wireframe home (ya en código)

1. Banner staging  
2. Nav  
3. Hero + 2 CTA + señales 2018  
4. Soluciones publicadas + bloque C14  
5. Metodología 01–05  
6. Lista de servicios  
7. Valores  
8. Un testimonio marcado pendiente  
9. Sin logos de clientes  
10. CTA final  
11. Footer legal  

## Motion

Sin sliders. `prefers-reduced-motion` anula transiciones.
