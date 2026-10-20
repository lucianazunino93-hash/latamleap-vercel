import seo from "../../shared/seo.json";
import { analyticsHead } from "../../shared/tracking.mjs";

let started = false;

/** Load GA4 and the Meta pixel only after consent. Empty placeholder IDs stay unloaded. */
export function activateAnalytics() {
  if (started || typeof document === "undefined") return;
  started = true;
  const html = analyticsHead({
    ga4MeasurementId: seo.ga4MeasurementId,
    metaPixelId: seo.metaPixelId,
    consent: "granted",
  });
  if (!html) return;
  const template = document.createElement("template");
  template.innerHTML = html;
  template.content.querySelectorAll("script").forEach(node => {
    const script = document.createElement("script");
    for (const attr of Array.from(node.attributes)) script.setAttribute(attr.name, attr.value);
    script.async = node.async;
    script.text = node.textContent || "";
    document.head.appendChild(script);
  });
}
