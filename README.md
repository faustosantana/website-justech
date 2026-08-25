# website-justech

Repositorio de la presencia digital corporativa de **Justech SRL** (`https://www.justech.do`).

Este repositorio partió vacío. La producción actual vive en WordPress (tema Teba) en BanaHosting y **no se modificará** desde aquí hasta autorización expresa.

## Estado del proyecto

| Fase | Nombre | Estado |
| --- | --- | --- |
| A | Descubrimiento | Hecha — `docs/fase-a/` |
| B | Estrategia | Hecha — `docs/fase-b/` |
| C | Design system + preview | Base aprobada; refinada a tono enterprise |
| D | Desarrollo del sitio nuevo | Home premium; nav pública solo con oferta confirmada |
| E | Validación | Lighthouse a11y/perf 1.00 — `docs/fase-c/pruebas.md` |
| F | Lanzamiento | Bloqueado a autorización |

## Incidente P0 (producción)

El 21 de agosto de 2026 la URL `https://www.justech.do/legal/` servía contenido ajeno de apuestas (OK88 / Plaza IT). Las demás políticas legales del 13/07/2026 siguen respondiendo contenido de Justech.

**Expediente:** `docs/incidentes/2026-08-21-legal/` — evidencia pública, plan de limpieza **no ejecutado** (falta acceso + autorización). No hay credenciales en este repositorio.

## Sitio nuevo (staging)

Código en `site/` (Next.js 15, export estático). No toca WordPress.

- `npm --prefix site run build && npm --prefix site run test:staging`
- Preview: `docs/fase-c/preview.md` y `docs/ESTADO.md`
- Durable: Vercel (`vercel.json` en la raíz), GitHub Pages (Actions) o Cloudflare Pages (`site/wrangler.toml`)

## Cómo leer este repo

- `site/` — aplicación Next.js del sitio nuevo
- `docs/fase-a/` — evidencia de auditoría de solo lectura
- `docs/fase-b/` — IA, SEO, conversiones y plan de staging (FTP actual no es jaula)
- `docs/ESTADO.md` — tablero de fases, preview y bloqueos reales
- `docs/PENDIENTES_CONTENIDO.md` — información que falta para publicar sin inventar
- `docs/DECISIONES.md` — supuestos y decisiones arquitectónicas
- `docs/CHANGELOG.md` — bitácora del trabajo

## Reglas

- No tocar producción sin autorización.
- No publicar certificaciones, clientes, partners ni cifras no validados.
- Contenido provisional en staging: marcar `PENDIENTE_VALIDACION`.
