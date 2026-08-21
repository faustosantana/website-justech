# Plan de contención y limpieza

**Estado: NO EJECUTADO.** Requiere (1) secretos de acceso y (2) un mensaje explícito del tipo: **«Autorizo el plan de limpieza de `/legal/` en producción»**.

Nada de este plan modifica DNS, Zone Editor, MX, SPF, DKIM, DMARC, Microsoft 365, `soporte.justech.do` ni Odoo.

## Fase 0 — con acceso, todavía solo lectura

1. Conectar por SFTP. Confirmar docroot. **No borrar nada.**  
2. Inventariar `legal/` (nombres, tamaños, mtime, permisos). Copiar evidencia a un tar **fuera de `public_html`** (home de cPanel `~/ir-evidence-20260821/`). No subir ese tar a Git.  
3. Leer (no ejecutar) `legal/index.php` como texto; buscar `eval`, `base64_decode`, fetch remoto, `preg_replace /e/`.  
4. Listar `mu-plugins`, raíz de temas, `uploads` PHP, `revslider`, `.htaccess` raíz y de `legal/`.  
5. Checksums de core: comparar `wp-admin` / `wp-includes` con el zip oficial de la versión instalada.  
6. WP: usuarios y roles, plugins activos, página slug `legal`, cron.  
7. DB solo lectura: `wp_posts` / `wp_postmeta` / `wp_options` (siteurl, active_plugins, widget, `cron`) buscando `OK88`, `plazait`, `G-0LSM1YJSPZ`, `eval(`.  
8. cPanel: PHP version, cron, últimos backups.  
9. Entregar **diagnóstico con servidor** en el chat (sin pegar wp-config). Si el alcance cambia, se actualiza este plan antes de escribir.

## Fase 1 — backup (antes de cualquier delete)

1. Full backup cPanel (archivos + MySQL) **o** JetBackup restore point.  
2. Backup adicional: `mysqldump` del schema WP + tarball de `public_html`.  
3. Verificar: tamaño > 0, tar/zip lista ficheros, dump SQL contiene `CREATE TABLE`.  
4. Anotar cómo restaurar en BanaHosting (restore wizard).  
5. **Stop** si el backup no es verificable.

Rollback de esta intervención: restaurar ese punto. No se toca correo. El A record sigue en BanaHosting.

## Fase 2 — contención corta

1. Renombrar `legal/` a `legal.ir-quarantine-20260821` (deja de servirse como `/legal/`).  
2. Colocar un `legal/index.html` mínimo de Justech (Centro Legal con enlaces a las políticas **auténticas** que ya responden 200) **o** restaurar la página WP si el slug existe y el rewrite vuelve a funcionar.  
3. `X-Robots-Tag: noindex` en ese índice hasta validar.  
4. Quitar `/legal/` de `sitemap-legal.xml` hasta que el HTML sea el de Justech.  
5. No desconectar el sitio entero si las políticas y el home siguen limpios.

## Fase 3 — limpieza y endurecimiento (solo tras Fase 0–1)

1. Eliminar o sustituir **todo** PHP malicioso hallado, no solo `legal/`.  
2. Reinstalar core 7.1 (o la versión actualizada compatible) desde wordpress.org: sobrescribir `wp-admin` y `wp-includes`; **no** machacar `wp-content` ni `wp-config.php` a ciegas.  
3. Plugins/temas: reinstall desde origen legítimo. **WooCommerce:** si no hay productos/pedidos, **desactivar y borrar**. RevSlider: si solo sirve el hero, planificar retiro (LCP + CVEs); no dejar 6.5.31.  
4. Quitar administradores que el propietario marque como desconocidos (lista se confirma **en el chat**, no en Git).  
5. Regenerar *salts* en `wp-config.php` (rompe cookies WP; avisar).  
6. `DISALLOW_FILE_EDIT` true.  
7. Permisos: directorios 755, archivos 644; `wp-config.php` 600 si el runtime lo permite.  
8. Bloquear ejecución PHP en `wp-content/uploads` (regla en `.htaccess` de uploads, no en Zone Editor).  
9. Limitar `xmlrpc` (ya 403), `install.php`, `readme.html`.  
10. Login: rate limit / captcha del hosting **sin** bloquear al propietario (allowlist IP si la tienen fija).  
11. Formularios: antispam en CF7 o reemplazo; no recaptcha mal configurado que rompa el form.  
12. Conservar HTML/PDF de políticas JT-* (no borrar `/politica-de-*` ni PDFs).  
13. Restaurar Centro Legal auténtico en `/legal/` (índice Justech, no Plaza IT).  
14. Pedir **rotación** (el propietario la ejecuta o la autoriza por escrito): cPanel, SFTP, FTP, admins WP, MySQL, application passwords. Coordinar para no perder el acceso del dueño: primero crear/confirmar su admin, **después** rotar lo demás.

## Fase 4 — validación

Desde varios UA (humano, Googlebot, móvil):

- `/legal/` es Justech, **sin** OK88/Plaza IT/`G-0LSM1YJSPZ`/`plazaitco.pages.dev`
- Home y políticas intactas; GA `G-3QER18Q85V` presente donde ya estaba
- `robots.txt` y sitemaps sin la URL maliciosa o con lastmod nuevo del índice bueno
- Login WP funciona para el propietario
- Formulario home responde (prueba controlada, no spam)
- `readme.html` bloqueado o 404

Search Console (con ustedes): removals de `/legal/` si Google llegó a cachear OK88; sitemap limpio; cobertura; Security Issues.

Monitoreo 14 días: reaparición de `legal/index.php` ajeno, PHP nuevo en uploads, usuarios admin nuevos.

## Lo que este plan no hace

- No cambia nameservers, A, MX, TXT, DKIM, DMARC.  
- No entra a Odoo.  
- No garantiza que no haya otra backdoor no hallada.  
- No declara el sitio “seguro al 100 %”.

## Autorización

Responderé al diagnóstico con servidor y esperaré la frase de autorización antes de Fase 2–3.
