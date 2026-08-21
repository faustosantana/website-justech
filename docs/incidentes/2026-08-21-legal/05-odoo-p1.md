# P1 — Selector público de bases Odoo (`soporte.justech.do`)

**Fuera de la intervención WordPress.** No se modifica Odoo, nginx ni DNS de soporte en este incidente.

## Hecho observado (2026-08-21)

- `soporte.justech.do` **no** está en BanaHosting. Resuelve vía `justgroup.app` a **`31.97.6.178`**.  
- `www.justech.do` está en **`50.31.188.22`**.  
- La cadena es: `/` → `/odoo` → **`/web/database/selector`** (200).  
- La UI ofrece crear/restaurar base aunque el texto diga que el database manager está deshabilitado.  
- Cookie `session_id` HttpOnly.

Limpiar `/legal/` **no** oculta este selector.

## Trabajo futuro (cuando se autorice, en el host de Odoo)

1. En nginx del host `31.97.6.178`: no servir `/web/database/selector` al mundo; allowlist VPN/IP de Justech.  
2. Confirmar `list_db = False` (o equivalente de la versión) en la config de Odoo.  
3. Front de login de **tickets** con marca Justech, no el selector.  
4. No mover el subdominio ni el MX.

Hasta esa autorización: solo este recordatorio.
