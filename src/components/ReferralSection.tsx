import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import offers from "../../shared/offers.json";
import { Copy } from "@/lib/copy";
import { LanguageContext } from "@/lib/language-context";
import { ShareMarket, getRef, shareUrl, shareWhatsAppUrl } from "@/lib/referral";
import { track } from "@/lib/track";
import ReferralForm from "./ReferralForm";

const program = offers.referral;
const rewardArs = new Intl.NumberFormat("es-AR").format(program.rewardARS);

const rules = {
  es: [
    "Tu mes se acredita cuando tu recomendado paga el 50 % inicial.",
    `Los meses se acumulan: hasta ${program.capPerYear} por año.`,
    `Si todavía no tienes el plan de cuidado, te guardamos el mes durante ${program.holdMonths} meses.`,
    "Es un crédito de servicio, personal, para el plan de cuidado de tu web con nosotros.",
    "Si dos personas recomiendan al mismo negocio, vale la primera recomendación que recibimos.",
  ],
  en: [
    "Your month is credited when your referral pays their 50% deposit.",
    `Months stack: up to ${program.capPerYear} per year.`,
    `If you don't have the care plan yet, we keep your month for ${program.holdMonths} months.`,
    "It's a personal service credit for the care plan of your website with us.",
    "If two people refer the same business, the first referral we receive counts.",
  ],
  ar: [
    "Tu mes se acredita cuando tu recomendado paga el 50 % inicial.",
    `Los meses se acumulan: hasta ${program.capPerYear} por año.`,
    `Si todavía no tenés el mantenimiento, te guardamos el mes durante ${program.holdMonths} meses.`,
    "Es un crédito de servicio, personal, para el mantenimiento de tu web con nosotros.",
    "Si dos personas recomiendan al mismo negocio, vale la primera recomendación que recibimos.",
  ],
};

const argentinaSteps: { key: string; node: ReactNode }[] = [
  { key: "link", node: <><strong>Compartí tu link</strong> o dejanos sus datos acá abajo.</> },
  { key: "talk", node: <><strong>Hablamos 10 minutos</strong> con tu recomendado.</> },
  { key: "pay", node: <><strong>Cuando paga el 50 % para empezar</strong>, sumamos tu mes de regalo.</> },
];

export default function ReferralSection({ market = "us" }: { market?: "us" | "ar" }) {
  const language = useContext(LanguageContext);
  const shareMarket: ShareMarket = market === "ar" ? "ar" : language;
  const section = useRef<HTMLElement>(null);
  const seen = useRef(false);
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState("");
  useEffect(() => {
    const node = section.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || seen.current) return;
      seen.current = true;
      track("referral_section_view");
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  if (!program.enabled) return null;

  const copyLink = async () => {
    const url = shareUrl(shareMarket, getRef());
    track("referral_share_click", { method: "copy", lang: language });
    try {
      await navigator.clipboard.writeText(url);
      setFallback("");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setFallback(url);
    }
  };

  return <section id="referidos" ref={section} className="scroll-mt-24 bg-card py-20 lg:py-28">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <p className="section-kicker">{market === "ar" ? "Programa de referidos" : <Copy es="Programa de referidos" en="Referral program" />}</p>
        <h2 className="mb-5 text-4xl font-bold leading-[1.05] md:text-5xl">{market === "ar" ? "Recomendá Latam Leap y tu próximo mes va por nuestra cuenta." : <Copy es="Recomienda Latam Leap y tu próximo mes va por nuestra cuenta." en="Refer Latam Leap and your next month is on us." />}</h2>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{market === "ar"
          ? `¿Conocés a otro dueño de negocio que necesita su web? Presentanos. Cuando empiece su proyecto, te regalamos un mes de mantenimiento (ARS ${rewardArs}). Y la persona que recomendás recibe de regalo la optimización completa de su perfil de Google.`
          : <Copy es={`¿Conoces a otro dueño de negocio que necesita su web? Preséntanos. Cuando empiece su proyecto, te regalamos un mes de tu plan de cuidado (USD ${program.rewardUSD}). Y la persona que recomiendas recibe de regalo la optimización completa de su perfil de Google.`} en={`Know another business owner who needs a website? Introduce us. When their project starts, you get a free month of your care plan (USD ${program.rewardUSD}). And the person you refer gets a full Google Business Profile optimization as a gift.`} />}</p>
        <h3 className="mb-4 mt-8 text-xl font-bold">{market === "ar" ? "Cómo funciona" : <Copy es="Cómo funciona" en="How it works" />}</h3>
        <ol className="max-w-2xl space-y-3">
          {market === "ar" ? argentinaSteps.map(step => <li key={step.key}>{step.node}</li>) : <>
            <li><Copy es={<><strong>Compartes tu link</strong> o nos dejas sus datos aquí abajo.</>} en={<><strong>Share your link</strong> or leave their details below.</>} /></li>
            <li><Copy es={<><strong>Hablamos 10 minutos</strong> con tu recomendado.</>} en={<><strong>We talk with them for 10 minutes.</strong></>} /></li>
            <li><Copy es={<><strong>Cuando paga el 50 % para empezar</strong>, sumamos tu mes de regalo.</>} en={<><strong>When they pay the 50% deposit</strong>, your free month is added.</>} /></li>
          </>}
        </ol>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-bold">{market === "ar" ? (copied ? "Link copiado" : "Copiá mi link") : <Copy es={copied ? "Link copiado" : "Copiar mi link"} en={copied ? "Link copied" : "Copy my link"} />}</button>
          <a href={shareWhatsAppUrl(shareMarket)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground" onClick={event => { track("referral_share_click", { method: "whatsapp", lang: language }); event.currentTarget.href = shareWhatsAppUrl(shareMarket, getRef()); }}>
            {market === "ar" ? "Compartí por WhatsApp" : <Copy es="Compartir por WhatsApp" en="Share on WhatsApp" />}
          </a>
        </div>
        {fallback && <p className="mt-3 break-all text-sm">{market === "ar" ? "Copiá este link:" : <Copy es="Copia este link:" en="Copy this link:" />} {fallback}</p>}
        <ul className="mt-8 max-w-2xl space-y-2 text-sm text-muted-foreground">
          {(market === "ar" ? rules.ar : rules.es).map((rule, index) => <li key={rule}>{market === "ar" ? rule : <Copy es={rule} en={rules.en[index]} />}</li>)}
        </ul>
      </div>
      <div className="rounded-lg border border-border bg-background p-6 shadow-studio md:p-8">
        <ReferralForm market={market} />
      </div>
    </div>
  </section>;
}
