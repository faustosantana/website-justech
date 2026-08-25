# Incidente P0 — `/legal/` comprometida

**Estado:** diagnóstico público de solo lectura completado. **Sin cambios en producción.** Limpieza **bloqueada** hasta (1) acceso seguro y (2) autorización expresa del plan de la sección 4.

**Fecha de detección:** 2026-08-21  
**URL afectada:** `https://www.justech.do/legal/`  
**Propietario informado por este canal:** no pegar contraseñas aquí.

| Documento | Contenido |
| --- | --- |
| [01-acceso-seguro.md](01-acceso-seguro.md) | Qué acceso hace falta y cómo entregarlo **sin** credenciales en Git ni en el chat |
| [02-evidencia-publica.md](02-evidencia-publica.md) | Captura pública (headers, hashes, IOCs, UA) |
| [03-diagnostico-preliminar.md](03-diagnostico-preliminar.md) | Hipótesis de alcance; qué falta ver en el servidor |
| [04-plan-limpieza.md](04-plan-limpieza.md) | Plan exacto — **no ejecutar** hasta autorización |
| [05-odoo-p1.md](05-odoo-p1.md) | Tarea aparte: selector de bases Odoo — **no se modifica ahora** |
| [06-correo-dns.md](06-correo-dns.md) | Por qué esta intervención **no** toca MX/SPF/DKIM/DMARC |

Capturas brutas (HTML del spam, JSON de API) se guardaron solo en el entorno del agente (`/tmp`), **fuera del repositorio**.
