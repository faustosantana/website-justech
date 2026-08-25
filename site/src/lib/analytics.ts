/**
 * Analítica preparada y **apagada** en staging.
 *
 * Cutover (requiere autorización explícita):
 * 1. Quitar noindex / robots Disallow.
 * 2. Poner ANALYTICS_ENABLED = true.
 * 3. Cargar GA4, GTM y Meta Pixel de producción en este módulo.
 *
 * IDs de producción (no incrustar en el HTML de staging):
 * GA4, GTM y Meta Pixel del sitio actual; Search Console TXT ya está en DNS/WP.
 * Nunca usar la propiedad GA del incidente /legal/.
 */
export const ANALYTICS_ENABLED = false;

export function shouldLoadAnalytics(): boolean {
  return ANALYTICS_ENABLED;
}
