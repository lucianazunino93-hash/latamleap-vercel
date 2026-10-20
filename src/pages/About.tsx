import { Copy } from "@/lib/copy";
import { FinalCTASection } from "@/components/HomeSections";
import { FounderCopy, FounderPortrait } from "@/components/OfferSections";
import { BookButton } from "@/components/SalesActions";

export default function About() {
  return <>
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      <p className="section-kicker"><Copy es="Quién está detrás" en="Who's behind it" /></p>
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4"><FounderPortrait /></div>
        <div className="lg:col-span-8">
          <h1 className="mb-6 max-w-4xl text-4xl font-bold md:text-6xl"><Copy es="Una agencia que trabaja para ti." en="An agency that works for you." /></h1>
          <FounderCopy />
          <div className="mt-8"><BookButton ctaLocation="bio" /></div>
        </div>
      </div>
    </section>
    <section className="bg-card py-20"><div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
      <article><h2 className="mb-4 text-2xl font-bold"><Copy es="El trabajo que quieres recibir" en="The jobs you want" /></h2><p className="text-muted-foreground"><Copy es="Definimos qué trabajos quieres mostrar, en qué zona, y cómo se entiende eso en español y en inglés." en="We define which jobs you want to show, the area you cover, and how that reads in English and Spanish." /></p></article>
      <article><h2 className="mb-4 text-2xl font-bold"><Copy es="Ves la vista previa antes de decidir" en="See the preview before you decide" /></h2><p className="text-muted-foreground"><Copy es="En la charla de 10 minutos ves la vista previa con tu negocio, y después tienes dos rondas de cambios." en="On the 10-minute call you see a preview with your business, and then you get two rounds of changes." /></p></article>
      <article><h2 className="mb-4 text-2xl font-bold"><Copy es="Las cuentas quedan a tu nombre" en="The accounts stay in your name" /></h2><p className="text-muted-foreground"><Copy es="Dominio, hosting y herramientas los pagas tú, en tus cuentas. El plan de cuidado es opcional." en="You pay for the domain, hosting and tools in your own accounts. The care plan is optional." /></p></article>
    </div></section>
    <FinalCTASection />
  </>;
}
