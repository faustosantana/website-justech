# Plan de fases y puntos de aprobación

Cumple la sección 19 del mandato: no hay componentes de UI en esta entrega.

## Fase A — Descubrimiento (esta entrega)

**Objetivo:** evidencia, no código de sitio.  
**Archivos:** `docs/**`  
**Riesgo:** ninguno sobre producción.  
**Rollback:** `git revert` de esta rama.

**Criterio de salida:** Gerencia leyó el resumen, el P0 de `/legal/`, y aprueba o rechaza D01 (rebuild).

## Fase B — Estrategia (siguiente, ~documentos)

**Objetivo:** sitemap objetivo, mapa SEO/keywords RD, rutas de conversión, plan de redirecciones, KPIs, personas.  
**No incluye:** CSS/React.  
**Aprobación:** sitemap y slugs legales (conservar vs. anidar bajo `/legal/`).

## Fase C — Diseño

**Objetivo:** design system (color marino/turquesa accesible, tipo, grid, componentes) + wireframes home, solución, servicio, industria, contacto, legal.  
**Aprobación:** dirección visual **antes** de desarrollo completo.  
**Riesgo:** empezar a codear sin aprobación viola el mandato §17.C.

## Fase D — Desarrollo (staging)

**Objetivo:** Next.js en este repo, preview noindex, contenido marcado `PENDIENTE_VALIDACION` donde falte.  
**Integraciones:** form → correo/Odoo, GTM en staging, cabeceras.  
**Riesgo:** filtrar preview a índice — mitigar `robots` + auth.  
**Rollback:** no hay DNS aún.

## Fase E — Validación

Lighthouse, teclado, axe, JSON-LD, sitemap, eventos debug, lista de contenidos pendientes.  
**No** se declara “SEO 100 %” ni posiciones.

## Fase F — Lanzamiento

Backup WP final, 301, DNS, verificación post, monitoreo 30/60/90.  
**Autorización expresa** para tocar producción.

---

## Información imprescindible que falta (bloquea diseño fiel)

Ver `docs/PENDIENTES_CONTENIDO.md`. Mínimo para un home honesto:

1. C01–C02 incidente y backups  
2. C03–C06 contactos y RNC/dirección  
3. C14 qué soluciones son reales  
4. C08–C10 partners/clientes/testimonios  
5. C13 cifras (o la decisión de no usar cifras)

## Comandos de solo lectura previstos si continúa la auditoría

```
# Search Console / CrUX — requieren acceso de marketing (no disponible aquí)
# PSI
# nvm: Lighthouse CI contra preview, nunca contra un exploit
curl -sI https://www.justech.do/documentos-legales/*.pdf
```

Acceso útil a pedir: wp-admin (solo lectura), export XML, GA4, GSC, panel BanaHosting, confirmación comercial C07–C15.
