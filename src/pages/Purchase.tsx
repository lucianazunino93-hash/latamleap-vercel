import { Link, useParams } from "react-router-dom";
import catalog from "../../shared/catalog.json";
import { Text, LocalizedAnchor } from "@/lib/language";
import { Button } from "@/components/ui/button";

export default function Purchase() {
  const { planId } = useParams();
  const plan = catalog.find(p => p.id === planId);
  if (!plan) return <section className="pt-12 p-6"><h1>Paquete no encontrado</h1><Link to="/#precios">Ver paquetes</Link></section>;
  return <section className="pt-12 pb-20 px-6 max-w-3xl mx-auto"><h1 className="text-4xl font-bold mb-5"><Text value={plan.name} /></h1><p className="text-lg text-muted-foreground mb-6"><Text value="No hay un pago directo en esta página. El siguiente paso es una llamada o una maqueta gratis de tu sitio en 48 horas. El precio se confirma ahí, en dólares o en pesos según tu país." /></p><Button asChild size="lg"><LocalizedAnchor href="/#contacto"><Text value="Pedir la maqueta gratis" /></LocalizedAnchor></Button></section>;
}
