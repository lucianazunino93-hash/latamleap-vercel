import { LanguageContext } from "@/lib/language-context";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "../../shared/seo.json";
import catalog from "../../shared/catalog.json";
import english from "../../shared/en.json";
import servicePages from "../../shared/service-pages.json";
import { createSeoModel, serializeSchema } from "../../shared/seo-model.mjs";
const model = createSeoModel({ seo, catalog, english, servicePages });

export default function SEO() {
  const { pathname, hash } = useLocation();
  const language = useContext(LanguageContext);
  const route = model.localized(pathname, language);
  useEffect(() => {
    const page = model.pages[route];
    const [title, description] = page || (language === "es" ? ["Página no disponible | Latam Leap", "Consultá nuestros servicios o volvé al inicio."] : ["Page unavailable | Latam Leap", "Explore our services or return to the home page."]);
    document.title = title;
    document.documentElement.lang = language;
    const meta = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
    meta('meta[name="description"]', description);
    meta('meta[property="og:title"]', title);
    meta('meta[property="og:description"]', description);
    meta('meta[property="og:url"]', `${model.origin}${route}`);
    meta('meta[property="og:locale"]', language === "es" ? "es_AR" : "en_US");
    meta('meta[name="twitter:title"]', title);
    meta('meta[name="twitter:description"]', description);
    meta('meta[name="robots"]', model.isIndexable(route) ? "index,follow,max-image-preview:large" : "noindex,follow");
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
  }, [pathname, hash, route, language]);
  return null;
}
