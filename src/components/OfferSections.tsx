import { useContext } from "react";
import { Check } from "lucide-react";
import offers from "../../shared/offers.json";
import { formatAmount, formatLaunchDate, isLaunchActive, quoteTier } from "../../shared/geo.mjs";
import { LanguageContext } from "@/lib/language-context";
import { useCurrency } from "@/lib/currency-context";
import { Text, LocalizedAnchor } from "@/lib/language";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const outcomes = [
  ["El trabajo se lo queda quien atiende", "Si estás con un cliente y no contestás, esa persona llama al siguiente. No deja un mensaje para esperar."],
  ["Ya habías pagado por esa llamada", "El aviso, la camioneta o la ficha de Google ya te habían puesto delante. La llamada perdida tira ese costo."],
  ["La reseña también se va", "Quien hace el trabajo pide la reseña. El siguiente negocio se vuelve más fácil de encontrar que el tuyo."],
];
const questions = [
  ["¿El precio es el que está publicado?", "Sí. El precio tachado es el de lista. El precio grande es el de lanzamiento, mientras queden lugares y hasta la fecha del banner. Cada nivel incluye el anterior. En Estados Unidos se ve en dólares. En Argentina, en pesos. No hay checkout en el sitio."],
  ["¿Puedo confiar en un estudio que trabaja desde otro país?", "Latam Leap lo lleva Luciana Zunino desde Argentina. Trabajamos en inglés y en español. Antes de pagar ves la maqueta. La web, el perfil de Google y los accesos quedan a tu nombre. La llamada se agenda en tu horario."],
  ["¿Cuánto tarda?", "La maqueta está en 48 horas. Si la aprobás, publicamos el sitio, Google Maps y la respuesta del nivel que elegiste. No cobramos el diseño antes de esa aprobación."],
  ["¿Tengo que saber de tecnología?", "No. Armamos el sitio, el perfil de Google y el mensaje o la recepcionista. Vos nos das el servicio, la zona y cómo te contactan."],
  ["¿Puedo frenar el abono?", "Sí. Presencia no tiene abono. En los otros niveles el abono mensual se puede frenar cuando quieras. La maqueta no se paga."],
  ["¿Y si no me gusta la maqueta?", "No pagás. El siguiente paso es ver el diseño. En Estados Unidos, si seguimos, el pago es un enlace de Wise que te enviamos después de la aprobación."],
];

function rememberPlan(id: string) {
  try { sessionStorage.setItem("latamleap.plan", id); } catch { /* The form still offers every tier. */ }
}

export function LaunchBanner() {
  const language = useContext(LanguageContext);
  const launch = offers.launch;
  if (!isLaunchActive(launch)) return null;
  const date = formatLaunchDate(launch.endsOn, language);
  const copy = language === "en"
    ? `Founding client offer: first ${launch.spotsTotal} clients. Launch prices until ${date}. ${launch.spotsLeft} spots left.`
    : `Oferta de clientes fundadores: los primeros ${launch.spotsTotal}. Precios de lanzamiento hasta el ${date}. Quedan ${launch.spotsLeft} lugares.`;
  return <aside className="bg-foreground text-background px-5 py-3 text-center text-sm font-bold" aria-label={language === "en" ? "Launch offer" : "Oferta de lanzamiento"}>{copy}</aside>;
}

export function OutcomesSection() {
  return <section className="py-16 lg:py-24 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <AnimatedSection className="max-w-3xl mb-10"><p className="section-kicker"><Text value="El problema" /></p><h2 className="text-4xl md:text-6xl font-bold leading-[1.02]"><Text value="Una llamada perdida es un trabajo que se fue con otro." /></h2></AnimatedSection>
    <div className="grid md:grid-cols-3 gap-6">{outcomes.map(([title, text], index) => <AnimatedSection key={title} delay={index * 0.05} className="bg-card border border-border rounded-xl p-7"><h3 className="text-2xl font-bold mb-3"><Text value={title} /></h3><p className="text-muted-foreground leading-relaxed"><Text value={text} /></p></AnimatedSection>)}</div>
    <p className="text-sm text-muted-foreground mt-8 max-w-3xl"><Text value="En 60 cuentas de contratistas, el mensaje automático tras una llamada perdida recuperó en promedio el 22% de esas llamadas como trabajos agendados." /> <a className="underline" href="https://gorapidlocal.com/blog/missed-call-text-back-roi" target="_blank" rel="noopener noreferrer">GoRapidLocal</a>. <Text value="Es un dato publicado por ellos, no un resultado de Latam Leap." /></p>
    <div className="mt-8"><Button asChild size="lg"><LocalizedAnchor href="/#contacto"><Text value="Pedí tu maqueta gratis en 48 horas" /></LocalizedAnchor></Button></div>
  </div></section>;
}

export function TradesSection() {
  const examples = [
    ["electricians", "Electricistas"],
    ["plumbers", "Plomeros"],
    ["hvac", "HVAC"],
    ["cleaning", "Limpieza"],
  ];
  return <section id="para-quien" className="py-12 scroll-mt-24"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <p className="text-lg text-muted-foreground max-w-3xl"><Text value="Oficios del hogar y otros negocios que viven de una llamada o un turno, en cualquier ciudad de Estados Unidos. También clínicas, estudios y salones." /></p>
    <ul className="flex flex-wrap gap-3 mt-6">{examples.map(([id, label]) => <li key={id} id={id} className="scroll-mt-24 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold"><Text value={label} /></li>)}</ul>
  </div></section>;
}

