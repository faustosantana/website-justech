# Decisiones y supuestos

Toda decisión irreversible espera aprobación. Los supuestos se marcan como tales.

## Supuestos (no validados aún)

| ID | Supuesto | Impacto si es falso | Estado |
| --- | --- | --- | --- |
| S01 | El repositorio GitHub `faustosantana/website-justech` es el destino del sitio nuevo, no un espejo del WordPress actual. | Habría que importar WP o trabajar en otro repo. | Abierto |
| S02 | No hay acceso a wp-admin, hosting, Search Console ni GA4 en este entorno. | Métricas de campo, inventario de medios y backups quedan incompletos. | Confirmado en esta corrida |
| S03 | El contenido legal de julio 2026 (políticas PDF/HTML) es vigente y debe conservarse. | Habría que reescribir o retirar documentos. | Pendiente Gerencia |
| S04 | `ventas@justech.do` es el correo comercial objetivo; el sitio actual usa `info@justech.do`. | CTAs y schema Organization cambiarían. | Pendiente |
| S05 | No existe partnership certificado vigente publicable (Microsoft, Huawei, etc.) hasta que comercial lo confirme. | El sitio no mostrará badges de partner. | Conservador — por defecto |
| S06 | Los logos de clientes actuales en home no tienen autorización escrita verificada en este repo. | No se republican en el sitio nuevo hasta checklist. | Conservador — por defecto |
| S07 | Odoo en `soporte.justech.do` es el portal de tickets a conservar (enlace, no rediseño). | Si el portal se mueve, cambia CTA de soporte. | Abierto |
| S08 | El idioma primario del sitio nuevo es español (RD); inglés es fase posterior con traducción profesional. | No se activará hreflang hasta ES+EN completos. | Propuesto |

## Decisiones propuestas (requieren aprobación)

| ID | Decisión | Alternativa rechazada | Por qué |
| --- | --- | --- | --- |
| D01 | **Reconstruir** el sitio en este repo (Next.js + contenido estructurado). No maquillar Teba/WPBakery. | Parchear WordPress en BanaHosting | Tema comprado, plugins EOL, compromiso en `/legal/`, WooCommerce innecesario, HTML de 177 KB, cero arquitectura SEO |
| D02 | WordPress de producción **permanece** hasta cutover con mapa 301. | Apagar WP ahora | Conservar legal, DNS, correo y evitar vacío de indexación |
| D03 | Tratar `/legal/` como **incidente de seguridad P0**, independiente del rediseño | Esperar al lanzamiento del sitio nuevo | Contenido ilegal/spam en URL de cumplimiento; daño reputacional y SEO inmediato |
| D04 | No publicar logos de fabricantes como “aliados” | Copiar el muro de logos actual | El mandato prohíbe confundir marca comercializada con partnership |
| D05 | Hosting objetivo: plataforma con HTTPS, CDN, cabeceras y preview (p. ej. Vercel o Cloudflare Pages), no shared hosting | Seguir en BanaHosting | Cabeceras vacías, listing, WP login público, IP Chicago |
| D06 | CMS: contenido versionado en repo (MDX/JSON tipado) en v1 de staging; CMS visual (Payload o Sanity) en v1.1 si el equipo lo exige | WordPress headless sobre el mismo WP | El WP actual está comprometido y con deuda de plugins |

## Fuera de alcance hasta nueva aprobación

- Modificar DNS, SSL o archivos en BanaHosting.
- Entrar a wp-admin o al selector de bases Odoo.
- Comprar o implementar Google Ads.
- Traducción inglesa completa.
- E-commerce / WooCommerce (la tienda no está publicada).
- Garantizar posiciones específicas en Google.
