import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { LanguageContext } from "@/lib/language-context";
import { Text, LocalizedAnchor } from "@/lib/language";
import { useCurrency } from "@/lib/currency-context";
import { formatPrice } from "../../shared/pricing.mjs";
import PriceComparison from "@/components/PriceComparison";
import servicePages from "../../shared/service-pages.json";
import catalog from "../../shared/catalog.json";
import { getServiceCopy } from "../../shared/seo-model.mjs";
import { FinalCTASection } from "@/components/HomeSections";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { serviceSlug } = useParams();
  const { currency } = useCurrency();
  const language = useContext(LanguageContext);
  const service = servicePages.find(item => item.path.endsWith(`/${serviceSlug}`));
  const plan = catalog.find(item => item.id === service?.id);
  if (!service || !plan) return <NotFound />;
  const copy = getServiceCopy(service, plan, language, currency);
  return <>
    <section className="pt-32 pb-16 px-5 sm:px-6 max-w-7xl mx-auto">
      <nav aria-label={language === "es" ? "Ruta de navegación" : "Breadcrumb"} className="text-sm text-muted-foreground mb-8"><Link to="/"><Text value="Inicio" /></Link> / <Link to="/services"><Text value="Servicios" /></Link> / <Text value={plan.name} /></nav>
      <p className="section-kicker"><Text value={plan.name} /> · <Text value="Desde Argentina, para el mundo"/></p>
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-6">{copy.heading}</h1>
      <p className="text-lg text-muted-foreground max-w-3xl mb-8">{copy.intro}</p>
      <p className="text-3xl font-bold mb-2"><Text value="Desde " />{formatPrice(plan, currency, language)}</p>
      <p className="text-sm text-muted-foreground mb-6"><Text value="Pago único por el alcance base. Confirmamos el presupuesto antes de empezar." /></p>
      <PriceComparison item={plan}/><LocalizedAnchor href="#contacto" className="inline-flex bg-primary text-primary-foreground rounded-md px-6 py-3 font-bold"><Text value="Consultar por " /><Text value={plan.name} /></LocalizedAnchor>
    </section>
    <section className="py-16 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6 grid md:grid-cols-2 gap-12">
      <div><h2 className="text-3xl font-bold mb-5"><Text value="Qué incluye" /></h2><ul className="space-y-3">{plan.features.map(feature => <li key={feature} className="flex gap-3"><span aria-hidden="true" className="text-primary-text">✓</span><Text value={feature} /></li>)}</ul></div>
      <div><h2 className="text-3xl font-bold mb-5"><Text value="Para qué negocios tiene sentido" /></h2><p className="text-muted-foreground mb-6">{copy.fit}</p><h3 className="text-xl font-bold mb-3"><Text value="Un ejemplo de uso" /></h3><p className="text-muted-foreground">{copy.example}</p></div>
    </div></section>
    <section className="py-16 max-w-4xl mx-auto px-5 sm:px-6"><h2 className="text-3xl font-bold mb-7"><Text value="Lo que necesitás saber antes de elegir" /></h2>{copy.questions.map(([question, answer]) => <article key={question} className="border-b border-border py-5"><h3 className="text-xl font-bold mb-3">{question}</h3><p className="text-muted-foreground leading-relaxed">{answer}</p></article>)}
      <p className="text-muted-foreground mt-8"><Text value="Dominio y hosting se pagan por separado en la entrega independiente. El cuidado mensual es opcional; consultá su alcance y condiciones." /></p><LocalizedAnchor href="/services#cuidado" className="inline-block underline mt-4"><Text value="Ver opciones de cuidado mensual →" /></LocalizedAnchor>
    </section>
    <section className="py-12 bg-card"><div className="max-w-7xl mx-auto px-5 sm:px-6"><h2 className="text-2xl font-bold mb-5"><Text value="Explorá otras soluciones" /></h2><div className="flex flex-wrap gap-5">{servicePages.filter(item => item.id !== plan.id).map(item => <LocalizedAnchor key={item.id} href={item.path} className="underline"><Text value={catalog.find(entry => entry.id === item.id)?.name || ""} /> →</LocalizedAnchor>)}<LocalizedAnchor href="/case-studies" className="underline"><Text value="Ver proyectos reales →" /></LocalizedAnchor></div></div></section>
    <FinalCTASection />
  </>;
}
