import { forwardRef, useContext, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { LanguageContext } from "./language-context";
import { useCurrency } from "./currency-context";
import { translate } from "./language-copy";
import { WHATSAPP_TEXT, rememberLanguage } from "./sales";
import { contactWhatsAppText } from "./referral";
import { track } from "./track";
export function Text({value}: {value: string | number | ReactNode}) {
  const language = useContext(LanguageContext);
  const { currency } = useCurrency();
  return typeof value === "string" ? translate(value, language, currency) : value;
}

export const LocalizedAnchor = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(function LocalizedAnchor({href, onClick, ...props}, ref) {
  const language = useContext(LanguageContext);
  let target = language === "en" && href?.startsWith("/") && !href.startsWith("//") && !href.startsWith("/en")
    ? `/en${href === "/" ? "" : href}` : href;
  if (target?.startsWith("https://wa.me/")) {
    const url = new URL(target);
    if (url.pathname.replace(/\//g, "")) {
      url.searchParams.set("text", WHATSAPP_TEXT[language]);
      target = url.href;
    }
  }
  return <a {...props} href={target} ref={ref} onClick={event => {
    if (event.currentTarget.href.startsWith("https://wa.me/")) {
      const url = new URL(event.currentTarget.href);
      if (url.pathname.replace(/\//g, "")) {
        url.searchParams.set("text", contactWhatsAppText(language));
        event.currentTarget.href = url.href;
      }
    }
    onClick?.(event);
  }} />;
});

export function LanguageSwitcher() {
  const language = useContext(LanguageContext);
  const {pathname, hash, search} = useLocation();
  if (pathname === "/argentina") return null;
  const bare = `${pathname === "/" ? "" : pathname}${search}${hash}`;
  const esHref = language === "en" ? `/es${bare}` : `${pathname}${search}${hash}`;
  const enHref = language === "en" ? `${pathname}${search}${hash}` : `/en${bare}`;
  return <div role="group" className="flex items-center text-sm font-bold" aria-label={language === "es" ? "Idioma" : "Language"}>
    <a href={esHref} hrefLang="es" lang="es" aria-current={language === "es" ? "page" : undefined} onClick={() => { track("lang_switch", { from: language, to: "es" }); rememberLanguage("es"); }} className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 ${language === "es" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}`}>ES</a>
    <span aria-hidden="true" className="text-muted-foreground">/</span>
    <a href={enHref} hrefLang="en" lang="en" aria-current={language === "en" ? "page" : undefined} onClick={() => { track("lang_switch", { from: language, to: "en" }); rememberLanguage("en"); }} className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 ${language === "en" ? "text-foreground underline underline-offset-4" : "text-muted-foreground"}`}>EN</a>
  </div>;
}
