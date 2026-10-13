import { Text, LocalizedAnchor } from "@/lib/language";
import { OfferFAQ, OfferPricing } from "@/components/OfferSections";
import { FinalCTASection } from "@/components/HomeSections";

export default function Services() {
  return <>
    <section id="base-digital" className="pt-12 pb-12 px-6 max-w-7xl mx-auto">
      <p className="section-kicker"><Text value="Para negocios de servicios locales" /></p>
      <h1 className="text-4xl md:text-6xl font-bold mb-5"><Text value="Una oferta clara para no perder llamadas." /></h1>
      <p className="text-lg text-muted-foreground max-w-3xl"><Text value="Presencia, captación automática o una recepcionista con IA para oficios del hogar y otros negocios que viven de turnos, en cualquier lugar de Estados Unidos. Cada nivel incluye el anterior. Ves la maqueta en 48 horas y no pagás hasta aprobar el diseño." /></p>
      <p className="mt-6 flex flex-wrap gap-5 font-bold"><LocalizedAnchor className="underline" href="/#electricians"><Text value="Electricistas" /></LocalizedAnchor><LocalizedAnchor className="underline" href="/#plumbers"><Text value="Plomeros" /></LocalizedAnchor><LocalizedAnchor className="underline" href="/#hvac"><Text value="HVAC" /></LocalizedAnchor><LocalizedAnchor className="underline" href="/#cleaning"><Text value="Limpieza" /></LocalizedAnchor><LocalizedAnchor className="underline" href="/#demo"><Text value="Demo" /></LocalizedAnchor></p>
    </section>
    <OfferPricing />
    <OfferFAQ />
    <FinalCTASection />
  </>;
}
