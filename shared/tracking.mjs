const escape = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const CONSENT_STORAGE_KEY = "latamleap.consent";

export const CONSENT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

/** Measurement only. Ads stay denied until a separate choice exists. */
export const CONSENT_MEASUREMENT = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "granted",
};

export const CONSENT_GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

/** Empty, or a placeholder like G-XXXXXXXXXX, does not load. Real IDs look like G-ABC123. */
export function measurementId(value) {
  const id = String(value || "").trim();
  if (!/^G-[A-Z0-9]+$/.test(id) || /^G-X+$/.test(id)) return "";
  return id;
}

export function pixelId(value) {
  const id = String(value || "").trim();
  return /^[0-9]+$/.test(id) ? id : "";
}

/** Static head: Search Console verification only. GA4 and the pixel stay out until consent. */
export function trackingHead(seo = {}) {
  const google = String(seo.googleSiteVerification || "").trim();
  return google ? `<meta name="google-site-verification" content="${escape(google)}" />` : "";
}

/** Scripts for after the visitor accepts. Denied consent returns an empty string. */
export function analyticsHead({ ga4MeasurementId = "", metaPixelId = "", consent = "denied" } = {}) {
  if (consent !== "granted") return "";
  const ga = measurementId(ga4MeasurementId);
  // Accepting measurement does not load the Meta pixel. metaPixelId waits for a separate ads choice.
  void metaPixelId;
  if (!ga) return "";
  return `<script src="/measurement.js" data-ga-id="${escape(ga)}"></script><script async src="https://www.googletagmanager.com/gtag/js?id=${escape(ga)}"></script>`;
}
