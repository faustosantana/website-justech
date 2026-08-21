# Concepto creativo v3 — Justech

**Justech — la capa tecnológica que mantiene el negocio en movimiento.**

No es un catálogo de oficios. Es el hilo que conecta personas, sitios, dispositivos, redes, infraestructura, software, seguridad, datos y soporte.

## Titular del hero (evaluación)

| Candidata | Claridad | Fuerza | Diferencia | Credibilidad | Recordación | Relación con la escena |
| --- | --- | --- | --- | --- | --- | --- |
| La tecnología detrás de una operación que no se detiene | Alta | Alta | Media | Alta | Alta | Alta |
| Todo lo que su empresa necesita… | Media | Baja | Baja | Media | Baja | Baja (catálogo) |
| Infraestructura, software y soporte. Una operación conectada | Alta | Media | Media | Alta | Media | Alta |
| Diseñamos la tecnología que sostiene su negocio | Alta | Media | Baja | Alta | Media | Media |
| Del cable a la nube… | Alta | Alta | Alta | Alta | Alta | Alta (ciclo) |
| Conectamos cada capa de su operación | Alta | Media | Alta | Alta | Media | Máxima |
| **La capa que mantiene el negocio en movimiento** | Alta | Alta | Alta | Alta | Alta | Máxima |

**Elegida:** *La capa que mantiene el negocio en movimiento.*  
Apoyo (una frase): *Infraestructura, software y soporte, conectados y operados como un sistema.*  
CTA: Solicitar diagnóstico / Ver el sistema.

## Tipografía

Se retira IBM Plex Serif (sesgo de bufete/periódico).  

- Display: **Red Hat Display** (OFL, `next/font`, infraestructura sin copiar a Red Hat).  
- Cuerpo/UI: **IBM Plex Sans**.  
- Datos, tickets, etiquetas de diagrama: **IBM Plex Mono**.

## Motion (tokens)

Ver `site/src/visual/motion.ts`. Gramáticas: redes=tránsito; seguridad=capas; licencias=asignación; soporte=flujo; cloud=sincronía; cableado=construcción; servidores=aprovisionamiento.

## Tecnología de escena

Canvas 2D propio, no Three.js: menor JS, fallback SVG, pausa fuera de viewport y en pestaña oculta, `prefers-reduced-motion` = fotograma estático. El visitante debe ver la operación, no la librería.

## Assets

Fotografías generadas bajo dirección propia (rack, patch, malla urbana, mesa de operaciones, orden de gabinete). Sin logos. WebP en `site/public/visual/`.
