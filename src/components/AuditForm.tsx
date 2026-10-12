import { Text, LocalizedAnchor } from "@/lib/language";
import { useCurrency } from "@/lib/currency-context";
import { LanguageContext } from "@/lib/language-context";
import { useContext, useEffect, useId, useRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props { showIndustry?: boolean; buttonText?: string; showWhatsAppAlt?: boolean; }
const plans: Record<string, string> = { presence: "Presencia", leads: "Captación automática", assistant: "Asistente con IA" };

export default function AuditForm({ showWhatsAppAlt = true }: Props) {
  const { currency } = useCurrency();
  const language = useContext(LanguageContext);
  const id = useId();
  const [solution, setSolution] = useState("Necesito orientación");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);
  const submission = useRef({ fingerprint: "", id: "" });
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("latamleap.plan");
      if (saved && plans[saved]) setSolution(plans[saved]);
    } catch { /* The visitor can still choose a tier. */ }
  }, []);
  const cls = "block w-full mt-2 p-3 border border-border rounded-lg bg-card text-foreground";
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    const fields = new FormData(event.currentTarget);
    const payload = {
      name: String(fields.get("name") ?? "").trim(), email: String(fields.get("email") ?? "").trim(),
      phone: String(fields.get("phone") ?? "").trim(), solution: String(fields.get("solution") ?? ""),
      project: String(fields.get("project") ?? "").trim(), website: String(fields.get("website") ?? ""), language, currency,
    };
    const fingerprint = JSON.stringify(payload);
    if (submission.current.fingerprint !== fingerprint) submission.current = { fingerprint, id: crypto.randomUUID() };
    sending.current = true; setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, submissionId: submission.current.id }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setError(response.status === 429 ? "Esperá un minuto antes de volver a enviar. También podés escribirnos por WhatsApp." : "No pudimos enviar tu consulta. Tus datos siguen acá: intentá nuevamente o escribinos por WhatsApp.");
        setStatus("error"); return;
      }
      setStatus("success");
    } catch {
      setError("No pudimos enviar tu consulta. Tus datos siguen acá: intentá nuevamente o escribinos por WhatsApp."); setStatus("error");
    } finally { sending.current = false; }
  };
  if (status === "success") return <div role="status" className="space-y-4"><h3 className="text-xl font-bold"><Text value="¡Recibimos tu consulta!" /></h3><p><Text value="Gracias por contarnos sobre tu negocio. Te vamos a contactar por el correo que nos dejaste." /></p><LocalizedAnchor className="underline" href="https://wa.me/5493512085644" target="_blank" rel="noopener noreferrer"><Text value="También podés escribirnos por WhatsApp →" /></LocalizedAnchor></div>;
  return <form onSubmit={submit} className="space-y-5" aria-busy={status === "sending"}>
    <fieldset disabled={status === "sending"} className="space-y-5">
      <label htmlFor={id + "name"} className="block text-sm"><Text value="Nombre" /><input id={id + "name"} name="name" autoComplete="name" required maxLength={100} className={cls} /></label>
      <label htmlFor={id + "email"} className="block text-sm"><Text value="Tu correo" /><input id={id + "email"} name="email" type="email" autoComplete="email" required maxLength={254} className={cls} /></label>
      <label htmlFor={id + "phone"} className="block text-sm"><Text value="WhatsApp (opcional)" /><input id={id + "phone"} name="phone" type="tel" autoComplete="tel" maxLength={40} className={cls} /></label>
      <label htmlFor={id + "solution"} className="block text-sm"><Text value="¿Qué nivel te interesa?" /><select id={id + "solution"} name="solution" value={solution} onChange={event => setSolution(event.target.value)} className={cls}>{["Presencia", "Captación automática", "Asistente con IA", "Necesito orientación"].map(value => <option key={value} value={value}><Text value={value} /></option>)}</select></label>
      <label htmlFor={id + "project"} className="block text-sm"><Text value="Contanos sobre tu proyecto" /><textarea id={id + "project"} name="project" required maxLength={1500} rows={4} className={cls} /></label>
      <div className="hidden" aria-hidden="true"><label htmlFor={id + "website"}>Website<input id={id + "website"} name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-xs text-muted-foreground"><Text value="Usaremos tus datos para responder tu consulta. Leé nuestra " /><Link to="/privacy-policy" className="underline"><Text value="política de privacidad" /></Link>.</p>
      <Button type="submit" className="w-full"><Text value={status === "sending" ? "Enviando…" : "Pedir la maqueta gratis"} /></Button>
    </fieldset>
    {status === "error" && <p role="alert" className="text-sm text-destructive"><Text value={error} /></p>}
    {showWhatsAppAlt && <LocalizedAnchor className="block text-sm underline text-center" href="https://wa.me/5493512085644" target="_blank" rel="noopener noreferrer"><Text value="Prefiero escribir directamente" /></LocalizedAnchor>}
  </form>;
}
