import { LanguageContext } from "@/lib/language-context";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "../../shared/seo.json";
const pages: Record<string, string[]> = seo.pages;
export default function SEO() {
 const { pathname, hash } = useLocation();
 const language = useContext(LanguageContext);
 const route = language === "en" ? `/en${pathname === "/" ? "" : pathname}` : pathname;
 useEffect(() => {
  const page=pages[route]; const [title,description]=page || ["Compra de servicios | Latam Leap","Revisá el alcance y coordiná tu proyecto."];
  document.title=title; document.documentElement.lang=language;
  metaLocale();
  function metaLocale(){document.querySelector('meta[property="og:locale"]')?.setAttribute("content",language === "en" ? "en_US" : "es_AR");}
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link=>link.remove());
  for(const [lang,path] of [["es",pathname],["en",`/en${pathname === "/" ? "" : pathname}`],["x-default",pathname]]) {const link=document.createElement("link");link.rel="alternate";link.hreflang=lang;link.href=`${seo.origin}${path}`;document.head.appendChild(link);}
  if(!["/","/services"].includes(pathname)) document.getElementById("page-schema")?.remove();
  const meta=(selector:string,value:string)=>document.querySelector(selector)?.setAttribute("content",value);
  meta('meta[name="description"]',description);meta('meta[property="og:title"]',title);meta('meta[property="og:description"]',description);meta('meta[property="og:url"]',`https://www.latamleap.com${route}`);meta('meta[name="twitter:title"]',title);meta('meta[name="twitter:description"]',description);meta('meta[name="robots"]',page && !["/privacy-policy","/terms-of-service","/data-deletion"].includes(pathname)?"index,follow":"noindex,follow");
  document.querySelector('link[rel="canonical"]')?.setAttribute("href",`https://www.latamleap.com${route}`);
  if(hash) requestAnimationFrame(()=>document.getElementById(hash.slice(1))?.scrollIntoView()); else window.scrollTo(0,0);
 },[pathname,hash,route,language]);return null;
}

