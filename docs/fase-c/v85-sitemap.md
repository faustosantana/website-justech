# V8.5 — Sitemap propuesto y corte a producción

Staging permanece en `/concepto-v8/`. `www.justech.do` no se toca. `noindex` y `robots Disallow: /` siguen activos.

## Rutas V8.5 construidas (staging)

| Staging | Intención |
| --- | --- |
| `/concepto-v8/` | Home integradora |
| `/concepto-v8/cableado-estructurado/` | Cableado estructurado |
| `/concepto-v8/redes-empresariales/` | Redes empresariales |
| `/concepto-v8/equipos-empresariales/` | Equipos y puestos |
| `/concepto-v8/licenciamiento/` | Licenciamiento y productividad |
| `/concepto-v8/soporte-tecnico-empresarial/` | Soporte empresarial |
| `/concepto-v8/contacto/` | Contacto / cotización |
| `/concepto-v8/solicitar-cotizacion/` | Conversión cotización |
| `/concepto-v8/solicitar-levantamiento/` | Conversión levantamiento |
| `/concepto-v8/solicitar-diagnostico/` | Conversión diagnóstico |
| `/concepto-v8/solicitar-soporte/` | Conversión soporte |
| `/concepto-v8/recursos/` | Índice de guías |
| `/concepto-v8/recursos/cableado/` | Guía de entrega de cableado |
| `/concepto-v8/recursos/wifi/` | Guía de Wi-Fi |
| `/concepto-v8/recursos/equipos/` | Guía de renovación |
| `/concepto-v8/l/{campaign}/` | Landings SEM inactivas |

## Mapa de producción (no activado)

| Producción | Notas |
| --- | --- |
| `/` | Sustituye la home actual en un corte posterior |
| `/soluciones/` `/servicios/` `/productos/` `/industrias/` `/recursos/` `/nosotros/` `/contacto/` | Pilares |
| `/servicios/cableado-estructurado/` | Prioritario |
| `/servicios/fibra-optica/` | Aún no construido |
| `/servicios/redes-empresariales/` | Prioritario |
| `/servicios/wifi-empresarial/` | Aún no construido como URL propia |
| `/servicios/soporte-tecnico-empresarial/` | Prioritario |
| `/servicios/servicios-administrados/` | Existe en el sitio viejo; no reescrito en V8.5 |
| `/servicios/licenciamiento/` | Prioritario |
| `/servicios/migracion/` `/servicios/seguridad/` `/servicios/nube/` | Pendientes |
| `/productos/laptops-empresariales/` etc. | Pendientes salvo la página de equipos V8.5 |
| `/soluciones/nueva-sede/` `/soluciones/renovacion-tecnologica/` `/soluciones/continuidad-operativa/` | Pendientes |
| `/solicitar-cotizacion/` `/l/cableado-estructurado/` | Preparados bajo `/concepto-v8/` |

## Controles del corte

1. Quitar `noindex`.
2. `robots.txt` Allow y Sitemap de producción.
3. Canonical al dominio público.
4. Publicar sitemap en Search Console.
5. Encender analítica (`ANALYTICS_ENABLED`) con IDs de producción, no los del incidente `/legal/`.
6. Activar redirecciones documentadas.
7. Formularios reales (hoy simulados).

## Redirecciones a documentar después

| Origen probable (WP / sitio actual) | Destino propuesto |
| --- | --- |
| `/infraestructura-fisica/` y cableado legado | `/servicios/cableado-estructurado/` |
| `/redes/` | `/servicios/redes-empresariales/` |
| `/licenciamiento/` | `/servicios/licenciamiento/` |
| `/soporte/` | `/servicios/soporte-tecnico-empresarial/` |
| `/concepto-v8/` | `/` (solo cuando V8.5 sustituya) |

No aplicar estas redirecciones en staging.
