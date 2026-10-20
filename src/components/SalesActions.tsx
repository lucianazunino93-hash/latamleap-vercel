import { useContext, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LocalizedAnchor } from "@/lib/language";
import { LanguageContext } from "@/lib/language-context";
import { Copy } from "@/lib/copy";
import { CALENDAR_URL, DEMO_URL, whatsAppUrl } from "@/lib/sales";
import { track } from "@/lib/track";
import decisions from "../../shared/decisions.json";

export function BookButton({ className = "", ctaLocation }: { className?: string; ctaLocation: string }) {
  const language = useContext(LanguageContext);
  const { pathname } = useLocation();
  return <Button asChild size="lg" className={className}><a href={CALENDAR_URL} onClick={() => track("book_call_click", { cta_location: ctaLocation, lang: language, page_path: pathname })}><Copy es="Agendar 10 minutos" en="Book a 10-minute call" /></a></Button>;
}

export function DemoButton({ ctaLocation }: { ctaLocation: string }) {
  const language = useContext(LanguageContext);
  return <Button asChild size="lg" variant="outline"><a href={DEMO_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("demo_click", { cta_location: ctaLocation, lang: language })}><Copy es="Ver la demo" en="See the demo" /></a></Button>;
}

export function WhatsAppLink({ className = "inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4", ctaLocation, id, children }: { className?: string; ctaLocation: string; id?: string; children?: ReactNode }) {
  const language = useContext(LanguageContext);
  const label = decisions.showWhatsAppNumber ? undefined : children ?? <Copy es="o escríbenos por WhatsApp" en="or message us on WhatsApp" />;
  return <LocalizedAnchor id={id} href={whatsAppUrl(language)} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track("whatsapp_click", { cta_location: ctaLocation, lang: language })}>{label}</LocalizedAnchor>;
}

export function ArgentinaLink({ className = "inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4" }: { className?: string }) {
  if (!decisions.showArgentinaLinkOnHome) return null;
  return <a href="/argentina" hrefLang="es" lang="es" className={className} onClick={() => { document.cookie = "latamleap.lang=es; Path=/; Max-Age=31536000; SameSite=Lax"; }}><Copy es="¿Tu negocio está en Argentina?" en="Is your business in Argentina?" /></a>;
}
