# Preview de staging

**URL navegable (túnel Cloudflare, mientras el agente esté activo):**

https://buf-courage-glossary-designation.trycloudflare.com/

Es un quick tunnel: HTTPS, noindex en HTML, `robots.txt` Disallow. **No es un hostname permanente.** Para un preview durable, importar `faustosantana/website-justech` en Vercel (directorio `site/`) o Cloudflare Pages.

Comprobado 2026-08-21: home 200, title Justech, sin OK88, `/contacto/` y `/legal/` 200.

Producción `www.justech.do` no se modificó.
