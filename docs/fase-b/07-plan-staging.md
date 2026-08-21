# Plan de staging — alto: no publicar con el FTPS actual

**Fecha:** 2026-08-21  
**Acción en servidor:** ninguna. El usuario FTPS `cursor@…` **no está enjaulado**.

## 1. Resultado de la verificación FTPS (solo lectura)

| Pregunta | Respuesta |
| --- | --- |
| ¿Funciona FTPS explícito + TLS? | **Sí** (Pure-FTPd). El nombre `ftp.justechrd.com` **no resuelve**. Login correcto en `ftp.justech.do` / hostname BanaHosting. Certificado no coincide con `ftp.justech.do` (cifrado sí; verificación de hostname no). |
| ¿Directorio raíz del usuario? | **`/` = home de la cuenta cPanel**, no un subdirectorio de staging. |
| ¿Limitado a staging? | **No.** Ve `public_html`, `www`, `justech.do`, subdominios Justech, backups, correo, `.ssh`, logs y **addon domains de terceros**. |
| ¿Existe carpeta `staging` / `staging.justech.do`? | **No** en el listado raíz. |
| ¿Es seguro construir ahí en paralelo? | **No con esta cuenta.** Cualquier `STOR`/`DELE` puede tocar producción u otros sitios. |

**Parada obligatoria:** no se sube, borra ni crea nada por FTPS hasta que el usuario esté enjaulado a un directorio **fuera** de `public_html`.

No se documentan en Git nombres de clientes de addon ni rutas de `.ssh`. El propietario recibió el detalle en el chat del agente.

## 2. Cómo debe quedar el acceso (hacer en cPanel)

1. Crear (o recrear) un usuario FTP **solo** con raíz:
   - ` /home/<cuenta>/staging.justech.do/`  
   **o** el docroot que cPanel asigne al subdominio `staging.justech.do`.
2. Confirmar que un `NLST` de esa cuenta **no** muestra `public_html`.
3. Entregar el usuario jaulado por **secretos del agente**, no en el chat (la contraseña actual quedó en el transcript: **rotarla** al crear el usuario jaulado).
4. No reutilizar el usuario actual para despliegues.

## 3. Entorno de staging recomendado

Dos vías; la B evita el hosting compartido ya comprometido (`/legal/`).

### Vía A — subdominio en el mismo cPanel (si insisten en BanaHosting)

- Subdominio `staging.justech.do` → carpeta **nueva**, nunca `public_html`.
- TLS Let’s Encrypt del subdominio (cPanel SSL).
- HTTP Basic Auth (`.htpasswd` **solo** en esa carpeta).
- `robots.txt` `Disallow: /` y meta `noindex,nofollow` + `X-Robots-Tag`.
- Sin GA4/GTM/pixel de producción; sin formularios reales (mailto simulado o 204).
- Banner discreto: “Entorno de pruebas — no es el sitio público”.
- Publicación: GitHub Actions o script que haga FTPS **solo** al directorio jaulado (origen = este repo).

**Riesgo:** mismo servidor que el WP infectado; un FTP mal enjaulado vuelve a pisar producción.

### Vía B — preferida: preview desde Git (Vercel o Cloudflare Pages)

- Cada push a la rama de trabajo genera URL de preview.
- `staging.justech.do` como CNAME al preview **cuando** exista el registro DNS (**no** se crea en esta sesión).
- Auth de preview (Vercel Password Protection / CF Access).
- `NOINDEX` en `layout` + headers.
- Cero analítica de producción.
- Cutover futuro: otro proyecto/producción, 301, backup WP. El WP actual sigue en `public_html`.

El repositorio `faustosantana/website-justech` es la fuente. Nada “suelto” en el servidor que no esté en Git.

## 4. Qué no va a staging

- Contenido de `/legal/` comprometido, Plaza IT, OK88, `G-0LSM1YJSPZ`.
- Credenciales, `wp-config`, dumps.
- Logos de clientes/partners sin C09/C08.
- WooCommerce ni tema Teba.

## 5. TLS, auth y noindex (checklist al existir el entorno)

- HTTPS válido en el hostname de staging.
- Basic Auth o Access.
- `User-agent: *` / `Disallow: /`
- `<meta name="robots" content="noindex, nofollow">`
- Formularios: stub, no envío a `ventas@` / Odoo de producción.
- Sin `G-3QER18Q85V`, `GTM-P6XLSFFZ`, pixel Meta.

## 6. Flujo de publicación (cuando el FTP esté jaulado o exista Vía B)

```
Git (rama) → CI → artefactos → destino staging (carpeta jaulada o PaaS)
www.justech.do  →  intacto hasta autorización de cutover
```

Producción solo en Fase F con autorización expresa, backup y 301.
