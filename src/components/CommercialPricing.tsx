import { Text, LocalizedAnchor } from "@/lib/language";
import care from "../../shared/care.json";
import catalog from "../../shared/catalog.json";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { money } from "@/lib/money";
export default function CommercialPricing() {
    return <section id="precios" className="py-20 lg:py-28 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <div className="max-w-3xl mb-12"><p className="section-kicker"><Text value={"Precios y alcance"}/></p><h2 className="text-4xl md:text-6xl font-bold mb-5"><Text value={"Eleg\u00ED c\u00F3mo quer\u00E9s empezar."}/></h2><p className="text-lg text-muted-foreground"><Text value={"Dise\u00F1o, mensaje y desarrollo adaptados a tu negocio. Los paquetes definen el alcance; la soluci\u00F3n lleva tu marca."}/></p></div>
    <div className="grid md:grid-cols-3 gap-6">{catalog.map(plan => <article key={plan.id} className="bg-card border border-border rounded-xl p-7 flex flex-col"><h3 className="text-2xl font-bold"><Text value={plan.name}/></h3><p className="text-muted-foreground my-4"><Text value={plan.description}/></p><p className="text-4xl font-bold mb-2"><Text value={"Desde "}/>{money(plan.price)}</p><p className="text-sm text-muted-foreground mb-6"><Text value={"ARS \u00B7 pago \u00FAnico por el alcance base"}/></p><ul className="space-y-3 mb-8 flex-1">{plan.features.map(feature => <li key={feature} className="flex gap-2 text-sm"><Check size={18} className="text-primary shrink-0"/><Text value={feature}/></li>)}</ul><Button asChild size="lg"><LocalizedAnchor href={`https://wa.me/5493512954849?text=${encodeURIComponent(`Hola, quiero dar el salto con ${plan.name}, desde ${money(plan.price)} ARS. Me gustaría confirmar el alcance para mi negocio.`)}`} target="_blank" rel="noopener noreferrer"><Text value={"Consultar por "}/><Text value={plan.name}/></LocalizedAnchor></Button></article>)}</div>
    <LocalizedAnchor href="#cuidado" className="inline-block underline mt-4 font-bold"><Text value={"Conocer el cuidado mensual de "}/>{money(care.price)}<Text value={" ARS"}/></LocalizedAnchor>
    <div className="mt-10 border border-border rounded-xl p-7"><h3 className="text-2xl font-bold mb-3"><Text value={"\u00BFNecesit\u00E1s algo diferente?"}/></h3><p className="text-muted-foreground mb-5"><Text value={"Portales, reservas, automatizaciones, marketing y software a medida. Primero definimos el problema, despu\u00E9s el alcance y el presupuesto."}/></p><Button asChild variant="outline"><LocalizedAnchor href="/#contacto"><Text value={"Pedir una propuesta a medida"}/></LocalizedAnchor></Button></div>
  </div></section>;
}