export function OfferPricing() {
  const language = useContext(LanguageContext);
  const { currency, arsPerUsd, rateSource } = useCurrency();
  const launch = isLaunchActive(offers.launch);
  const copy = language === "en" ? "en" : "es";
  const rateLabel = rateSource === "fallback"
    ? (language === "es" ? "cotización de respaldo" : "fallback rate")
    : (language === "es" ? "cotización del día" : "today's rate");
  return <section id="precios" className="py-20 lg:py-28 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <div className="max-w-3xl mb-12"><p className="section-kicker"><Text value="La oferta" /></p><h2 className="text-4xl md:text-6xl font-bold mb-5"><Text value="Tres niveles. Cada uno incluye el anterior." /></h2><p className="text-lg text-muted-foreground"><Text value="El precio tachado es el de lista. El precio grande es el de lanzamiento. Captación automática suma el mensaje y la reseña sobre Presencia. El asistente suma la recepcionista sobre Captación automática. Ves la maqueta antes de pagar. En Estados Unidos, el pago es un enlace de Wise." /></p></div>
    <div className="grid lg:grid-cols-3 gap-6">{offers.tiers.map(tier => {
      const quote = quoteTier(tier, currency, arsPerUsd, launch);
      return <article key={tier.id} className={`bg-card rounded-xl p-7 flex flex-col ${tier.recommended ? "border-2 border-primary shadow-studio" : "border border-border"}`}>
        <div className="min-h-6 mb-4">{tier.recommended ? <span className="text-xs font-bold uppercase text-primary-text"><Text value="Recomendado" /></span> : null}</div>
        <h3 className="text-2xl font-bold">{tier.name[copy]}</h3>
        <p className="font-bold mt-4">{tier.includes[copy]}</p>
        <p className="text-muted-foreground my-4">{tier.summary[copy]}</p>
        <p className="text-sm text-muted-foreground">{launch && quote.regular != null ? <Text value="Precio de lanzamiento" /> : <Text value="Precio" />}</p>
        {quote.regular != null ? <p className="text-lg text-muted-foreground line-through">{formatAmount(quote.regular, currency, language)}</p> : null}
        <p className="text-3xl xl:text-4xl font-bold">{formatAmount(quote.setup, currency, language)}</p>
        {quote.monthly > 0 ? <p className="text-lg font-bold mt-1">+ {formatAmount(quote.monthly, currency, language)}<span className="text-base font-medium text-muted-foreground">{language === "es" ? "/mes" : "/month"}</span></p> : <p className="text-sm text-muted-foreground mt-1"><Text value="Pago inicial, sin abono." /></p>}
        <ul className="space-y-3 my-6 flex-1">{tier.features[copy].map(feature => <li key={feature} className="flex gap-2 text-sm"><Check size={18} aria-hidden="true" className="text-primary-text shrink-0" />{feature}</li>)}</ul>
        <Button asChild size="lg"><LocalizedAnchor href="/#contacto" onClick={() => rememberPlan(tier.id)}><Text value="Pedí tu maqueta gratis en 48 horas" /></LocalizedAnchor></Button>
      </article>;
    })}</div>
    <p className="text-sm text-muted-foreground mt-6">{currency === "ARS"
      ? (language === "es" ? `Pesos proporcionales a los dólares de Argentina, a ${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 }).format(arsPerUsd)} ARS por dólar (${rateLabel}).` : `Pesos proportional to Argentina's dollar amounts, at ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(arsPerUsd)} ARS per US dollar (${rateLabel}).`)
      : <Text value="Precios de Estados Unidos, en dólares. El pago, cuando corresponda, es un enlace de Wise: no hay checkout en el sitio. En Argentina vas a ver el equivalente proporcional en pesos." />}</p>
  </div></section>;
}

const guarantees = [
  ["Maqueta gratis", "En 48 horas ves una página con tu servicio y tu zona. Esa entrega no se paga."],
  ["Pagás si la aprobás", "No hay checkout en el sitio. El pago queda para después de que apruebes el diseño."],
  ["El abono se puede frenar", "Presencia no tiene mensualidad. En los otros niveles podés frenar el abono cuando quieras."],
];
export function RiskReversal() {
  return <section className="py-16 lg:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <AnimatedSection className="max-w-3xl mb-10"><p className="section-kicker"><Text value="Sin riesgo de entrada" /></p><h2 className="text-4xl md:text-5xl font-bold"><Text value="Primero ves el diseño. Después decidís." /></h2></AnimatedSection>
    <div className="grid md:grid-cols-3 gap-6">{guarantees.map(([title, text]) => <article key={title} className="border border-border rounded-xl p-7 bg-card"><h3 className="text-2xl font-bold mb-3"><Text value={title} /></h3><p className="text-muted-foreground leading-relaxed"><Text value={text} /></p></article>)}</div>
    <div className="mt-8"><Button asChild size="lg"><LocalizedAnchor href="/#contacto"><Text value="Pedí tu maqueta gratis en 48 horas" /></LocalizedAnchor></Button></div>
  </div></section>;
}

export function OfferFAQ() {
  return <section className="py-20"><div className="max-w-4xl mx-auto px-5 sm:px-6"><p className="section-kicker"><Text value="Objeciones" /></p><h2 className="text-4xl font-bold mb-8"><Text value="Precio, confianza, tiempo y tecnología." /></h2>{questions.map(([question, answer]) => <details key={question} className="border-b border-border py-5"><summary className="font-bold cursor-pointer"><Text value={question} /></summary><p className="text-muted-foreground leading-relaxed mt-4"><Text value={answer} /></p></details>)}</div></section>;
}
