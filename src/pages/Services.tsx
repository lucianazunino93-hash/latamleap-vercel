import { Text, LocalizedAnchor } from "@/lib/language";
import { OfferFAQ, OfferPricing } from "@/components/OfferSections";
import { FinalCTASection } from "@/components/HomeSections";

export default function Services() {
  return <>
    <section id="base-digital" className="pt-12 pb-12 px-6 max-w-7xl mx-auto">
      <p className="section-kicker"><Text value="Para electricistas y plomeros" /></p>
      <h1 className="text-4xl md:text-6xl font-bold mb-5"><Text value="Una oferta clara para no perder llamadas." /></h1>
      <p className="text-lg text-muted-foreground max-w-3xl"><Text value="Presencia, captación automática o una recepcionista con IA. Cada nivel incluye el anterior. El siguiente paso es una llamada o una maqueta gratis, no un pago." /></p>
      <p className="mt-6 flex gap-5 font-bold"><LocalizedAnchor className="underline" href="/#electricians"><Text value="Electricistas" /></LocalizedAnchor><LocalizedAnchor className="underline" href="/#plumbers"><Text value="Plomeros" /></LocalizedAnchor></p>
    </section>
    <OfferPricing />
    <OfferFAQ />
    <FinalCTASection />
  </>;
}
