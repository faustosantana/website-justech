# Preview de staging

El sitio nuevo se construye en Git (`site/`). **Producción no se toca.**

## URL navegable ahora (V6)

Túnel Cloudflare (HTTPS, vive mientras el agente/preview local esté activo):

https://moderators-road-awards-boot.trycloudflare.com/

Comprobado 2026-08-21: home 200, `noindex`, `robots.txt` Disallow `/`, `/redes/` y `/productos/laptops/` 200.

Comprobado: home 200, `lang=es-DO`, banner de pruebas, `noindex`, `robots.txt` Disallow, `/legal/` es índice Justech (no OK88).

**No es un hostname permanente.** Si deja de resolver, `npm --prefix site run build` y servir `site/out`.

## URL durable (sin DNS de justech.do)

1. **Vercel (preferida)**  
   Importar `faustosantana/website-justech`. El `vercel.json` de la raíz instala y construye `site/`. Activar Protection si desea clave HTTP. Headers: noindex + CSP.

2. **GitHub Pages**  
   Workflow `.github/workflows/pages.yml` despliega el export con `basePath=/website-justech`.  
   URL esperada: `https://faustosantana.github.io/website-justech/`  
   Confirmado: el token de GitHub Actions recibe **403** al crear el sitio Pages. Hace falta un clic de propietario: [Settings → Pages](https://github.com/faustosantana/website-justech/settings/pages) → Source = **GitHub Actions**. No cambia DNS de justech.do. Hasta entonces el workflow construye el artefacto y omite el deploy para no dejar el PR en rojo.

3. **Cloudflare Pages**  
   Root `site`, comando `npm run build`, output `out`. `wrangler.toml` de referencia en `site/`.

4. **FTPS `/staging.justech.do/`**  
   No usado: la cuenta actual ve `public_html`. Sin DNS el directorio no sería público. No se escribe en el hosting.

## Controles de staging

| Control | Estado |
| --- | --- |
| HTTPS | Sí (túnel / PaaS) |
| `noindex, nofollow` | Meta + `X-Robots-Tag` |
| `robots.txt` `Disallow: /` | Sí |
| Analytics / Ads / Pixel prod | No cargan |
| Formularios | `preventDefault`, sin POST |
| Banner de pruebas | Sí |
| Secretos | No hay en el repo |
| Auth de preview | Disponible en Vercel Protection; no en el túnel ni en Pages gratuito |
