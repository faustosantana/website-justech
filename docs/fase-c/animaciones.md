# Inventario de animaciones (v2)

Todas usan `transform` / `opacity` o canvas 2D. `prefers-reduced-motion: reduce` las anula.

| ID | Dónde | Qué hace | Fallback |
| --- | --- | --- | --- |
| A1 | Hero canvas | Paquetes recorren aristas de la red (infra, nube, usuarios, datos, seguridad, operación, soporte) | SVG estático; canvas no se inicia |
| A2 | Hero nodos | Pulso suave de radio/opacidad | Estático |
| A3 | Scroll | `.reveal` aparece una vez al entrar en viewport | Visible de inmediato |
| A4 | Botones | Traslación 1px al hover | Instantáneo |
| A5 | Mega menú | Apertura/cierre (display + Escape) | N/A |
| A6 | Pestañas de soluciones | Cambio de panel, flechas de teclado | Contenido estático del panel activo |
| A7 | Ticket UI | Ninguna loop; es una interfaz simulada | Estático |

No hay parallax agresivo, cursor custom, vídeo autoplay ni Three.js.

## Rendimiento

- Canvas se pausa fuera de viewport (`IntersectionObserver`).
- DPR limitado a 1.75.
- Home First Load JS ~131 kB (build Next 15).
- Escena no se carga si el usuario pide menos movimiento.
