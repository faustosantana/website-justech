# Objetivos y KPIs

No se garantiza posición en Google. Los KPIs miden calidad del sitio y de las oportunidades, no “ranking 1”.

## Objetivos de negocio (12 meses de sitio nuevo, a calibrar con comercial)

1. Que un comprador B2B o institucional identifique capacidad y seriedad en &lt; 30 s.  
2. Convertir visitas en **conversaciones calificadas** (formulario, llamada, WhatsApp), no en relleno de spam.  
3. Separar **ventas** de **soporte** (`soporte.justech.do`).  
4. Soportar campañas SEM futuras con landings de message-match (no mezclar intenciones).  
5. Conservar y fortalecer las URLs legales de julio 2026.

## KPIs de sitio (staging → producción)

| Indicador | Cómo | Meta inicial (revisable) |
| --- | --- | --- |
| Envíos de formulario **exitosos** (no clics) | GA4 + servidor | Línea base 90 días, luego +% |
| Clics tel / mailto / WhatsApp | GTM | Medidos; no se optimiza spam |
| Tasa de conversión por landing | GA4 | Según campaña; sin cifra inventada ahora |
| CWV móvil (campo, p75) | CrUX / GSC | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 |
| Lighthouse plantillas clave (lab) | CI | Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 salvo límite documentado |
| 404 / 5xx post-cutover | GSC + logs | Caída vs. primera semana |
| Indexación de URLs objetivo | GSC | Home + servicios + legales en “enviadas e indexadas” |
| Leads con UTM + servicio de interés | CRM/Odoo o hoja | Trazables |

## Fuera de KPI

- “Top 1 Microsoft 365 República Dominicana”.  
- Contadores de clientes/tickets sin C13.  
- Tráfico de staging (debe ser ~0 orgánico).
