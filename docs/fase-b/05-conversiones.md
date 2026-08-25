# Rutas de conversión y medición

Staging: **sin** formularios comerciales reales ni tags de producción.

## CTAs

| Prioridad | Texto orientativo | Destino |
| --- | --- | --- |
| Primario | Hablar con un especialista | `/contacto/?motivo=` |
| Primario (compras) | Solicitar cotización | `/contacto/?motivo=cotizacion` |
| Secundario | Explorar soluciones | `/soluciones/` |
| Soporte | Ir al portal | `https://soporte.justech.do` (no el selector de DB) |
| Contacto directo | Tel, mail, WhatsApp **canónicos** (C03–C05) | `tel:` `mailto:` `https://wa.me/` |

Un WhatsApp. Un correo comercial. No mezclar `870-3783` y `455-2372` sin decisión.

## Formularios (producción futura)

1. Contacto general  
2. Evaluación / levantamiento  
3. Cotización  
Éxito = **POST 2xx y página de gracias**, no clic en botón.  
Campos: nombre, empresa, correo, teléfono, servicio (enum del sitemap), mensaje, consentimiento, UTM ocultos (`utm_*`, landing, gclid).  
Antispam servidor + honeypot. Destino: correo M365 y/o Odoo **cuando C19**. No PII a Meta/Google Ads.

Soporte: no usar el form de ventas; CTA al portal + JT-SOP-ATN-001.

## Eventos GA4 / GTM (nombres; IDs de prod no se ponen en staging)

- `generate_lead` (form success)  
- `click_phone` `click_email` `click_whatsapp`  
- `file_download` (PDF legal o guía)  
- `support_portal_click`  

Consent Mode v2 cuando haya CMP real (la política de cookies ya existe; el banner actual no es CMP).

SEM: landings `/l/...` más adelante; UTMs `utm_source/medium/campaign/content`. Conservar querystring en la página de gracias.

## Home (orden de secciones — contenido, no diseño)

1. Nav + mega accesible  
2. Hero + 2 CTAs  
3. Confianza: solo 2018 / RD / capacidades verificadas  
4. Clientes: **omitir** hasta C09  
5. Soluciones por resultado  
6. Por qué Justech (estrategia → aprovisionamiento → implementación → operación)  
7. Industrias: omitir o 1–2 reales (C15)  
8. Tecnologías: clasificación, no “aliados”  
9. Caso: omitir sin C11  
10. Testimonio: solo C10  
11. Recursos: FAQs v1  
12. CTA final  
13. Footer legal + soporte  

El incidente `/legal/` se repara en WP; el índice nuevo del Centro Legal se diseña en Fase C y **no** incluye Plaza IT/OK88.
