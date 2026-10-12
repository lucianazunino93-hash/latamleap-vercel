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
  ["Una llamada perdida es un trabajo perdido", "Si estás en una obra y no atendés, esa persona llama al siguiente electricista o plomero."],
  ["Que ninguna llamada quede sin respuesta", "Una recepcionista con IA atiende. Si no podés contestar, sale un mensaje automático."],
  ["Más reseñas y más presencia en Maps", "Después del trabajo se pide la reseña, y tu perfil de Google queda listo para que te encuentren."],
];
const questions = [
  ["¿Cada nivel incluye el anterior?", "Sí. Captación automática incluye todo lo de Presencia. El asistente con IA incluye todo lo de Captación automática, y por lo tanto también Presencia. No se contratan por separado."],
  ["¿El precio depende del país?", "En Estados Unidos ves los precios de Estados Unidos, en dólares. En Argentina ves los precios de Argentina, en pesos, proporcionales a los de Estados Unidos. El resto de los países ve los precios de Estados Unidos."],
  ["¿Qué es la maqueta gratis?", "En 48 horas te mostramos una página con tu oficio, tu ciudad y tu forma de contacto. La llamada y la maqueta no son un pago."],
  ["¿El asistente reemplaza a mi equipo?", "No. Atiende cuando estás en un trabajo y toma los datos. Los casos que necesitan una persona siguen llegando a vos."],
  ["¿Hay un costo mensual?", "Presencia es un pago inicial. Captación automática y el asistente suman un abono mensual para mantener el mensaje automático, las reseñas y la recepcionista."],
  ["¿Hasta cuándo duran los precios de lanzamiento?", "Hasta la fecha y la cantidad de lugares publicados en el sitio. Esa fecha no se reinicia sola y el contador no baja solo: lo actualizamos en la configuración cuando entra un cliente."],
  ["¿Cómo se paga en Estados Unidos?", "No hay checkout en el sitio. Después de la llamada, si seguimos, te enviamos un enlace de pago de Wise. La maqueta y la llamada no se pagan."],
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
    <AnimatedSection className="max-w-3xl mb-10"><p className="section-kicker"><Text value="El resultado" /></p><h2 className="text-4xl md:text-6xl font-bold leading-[1.02]"><Text value="Menos llamadas perdidas. Más trabajos en la agenda." /></h2></AnimatedSection>
    <div className="grid md:grid-cols-3 gap-6">{outcomes.map(([title, text], index) => <AnimatedSection key={title} delay={index * 0.05} className="bg-card border border-border rounded-xl p-7"><span className="text-xs font-bold text-primary-text">0{index + 1}</span><h3 className="text-2xl font-bold mt-6 mb-3"><Text value={title} /></h3><p className="text-muted-foreground leading-relaxed"><Text value={text} /></p></AnimatedSection>)}</div>
    <p className="text-sm text-muted-foreground mt-8 max-w-3xl"><Text value="En 60 cuentas de contratistas, el mensaje automático tras una llamada perdida recuperó en promedio el 22% de esas llamadas como trabajos agendados." /> <a className="underline" href="https://gorapidlocal.com/blog/missed-call-text-back-roi" target="_blank" rel="noopener noreferrer">GoRapidLocal</a>.</p>
  </div></section>;
}

function TradeArticle({ id, kicker, title, text, points }: { id: string; kicker: string; title: string; text: string; points: string[] }) {
  return <article id={id} className="scroll-mt-24 border border-border rounded-xl p-7 md:p-10 bg-card">
    <p className="section-kicker"><Text value={kicker} /></p>
    <h2 className="text-3xl md:text-5xl font-bold mb-4"><Text value={title} /></h2>
    <p className="text-muted-foreground leading-relaxed mb-6"><Text value={text} /></p>
    <ul className="space-y-3 mb-8">{points.map(point => <li key={point} className="flex gap-2"><Check size={18} aria-hidden="true" className="text-primary-text shrink-0" /><span><Text value={point} /></span></li>)}</ul>
    <Button asChild><LocalizedAnchor href="/#contacto" onClick={() => rememberPlan("presence")}><Text value="Pedir la maqueta gratis" /></LocalizedAnchor></Button>
  </article>;
}

