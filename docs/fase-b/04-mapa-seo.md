# Mapa SEO

Una intención principal por URL. Español dominicano + B2B. Sin thin content y sin copiar competidores.

## Keywords semilla (investigación cualitativa 2026-08-21)

No hay Search Console en este entorno. Lista **propuesta**, a validar con GSC/Ads.

### Comercial / transaccional (RD)

- soporte técnico empresas Santo Domingo  
- servicios administrados de TI República Dominicana  
- outsourcing TI / implant tecnológico RD  
- licencias Microsoft 365 / Google Workspace (sin decir “partner” hasta C08)  
- venta de equipos empresariales / servidores / redes  
- implementación de infraestructura / cableado estructurado  
- ciberseguridad empresas RD · Fortinet · firewall (páginas **D** hasta C14)  
- nube AWS Azure GCP (páginas **D**)  
- Action1, Huawei Enterprise (solo si oferta real)

### Informativa

- qué es un SLA de soporte TI  
- diferencia N1 N2 N3  
- checklist continuidad / respaldo  
- FAQs de canales Justech (ya hay JT-SOP)

### Marca

- Justech SRL · justech.do · alternativas tecnológicas (title actual, a evolucionar)

## Asignación (anti-canibalización)

| URL | Keyword principal | Semántica de apoyo | No usar aquí |
| --- | --- | --- | --- |
| `/` | Justech Santo Domingo tecnología empresarial | aliado TI, 2018, RD | “Microsoft partner” |
| `/servicios/soporte-tecnico/` | soporte técnico empresas República Dominicana | N1 N2 N3, tickets, preventivo | MSP empaquetado (va a administrados) |
| `/servicios/servicios-administrados/` | servicios administrados de TI RD | operación continua | cotización de laptops |
| `/servicios/outsourcing-e-implants/` | implant tecnológico / outsourcing TI RD | personal en sitio | desarrollo de software |
| `/servicios/consultoria-tecnologica/` | consultoría tecnológica empresas RD | asesoría, levantamiento | licencias |
| `/servicios/implementacion-y-migraciones/` | implementación tecnológica empresas | puesta en marcha | venta de PCs sueltas |
| `/soluciones/software-y-licenciamiento/` | licenciamiento de software empresas RD | renovación, M365, Workspace | “Gold Partner” |
| `/soluciones/equipamiento-empresarial/` | equipos de cómputo empresariales RD | servidores, redes, accesorios | tienda Woo / precios scrapeados |
| `/contacto/` | contacto Justech | ventas, Santo Domingo | formulario de soporte |
| `/canales-de-asistencia/` | soporte Justech canales | horario, portal | ventas |
| `/politica-de-privacidad/` | política de privacidad Justech | datos personales | oferta comercial |

Títulos y meta: únicos, naturales, CTR; un H1; canonical self; OG. JSON-LD: Organization, WebSite, BreadcrumbList, Service donde haya servicio real, FAQPage solo si el FAQ es visible y cumple política Google, LocalBusiness **solo** con dirección/RNC (C06).

## Técnico (heredado de auditoría)

- Conservar slugs legales.  
- 301 feeds 404 fuera del sitemap.  
- `lang="es"` (hoy `en-US` es error).  
- Imágenes WebP, alt útil, no `alt="image"`.  
- Tras cutover: GSC, sitemap segmentado (`sitemap.xml` + `sitemap-legal.xml` limpio, **sin** spam).  
- Removals si `/legal/` llegó a cachear OK88.

## Contenido que no se crea

- Páginas de ciudad duplicadas (Santiago, Punta Cana vacías).  
- Tags / demo Teba.  
- Blog masivo sin autoría.
