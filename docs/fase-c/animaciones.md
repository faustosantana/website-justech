# Inventario de animaciones (v3)

Canvas 2D propio. Pausa fuera de viewport y en pestaña oculta. `prefers-reduced-motion` = fotograma completo, sin tránsito.

| ID | Dónde | Gramática | Fallback |
| --- | --- | --- | --- |
| H1 | Hero home | Historia 5.2s: infra → red → software → seguridad → monitoreo | Escena estática |
| H2 | Hero | Paralaje leve al puntero (≤10px) | Sin desplazamiento |
| S1 | Sistema de capas | Cambio de escena al seleccionar | Panel de texto |
| N1 | Redes | Tráfico entre sede/sucursales | Topología fija |
| C1 | Seguridad | Capas + aislamiento de un evento | Anillos estáticos |
| L1 | Licencias | Asignación depto → tenant | Diagrama fijo |
| P1 | Soporte | Flujo Usuario→Cierre | Pasos estáticos |
| K1 | Cableado | Construcción por 12 pasos | Plano + rack |
| M1 | MSP | Barras de higiene | Tablero estático |
| U1 | Nube | Sincronía local↔nube | Dos nodos fijos |
| R1 | CTA | Hover 1px | Instantáneo |

No hay sonido. No hay cursor que reemplace al del sistema. No hay Three.js (peso y genericidad).
