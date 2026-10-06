import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import seo from "../../shared/seo.json";
const pages: Record<string, string[]> = seo.pages;
export default function SEO() {
 const { pathname, hash } = useLocation();
 useEffect(() => {
  const page=pages[pathname]; const [title,description]=page || ["Compra de servicios | Latam Leap","Revisá el alcance y coordiná tu proyecto."];
  document.title=title;
  if(!["/","/services"].includes(pathname)) document.getElementById("page-schema")?.remove();
  const meta=(selector:string,value:string)=>document.querySelector(selector)?.setAttribute("content",value);
  meta('meta[name="description"]',description);meta('meta[property="og:title"]',title);meta('meta[property="og:description"]',description);meta('meta[property="og:url"]',`https://www.latamleap.com${pathname}`);meta('meta[name="twitter:title"]',title);meta('meta[name="twitter:description"]',description);meta('meta[name="robots"]',page && !["/privacy-policy","/terms-of-service","/data-deletion"].includes(pathname)?"index,follow":"noindex,follow");
  document.querySelector('link[rel="canonical"]')?.setAttribute("href",`https://www.latamleap.com${pathname}`);
  if(hash) requestAnimationFrame(()=>document.getElementById(hash.slice(1))?.scrollIntoView()); else window.scrollTo(0,0);
 },[pathname,hash]);return null;
}

