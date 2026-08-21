# website-justech

Repositorio de la presencia digital corporativa de **Justech SRL** (`https://www.justech.do`).

Este repositorio partió vacío. La producción actual vive en WordPress (tema Teba) en BanaHosting y **no se modificará** desde aquí hasta autorización expresa.

## Estado del proyecto

| Fase | Nombre | Estado |
| --- | --- | --- |
| A | Descubrimiento | Hecha — `docs/fase-a/` |
| B | Estrategia | Hecha — `docs/fase-b/` |
| C | Design system + preview | En curso — `docs/fase-c/` y `site/` |
| D | Desarrollo del sitio nuevo | En curso en `site/` (staging) |
| E | Validación | Parcial (build + lint) |
| F | Lanzamiento | Bloqueado a autorización |

## Incidente P0 (producción)

El 21 de agosto de 2026 la URL `https://www.justech.do/legal/` servía contenido ajeno de apuestas (OK88 / Plaza IT). Las demás políticas legales del 13/07/2026 siguen respondiendo contenido de Justech.

**Expediente:** `docs/incidentes/2026-08-21-legal/` — evidencia pública, plan de limpieza **no ejecutado** (falta acceso + autorización). No hay credenciales en este repositorio.

## Sitio nuevo (staging)

Código en `site/` (Next.js 15, export estático). No toca WordPress.

- `npm --prefix site run build`
- Preview temporal (túnel): ver `docs/fase-c/preview.md`
- Durable: importar este repo en Vercel (root `site/`) o Cloudflare Pages (`site`, `npm run build`, output `out`)

## Cómo leer este repo

- `site/` — aplicación Next.js del sitio nuevo
- `docs/fase-a/` — evidencia de auditoría de solo lectura
- `docs/fase-b/` — IA, SEO, conversiones y plan de staging (FTP actual no es jaula)
- `docs/PENDIENTES_CONTENIDO.md` — información que falta para publicar sin inventar
- `docs/DECISIONES.md` — supuestos y decisiones arquitectónicas
- `docs/CHANGELOG.md` — bitácora del trabajo

## Reglas

- No tocar producción sin autorización.
- No publicar certificaciones, clientes, partners ni cifras no validados.
- Contenido provisional en staging: marcar `PENDIENTE_VALIDACION`.
