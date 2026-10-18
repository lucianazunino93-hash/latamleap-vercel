import { forwardRef, useContext, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { LanguageContext } from "./language-context";
import { useCurrency } from "./currency-context";
import { translate } from "./language-copy";
import { WHATSAPP_TEXT, rememberLanguage } from "./sales";
export function Text({value}: {value: string | number | ReactNode}) {
  const language = useContext(LanguageContext);
  const { currency } = useCurrency();
  return typeof value === "string" ? translate(value, language, currency) : value;
}

export const LocalizedAnchor = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function LocalizedAnchor({href, ...props}, ref) {
  const language = useContext(LanguageContext);
  let target = language === "en" && href?.startsWith("/") && !href.startsWith("//") && !href.startsWith("/en")
    ? `/en${href === "/" ? "" : href}` : href;
  if (target?.startsWith("https://wa.me/")) {
    const url = new URL(target);
    url.searchParams.set("text", WHATSAPP_TEXT[language]);
    target = url.href;
  }
  return <a {...props} href={target} ref={ref}/>;
});

export function LanguageSwitcher() {
  const language = useContext(LanguageContext);
  const {pathname, hash, search} = useLocation();
  if (pathname === "/argentina") return null;
  const bare = `${pathname === "/" ? "" : pathname}${search}${hash}`;
  const esHref = language === "en" ? `/es${bare}` : `${pathname}${search}${hash}`;
  const enHref = language === "en" ? `${pathname}${search}${hash}` : `/en${bare}`;
  return <div role="group" className="flex items-center text-sm font-bold" aria-label={language === "es" ? "Idioma" : "Language"}>
    <a href={esHref} hrefLang="es" lang="es" aria-current={language === "es" ? "page" : undefined} onClick={() => rememberLanguage("es")} className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 ${language === "es" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}`}>ES</a>
    <span aria-hidden="true" className="text-muted-foreground">/</span>
    <a href={enHref} hrefLang="en" lang="en" aria-current={language === "en" ? "page" : undefined} onClick={() => rememberLanguage("en")} className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 ${language === "en" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}`}>EN</a>
  </div>;
}
