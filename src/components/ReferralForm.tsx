import { Copy } from "@/lib/copy";
import { useCurrency } from "@/lib/currency-context";
import { LanguageContext } from "@/lib/language-context";
import { getRef } from "@/lib/referral";
import { track } from "@/lib/track";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/SalesActions";
import { FormEvent, useContext, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

const phonePattern = /^[+\d\s().-]{6,40}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ReferralForm({ market = "us" }: { market?: "us" | "ar" }) {
  const { currency } = useCurrency();
  const language = useContext(LanguageContext);
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [refCode, setRefCode] = useState("");
  const sending = useRef(false);
  const submission = useRef({ fingerprint: "", id: "" });
  const cls = "mt-2 block min-h-11 w-full rounded-lg border border-border bg-card p-3 text-foreground";
  useEffect(() => { setRefCode(getRef()); }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current) return;
    const fields = new FormData(event.currentTarget);
    const phone = String(fields.get("phone") ?? "").trim();
    if (phone && !phonePattern.test(phone)) { setStatus("error"); return; }
    if (!fields.get("aware")) { setStatus("error"); return; }
    const code = getRef();
    const referredName = String(fields.get("referredName") ?? "").trim();
    const referredBusiness = String(fields.get("referredBusiness") ?? "").trim();
    const referredContact = String(fields.get("referredContact") ?? "").trim();
    const payload = {
      name: String(fields.get("name") ?? "").trim(),
      email: String(fields.get("email") ?? "").trim(),
      phone,
      solution: "Referido",
      project: `Recomendado: ${referredName} · ${referredBusiness} · ${referredContact}\nCódigo: ${code || "ninguno"}\nConfirmó que el recomendado sabe que lo contactarán: sí${market === "ar" ? "\nMercado: Argentina" : ""}`,
      website: String(fields.get("website") ?? ""),
      language,
      currency: market === "ar" ? "ARS" : currency,
    };
    const fingerprint = JSON.stringify(payload);
    if (submission.current.fingerprint !== fingerprint) submission.current = { fingerprint, id: crypto.randomUUID() };
    sending.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submissionId: submission.current.id }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) { setStatus("error"); return; }
      track("referral_submit", {
        lang: language,
        has_ref_code: Boolean(code),
        referred_contact_type: emailPattern.test(referredContact) ? "email" : "phone",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally { sending.current = false; }
  };

  const text = (es: string, en: string, vos = es) => market === "ar" ? vos : <Copy es={es} en={en} />;

  if (status === "success") return <div role="status" className="space-y-3"><h3 className="text-xl font-bold">{text("¡Gracias!", "Thank you!")}</h3><p>{text("Le escribimos a tu recomendado en los próximos 2 días hábiles y te avisamos cuando se acredite tu mes.", "We'll reach out to your referral within 2 business days and let you know when your month is credited.")}</p></div>;

  return <form onSubmit={submit} className="space-y-5" aria-busy={status === "sending"}>
    <h3 className="text-2xl font-bold">{text("Recomienda a alguien", "Refer someone", "Recomendá a alguien")}</h3>
    <fieldset disabled={status === "sending"} className="space-y-5">
      <label htmlFor={id + "name"} className="block text-sm">{text("Tu nombre", "Your name")}<input id={id + "name"} name="name" autoComplete="name" required maxLength={100} className={cls} /></label>
      <label htmlFor={id + "email"} className="block text-sm">{text("Tu email", "Your email")}<input id={id + "email"} name="email" type="email" autoComplete="email" required maxLength={254} className={cls} /></label>
      <label htmlFor={id + "phone"} className="block text-sm">{text("Tu WhatsApp (opcional)", "Your WhatsApp (optional)")}<input id={id + "phone"} name="phone" type="tel" autoComplete="tel" maxLength={40} pattern="[+\d\s().-]{6,40}" className={cls} /></label>
      <label htmlFor={id + "referredName"} className="block text-sm">{text("Nombre de tu recomendado", "Their name")}<input id={id + "referredName"} name="referredName" required maxLength={100} className={cls} /></label>
      <label htmlFor={id + "referredBusiness"} className="block text-sm">{text("Su negocio", "Their business")}<input id={id + "referredBusiness"} name="referredBusiness" required maxLength={120} className={cls} /></label>
      <label htmlFor={id + "referredContact"} className="block text-sm">{text("Su teléfono o email", "Their phone or email")}<input id={id + "referredContact"} name="referredContact" required maxLength={120} className={cls} /></label>
      <input type="hidden" name="ref" value={refCode} />
      <div className="hidden" aria-hidden="true"><label htmlFor={id + "website"}>Website<input id={id + "website"} name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex min-h-11 items-start gap-3 text-sm">
        <input type="checkbox" name="aware" required className="mt-1 h-5 w-5 shrink-0" />
        <span>{text("Mi recomendado sabe que lo van a contactar.", "The person I'm referring knows you'll contact them.")}</span>
      </label>
      <p className="text-xs text-muted-foreground">{text("Usaremos estos datos para contactar a tu recomendado una vez y para acreditar tu mes. Lee nuestra ", "We'll use these details to contact your referral once and to credit your month. Read our ", "Usaremos estos datos para contactar a tu recomendado una vez y para acreditar tu mes. Leé nuestra ")}<Link to="/privacy-policy" className="underline">{text("política de privacidad", "privacy policy")}</Link>.</p>
      <Button type="submit" className="min-h-11 w-full">{text(status === "sending" ? "Enviando…" : "Enviar recomendación", status === "sending" ? "Sending…" : "Send referral")}</Button>
    </fieldset>
    {status === "error" && <p role="alert" className="text-sm text-destructive">{text("Algo falló al enviar. Tus datos siguen aquí: prueba de nuevo o escríbenos por WhatsApp.", "Something went wrong while sending. Your details are still here: try again or message us on WhatsApp.", "Algo falló al enviar. Tus datos siguen acá: probá de nuevo o escribinos por WhatsApp.")}</p>}
    <WhatsAppLink ctaLocation="referral_form" className="inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4">WhatsApp</WhatsAppLink>
  </form>;
}
