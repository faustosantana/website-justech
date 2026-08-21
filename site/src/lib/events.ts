/**
 * Eventos de conversión preparados. Staging no envía a GA/Ads/Pixel.
 */
import { ANALYTICS_ENABLED } from "./analytics";

export type ConversionEvent =
  | "generate_lead"
  | "contact_submit"
  | "cta_specialist"
  | "support_portal";

export function track(event: ConversionEvent, params?: Record<string, string>) {
  if (!ANALYTICS_ENABLED) return;
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}
