import { Copy } from "@/lib/copy";
import { PortfolioSection, FinalCTASection } from "@/components/HomeSections";

export default function CaseStudies() {
  return <>
    <section className="mx-auto max-w-7xl px-6 pt-32">
      <h1 className="text-4xl font-bold md:text-6xl"><Copy es="Proyectos para negocios reales" en="Projects for real businesses" /></h1>
      <p className="mt-5 text-lg text-muted-foreground"><Copy es="Webs, sistemas a medida y automatizaciones para negocios reales." en="Websites, custom systems and automations for real businesses." /></p>
    </section>
    <PortfolioSection />
    <FinalCTASection />
  </>;
}
