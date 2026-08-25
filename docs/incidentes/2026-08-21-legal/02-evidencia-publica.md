# Evidencia pública (solo lectura)

**Captura UTC:** 2026-08-21 (sesión de agente).  
**Método:** `curl` HTTPS. No se ejecutó PHP descargado. Cuerpos completos **no** están en Git (hashes sí).

## 1. Comportamiento de `/legal/`

| Prueba | Resultado |
| --- | --- |
| URL | `https://www.justech.do/legal/` |
| HTTP | **200**, sin redirección (`num_redirects=0`) |
| `Content-Type` | `text/html; charset=UTF-8` |
| Tamaño cuerpo | **256 404 bytes** |
| SHA-256 | `f5ae2e2db5d2ec09dd60ba33dccb7be4f1b484331ff9474a79a7bbf360f4df0d` |
| `<html lang>` | **`id`** (indonesio) |
| Title | `OK88 : Panduan Lengkap Permainan Slot Digital...` |
| `og:site_name` | Plaza IT |
| `og:url` | `https://www.justech.do/legal/` (secuestra la URL de Justech) |
| `robots` meta | `index, follow, nosnippet` |
| Cabeceras WP `Link: wp-json` | **Ausentes** (el home sí las envía) |
| WordPress / Teba / `wp-content` en el HTML | **No** es la plantilla Teba |

Mismo SHA-256 con:

- User-Agent de herramienta
- Chrome escritorio
- iPhone Safari
- Googlebot
- Googlebot smartphone
- Bingbot
- Referer Google y sin referer

**No hay cloaking por UA ni por referer en esta muestra.** Googlebot recibe el spam igual que un humano.

`/legal/index.php` → **200**, mismo tamaño **256 404**.  
`/legal/.htaccess` → **403** (el archivo existe; el origen impide leerlo).  
`/legal/index.html` → 404.

Conclusión pública: hay un **directorio físico** `legal/` cuyo `index.php` gana a los permalinks de WordPress.

## 2. Scripts y analítica ajenos

| IOC | Valor |
| --- | --- |
| GA4 ajeno | **`G-0LSM1YJSPZ`** |
| Linker gtag | `plazait.co.id`, `www.plazait.co.id` |
| JS/CSS | `https://plazaitco.pages.dev/assets/js/*` y `css/*` (Cloudflare Pages) |
| Insights | `static.cloudflareinsights.com/beacon.min.js` |
| Imágenes | `i.ibb.co`, `nightmarenyx.art` |
| Enlaces spam | `ribaksudemen.site`, `healacl-what-is-an-acl.pages.dev` |
| WhatsApp ajenos | prefijo `+62` (Indonesia), no los de Justech |
| GA4 legítimo de Justech en esta URL | **Ausente** (`G-3QER18Q85V` no aparece) |

El HTML es un clon de vitrina “Plaza IT” + overlay OK88/SLOT88, servido **desde el origen de justech.do**.

## 3. Páginas legales auténticas (control)

Misma fecha de muestreo. **No** contienen OK88 ni `G-0LSM1YJSPZ`. Sí contienen `G-3QER18Q85V`, `Justech SRL`, plantilla Teba.

| URL | Bytes | Spam OK88 |
| --- | --- | --- |
| `/politica-de-privacidad/` | ~140 635 | No |
| `/politica-de-cookies/` | ~141 046 | No |
| `/politica-de-proteccion-de-datos/` | ~144 615 | No |
| `/politica-de-seguridad-de-la-informacion/` | ~148 223 | No |
| `/politica-de-contingencia/` | ~145 607 | No |
| `/canales-de-asistencia/` | ~141 598 | No |
| `/acuerdo-de-nivel-de-servicio/` | ~141 487 | No |
| `/` (home) | ~177 234 | No |
| `/documentos-legales/` | **97** (HTML estático, last-modified **2026-07-13**) | No; enlace a `/legal/` |

`/documentos-legales/` **no** pasa por WordPress (`last-modified` + `content-length: 97`). Es un índice estático que apunta al Centro Legal ahora secuestrado.

## 4. `robots.txt` y sitemaps

`robots.txt` hace `Allow: /legal/` y declara `sitemap-legal.xml`, cuya primera URL es `/legal/` con `<lastmod>2026-07-13</lastmod>`. Google está **invitado** a indexar la URL comprometida.

Búsqueda `site:justech.do/legal OK88` en esta corrida: **sin resultados**. Puede no estar indexado aún; igual hay que tratarlo en Search Console.

## 5. Superficie WP vista desde fuera (no es el spam, sí es riesgo)

No se listan cuentas ni rutas internas de cPanel.

- REST `/?rest_route=/wp/v2/users` responde **200 JSON** (enumeración de usuarios).
- `/?author=1` redirige a un archivo de autor (enumeración clásica).
- `/wp-login.php` 200; `/readme.html` 200; `/license.txt` 200.
- `/wp-admin/install.php` 200, flujo “already installed”.
- `/xmlrpc.php` 403; `wp-config.php` 403; `/.htaccess` 403.
- No se encontraron shells con nombres triviales (`c99.php`, `wso.php`, `alfa.php`, `shell.php`) por HEAD.
- `hello.php` del plugin Hello Dolly: HEAD 200, GET vacío.
- No hay child theme `teba-child` visible (404).

Esto **no** sustituye un barrido de archivos en el servidor.

## 6. Lo que no se hizo (a propósito)

- No se descargó ni ejecutó el PHP de `/legal/index.php` como código.
- No se envió el formulario de contacto.
- No se autenticó en wp-admin ni cPanel.
- No se alteró DNS, correo ni Odoo.
