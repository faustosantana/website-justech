# Correo y DNS — esta intervención no los toca

Procedimiento de WordPress = archivos y base en el **docroot de BanaHosting** (`50.31.188.22`). No usa Zone Editor.

## Registros observados 2026-08-21 (solo lectura DNS)

| Registro | Valor | ¿Lo cambia el plan WP? |
| --- | --- | --- |
| NS | `ns4934/ns4935.banahosting.com` | No |
| A apex / www | `50.31.188.22` | No |
| MX | `justech-do.mail.protection.outlook.com` (pri 0) | **No** |
| SPF TXT | `v=spf1 include:spf.protection.outlook.com -all` | **No** |
| Autodiscover | CNAME `autodiscover.outlook.com` | No |
| DKIM `default._domainkey` | TXT presente (selector estilo cPanel) | **No** |
| DKIM `selector1` / `selector2` (típico M365) | **No** vistos en esta consulta | No se crean ni se borran ahora |
| DMARC `_dmarc` | **Vacío** en esta consulta | No se añade ahora (mejora aparte) |
| `soporte.justech.do` | `justgroup.app` → `31.97.6.178` | No |

## Confirmación explícita

El plan de [04-plan-limpieza.md](04-plan-limpieza.md) **no afecta** los registros **MX**, **SPF**, **DKIM** ni **DMARC**. El correo Microsoft 365 sigue en el MX actual. No se piden accesos al tenant M365.

Nota (no incidente `/legal/`): no aparecieron `selector1._domainkey` / `selector2._domainkey` de Outlook. Eso es higiene de correo **aparte**; no se corrige durante la limpieza WP.
