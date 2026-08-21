# Fase C — Design system (v2)

Justech no usa un tema WordPress. El sistema vive en `site/src/app/globals.css` y componentes React.

## Concepto

**La red que sostiene el negocio.** Profundidad cinematográfica sobre navy, lectura larga sobre papel, acentos teal con trazas signal. Titulares en IBM Plex Serif; cuerpo en IBM Plex Sans.

## Tokens

| Token | Valor | Rol |
| --- | --- | --- |
| Navy | `#050d18` | Hero, header inferior, footer |
| Navy mid | `#0c2340` | Bandas y paneles |
| Teal | `#0a5c64` | CTA y enlaces sobre papel (≥4.5:1) |
| Signal | `#5eead4` | Nodos y trazas sobre navy |
| Paper / foam | `#f3eee4` / `#f7f4ee` | Lectura |
| Ink / muted | `#121820` / `#4b5563` | Texto |
| Focus | 3px `#0e7c88` | Teclado |

Radios 2–4px. Container 1240px. Botones min-height 48px. Motion 500–900ms en transform/opacity.

## Layout de chrome

Escritorio (≥1024px): **dos filas** — utilidad (logo, teléfono, soporte, asesoría) + navegación completa. El botón «Menú» usa `.nav-toggle` y está `display: none !important` en ese breakpoint.

Móvil: cabecera compacta + panel; el hero usa el diagrama como atmósfera, no como columna apilada.

## Qué no es este sistema

Plantilla de tarjetas, landing SaaS, minimalismo vacío, parallax agresivo, cursor custom, vídeo autoplay, partnership inventado.
