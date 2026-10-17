import { Button } from "@/components/ui/button";
import { LocalizedAnchor } from "@/lib/language";
import { Copy } from "@/lib/copy";
import { CALENDAR_URL, EXAMPLE_URL, whatsAppUrl } from "@/lib/sales";

export function BookButton({ className = "" }: { className?: string }) {
  return <Button asChild size="lg" className={className}><a href={CALENDAR_URL}><Copy es="Agendar 10 minutos" en="Book 10 minutes" /></a></Button>;
}

export function ExampleButton() {
  return <Button asChild size="lg" variant="outline"><a href={EXAMPLE_URL} target="_blank" rel="noopener noreferrer"><Copy es="Ver un ejemplo" en="See an example" /></a></Button>;
}

export function WhatsAppLink({ className = "inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4" }: { className?: string }) {
  return <LocalizedAnchor href={whatsAppUrl("es")} target="_blank" rel="noopener noreferrer" className={className}><Copy es="o escríbeme por WhatsApp" en="or message me on WhatsApp" /></LocalizedAnchor>;
}

export function ArgentinaLink({ className = "inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4" }: { className?: string }) {
  return <a href="/argentina" hrefLang="es" lang="es" className={className} onClick={() => { document.cookie = "latamleap.lang=es; Path=/; Max-Age=31536000; SameSite=Lax"; }}><Copy es="¿Tu negocio está en Argentina?" en="Is your business in Argentina?" /></a>;
}
