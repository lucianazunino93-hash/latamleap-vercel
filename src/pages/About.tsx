import { Text } from "@/lib/language";
import { Link } from "react-router-dom";
import { FinalCTASection } from "@/components/HomeSections";
export default function About() {
    return <>
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <p className="section-kicker"><Text value="La mirada detrás de tu proyecto" /></p>
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-6"><Text value="Una agencia chica para negocios que viven de turnos." /></h1>
      <p className="text-lg text-muted-foreground max-w-3xl mb-8"><Text value="Latam Leap lo lleva Luciana Zunino desde Argentina. Armamos la web, las respuestas automáticas y el asistente para clínicas, veterinarias, estudios, cafés y oficios en Estados Unidos y en Latinoamérica." /></p>
      <Link to="/#precios" className="underline font-bold"><Text value="Ver precios y reservar una llamada →" /></Link>
    </section>
    <section className="py-20 bg-card"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <article><h2 className="text-2xl font-bold mb-4"><Text value="Primero, lo que ofrecés" /></h2><p className="text-muted-foreground"><Text value="Definimos con vos a quién querés llegar, qué hace valiosa tu propuesta y cómo explicarla. Ese mensaje guía el diseño y el recorrido." /></p></article>
      <article><h2 className="text-2xl font-bold mb-4"><Text value="Un proceso simple" /></h2><p className="text-muted-foreground"><Text value="Te guiamos para reunir la información, revisamos el diseño con vos y acordamos el cronograma. Sabés qué incluye tu proyecto y cuál es el siguiente paso." /></p></article>
      <article><h2 className="text-2xl font-bold mb-4"><Text value="Tu negocio sigue siendo tuyo" /></h2><p className="text-muted-foreground"><Text value="La web, el perfil de Google y los accesos quedan a tu nombre. El abono mensual, cuando lo hay, mantiene las respuestas y el asistente. Podés frenarlo cuando quieras." /></p></article>
    </div></section>
    <FinalCTASection />
  </>;
}
