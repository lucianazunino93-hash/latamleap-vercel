import { forwardRef, useContext, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { LanguageContext } from "./language-context";
import { useCurrency } from "./currency-context";
import { translate } from "./language-copy";
export function Text({value}: {value: string | number | ReactNode}) {
  const language = useContext(LanguageContext);
  const { currency } = useCurrency();
  return typeof value === "string" ? translate(value, language, currency) : value;
}

export const LocalizedAnchor = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function LocalizedAnchor({href, ...props}, ref) {
  const language = useContext(LanguageContext);
  const { currency } = useCurrency();
  let target = language === "en" && href?.startsWith("/") && !href.startsWith("//") && !href.startsWith("/en")
    ? `/en${href === "/" ? "" : href}` : href;
  if(language === "en" && target?.startsWith("https://wa.me/") && target.includes("?text=")) {
    const url = new URL(target);
    const text = url.searchParams.get("text");
    if(text) url.searchParams.set("text", translate(text, language));
    target = url.href;
  }
  if (target?.startsWith("https://wa.me/")) {
    const url = new URL(target);
    const text = url.searchParams.get("text") || (language === "es" ? "Hola, quiero consultar por un proyecto." : "Hi, I would like to discuss a project.");
    url.searchParams.set("text", text + (language === "es" ? " Moneda de referencia: " : " Pricing currency: ") + currency + ".");
    target = url.href;
  }
  return <a {...props} href={target} ref={ref}/>;
});

export function LanguageSwitcher() {
  const language = useContext(LanguageContext);
  const {pathname, hash, search} = useLocation();
  const suffix = `${pathname === "/" ? "" : pathname}${search}${hash}`;
  return <div role="group" className="flex items-center gap-2 text-xs font-bold" aria-label={language === "es" ? "Idioma" : "Language"}>
    <a href={`${pathname}${search}${hash}`} hrefLang="es" lang="es" aria-current={language === "es" ? "page" : undefined} className={language === "es" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}>ES</a>
    <span aria-hidden="true" className="text-muted-foreground">/</span>
    <a href={`/en${suffix}`} hrefLang="en" lang="en" aria-current={language === "en" ? "page" : undefined} className={language === "en" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}>EN</a>
  </div>;
}
