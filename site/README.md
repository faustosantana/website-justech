# Sitio Justech (staging)

Next.js 15, App Router, export estático, `noindex`. Tipografía IBM Plex Sans. Tokens en `src/app/globals.css`.

```bash
cd site
npm ci
npm run dev
npm run build          # salida en out/
npm run test:staging   # tras el build
```

## Staging

- Sin GA4 / GTM / Meta Pixel.
- Formularios solo simulados.
- `public/robots.txt` → `Disallow: /`.
- Preview local: `npx --yes serve out -p 4173`.

Deploy durable: importar el GitHub en Vercel (usar `vercel.json` de la raíz del repo) o Cloudflare Pages (`wrangler.toml`). GitHub Pages: workflow en `.github/workflows/pages.yml`.

No cargar analítica de producción hasta cutover autorizado.
