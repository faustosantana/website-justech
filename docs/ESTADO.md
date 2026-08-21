# Estado del proyecto — Justech web nueva

Fuente oficial: `faustosantana/website-justech`. Producción `www.justech.do` **no se modifica**.

## Fases

| Fase | Qué | Estado |
| --- | --- | --- |
| A | Auditoría de producción | Hecha — `docs/fase-a/` |
| B | Estrategia, sitemap, SEO, staging | Hecha — `docs/fase-b/` |
| C | Design system + preview | Base aprobada; refinada a tono enterprise |
| D | Home y páginas públicas | Home premium + nav pública solo con oferta confirmada |
| E | Calidad staging | Lighthouse a11y/perf 1.00 — `docs/fase-c/pruebas.md` |
| F | Cutover a www | **Bloqueado** |

## Preview

https://buf-courage-glossary-designation.trycloudflare.com/

Capturas: `docs/fase-c/captures/`. Detalle: `docs/fase-c/preview.md`.

## Navegable (sin etiquetas internas)

Home, Soluciones (licenciamiento, equipos), Servicios (soporte, implants, consultoría, implementación), Nosotros, FAQs, Contacto (simulado), Soporte, Tecnologías (sin logos ni partnership), Legal, landing `/l/consulta/`.

## Bloqueos reales

1. Vercel import o GitHub Pages (Settings → Pages → Actions). Actions no puede crear Pages (403).
2. Rotar FTPS y enjaular la cuenta.
3. Limpieza de `/legal/` en producción, con backup y autorización.
4. Validar logos, partners, cifras, correo comercial, WhatsApp, RNC, dirección, testimonios.
5. Cutover DNS / sustituir www.
