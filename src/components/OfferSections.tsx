import { useContext } from "react";
import { Check } from "lucide-react";
import offers from "../../shared/offers.json";
import { formatAmount, quoteTier } from "../../shared/geo.mjs";
import { LanguageContext } from "@/lib/language-context";
import { useCurrency } from "@/lib/currency-context";
import { Text, LocalizedAnchor } from "@/lib/language";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const audiences = ["Clínicas de salud", "Veterinarias", "Estudios de yoga", "Cafés", "Plomeros", "Electricistas"];
const outcomes = [
  ["Nunca más un mensaje sin respuesta", "Quien escribe por la web o por WhatsApp recibe una respuesta, también fuera del horario de atención."],
  ["Más turnos en la agenda", "El formulario, los recordatorios y el asistente convierten la consulta en una reserva."],
  ["Más reseñas en Google", "Después del turno, el pedido de reseña sale solo. No tenés que perseguir a nadie."],
];
const questions = [
  ["¿El precio depende del país?", "En Estados Unidos ves los precios de Estados Unidos, en dólares. En Argentina ves los precios de Argentina, en pesos. El resto de los países ve los precios de Estados Unidos."],
  ["¿Qué incluye Presencia?", "Una página optimizada para Google, un formulario para reservar o escribir, y la configuración de tu perfil de Google Business."],
  ["¿Qué automatiza Captación automática?", "Respuestas por WhatsApp y SMS, recordatorios de turnos y pedidos de reseña. Lo armamos con n8n, sobre la web de Presencia."],
  ["¿El asistente reemplaza a mi equipo?", "No. Responde las consultas frecuentes y agenda turnos. Los casos especiales siguen llegando a una persona de tu negocio."],
  ["¿Hay un costo mensual?", "Presencia es un pago inicial. Captación automática y el asistente suman un abono mensual para mantener las automatizaciones y el agente."],
  ["¿Cómo empiezo?", "Reservá una llamada. Confirmamos el alcance y el precio antes de empezar. No hace falta tener la solución definida."],
];

function rememberPlan(id: string) {
  try { sessionStorage.setItem("latamleap.plan", id); } catch { /* The form still offers every tier. */ }
}

export function OutcomesSection() {
  return <section className="py-16 lg:py-24 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <AnimatedSection className="max-w-3xl mb-10"><p className="section-kicker"><Text value="El resultado" /></p><h2 className="text-4xl md:text-6xl font-bold leading-[1.02]"><Text value="Más consultas que llegan a un turno." /></h2></AnimatedSection>
    <div className="grid md:grid-cols-3 gap-6">{outcomes.map(([title, text], index) => <AnimatedSection key={title} delay={index * 0.05} className="bg-card border border-border rounded-xl p-7"><span className="text-xs font-bold text-primary-text">0{index + 1}</span><h3 className="text-2xl font-bold mt-6 mb-3"><Text value={title} /></h3><p className="text-muted-foreground leading-relaxed"><Text value={text} /></p></AnimatedSection>)}</div>
  </div></section>;
}

export function AudienceSection() {
  return <section id="para-quien" className="py-16 lg:py-24"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <AnimatedSection className="max-w-3xl mb-8"><p className="section-kicker"><Text value="Para quién es" /></p><h2 className="text-4xl md:text-5xl font-bold"><Text value="Negocios locales que viven de las consultas." /></h2></AnimatedSection>
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{audiences.map(item => <li key={item} className="border border-border rounded-lg px-5 py-4 font-bold"><Text value={item} /></li>)}</ul>
  </div></section>;
}

export function OfferPricing() {
  const language = useContext(LanguageContext);
  const { currency, arsPerUsd, rateSource } = useCurrency();
  const rateLabel = rateSource === "fallback"
    ? (language === "es" ? "cotización de respaldo" : "fallback rate")
    : (language === "es" ? "cotización del día" : "today's rate");
  return <section id="precios" className="py-20 lg:py-28 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <div className="max-w-3xl mb-12"><p className="section-kicker"><Text value="Precios" /></p><h2 className="text-4xl md:text-6xl font-bold mb-5"><Text value="Tres formas de no perder consultas." /></h2><p className="text-lg text-muted-foreground"><Text value="El precio que ves es el de tu país. En Estados Unidos, dólares. En Argentina, pesos. Confirmamos el alcance en la llamada." /></p></div>
    <div className="grid lg:grid-cols-3 gap-6">{offers.tiers.map(tier => {
      const quote = quoteTier(tier, currency, arsPerUsd);
      const copy = language === "en" ? "en" : "es";
      return <article key={tier.id} className={`bg-card rounded-xl p-7 flex flex-col ${tier.recommended ? "border-2 border-primary shadow-studio" : "border border-border"}`}>
        <div className="flex items-center justify-between gap-3 mb-4">{tier.recommended ? <span className="text-xs font-bold uppercase text-primary-text"><Text value="Recomendado" /></span> : <span />}</div>
        <h3 className="text-2xl font-bold">{tier.name[copy]}</h3>
        <p className="text-muted-foreground my-4">{tier.summary[copy]}</p>
        <p className="text-sm text-muted-foreground"><Text value="Desde" /></p>
        <p className="text-3xl xl:text-4xl font-bold">{formatAmount(quote.setup, currency, language)}</p>
        {quote.monthly > 0 ? <p className="text-lg font-bold mt-1">+ {formatAmount(quote.monthly, currency, language)}<span className="text-base font-medium text-muted-foreground">{language === "es" ? "/mes" : "/month"}</span></p> : <p className="text-sm text-muted-foreground mt-1"><Text value="Pago inicial, sin abono." /></p>}
        <ul className="space-y-3 my-6 flex-1">{tier.features[copy].map(feature => <li key={feature} className="flex gap-2 text-sm"><Check size={18} aria-hidden="true" className="text-primary-text shrink-0" />{feature}</li>)}</ul>
        <Button asChild size="lg"><LocalizedAnchor href="/#contacto" onClick={() => rememberPlan(tier.id)}><Text value="Reservar una llamada" /></LocalizedAnchor></Button>
      </article>;
    })}</div>
    <p className="text-sm text-muted-foreground mt-6">{currency === "ARS"
      ? (language === "es" ? `Pesos calculados a ${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 }).format(arsPerUsd)} ARS por dólar (${rateLabel}). El valor en dólares de Argentina se edita en la configuración.` : `Pesos calculated at ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(arsPerUsd)} ARS per US dollar (${rateLabel}). Argentina's dollar amounts are edited in the config.`)
      : <Text value="Precios de Estados Unidos, en dólares. Si estás en Argentina, vas a ver los precios de Argentina en pesos." />}</p>
  </div></section>;
}

export function OfferFAQ() {
  return <section className="py-20"><div className="max-w-4xl mx-auto px-5 sm:px-6"><p className="section-kicker"><Text value="Antes de la llamada" /></p><h2 className="text-4xl font-bold mb-8"><Text value="Preguntas de negocios como el tuyo." /></h2>{questions.map(([question, answer]) => <details key={question} className="border-b border-border py-5"><summary className="font-bold cursor-pointer"><Text value={question} /></summary><p className="text-muted-foreground leading-relaxed mt-4"><Text value={answer} /></p></details>)}</div></section>;
}
