# Inventario de producción

**Fecha:** 2026-08-21. Códigos HTTP con `curl -I` / `-L` a `https://www.justech.do`.

## 1. Mapa de URLs

### 1.1 Vivas (200)

| URL | Rol | Notas |
| --- | --- | --- |
| `/` | Home one-page | page-id 190 |
| `/robots.txt` | Robots | |
| `/sitemap.xml` | Sitemap general | Incluye feeds 404 |
| `/sitemap-legal.xml` | Sitemap legal | Incluye `/legal/` comprometida |
| `/legal/` | **Debería ser Centro Legal** | **P0: spam OK88** |
| `/politica-de-proteccion-de-datos/` | JT-POL-DP | Conservar |
| `/politica-de-privacidad/` | JT-POL-PRI-001 | Conservar |
| `/politica-de-cookies/` | JT-POL-COO | Conservar |
| `/politica-de-seguridad-de-la-informacion/` | JT-POL-SEG | Conservar |
| `/politica-de-contingencia/` | JT-POL-CONT | Conservar |
| `/canales-de-asistencia/` | JT-SOP-ATN-001 | Conservar |
| `/acuerdo-de-nivel-de-servicio/` | JT-SLA-001 | Conservar |
| `/documentos-legales/` | Índice estático 97 B | Solo enlace a `/legal/` |
| `/wp-login.php` | Login | No debe indexarse |
| `/readme.html` | Core WP | Eliminar/bloquear |
| `/license.txt` | Core WP | Eliminar/bloquear |
| `/wp-content/` | 200 | No debe listar |
| `/?s=test` | Búsqueda | 200 + noindex |

PDFs (en sitemaps; HEAD no revalidado uno a uno en todos):

- `/documentos-legales/politica-proteccion-datos-justech.pdf`
- `/documentos-legales/politica-privacidad-justech.pdf`
- `/documentos-legales/politica-cookies-justech.pdf`
- `/documentos-legales/politica-seguridad-informacion-justech.pdf`
- `/documentos-legales/politica-contingencia-continuidad-justech.pdf`
- `/documentos-legales/canales-asistencia-justech.pdf`
- `/documentos-legales/acuerdo-nivel-servicio-justech.pdf`

### 1.2 Redirecciones

| Origen | Destino |
| --- | --- |
| `https://justech.do/` | `https://www.justech.do/` |
| `http://www.justech.do/` | HTTPS www |
| `/legal` | `/legal/` |
| `/wp-admin/` | `/wp-login.php?redirect_to=...` |
| `/?page_id=190` | `/` |
| `/?page_id=192` | `/home/` (que es 404) |

### 1.3 404 relevantes (muestreadas)

`/home/`, `/inicio/`, `/servicios/`, `/contacto/`, `/nosotros/`, `/blog/`, `/tienda/`, `/shop/`, `/cart/`, `/checkout/`, `/my-account/`, `/feed/`, `/comments/feed/`, `/sample-page/`, `/hello-world/`, `/about/`, `/faq/`, `/portfolio/`, `/home-2/` … `/home-6/`, `/wp-json/`, `/wp-includes/`, `/wp-sitemap.xml`.

**No hay landings de servicio.** Toda la oferta comercial vive en anclas: `#home` `#servicios` `#nosotros` `#portafolio` `#colaboradores` `#equipo` `#testimonios` `#contacto` `#valores`.

## 2. Arquitectura de información actual

```
Inicio (one-page)
  #home          Hero RevSlider
  #colaboradores Logos de marcas (Windows, Google, Adobe, Dropbox, Cisco, VMware, Kaspersky, Ingram, Amazon, Veeam, Autodesk, Fortinet mal escrito “fotinet”, BDR)
  #servicios     6 tarjetas
  #portafolio    Logos de clientes
  #nosotros      Historia 2018 + misión/visión
  #valores       5 valores
  #contacto      CF7 + mail/tel/WA
  #testimonios   Carrusel
Footer           Centro Legal (enlaces)
```

Navegación: Home, Servicios, Nosotros, Clientes, Contacto (+ “Consultant”). No hay mega menú, industrias, tecnologías, casos, recursos ni soporte en nav.

## 3. Servicios publicados vs. capacidades del mandato

| Publicado en web | Mandato (credenciales) | Acción |
| --- | --- | --- |
| Implementación de tecnologías | Implementación e integración | Reescribir con resultados |
| Soporte técnico | N1–N3, tickets, preventivo/correctivo | Productizar MSP; no afirmar N-levels sin proceso |
| Asesorías | Consultoría | OK, profundizar |
| Implants personal tecnológico | Outsourcing / implants | Fortaleza diferencial — landing propia |
| Licenciamientos de software | Licenciamiento y optimización | Landing; **sin badge de partner** hasta C08 |
| Venta de equipos | Aprovisionamiento hardware | Landing B2B, no tienda Woo |
| — | Ciberseguridad | No publicar hasta C14 |
| — | Nube AWS/Azure/GCP | No publicar hasta C14 |
| — | Desarrollo software / QA / RPA / IA / CI/CD / SAFe | No publicar hasta C14 |

