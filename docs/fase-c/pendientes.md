# Información pendiente (no publicar)

Nada de esta lista se muestra al visitante. No hay etiquetas «pendiente» en el HTML público.

Clasificación en `site/src/content/evidence.ts`: `verified` | `pending` | `expired` | `not_authorized` | `internal_only`. Solo `verified` se renderiza.

1. Dirección física / RNC / razón social completa en pie (si aplica más allá de Justech SRL).
2. Logotipos de fabricantes con autorización de uso.
3. Nivel de partnership (Microsoft, Google, etc.).
4. Certificaciones de personas y de la empresa.
5. Clientes y casos con autorización de publicación (estado: draft; plantilla en `cases.ts`).
6. Testimonios nominativos.
7. Cifras de operación (puestos, sitios, tickets) auditadas.
8. Fotografía de obra, rack, sucursales y equipo (derechos y personas).
9. SLA contractuales si se desea un extracto público (hoy: «se firman, no se inventan»).
10. Cobertura geográfica exacta más allá de Santo Domingo.
11. WhatsApp u otros canales no confirmados — no enlazar.
12. CCTV / control de acceso: `GATES.physicalSecurity` sigue en falso.
13. Credenciales de preview permanente (Vercel Protection) y activación de GitHub Pages por el propietario.
14. DNS / correo / producción: **fuera de alcance**.
15. Destino de formulario (Odoo CRM / correo / WhatsApp): staging simulado.
16. Equipo nominado con fotos y consentimiento.
17. Industrias con caso o experiencia verificable (hoy: oferta aplicable, sin prueba nominativa).
18. Garantías de fabricante: texto público pendiente.
19. Recursos editoriales propuestos (no publicados): guía de nueva oficina, checklist de cableado, laptops empresariales, renovación de servidor, M365 vs Workspace, migración a la nube, continuidad, contrato de soporte, documentar una red, señales de MSP.
20. SEM: cuenta, presupuesto, conversiones y autorización.

Cuando un ítem pase a `verified` + autorización de logo/publicación, el componente de evidencia / casos lo renderiza. Mientras tanto, no existe en la UI.
