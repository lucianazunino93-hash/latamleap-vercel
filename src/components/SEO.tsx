import { LanguageContext } from "@/lib/language-context";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "../../shared/seo.json";
import catalog from "../../shared/catalog.json";
import english from "../../shared/en.json";
import offers from "../../shared/offers.json";
import servicePages from "../../shared/service-pages.json";
import { createSeoModel, serializeSchema, shareImageAlt } from "../../shared/seo-model.mjs";
import decisions from "../../shared/decisions.json";
const model = createSeoModel({ seo, catalog, english, servicePages, offers, contactPhone: decisions.contactPhone });

export default function SEO() {
  const { pathname, hash, search } = useLocation();
  const language = useContext(LanguageContext);
  const route = model.localized(pathname, language);
  useEffect(() => {
    const page = model.pages[route];
    const [title, description] = page || (language === "es" ? ["Página no disponible | Latam Leap", "Consulta nuestros servicios o vuelve al inicio."] : ["Page unavailable | Latam Leap", "Explore our services or return to the home page."]);
    document.title = title;
    document.documentElement.lang = model.htmlLang(route);
    const meta = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
    meta('meta[name="description"]', description);
    meta('meta[property="og:title"]', title);
    meta('meta[property="og:description"]', description);
    meta('meta[property="og:url"]', `${model.origin}${route}`);
    const htmlLang = model.htmlLang(route);
    meta('meta[property="og:locale"]', htmlLang === "en" ? "en_US" : htmlLang === "es-AR" ? "es_AR" : "es_ES");
    meta('meta[name="twitter:title"]', title);
    meta('meta[name="twitter:description"]', description);
    const imageAlt = shareImageAlt(language);
    const params = new URLSearchParams(search);
    const previewVisit = params.get("utm_source") === "cold_email" || Boolean(params.get("preview"));
    meta('meta[property="og:image"]', `${model.origin}/og-latamleap.png`);
    meta('meta[property="og:image:alt"]', imageAlt);
    meta('meta[name="twitter:image"]', `${model.origin}/og-latamleap.png`);
    meta('meta[name="twitter:image:alt"]', imageAlt);
    meta('meta[name="twitter:card"]', "summary_large_image");
    meta('meta[name="robots"]', previewVisit ? "noindex,follow" : model.isIndexable(route) ? "index,follow,max-image-preview:large" : "noindex,follow");
    const google = String(seo.googleSiteVerification || "").trim();
    if (google) {
      let tag = document.querySelector('meta[name="google-site-verification"]');
      if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", "google-site-verification"); document.head.appendChild(tag); }
      tag.setAttribute("content", google);
    }
    const pixel = String(seo.metaPixelId || "").trim();
    const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (/^[0-9]+$/.test(pixel) && fbq) fbq("track", "PageView");
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `${model.origin}${route}`);
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    if (page) for (const [lang, url] of Object.entries(model.alternates(route))) {
      const link = document.createElement("link"); link.rel = "alternate"; link.hreflang = lang; link.href = String(url); document.head.appendChild(link);
    }
    document.getElementById("page-schema")?.remove();
    const graph = model.schema(route);
    if (graph) {
      const script = document.createElement("script"); script.id = "page-schema"; script.type = "application/ld+json"; script.textContent = serializeSchema(graph); document.head.appendChild(script);
    }
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView()); else window.scrollTo(0, 0);
  }, [pathname, hash, search, route, language]);
  return null;
}