## 4. Marcas en home (todas: logo, sin tipo de relación)

Microsoft/Windows, Google, Adobe, Dropbox, Cisco, VMware, Kaspersky, Ingram Micro, Amazon, Veeam, Autodesk, Fortinet (`fotinet-logo.png`), BDRSuite.

**Clasificación por defecto:** marca mostrada / posible comercialización. **No** partner certificado.

## 5. Clientes visibles (logos y/o enlaces)

The Lab, Leja, Newlink, INFOTEP, El Mitin, MCCD, Pardo Agency, Maka Capilar Health, Fondo Agua Santo Domingo, Capital, Diversiones Tours / Diversiones, Banco Unión, MCS Consultores, Rattan. JPGs numéricos `2025/06/1.jpg`–`13.jpg` sin alt (posible segunda tira de logos).

El mandato lista además: Multi Empaques, Cámara Domínico-Suiza, Remodeco, Dirección General de Pasaportes, Templaris, Reservas del Palmar, Yamelis Consulting, Hormicondo, IDCP, Hospital Los Mina, Globo Cambio, El Catador, Presidente Sport, Banco Ademi, Kaba Consulting.

**Ninguno se republica sin C09.**

## 6. Testimonios en home (texto actual, no alterado)

| Persona | Cargo / org | Sentido |
| --- | --- | --- |
| Maurice Sánchez | Director Creativo Pardo Agency / Partner en La Sociedad | Aliado que provee respuestas a tiempo |
| Diana Cabrera | Gerente General / MCCD | Puntualidad, calidad, compromiso |
| Daniel Santana | Gerente General / Remodeco | Alivio contar con expertos |
| Carlos Feliz | Gerente de Operaciones / Leja Car Rental | Aliado estratégico, respuesta oportuna |
| Paola Tejeda | Fundadora / El Mitin | Servicio profesional para teletrabajo |

Mandato (no en home): Clary Castro, IDCP. No usar hasta C10.

## 7. Contacto publicado

| Canal | Valor en prod | Mandato |
| --- | --- | --- |
| Tel | 809-455-2372 | +1 809 455 2372 |
| WhatsApp bloque | (809) 870-3783 | — |
| WhatsApp widget | +1 809 455 2372 | — |
| Mail | info@justech.do | ventas@justech.do |
| Soporte mail | soporte@justech.do (legal) | — |
| Portal | soporte.justech.do | igual |
| Facebook | facebook.com/justechrd | — |
| Instagram | Instagram.com/justechrd | — |
| LinkedIn | do.linkedin.com/company/justechrd (externo, ~49 followers, “1 employee”) | No usar headcount |

## 8. Medios

Uploads 2020–2025: logos Justech, logos marcas, logos clientes, `service19.png` (icono tema), fondo slider `justech-fondo-4.jpg`, `bg-shapes1.png`, SVGs de RevSlider (`home-page-6-1` — **nombre de demo del tema**). Favicon `cropped-logo-*.png` (2021).

## 9. Plugins y scripts de terceros (home)

GTM, GA4, Meta Pixel, Google Fonts, jQuery Google CDN, WooCommerce, WPBakery, RevSlider, CF7, Instagram Feed, WhatsApp plugin, Web Font Loader.

## 10. Formularios

1. Búsqueda GET `/?s=`  
2. CF7 POST contacto (servicios en select = las 6 tarjetas + Otros)

No hay: cotización, evaluación, descarga, agenda, soporte separado.

## 11. Qué migrar al sitio nuevo (contenido)

- Copy de misión/visión/valores (reescribir tono, conservar ideas).
- Políticas legales 1.0 del 13/07/2026 (HTML + PDF) tras verificación de integridad.
- Datos de contacto canónicos (cuando C03–C06).
- Testimonios aprobados.
- Identidad visual (logos Justech en `/wp-content/uploads/2022/09/Justech-*.png`).

## 12. Redirecciones mínimas al cutover (borrador)

| Antigua | Nueva propuesta (Fase B puede ajustar) |
| --- | --- |
| `/` | `/` |
| `/politica-de-privacidad/` | `/legal/privacidad/` o conservar slug |
| `/politica-de-proteccion-de-datos/` | slug estable |
| `/politica-de-cookies/` | slug estable |
| `/politica-de-seguridad-de-la-informacion/` | slug estable |
| `/politica-de-contingencia/` | slug estable |
| `/canales-de-asistencia/` | slug estable |
| `/acuerdo-de-nivel-de-servicio/` | slug estable |
| `/legal/` | `/legal/` (tras limpiar spam) |
| `/documentos-legales/` | `/legal/` o `/legal/documentos/` |
| PDFs | misma ruta o 301 a PDF versionado |
| `/wp-login.php`, `/readme.html` | 410 o noindex en origen viejo |

**Recomendación de slugs:** conservar las URLs legales actuales (ya tienen lastmod y sitemap) para no tirar señales de julio 2026.
