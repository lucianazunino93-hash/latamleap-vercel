import { useContext } from "react";
import { LanguageContext } from "@/lib/language-context";
import { useCurrency } from "@/lib/currency-context";
import { formatPrice } from "../../shared/pricing.mjs";
import { Text, LocalizedAnchor } from "@/lib/language";
import PriceComparison from "./PriceComparison";
import servicePages from "../../shared/service-pages.json";
import care from "../../shared/care.json";
import catalog from "../../shared/catalog.json";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const landing = catalog.find(plan => plan.id === "landing")!;
const website = catalog.find(plan => plan.id === "sitio")!;
const store = catalog.find(plan => plan.id === "tienda")!;
const custom = catalog.find(plan => plan.id === "custom")!;
const tiers = [landing, { ...website, id: "web-store", name: "Web profesional o tienda online", description: "Elegí una web para presentar tu negocio o una tienda para vender tus productos." }, custom];
function Features({ features }: { features: string[] }) {
  return <ul className="space-y-3 mb-6">{features.map(feature => <li key={feature} className="flex gap-2 text-sm"><Check size={18} aria-hidden="true" className="text-primary-text shrink-0"/><Text value={feature}/></li>)}</ul>;
}
export default function CommercialPricing() {
  const { currency } = useCurrency();
  const language = useContext(LanguageContext);
  const inquiry = (plan: typeof landing) => `https://wa.me/5493512085644?text=${encodeURIComponent(`Hola, quiero dar el salto con ${plan.name}, desde ${formatPrice(plan, currency, language)}. Me gustaría confirmar el alcance para mi negocio.`)}`;
  return <section id="precios" className="py-20 lg:py-28 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <div className="max-w-3xl mb-12"><p className="section-kicker"><Text value="Precios y alcance"/></p><h2 className="text-4xl md:text-6xl font-bold mb-5"><Text value="Elegí cómo querés empezar."/></h2><p className="text-lg text-muted-foreground"><Text value="Diseño, mensaje y desarrollo adaptados a tu negocio. Los paquetes definen el alcance; la solución lleva tu marca."/></p></div>
    <div className="grid md:grid-cols-3 gap-6">{tiers.map(plan => <article key={plan.id} className="bg-card border border-border rounded-xl p-7 flex flex-col">
      <h3 className="text-2xl font-bold"><Text value={plan.name}/></h3><p className="text-muted-foreground my-4"><Text value={plan.description}/></p>
      <p className="text-3xl xl:text-4xl font-bold mb-2"><Text value="Desde "/>{formatPrice(plan, currency, language)}</p><p className="text-sm text-muted-foreground mb-6"><Text value="Pago único por el alcance base"/></p><PriceComparison item={plan}/>
      <div className="flex-1">{plan.id === "web-store" ? <><p className="text-sm text-muted-foreground mb-5"><Text value="Dos alternativas al mismo precio inicial. Elegís una; cada una tiene su propio alcance."/></p><details className="mb-6"><summary className="cursor-pointer rounded-md bg-primary text-primary-foreground px-6 py-3 text-center text-sm font-bold list-none"><Text value="Ver alcance y detalles"/></summary>{[website, store].map(option => <div key={option.id} className="mt-5"><h4 className="font-bold mb-3"><Text value={option.name}/></h4><Features features={option.features}/><LocalizedAnchor href={servicePages.find(service => service.id === option.id)!.path} className="underline text-sm"><Text value="Ver alcance y detalles →"/></LocalizedAnchor></div>)}</details></> : <><Features features={plan.features}/>{plan.id === "custom" && <><p className="text-sm text-muted-foreground mb-4"><Text value="Ejemplos de lo que podemos construir; definimos juntos qué incluye tu proyecto."/></p><p className="text-sm text-muted-foreground mb-6"><Text value="Precio inicial para una primera versión con alcance definido. Cotizamos según funciones, usuarios e integraciones."/></p></>}</>}</div>
      {plan.id === "web-store" ? <Button asChild size="lg" className="whitespace-normal h-auto min-h-12 text-center"><LocalizedAnchor href={inquiry(plan)} target="_blank" rel="noopener noreferrer"><Text value="Consultar por Web profesional / Tienda online"/></LocalizedAnchor></Button> : <Button asChild size="lg"><LocalizedAnchor href={servicePages.find(service => service.id === plan.id)!.path}><Text value="Ver alcance y detalles"/></LocalizedAnchor></Button>}
    </article>)}</div>
    <LocalizedAnchor href="#cuidado" className="inline-block underline mt-4 font-bold"><Text value="Conocer el cuidado mensual de "/>{formatPrice(care, currency, language)}</LocalizedAnchor>
  </div></section>;
}
