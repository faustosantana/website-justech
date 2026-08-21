import { shouldLoadAnalytics } from "@/lib/analytics";

/** Placeholder de medición. Staging no carga GA, GTM ni Pixel. */
export function Analytics() {
  if (!shouldLoadAnalytics()) return null;
  return null;
}
