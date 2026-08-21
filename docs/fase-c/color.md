# Auditoría de color — v4

Tokens en `:root` (`globals.css`):

`bg-primary`, `bg-secondary`, `bg-elevated`, `surface-glass`, `surface-light`, `text-primary`, `text-secondary`, `text-muted`, `text-on-image`, `border-subtle`, `border-strong`, `accent-primary`, `accent-secondary`, `success`, `warning`, `danger`, `information`, `focus`, `focus-ring`, `overlay`, `scrim`.

Correcciones v3 → v4:

- Copy sobre imagen: `#f4f7fa` sobre glass, no gris suelto.
- `text-muted` en light: `#3d4a57`.
- Eyebrows sobre navy **y** sobre `.stage`, consolas y process-track: `--signal` (el teal `#0a5c64` sobre navy fallaba AA).
- Señales secundarias en hero: `#d5dee6` (antes `#9eb0bb`).
- Hero photo: opacity 0.52 + brightness 0.92, copy en scrim local.
- Canvas labels: `pal.dim` más opaco.

Validación: axe WCAG A/AA en las diez insignia. Inspección visual obligatoria además de Lighthouse.
