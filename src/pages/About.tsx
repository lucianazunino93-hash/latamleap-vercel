import { Text } from "@/lib/language";
import { Link } from "react-router-dom";
import { FinalCTASection } from "@/components/HomeSections";
export default function About() {
    return <>
    <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <p className="section-kicker"><Text value="La mirada detrás de tu proyecto" /></p>
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-6"><Text value="Un estudio latinoamericano para negocios de servicios locales." /></h1>
      <p className="text-lg text-muted-foreground max-w-3xl mb-8"><Text value="Latam Leap lo lleva Luciana Zunino desde Argentina. Trabajamos en inglés y en español, rápido, con IA y automatización. El foco son negocios de servicios en todo Estados Unidos: oficios del hogar, como electricistas, plomeros, HVAC y limpieza, y otros negocios que viven de turnos. La llamada se agenda en tu horario." /></p>
      <Link to="/#contacto" className="underline font-bold"><Text value="Pedir la maqueta gratis →" /></Link>
    </section>
    <section className="py-20 bg-card"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <article><h2 className="text-2xl font-bold mb-4"><Text value="Primero, el trabajo que querés" /></h2><p className="text-muted-foreground"><Text value="Definimos qué trabajos querés recibir, en qué zona, y cómo se entiende eso en una página y en Google Maps." /></p></article>
      <article><h2 className="text-2xl font-bold mb-4"><Text value="Un proceso simple" /></h2><p className="text-muted-foreground"><Text value="En 48 horas ves una maqueta. Recién después elegís Presencia, captación automática o la recepcionista con IA." /></p></article>
      <article><h2 className="text-2xl font-bold mb-4"><Text value="Tu negocio sigue siendo tuyo" /></h2><p className="text-muted-foreground"><Text value="La web, el perfil de Google y los accesos quedan a tu nombre. El abono, cuando lo hay, mantiene las respuestas. Podés frenarlo cuando quieras." /></p></article>
    </div></section>
    <FinalCTASection />
  </>;
}
