# V5 — Dirección creativa

Reset. La V4 no se maquilla: se sustituye el sistema.

## Concepto

**Una operación que se ve.** Justech diseña, implementa y opera tecnología empresarial. Cada pantalla enseña **una** capacidad con un objeto reconocible. El visitante concluye “esta gente sabe lo que hace”, no “esta página tiene muchas cosas”.

Idea central de la home (se mantiene):

> La capa que mantiene el negocio en movimiento.

Todo lo demás se subordina a esa frase. No hay un segundo sistema visual compitiendo.

## Diagnóstico V4 (qué se elimina, no se decora)

| Ruido | Decisión |
| --- | --- |
| Canvas de nodos y líneas como “producto” | Fuera de las 5 maestras |
| Pestañas de 8–10 opciones | Máximo 4 alternativas visibles |
| ProcessTrack como riel de palabras | Un paso a la vez, narrado |
| LayerSystem, NeedPicker, listas de problemas en home | Fuera |
| Hero split copy + wireframe en caja | Un objeto dominante, copy breve |
| Eyebrows + notas + métricas + 2 CTAs + trust row | Un CTA |
| Mega menú de 15 ítems | Intención, no inventario |
| Teal en todos los bordes y labels | Teal solo para foco, CTA y estado activo |
| Titulares construidos con “no” | Lenguaje positivo |
| Interfaces dentro de interfaces | Un lienzo |

## Referencias de calidad (no se copian)

Patrones, no layouts: presentaciones de producto enterprise (hardware consultivo), salas de operaciones discretas, topologías de campus documentadas, consolas de ITSM ordenadas. Nada de neón, nada de “hacker”, nada de dashboard saturado.

## Paleta refinada

| Token | Hex | Uso |
| --- | --- | --- |
| midnight | `#070b12` | Cine, home, objeto |
| infra | `#101826` | Superficies elevadas |
| graphite | `#2a3340` | Estructura, iconos |
| metal | `#8b97a3` | Secundario sobre oscuro (AA) |
| paper | `#f4f1ea` | Lectura |
| white | `#fbfaf7` | Superficie clara |
| ink | `#141a22` | Texto |
| teal | `#0a5c64` | CTA, seleccionado |
| cyan | `#5eead4` | **Solo** evento puntual (enlace activo, ticket en curso) |
| danger | `#8b1e2d` | Incidente, nunca permanente a pantalla completa |

El teal no recorre bordes. El cyan no es un color de marca; es un evento.

## Tipografía

- Display: Red Hat Display, `clamp(1.85rem, 4vw, 2.75rem)`, máximo 3 líneas.
- Cuerpo: IBM Plex Sans, 1.0625rem, measure 32–40ch.
- Técnico: IBM Plex Mono, 0.875rem, nunca como decoración ilegible.
- Labels: mínimo 0.8125rem. Sin tracking extremo.

## Grid

- Desktop: 12 columnas, max 1200px, gutter 24px, margen lateral `max(24px, (100vw-1200px)/2)`.
- Tablet: 8 columnas, gutter 20px.
- Móvil: 4 columnas, gutter 16px.
- Ritmo vertical: 8px base. Secciones 96–128px. Hero 100svh menos header.
- Zona segura de copy: columnas 1–5. Visual: 6–12. Nunca se cruzan.

## Tratamiento fotográfico / 3D

- Home: still cinematográfico de operación (sede, personas de espaldas o fuera de foco, infraestructura como contexto). Color grading frío, no HDR recargado.
- Laptop: render de producto, 3/4, aluminio, pantalla con UI empresarial sobria. Estudio oscuro, una luz key, bounce suave.
- Rack: isométrico o frontal 3/4, unidades reconocibles (patch, switch, server, UPS), sin marcas.
- Red: still de planta. Las vistas lógica/seguridad/multisucursal **anotan** esa misma foto. No se sustituye por cajas SVG.
- Licencias y soporte: HTML. No canvas.

## Estilo de interfaz

Consolas: una columna de contexto + un escenario. Fondo infra, texto paper, un acento teal. Densidad baja. 8–12px de radio máximo (casi nulo). Sin cards anidadas.

## Estilo de diagramas

Arriba: proveedor / nube. Centro: perímetro y core. Abajo: acceso y usuarios. Derecha: sucursal. Cada enlace termina en un puerto o en un nodo nombrado. Una vista a la vez.

## Motion

- 480–700ms, ease `cubic-bezier(0.22, 1, 0.36, 1)`.
- Un foco de movimiento por viewport.
- Pausa fuera de vista y `prefers-reduced-motion`.
- Home: la **misma** escena cambia de iluminación/capa al scroll (capítulos), no un componente nuevo por servicio.
- Laptop: crossfade de contexto + un atributo.
- Red: ensamblado secuencial 1→11, luego idle mínimo.
- Ticket: el caso avanza; no parpadea el dashboard.

## Densidad

Aire. Si un control no cambia la escena, no está. Progressive disclosure: seleccionado + ≤4 alternativas + resumen + CTA.

## Cinco experiencias maestras

1. **Home** — película de una escena, nueve capítulos de scroll.
2. **Redes** — topología real, 4 vistas.
3. **Laptops** — objeto premium, 5 perfiles, uno visible.
4. **Licenciamiento** — consola de tenant, flujo de asignación.
5. **Soporte** — un caso: sucursal sin conectividad.

Prototipos aislados (no se propagan): rack, seguridad, nube, cableado.

## Storyboard (home)

1. Empresa operando (still).
2. Aparece la planta (rack, canalización).
3. Entra el enlace y el core.
4. Encienden puestos y laptops.
5. Se asignan identidades y apps.
6. Se cierran las capas de seguridad (sin alarma).
7. Datos y nube al mismo ritmo.
8. Un caso de soporte se cierra en esquina, discreto.
9. La escena queda conectada. CTA.

## Storyboard (red)

Sede → ISP → firewall → core → acceso → APs → usuarios → servidor → nube → sucursal → redundancia.

## Copy (positivo)

| Página | H1 | CTA |
| --- | --- | --- |
| Home | La capa que mantiene el negocio en movimiento. | Solicitar diagnóstico |
| Redes | Redes diseñadas para crecer. | Pedir diagnóstico de red |
| Laptops | Equipos preparados para cada puesto. | Solicitar cotización |
| Licencias | Control sobre cada licencia. | Solicitar evaluación |
| Soporte | Soporte con trazabilidad de principio a fin. | Entrar al portal / Mesa de ayuda |

## Navegación

Una fila: marca, Capacidades (mega por intención), Productos, Soporte, Solicitar asesoría. Infraestructura vive en Capacidades. Recursos y Nosotros en un grupo “Empresa” del mega, no en la barra.

Intenciones del mega:

- Quiero mejorar
- Necesito implementar
- Necesito comprar
- Necesito soporte
- Quiero administrar

## Ejemplos aprobables

- Un laptop de producto con cinco atributos y un perfil activo.
- Una topología con siluetas de switch/firewall y un segmented control de 4.
- Un ticket con un usuario, un estado y un responsable.
- Home donde el ojo va primero al still, luego al H1, luego al botón.

## Qué no es V5

Wireframe con glow. Diez tabs. Dos diagramas. Estadísticas inventadas. Marcas. Precios. SOC 24/7. Tres.js en todas las páginas “porque se puede”. Lighthouse 100 a costa de la escena.
