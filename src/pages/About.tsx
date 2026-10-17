import { Copy } from "@/lib/copy";
import { FinalCTASection } from "@/components/HomeSections";
import { BookButton } from "@/components/SalesActions";

export default function About() {
  return <>
    <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
      <p className="section-kicker"><Copy es="Quién está detrás" en="Who's behind this" /></p>
      <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mb-6"><Copy es="Un estudio en Córdoba, para negocios de servicios." en="A studio in Córdoba, for service businesses." /></h1>
      <p className="text-lg text-muted-foreground max-w-3xl mb-8"><Copy es="Soy Luciana Zunino. Trabajo desde Córdoba, Argentina, y hago webs para negocios de servicios. Estudié programación en el INTI y me formé en marketing digital con los cursos de Google, entre otros. Cuando trabajamos juntos, hablas conmigo: yo hago tu web, la configuro en tus cuentas y respondo tus mensajes. Trabajo a distancia con negocios en Estados Unidos. No tengo oficina ahí." en="I'm Luciana Zunino. I work from Córdoba, Argentina, building websites for service businesses. I studied programming at INTI and trained in digital marketing through Google's courses, among others. When we work together, you talk to me: I build your site, set it up in your accounts and answer your messages. I work remotely with businesses in the United States. I don't have an office there." /></p>
      <BookButton />
    </section>
    <section className="py-20 bg-card"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
      <article><h2 className="text-2xl font-bold mb-4"><Copy es="El trabajo que quieres recibir" en="The jobs you want" /></h2><p className="text-muted-foreground"><Copy es="Definimos qué trabajos quieres mostrar, en qué zona, y cómo se entiende eso en español y en inglés." en="We define which jobs you want to show, the area you cover, and how that reads in English and Spanish." /></p></article>
      <article><h2 className="text-2xl font-bold mb-4"><Copy es="Un ejemplo antes de pagar" en="An example before you pay" /></h2><p className="text-muted-foreground"><Copy es="En la reunión ves una muestra visual con el nombre de tu negocio. La web completa empieza después de la seña del 50% y de los materiales." en="In the meeting you see a visual sample with your business name. The full site starts after the 50% deposit and the materials." /></p></article>
      <article><h2 className="text-2xl font-bold mb-4"><Copy es="Las cuentas quedan a tu nombre" en="The accounts stay in your name" /></h2><p className="text-muted-foreground"><Copy es="Dominio, hosting y herramientas los pagas tú, en tus cuentas. El mantenimiento es opcional." en="You pay for the domain, hosting and tools in your own accounts. Maintenance is optional." /></p></article>
    </div></section>
    <FinalCTASection />
  </>;
}
