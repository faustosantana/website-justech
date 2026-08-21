# Acceso necesario y entrega segura

**Prohibido:** pegar contraseñas, claves SSH, hashes de WP, cadenas de `wp-config`, dumps SQL o cookies de sesión en este repositorio, en el pull request, en commits, en `docs/`, o en mensajes que queden visibles en el agente.

Si un secreto aparece por error en el chat, **rótelo de inmediato** y no lo reutilice. Yo no lo copiaré a Git.

## Qué pido (mínimo viable, en este orden)

### 1. SFTP o FTP (imprescindible para diagnóstico de archivos)

Cuenta **temporal y dedicada** a este incidente, no la contraseña personal de cPanel.

- Host (hostname de BanaHosting, no hace falta repetirlo en Git)
- Puerto (22 SFTP preferido; 21 FTP solo si no hay SFTP)
- Usuario con acceso al `public_html` del sitio (o el docroot real de `justech.do`)
- Contraseña o clave SSH
- Confirmación de que **no** es la cuenta raíz de cPanel

Con esto puedo: listar `/legal/`, comparar core de WordPress, buscar PHP reciente/ofuscado, copiar evidencia, y más adelante (solo con autorización) quitar el dropper.

### 2. cPanel (imprescindible para backup verificable)

- Usuario cPanel **o** un técnico de Justech que genere el backup y me deje SFTP para **verificar** el archivo
- Lo que necesito poder hacer en cPanel (o que ustedes ejecuten y me confirmen):
  - Backup completo de archivos + base de datos (JetBackup / Backup Wizard / WP Toolkit)
  - Ver versión de PHP
  - Cron jobs
  - Error logs (sin pegarlos enteros en Git)
  - File Manager como alternativa a SFTP
  - **No** Zone Editor / DNS / Email routing / MX

Preferible: ustedes disparan el **Full Backup** a su correo o a un directorio privado **antes** de darme SFTP, y yo solo verifico tamaño e integridad.

### 3. WordPress (imprescindible para usuarios, páginas y plugins)

- Un usuario **administrador** temporal `justech-ir-2026` **o**
- **Application Password** de WordPress (Usuarios → Perfil → Contraseñas de aplicación) sobre una cuenta admin que ustedes controlen

No envíen la contraseña de login cotidiana. La application password se revoca al cerrar el incidente.

Con esto: lista de usuarios y roles, página “legal” en el CMS, plugins, cron de WP, medios. No publicaré nombres de usuario en el PR.

### 4. Base de datos (muy útil; se puede derivar de wp-config vía SFTP)

- phpMyAdmin **o** usuario MySQL de **solo lectura** para el schema de este WP
- Si hay SFTP, leeré `wp-config.php` **en el servidor** y no lo copiaré al repo

Sirve para ver si `/legal/` también está en `wp_posts` o si el HTML malicioso es solo el archivo físico.

### 5. Lo que **no** pido en esta intervención

- Contraseñas de Microsoft 365 / DNS / registrador
- Acceso a `soporte.justech.do` / Odoo
- Claves de GA4, GTM, Facebook ni Search Console (Search Console se usará **después**, con ustedes delante, para removals)
- SSH root

## Cómo entregarlo (elija un método)

### Método A — preferido: secretos del Cloud Agent

En Cursor, asocie secretos al agente o al entorno. Use **estos nombres**, nunca los valores en el chat:

| Variable | Contenido |
| --- | --- |
| `JUSTECH_SFTP_HOST` | hostname SFTP |
| `JUSTECH_SFTP_PORT` | `22` o `21` |
| `JUSTECH_SFTP_USER` | usuario temporal |
| `JUSTECH_SFTP_PASS` | contraseña temporal **o** |
| `JUSTECH_SFTP_KEY` | clave privada OpenSSH (si usan llave) |
| `JUSTECH_WP_USER` | usuario WP del IR |
| `JUSTECH_WP_APP_PASSWORD` | application password |
| `JUSTECH_CPANEL_USER` | solo si hace falta API cPanel |
| `JUSTECH_CPANEL_TOKEN` | token de API cPanel, no la clave maestra |

Luego escriba en el chat únicamente: **«Secretos cargados en el entorno. Puede diagnosticar por SFTP.»** Sin valores.

### Método B — si no hay UI de secretos

Cree el usuario SFTP temporal. En el chat indique **solo**: host ya conocido, puerto, nombre del usuario, y que la contraseña está en un gestor (1Password/Bitwarden one-time link). **No** pegue el link si el transcript queda público; ábralo usted en una sesión controlada o use Método A.

### Método C — ustedes operan cPanel y yo dirijo

Si no quieren darme SFTP: hagan Full Backup, capturas de `public_html/legal/` (nombres, fechas, tamaños, **no** ejecuten el PHP), listado de cron y de usuarios WP, y súbanlos como archivos al agente (no al repo). Más lento, pero válido.

## Hallazgo 2026-08-21 (cuenta entregada)

El usuario FTPS actual inicia en el **home cPanel** y ve `public_html`. No se usará para subir archivos. Hace falta un usuario **enjaulado** a staging. Rotar la contraseña que viajó por el chat.

## Cuentas temporales recomendadas (háganlo ustedes en cPanel)

1. FTP jaulado `cursor-staging` → solo docroot de `staging.justech.do` (nunca `public_html`)  
2. (IR `/legal/`, aparte) usuario IR acotado, no el mismo que staging  
3. WP admin `justech-ir-2026` + application password  
4. Revocar al cerrar el incidente  
5. No reutilizar la contraseña del propietario

## Qué haré en cuanto existan secretos (aún sin limpiar)

Solo lectura: inventario de `/legal/`, hashes, fechas, `functions.php`, `mu-plugins`, `.htaccess` de docroot, usuarios WP, `wp_posts` del slug `legal`, checksums del core contra wordpress.org, cron.  
Después publicaré el diagnóstico con servidor y **esperaré autorización expresa** para el plan de limpieza.
