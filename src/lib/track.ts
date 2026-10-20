type TrackValue = string | number | boolean | undefined;

const META: Record<string, string> = {
  book_call_click: "Schedule",
  whatsapp_click: "Contact",
  generate_lead: "Lead",
};

export function track(name: string, params: Record<string, TrackValue> = {}) {
  if (typeof window === "undefined") return;
  const payload: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }
  window.gtag?.("event", name, payload);
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
