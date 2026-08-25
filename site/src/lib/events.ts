/**
 * Eventos de conversión preparados. Staging no envía a GA/Ads/Pixel.
 */
import { ANALYTICS_ENABLED } from "./analytics";

export type ConversionEvent =
  | "generate_lead"
  | "contact_submit"
  | "cta_specialist"
  | "support_portal"
  | "quote_request"
  | "quote_start"
  | "quote_submit"
  | "assessment_start"
  | "assessment_submit"
  | "support_portal_click"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "resource_download"
  | "service_view"
  | "product_quote_start"
  | "site_survey"
  | "diagnosis_request";

export function track(event: ConversionEvent, params?: Record<string, string>) {
  if (!ANALYTICS_ENABLED) return;
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}
