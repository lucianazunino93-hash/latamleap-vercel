import { Text, LocalizedAnchor } from "@/lib/language";
import { Link } from "react-router-dom";
import { FinalCTASection } from "@/components/HomeSections";
export default function About() {
    return <>
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <p className="section-kicker"><Text value={"La mirada detr\u00E1s de tu proyecto"}/></p>
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-6"><Text value={"Marketing y desarrollo, conectados con tu negocio."}/></h1>
      <p className="text-lg text-muted-foreground max-w-3xl mb-8"><Text value={"En Latam Leap combinamos estrategia, mensaje comercial y tecnolog\u00EDa para ayudarte a construir una presencia online propia. Trabajamos con profesionales y comercios de distintos rubros, adaptando cada soluci\u00F3n a lo que necesitan mostrar, gestionar o vender."}/></p>
      <Link to="/services" className="underline font-bold"><Text value={"Elegir una soluci\u00F3n para mi negocio \u2192"}/></Link>
    </section>
    <section className="py-20 bg-card"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <article><h2 className="text-2xl font-bold mb-4"><Text value={"Primero, lo que ofrec\u00E9s"}/></h2><p className="text-muted-foreground"><Text value={"Definimos con vos a qui\u00E9n quer\u00E9s llegar, qu\u00E9 hace valiosa tu propuesta y c\u00F3mo explicarla. Ese mensaje gu\u00EDa el dise\u00F1o y el recorrido."}/></p></article>
      <article><h2 className="text-2xl font-bold mb-4"><Text value={"Un proceso simple"}/></h2><p className="text-muted-foreground"><Text value={"Te guiamos para reunir la informaci\u00F3n, revisamos el dise\u00F1o con vos y acordamos el cronograma. Sab\u00E9s qu\u00E9 incluye tu proyecto y cu\u00E1l es el siguiente paso."}/></p></article>
      <article><h2 className="text-2xl font-bold mb-4"><Text value={"Tu web sigue siendo tuya"}/></h2><p className="text-muted-foreground"><Text value={"Web profesional y tienda incluyen panel y capacitaci\u00F3n. Pod\u00E9s elegir entrega independiente o cuidado mensual, con condiciones claras y traspaso est\u00E1ndar si cancel\u00E1s."}/></p></article>
    </div></section>
    <FinalCTASection />
  </>;
}
