const escape = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export const CONSENT_STORAGE_KEY = "latamleap.consent";

export const CONSENT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
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
  const tags = [];
  const ga = measurementId(ga4MeasurementId);
  const pixel = pixelId(metaPixelId);
  if (ga) {
    tags.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${escape(ga)}"></script>`);
    tags.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',${JSON.stringify(CONSENT_DENIED)});gtag('consent','update',${JSON.stringify(CONSENT_GRANTED)});gtag('js',new Date());gtag('config','${escape(ga)}');</script>`);
  }
  if (pixel) {
    tags.push(`<script id="meta-pixel">!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');</script>`);
  }
  return tags.join("");
}
