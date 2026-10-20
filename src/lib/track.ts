// referral_submit is a GA4 key event. Mark it in GA4 Admin when the property exists.
// When the Meta pixel is active, that event is sent as Lead with content_category "referral".
// consent-default.js defines gtag before a choice. Events stay local until Accept.
import { CONSENT_STORAGE_KEY } from "../../shared/tracking.mjs";
type TrackValue = string | number | boolean | undefined;

const META: Record<string, string> = {
  book_call_click: "Schedule",
  whatsapp_click: "Contact",
  generate_lead: "Lead",
};

export function track(name: string, params: Record<string, TrackValue> = {}) {
  if (typeof window === "undefined") return;
  try {
    if (window.localStorage.getItem(CONSENT_STORAGE_KEY) !== "granted") return;
  } catch {
    return;
  }
  const payload: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }
  window.gtag?.("event", name, payload);
  if (name === "referral_submit") {
    window.fbq?.("track", "Lead", { content_category: "referral" });
    return;
  }
  const meta = META[name];
  if (meta) window.fbq?.("track", meta);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}
