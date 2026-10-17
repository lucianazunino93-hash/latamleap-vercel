import { useContext } from "react";
import { LanguageContext } from "@/lib/language-context";
import { Copy } from "@/lib/copy";
import { LocalizedAnchor } from "@/lib/language";
import { EXAMPLE_URL, INSTAGRAM_URL, whatsAppUrl } from "@/lib/sales";
import { OfferFAQ, OfferPricing, TradesSection, FounderSection } from "./OfferSections";
import { BookButton, ExampleButton } from "./SalesActions";
import { ArrowUpRight, Check, Code2, PenTool, Search } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import AuditForm from "./AuditForm";
import vetMavie from "@/assets/projects/vet-mavie-1200.webp";
import vetMavieSmall from "@/assets/projects/vet-mavie-600.webp";
import gonzaloAlvarez from "@/assets/projects/gonzalo-alvarez-1200.webp";
import gonzaloAlvarezSmall from "@/assets/projects/gonzalo-alvarez-600.webp";

export const WHATSAPP_URL = whatsAppUrl("es");

const projects = [
  { name: "vet.mavie", es: "Sitio web para especialistas veterinarias", en: "Website for veterinary specialists", image: vetMavie, smallImage: vetMavieSmall, href: "https://www.vetmavie.com/", altEs: "Sitio web de vet.mavie", altEn: "vet.mavie website" },
  { name: "Psicólogo Gonzalo Álvarez", es: "Sitio para un consultorio en Argentina", en: "Website for a practice in Argentina", image: gonzaloAlvarez, smallImage: gonzaloAlvarezSmall, href: "https://www.psicogonzaloalvarez.com/", altEs: "Sitio web del psicólogo Gonzalo Álvarez", altEn: "Website of psychologist Gonzalo Álvarez" },
];

const steps = [
  { n: "01", esT: "Hablamos 10 minutos", enT: "We talk for 10 minutes", es: "Me cuentas cómo te encuentran hoy tus clientes. Si esta página llegó después de una llamada, este es el siguiente paso.", en: "You tell me how customers find you today. If you opened this page after a call, this is the next step." },
  { n: "02", esT: "Te muestro un ejemplo visual", enT: "I show you a visual example", es: "Lleva el nombre de tu negocio para que veas la idea. Es una muestra, no una web que funcione: sin formulario y sin dominio.", en: "It uses your business name so you can see the idea. It is a sample, not a working site: no form and no domain." },
  { n: "03", esT: "Propuesta y seña del 50%", enT: "Proposal and 50% deposit", es: "Si te sirve, te mando la propuesta. Pagas el 50% para empezar y me envías los materiales completos.", en: "If it works for you, I send a proposal. You pay 50% to start and send me the complete materials." },
  { n: "04", esT: "Primera versión en 2 días hábiles", enT: "First version in 2 business days", es: "El plazo corre desde la seña y los materiales completos. Me mandas tus comentarios juntos, en un solo mensaje.", en: "The clock starts once I have the deposit and the complete materials. You send all your comments together, in one message." },
  { n: "05", esT: "Segunda revisión en 2 días hábiles", enT: "Second revision in 2 business days", es: "Arranca cuando recibo todos los comentarios de la primera versión.", en: "It starts when I receive every comment on the first version." },
  { n: "06", esT: "Saldo y publicación", enT: "Balance and launch", es: "Apruebas, pagas el 50% restante y publico en 1 día hábil.", en: "You approve, pay the remaining 50% and I launch within 1 business day." },
];

