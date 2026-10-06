import care from "../../shared/care.json";
import catalog from "../../shared/catalog.json";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { money } from "@/lib/money";

export default function CommercialPricing() {
  return <section id="precios" className="py-20 lg:py-28 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <div className="max-w-3xl mb-12"><p className="section-kicker">Precios y alcance</p><h2 className="text-4xl md:text-6xl font-bold mb-5">Elegí cómo querés empezar.</h2><p className="text-lg text-muted-foreground">Diseño, mensaje y desarrollo adaptados a tu negocio. Los paquetes definen el alcance; la solución lleva tu marca.</p></div>
    <div className="grid md:grid-cols-3 gap-6">{catalog.map(plan => <article key={plan.id} className="bg-card border border-border rounded-xl p-7 flex flex-col"><h3 className="text-2xl font-bold">{plan.name}</h3><p className="text-muted-foreground my-4">{plan.description}</p><p className="text-4xl font-bold mb-2">Desde {money(plan.price)}</p><p className="text-sm text-muted-foreground mb-6">ARS · pago único por el alcance base</p><ul className="space-y-3 mb-8 flex-1">{plan.features.map(feature => <li key={feature} className="flex gap-2 text-sm"><Check size={18} className="text-primary shrink-0"/>{feature}</li>)}</ul><Button asChild size="lg"><a href={`https://wa.me/5493512954849?text=${encodeURIComponent(`Hola, quiero dar el salto con ${plan.name}, desde ${money(plan.price)} ARS. Me gustaría confirmar el alcance para mi negocio.`)}`} target="_blank" rel="noopener noreferrer">Consultar por {plan.name}</a></Button></article>)}</div>
    <p className="text-sm text-muted-foreground mt-6">Todos incluyen una instancia inicial para definir público, oferta y mensaje, dos rondas de ajustes y acompañamiento durante el desarrollo. Dominio y hosting se pagan aparte con entrega independiente, o se incluyen según las condiciones del cuidado mensual opcional. Plataformas, licencias, comisiones de cobro, publicidad e identidad visual completa se cotizan aparte.</p>
    <a href="#cuidado" className="inline-block underline mt-4 font-bold">Conocer el cuidado mensual de {money(care.price)} ARS</a>
    <div className="mt-10 border border-border rounded-xl p-7"><h3 className="text-2xl font-bold mb-3">¿Necesitás algo diferente?</h3><p className="text-muted-foreground mb-5">Portales, reservas, automatizaciones, marketing y software a medida. Primero definimos el problema, después el alcance y el presupuesto.</p><Button asChild variant="outline"><a href="/#contacto">Pedir una propuesta a medida</a></Button></div>
  </div></section>;
}
