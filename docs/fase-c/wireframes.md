# Wireframes v1 (Fase C)

Traducidos a código en `site/`. No hay Figma en este repo; la fuente de verdad es el preview.

## Home (`/`)

```
[banner staging]
[logo] [Soluciones] [Servicios] [Nosotros] [Recursos] [Contacto] [Soporte] [CTA]
------------------------------------------------------------
HERO navy                         | Señales 2018 / portal / sin cifras
H1 + lead + 2 botones             |
------------------------------------------------------------
3 tarjetas oferta publicada + 1 bloque C14
------------------------------------------------------------
Metodología 01–05
------------------------------------------------------------
Lista servicios (Disponible | Pendiente)
------------------------------------------------------------
Valores (5)
------------------------------------------------------------
1 testimonio marcado pendiente — sin logos de clientes
------------------------------------------------------------
CTA banda navy
[footer 4 cols + legales]
```

## Interior de oferta (solución/servicio publicada)

```
Hero (eyebrow, H1, lead)
Prosa: para qué existe / límites (no partner) / siguiente paso
CTA banda
```

## Interior pendiente (D)

Igual, con flag `PENDIENTE_VALIDACION · copy y alcance` y prosa que no vende la línea.

## Contacto

```
Hero
Formulario simulado | datos verificados (tel, mail, portal)
```

## Legal

Índice propio. Artículos con aviso: enlace a la URL auténtica de producción **excepto** `/legal/`.

## Móvil (< lg)

Menú botón → `<details>` por Soluciones / Servicios / Nosotros + contacto + legal + portal.
CTA del header oculto; el del hero permanece.

## Breakpoints

- Base: 1 columna, container `min(1120px, 100% - 2rem)`
- 720px: grids 2 col
- 1024px+: mega menú y grids 3 col
