# Estado del proyecto — Justech web nueva

Fuente oficial: `faustosantana/website-justech`. Producción `www.justech.do` **no se modifica**.

## Fases

| Fase | Qué | Estado |
| --- | --- | --- |
| A | Auditoría de producción | Hecha — `docs/fase-a/` |
| B | Estrategia, sitemap, SEO, staging | Hecha — `docs/fase-b/` |
| C | Design system + preview | v2 — red operativa, no plantilla de tarjetas |
| D | Home y páginas públicas | Home evolucionado + arquitectura comercial completa |
| E | Calidad staging | Re-medir Lighthouse / a11y en esta iteración |
| F | Cutover a www | **Bloqueado** |

## Preview

https://buf-courage-glossary-designation.trycloudflare.com/

Capturas: `docs/fase-c/captures/`. Detalle: `docs/fase-c/preview.md`.

## Navegable (sin etiquetas internas)

Home v2, Soluciones, Servicios, Productos, Infraestructura física, Industrias, Tecnologías, Nosotros, FAQs, Contacto por intención, Soporte, Legal, landings `/l/*`.

Detalle: `docs/fase-c/iteracion-v2.md`.

## Bloqueos reales

1. Vercel import o GitHub Pages (Settings → Pages → Actions). Actions no puede crear Pages (403).
2. Rotar FTPS y enjaular la cuenta.
3. Limpieza de `/legal/` en producción, con backup y autorización.
4. Validar logos, partners, cifras, correo comercial, WhatsApp, RNC, dirección, testimonios.
5. Cutover DNS / sustituir www.
