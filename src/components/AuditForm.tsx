import { Text } from "@/lib/language";
import { Copy } from "@/lib/copy";
import { useCurrency } from "@/lib/currency-context";
import { LanguageContext } from "@/lib/language-context";
import { useContext, useId, useRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CALENDAR_URL } from "@/lib/sales";
import { track } from "@/lib/track";
import { WhatsAppLink } from "@/components/SalesActions";

interface Props { showIndustry?: boolean; buttonText?: string; showWhatsAppAlt?: boolean; }

export default function AuditForm({ showWhatsAppAlt = true }: Props) {
  const { currency } = useCurrency();
  const language = useContext(LanguageContext);
  const id = useId();
  const solution = "Necesito orientación";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const submission = useRef({ fingerprint: "", id: "" });
  const cls = "block w-full mt-2 p-3 border border-border rounded-lg bg-card text-foreground";
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    const fields = new FormData(event.currentTarget);
    const payload = {
      name: String(fields.get("name") ?? "").trim(), email: String(fields.get("email") ?? "").trim(),
      phone: String(fields.get("phone") ?? "").trim(), solution: String(fields.get("solution") ?? ""),
      project: ["Negocio: " + String(fields.get("business") ?? "").trim(), "Sitio web: " + (String(fields.get("currentSite") ?? "").trim() || "No indicado"), "Quiere contarnos de su negocio para coordinar una reunión de 10 minutos."].join("\n"),
      website: String(fields.get("website") ?? ""), language, currency,
    };
    const fingerprint = JSON.stringify(payload);
    if (submission.current.fingerprint !== fingerprint) submission.current = { fingerprint, id: crypto.randomUUID() };
    sending.current = true; setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, submissionId: submission.current.id }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setError(response.status === 429 ? "rate" : "send");
        setStatus("error"); return;
      }
      track("generate_lead", { form_id: "contacto", lang: language, has_website: Boolean(String(fields.get("currentSite") ?? "").trim()) });
      setStatus("success");
    } catch {
      setError("send"); setStatus("error");
    } finally { sending.current = false; }
  };
  if (status === "success") return <div role="status" className="space-y-4"><h3 className="text-xl font-bold"><Copy es="Recibimos tu mensaje." en="We got your message." /></h3><p><Copy es="Te vamos a escribir al correo que dejaste. Si prefieres, agenda 10 minutos." en="We'll write to the email you left. If you prefer, book 10 minutes." /></p><a className="underline font-bold" href={CALENDAR_URL} onClick={() => track("book_call_click", { cta_location: "form_success", lang: language, page_path: window.location.pathname })}><Copy es="Agendar 10 minutos" en="Book a 10-minute call" /></a></div>;
  return <form onSubmit={submit} className="space-y-5" aria-busy={status === "sending"}>
    <fieldset disabled={status === "sending"} className="space-y-5">
      <label htmlFor={id + "name"} className="block text-sm"><Text value="Nombre" /><input id={id + "name"} name="name" autoComplete="name" required maxLength={100} className={cls} /></label>
      <label htmlFor={id + "business"} className="block text-sm"><Text value="Negocio" /><input id={id + "business"} name="business" autoComplete="organization" required maxLength={120} className={cls} /></label>
      <label htmlFor={id + "email"} className="block text-sm"><Text value="Correo" /><input id={id + "email"} name="email" type="email" autoComplete="email" required maxLength={254} className={cls} /></label>
      <label htmlFor={id + "phone"} className="block text-sm"><Text value="Teléfono" /><input id={id + "phone"} name="phone" type="tel" autoComplete="tel" maxLength={40} className={cls} /></label>
      <label htmlFor={id + "currentSite"} className="block text-sm"><Copy es="Sitio web, si tienes" en="Website, if you have one" /><input id={id + "currentSite"} name="currentSite" inputMode="url" autoComplete="url" maxLength={200} className={cls} /></label>
      <input type="hidden" name="solution" value={solution} />
      <div className="hidden" aria-hidden="true"><label htmlFor={id + "website"}>Website<input id={id + "website"} name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-xs text-muted-foreground"><Copy es="Usaremos tus datos para responder tu consulta. Lee nuestra " en="We'll use your details to reply. Read our " /><Link to="/privacy-policy" className="underline"><Copy es="política de privacidad" en="privacy policy" /></Link>.</p>
      <Button type="submit" className="w-full"><Copy es={status === "sending" ? "Enviando…" : "Enviar"} en={status === "sending" ? "Sending…" : "Send"} /></Button>
    </fieldset>
    {status === "error" && <p role="alert" className="text-sm text-destructive">{error === "rate"
      ? <Copy es="Espera un minuto antes de volver a enviar. También puedes escribirnos por WhatsApp." en="Wait a minute before sending again. You can also message us on WhatsApp." />
      : <Copy es="Algo falló al enviar. Tus datos siguen aquí: prueba de nuevo o escríbenos por WhatsApp." en="Something went wrong while sending. Your details are still here: try again or message us on WhatsApp." />}</p>}
    {showWhatsAppAlt && <WhatsAppLink ctaLocation="form" className="block min-h-11 text-center text-sm underline"><Copy es="Prefiero escribir por WhatsApp" en="I'd rather message on WhatsApp" /></WhatsAppLink>}
  </form>;
}