export const ConnectedSystem = () => (<div className="relative min-h-[430px] sm:min-h-[500px]" role="group" aria-label="Bilingual service website / Web bilingüe para servicios">
  <div className="absolute inset-0 rounded-lg bg-secondary border border-border overflow-hidden">
    <div className="absolute inset-0 studio-grid opacity-60"/>
    <div className="absolute left-[8%] top-[13%] bg-card border border-border rounded-lg p-4 shadow-studio w-[44%] animate-float">
      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3"><Search size={15} className="text-primary"/><Copy es="Español e inglés" en="English and Spanish" /></div>
      <div className="h-2 rounded bg-muted mb-2"/><div className="h-2 w-3/4 rounded bg-muted"/>
    </div>
    <div className="absolute right-[7%] top-[29%] bg-foreground text-background rounded-lg p-4 shadow-studio w-[47%] animate-float-delayed">
      <div className="flex items-center gap-2 text-xs font-bold mb-3"><PenTool size={15} className="text-primary"/><Copy es="Pedido por WhatsApp" en="Request on WhatsApp" /></div>
      <div className="grid grid-cols-3 gap-2"><span className="h-12 rounded bg-background/15"/><span className="h-12 rounded bg-background/15"/><span className="h-12 rounded bg-primary"/></div>
    </div>
    <div className="absolute left-[12%] bottom-[14%] bg-card border border-border rounded-lg p-4 shadow-studio w-[49%] animate-float-slow">
      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3"><Code2 size={15} className="text-primary"/><Copy es="Precio fijo" en="Fixed price" /></div>
      <div className="space-y-2"><div className="h-1.5 w-5/6 rounded bg-accent"/><div className="h-1.5 w-2/3 rounded bg-muted"/><div className="h-1.5 w-4/5 rounded bg-primary"/></div>
    </div>
    <div className="absolute right-[8%] bottom-[7%] bg-primary text-primary-foreground rounded-lg px-4 py-3 shadow-studio flex items-center gap-2 text-xs font-bold"><Check size={16}/><span>USD 597</span></div>
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 500" fill="none" aria-hidden="true"><path d="M220 120C350 120 320 220 420 220M420 280C360 330 300 350 220 380" stroke="currentColor" className="text-primary/50" strokeWidth="2" strokeDasharray="6 8"/></svg>
  </div>
</div>);