export function TradesSection() {
  return <section className="py-16 lg:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <AnimatedSection className="max-w-3xl mb-10"><p className="section-kicker"><Text value="Para quién es" /></p><h2 className="text-4xl md:text-5xl font-bold mb-4"><Text value="Electricistas y plomeros en Estados Unidos." /></h2><p className="text-lg text-muted-foreground"><Text value="Empezamos por Houston y San Antonio. Latam Leap es un estudio latinoamericano: bilingüe, rápido, y armado con IA y automatización. La llamada la agendamos en el horario comercial del centro de Estados Unidos." /></p></AnimatedSection>
    <div className="grid lg:grid-cols-2 gap-6">
      <TradeArticle id="electricians" kicker="Electricistas" title="Cuando estás en un tablero, el teléfono no puede quedar mudo." text="Una búsqueda de electricista cerca termina en el que atiende. Te armamos la página, el perfil de Maps y la respuesta para cuando estás en el trabajo." points={["Recepcionista con IA y mensaje si no atendés", "Reseñas de Google después de cada trabajo", "Presencia en Google Maps", "Maqueta gratis de tu sitio en 48 horas"]} />
      <TradeArticle id="plumbers" kicker="Plomeros" title="Una pérdida no espera a que termines el trabajo anterior." text="El que busca un plomero llama a dos o tres números. Si el tuyo no contesta, se va. La página, Maps y el mensaje automático sirven para que ese trabajo no se pierda." points={["Recepcionista con IA y mensaje si no atendés", "Reseñas de Google después de cada trabajo", "Presencia en Google Maps", "Maqueta gratis de tu sitio en 48 horas"]} />
    </div>
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
    <div className="max-w-3xl mb-12"><p className="section-kicker"><Text value="Precios" /></p><h2 className="text-4xl md:text-6xl font-bold mb-5"><Text value="Tres niveles. Cada uno incluye el anterior." /></h2><p className="text-lg text-muted-foreground"><Text value="Captación automática incluye Presencia. El asistente incluye Captación automática. El precio que ves es el de tu país. No hay checkout en el sitio: el siguiente paso es una llamada o la maqueta gratis. En Estados Unidos, el pago se hace después con un enlace de Wise." /></p></div>
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
        <Button asChild size="lg"><LocalizedAnchor href="/#contacto" onClick={() => rememberPlan(tier.id)}><Text value="Pedir la maqueta gratis" /></LocalizedAnchor></Button>
      </article>;
    })}</div>
    <p className="text-sm text-muted-foreground mt-6">{currency === "ARS"
      ? (language === "es" ? `Pesos proporcionales a los dólares de Argentina, a ${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 }).format(arsPerUsd)} ARS por dólar (${rateLabel}).` : `Pesos proportional to Argentina's dollar amounts, at ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(arsPerUsd)} ARS per US dollar (${rateLabel}).`)
      : <Text value="Precios de Estados Unidos, en dólares. El pago, cuando corresponda, es un enlace de Wise: no hay checkout en el sitio. En Argentina vas a ver el equivalente proporcional en pesos." />}</p>
  </div></section>;
}

export function OfferFAQ() {
  return <section className="py-20"><div className="max-w-4xl mx-auto px-5 sm:px-6"><p className="section-kicker"><Text value="Antes de la llamada" /></p><h2 className="text-4xl font-bold mb-8"><Text value="Preguntas de electricistas y plomeros." /></h2>{questions.map(([question, answer]) => <details key={question} className="border-b border-border py-5"><summary className="font-bold cursor-pointer"><Text value={question} /></summary><p className="text-muted-foreground leading-relaxed mt-4"><Text value={answer} /></p></details>)}</div></section>;
}
