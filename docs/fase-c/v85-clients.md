# V8.5 — Matriz privada de clientes

Archivo: `site/src/content/clients-evidence.ts`.

`CLIENT_COMPONENTS_ENABLED = false`. `CLIENT_EVIDENCE = []`.

El componente `ClientShowcase` existe y no renderiza nada. No hay placeholder público «próximamente».

Campos por fila, cuando se cargue evidencia:

- cliente, servicio, fecha, sector, evidencia
- permiso nombre / logo / testimonio
- resultado verificable
- estado: PRIVATE_RELATIONSHIP | NAME_ALLOWED | LOGO_ALLOWED | CASE_ALLOWED | TESTIMONIAL_ALLOWED

Credenciales, propuestas, facturas o chats no autorizan publicación.
