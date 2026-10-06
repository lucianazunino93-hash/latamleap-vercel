import { Link } from "react-router-dom";
import { FinalCTASection } from "@/components/HomeSections";

export default function About() {
  return <>
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <p className="section-kicker">La mirada detrás de tu proyecto</p>
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-6">Marketing y desarrollo, conectados con tu negocio.</h1>
      <p className="text-lg text-muted-foreground max-w-3xl mb-8">En Latam Leap combinamos estrategia, mensaje comercial y tecnología para ayudarte a construir una presencia online propia. Trabajamos con profesionales y comercios de distintos rubros, adaptando cada solución a lo que necesitan mostrar, gestionar o vender.</p>
      <Link to="/services" className="underline font-bold">Elegir una solución para mi negocio →</Link>
    </section>
    <section className="py-20 bg-card"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <article><h2 className="text-2xl font-bold mb-4">Primero, lo que ofrecés</h2><p className="text-muted-foreground">Definimos con vos a quién querés llegar, qué hace valiosa tu propuesta y cómo explicarla. Ese mensaje guía el diseño y el recorrido.</p></article>
      <article><h2 className="text-2xl font-bold mb-4">Un proceso simple</h2><p className="text-muted-foreground">Te guiamos para reunir la información, revisamos el diseño con vos y acordamos el cronograma. Sabés qué incluye tu proyecto y cuál es el siguiente paso.</p></article>
      <article><h2 className="text-2xl font-bold mb-4">Tu web sigue siendo tuya</h2><p className="text-muted-foreground">Web profesional y tienda incluyen panel y capacitación. Podés elegir entrega independiente o cuidado mensual, con condiciones claras y traspaso estándar si cancelás.</p></article>
    </div></section>
    <FinalCTASection/>
  </>;
}
