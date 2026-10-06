import { Text, LocalizedAnchor } from "@/lib/language";
import CommercialPricing from "@/components/CommercialPricing";
import CareSection from "@/components/CareSection";
import SalesFAQ from "@/components/SalesFAQ";
import { CapabilitiesSection, FinalCTASection } from "@/components/HomeSections";
export default function Services() { return <><section id="base-digital" className="pt-32 pb-12 px-6 max-w-7xl mx-auto"><p className="section-kicker"><Text value={"Soluciones seg\u00FAn tu objetivo"}/></p><h1 className="text-4xl md:text-6xl font-bold mb-5"><Text value={"Tu negocio, con una presencia online propia."}/></h1><p className="text-lg text-muted-foreground max-w-3xl"><Text value={"Una landing para presentar tu oferta, una Web profesional para mostrar tus servicios o una tienda para vender productos. Trabajamos el mensaje, dise\u00F1amos a medida y te guiamos hasta el lanzamiento."}/></p></section><CommercialPricing /><CareSection /><SalesFAQ /><CapabilitiesSection /><FinalCTASection /></>; }