export const PortfolioSection = () => { const language = useContext(LanguageContext); return (<section id="proyectos" className="py-20 lg:py-28 bg-card">
  <div className="max-w-7xl mx-auto px-5 sm:px-6">
    <AnimatedSection className="grid lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-16 items-end mb-12">
      <p className="section-kicker"><Copy es="Trabajos reales" en="Real work" /></p>
      <h2 className="text-4xl md:text-6xl font-bold leading-[1.02]"><Copy es="Otros trabajos, sin reseñas inventadas." en="Other work, with no invented reviews." /></h2>
    </AnimatedSection>
    <p className="text-muted-foreground mb-10 max-w-3xl"><Copy es="Estos proyectos son reales y están en Argentina. No publicamos testimonios que no tengamos, ni resultados que no hayamos medido." en="These projects are real and based in Argentina. We do not publish testimonials we do not have, or results we have not measured." /></p>
    <div className="space-y-14">
      {projects.map((project, index) => (<AnimatedSection key={project.name} delay={0.08 * index}>
        <LocalizedAnchor href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
          <div className={`grid lg:grid-cols-12 gap-6 items-center ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="lg:col-span-8 overflow-hidden rounded-lg border border-border bg-muted aspect-[16/9]">
              <img src={project.image} srcSet={`${project.smallImage} 600w, ${project.image} 1200w`} sizes="(min-width: 1024px) 800px, calc(100vw - 40px)" width={1200} height={675} decoding="async" alt={language === "en" ? project.altEn : project.altEs} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"/>
            </div>
            <div className="lg:col-span-4 lg:px-5">
              <span className="text-xs font-bold text-primary-text">0{index + 1}</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-3 group-hover:text-primary-text transition-colors">{project.name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5"><Copy es={project.es} en={project.en} /></p>
              <span className="inline-flex items-center gap-2 text-sm font-bold"><Copy es="Ver proyecto" en="View project" /><ArrowUpRight size={16}/></span>
            </div>
          </div>
        </LocalizedAnchor>
      </AnimatedSection>))}
    </div>
  </div>
</section>); };

export const ExampleSection = () => (<section id="ejemplo" className="py-20 lg:py-28 scroll-mt-24"><div className="max-w-7xl mx-auto px-5 sm:px-6">
  <div className="grid lg:grid-cols-2 gap-10 items-center">
    <AnimatedSection>
      <p className="section-kicker"><Copy es="Ejemplo" en="Example" /></p>
      <h2 className="text-4xl md:text-6xl font-bold leading-[1.02] mb-5"><Copy es="Así puede verse un negocio de servicios." en="This is what a service business can look like." /></h2>
      <p className="text-lg text-muted-foreground mb-4"><Copy es="Ejemplo de diseño. Negocio ficticio." en="Sample design. Fictional business." /></p>
      <p className="text-muted-foreground leading-relaxed mb-6"><Copy es="Prime Home Solutions no es un cliente. Es una muestra de plomería, electricidad y HVAC. Lo que incluye el precio está en la oferta de abajo: no todo lo que aparece en el ejemplo forma parte de los USD 597." en="Prime Home Solutions is not a client. It is a sample for plumbing, electrical and HVAC work. What the price includes is in the offer below: not everything on the example is part of the USD 597." /></p>
      <ExampleButton />
    </AnimatedSection>
    <figure className="mx-auto w-full max-w-sm">
      <div className="rounded-[2rem] border-8 border-foreground bg-background shadow-studio overflow-hidden">
        <iframe title="Prime Home Solutions, negocio ficticio" src={EXAMPLE_URL} className="w-full h-[34rem] bg-card" loading="lazy" />
      </div>
      <figcaption className="text-sm text-muted-foreground mt-4"><Copy es="Ejemplo de diseño. Negocio ficticio / sample business." en="Sample design. Fictional business / negocio ficticio." /></figcaption>
    </figure>
  </div>
</div></section>);

export const ProcessSection = () => (<section id="proceso" className="py-20 lg:py-28 bg-secondary scroll-mt-24">
  <div className="max-w-7xl mx-auto px-5 sm:px-6">
    <AnimatedSection className="max-w-3xl mb-12">
      <p className="section-kicker"><Copy es="Cómo funciona" en="How it works" /></p>
      <h2 className="text-4xl md:text-6xl font-bold mb-4"><Copy es="De la llamada a la publicación." en="From the call to launch." /></h2>
      <p className="text-lg text-muted-foreground"><Copy es="Si nos mandas todo a tiempo, la mayoría de los proyectos se publica en 1 a 2 semanas. Los plazos son días hábiles, no horas corridas." en="If you send everything on time, most projects launch in 1 to 2 weeks. The timelines are business days, not clock hours." /></p>
    </AnimatedSection>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-border">
      {steps.map((step, index) => <AnimatedSection key={step.n} delay={index * 0.04} className="py-7 md:px-5 border-b md:border-r border-border"><span className="text-xs font-bold text-primary-text">{step.n}</span><h3 className="text-xl font-bold mt-8 mb-3"><Copy es={step.esT} en={step.enT} /></h3><p className="text-sm text-muted-foreground leading-relaxed"><Copy es={step.es} en={step.en} /></p></AnimatedSection>)}
    </div>
    <div className="mt-8"><BookButton /></div>
  </div>
</section>);

export const FinalCTASection = () => (<section id="contacto" className="py-20 lg:py-28 scroll-mt-24"><div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-20">
  <AnimatedSection>
    <p className="section-kicker"><Copy es="Siguiente paso" en="Next step" /></p>
    <h2 className="text-4xl md:text-6xl font-bold leading-[1.03] mb-6"><Copy es="¿Quieres ver cómo quedaría tu negocio?" en="Want to see how your business could look?" /></h2>
    <p className="text-lg text-muted-foreground max-w-xl mb-8"><Copy es="Agenda 10 minutos o escríbeme por WhatsApp. Si prefieres, deja los datos del negocio y te escribo." en="Book 10 minutes or message me on WhatsApp. If you prefer, leave your business details and I'll write back." /></p>
    <div className="flex flex-col items-start gap-3">
      <BookButton />
      <LocalizedAnchor href={whatsAppUrl("es")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">WhatsApp +54 9 351 2085644</LocalizedAnchor>
      <a className="inline-flex min-h-11 items-center font-bold underline underline-offset-4" href="mailto:hola@latamleap.com">hola@latamleap.com</a>
      <a className="inline-flex min-h-11 items-center font-bold underline underline-offset-4" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram @latam.leap</a>
    </div>
  </AnimatedSection>
  <AnimatedSection delay={.1} className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-studio">
    <h3 className="text-2xl font-bold mb-2"><Copy es="Contanos de tu negocio" en="Tell us about your business" /></h3>
    <p className="text-sm text-muted-foreground mb-5"><Copy es="Esto no reserva un diseño. Si encaja, el siguiente paso es la reunión de 10 minutos." en="This does not reserve a design. If it's a fit, the next step is the 10-minute meeting." /></p>
    <AuditForm />
  </AnimatedSection>
</div></section>);

export const HomeContent = () => <>
  <TradesSection />
  <ExampleSection />
  <OfferPricing />
  <ProcessSection />
  <FounderSection />
  <OfferFAQ />
  <FinalCTASection />
  <PortfolioSection />
</>;
