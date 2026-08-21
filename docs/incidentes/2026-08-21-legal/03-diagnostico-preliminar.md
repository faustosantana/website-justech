# Diagnóstico preliminar (sin acceso al servidor)

Hipótesis ordenadas por evidencia **pública**. Nada de esto está confirmado en disco hasta SFTP.

## Vector más probable

**Directorio físico `public_html/legal/` (o el docroot equivalente) con `index.php` que imprime el HTML de Plaza IT / OK88.**

Apache/LiteSpeed sirve ese directorio **antes** de `index.php` de WordPress. Por eso:

- no hay headers `rel=https://api.w.org/`;
- el HTML no es Teba;
- `/legal/index.php` = mismo cuerpo que `/legal/`.

Compatible con: upload por plugin vulnerable (RevSlider 6.5.x, WooCommerce 6.8.2, CF7 5.6.3), credencial WP/FTP filtrada, o un despliegue torcido del Centro Legal (13 jul 2026) luego reescrito.

`/documentos-legales/index.html` estático del **13 jul 2026** demuestra que **ya se usaban archivos planos** junto a WP para el centro legal. El dropper pudo ocupar el mismo patrón (`/legal/` como carpeta).

## Qué casi seguro **no** es (solo con evidencia pública)

| Hipótesis | Por qué se debilita |
| --- | --- |
| Solo contenido de la página WP (editor) | El tema envolvería Teba + `wp-content`; no ocurre |
| Cloaking por Googlebot / país / referer | Mismo hash con 6 UA y 2 referer |
| CDN/proxy reescribiendo | Misma IP BanaHosting que el home; no hay `cf-ray` de zona en justech.do (el beacon CF es del HTML ajeno) |
| Solo `sitemap` | El sitemap enlaza `/legal/`; el HTML malicioso es el origen, no el XML |
| Home u otras políticas infectadas en HTML | Controles negativos limpios de OK88 |

## Qué **no** se puede cerrar sin SFTP/cPanel/WP

| Área | Por qué importa |
| --- | --- |
| `functions.php`, `wp-config.php`, `.htaccess` raíz, `mu-plugins` | Persistencia típica |
| Otros PHP recientes en `uploads`, `revslider`, `cache` | El dropper de `/legal/` rara vez viene solo |
| Checksums del core vs. WordPress 7.1 oficial | `/wp-includes/version.php` no se puede auditar bien desde GET vacío |
| Cron cPanel y WP-Cron | Reinfección |
| Usuarios administradores | REST enumera cuentas; la legitimidad la confirma el propietario **fuera del Git** |
| Tabla `wp_posts` slug `legal` | Puede existir la página buena **debajo** del archivo físico |
| PHP version | Cabeceras no la envían |
| Caché LiteSpeed/Bana | Podría reponer el archivo tras borrarlo |

**No se asume que borrar `/legal/` basta.**

## Vector de entrada (conjetura, no hecho)

Alta prioridad de investigación en servidor:

1. Plugins EOL (WooCommerce 6.8.2, Slider Revolution 6.5.31, Contact Form 7 5.6.3) + login admin enumerable.  
2. Cuenta de implementador web con privilegio de administrador.  
3. FTP/cPanel reutilizado.

Baja: compromiso de Odoo (otro host: `soporte.justech.do` no resuelve a `50.31.188.22`).

## Correo y DNS

Ver [06-correo-dns.md](06-correo-dns.md). El diagnóstico de archivos WP **no** requiere cambiar MX/SPF/DKIM/DMARC.
