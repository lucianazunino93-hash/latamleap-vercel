import { Text } from "@/lib/language";
import CareSection from "@/components/CareSection";
import { OfferFAQ, OfferPricing } from "@/components/OfferSections";
import { FinalCTASection } from "@/components/HomeSections";

export default function Services() {
  return <>
    <section id="base-digital" className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
      <p className="section-kicker"><Text value="Para negocios locales" /></p>
      <h1 className="text-4xl md:text-6xl font-bold mb-5"><Text value="Una oferta clara para no perder consultas." /></h1>
      <p className="text-lg text-muted-foreground max-w-3xl"><Text value="Presencia, captación automática o un asistente con IA. El mismo alcance para clínicas, veterinarias, estudios, cafés y oficios, con el precio de tu país." /></p>
    </section>
    <OfferPricing />
    <OfferFAQ />
    <FinalCTASection />
    <CareSection />
  </>;
}
