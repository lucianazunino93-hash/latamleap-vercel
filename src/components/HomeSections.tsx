import CommercialPricing from "./CommercialPricing";
import CareSection from "./CareSection";
import SalesFAQ from "./SalesFAQ";
import { ArrowUpRight, Check, Code2, Gauge, Globe2, MessageCircle, Network, PenTool, Search, Settings2, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import AuditForm from "./AuditForm";
import { Button } from "@/components/ui/button";
import vetMavie from "@/assets/projects/vet-mavie.jpg";
import gonzaloAlvarez from "@/assets/projects/gonzalo-alvarez.jpg";
import espacioArukah from "@/assets/projects/espacio-arukah.jpg";




export const WHATSAPP_URL = "https://wa.me/5493512954849?text=Hola!%20Vi%20Latam%20Leap%20y%20me%20gustar%C3%ADa%20contarles%20sobre%20un%20proyecto%20que%20tengo%20en%20mente.";

const projects = [
  { name: "vet.mavie", type: "Sitio web para especialistas veterinarias", image: vetMavie, href: "https://www.vetmavie.com/", alt: "Sitio web de vet.mavie" },
  { name: "Psicólogo Gonzalo Álvarez", type: "Presencia digital y captación de consultas", image: gonzaloAlvarez, href: "https://www.psicogonzaloalvarez.com/", alt: "Sitio web del psicólogo Gonzalo Álvarez" },
  { name: "Espacio Arukah", type: "Sitio web y admisión terapéutica", image: espacioArukah, href: "https://proyecto.latamleap.com/", alt: "Sitio web de Espacio Arukah" },
];

const capabilities = [
  { icon: Code2, title: "Desarrollo a medida", text: "Software, portales y herramientas pensadas alrededor de tu operación." },
  { icon: Globe2, title: "Landings, sitios y tiendas online", text: "Diseño, contenido, SEO y una experiencia preparada para generar consultas." },
  { icon: Sparkles, title: "Marketing digital", text: "Estrategia, campañas y contenidos conectados con objetivos comerciales reales." },
  { icon: Settings2, title: "Automatización", text: "Menos tareas repetitivas y más tiempo para decisiones que hacen crecer el negocio." },
  { icon: Network, title: "Integraciones y CRM", text: "Información ordenada y herramientas que trabajan juntas, sin datos desperdigados." },
  { icon: Gauge, title: "Dashboards", text: "Una vista clara de lo que pasa para decidir sin depender de planillas imposibles." },
];

const process = [
  { number: "01", title: "Elegís", text: "Elegís una solución y nos contás qué necesita tu negocio. Confirmamos el alcance y cómo seguir después del lanzamiento." },
  { number: "02", title: "Nos contás", text: "Acordamos la propuesta y coordinamos el inicio. Reunimos la información de tu negocio, marca y contenido." },
  { number: "03", title: "Definimos", text: "Trabajamos con vos el público, la propuesta y los textos para que se entienda por qué elegirte." },
  { number: "04", title: "Construimos", text: "Diseñamos, desarrollamos y hacemos dos rondas de ajustes dentro del alcance contratado." },
  { number: "05", title: "Publicamos", text: "Probamos y publicamos. En Web profesional y tienda, te enseñamos a usar el panel. Elegís cómo seguir." },
];

export const ConnectedSystem = () => (
  <div className="relative min-h-[430px] sm:min-h-[500px]" aria-label="Sistema digital conectado">
    <div className="absolute inset-0 rounded-lg bg-secondary border border-border overflow-hidden">
      <div className="absolute inset-0 studio-grid opacity-60" />
      <div className="absolute left-[8%] top-[13%] bg-card border border-border rounded-lg p-4 shadow-studio w-[44%] animate-float">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3"><Search size={15} className="text-primary" /> Estrategia</div>
        <div className="h-2 rounded bg-muted mb-2" /><div className="h-2 w-3/4 rounded bg-muted" />
      </div>
      <div className="absolute right-[7%] top-[29%] bg-foreground text-background rounded-lg p-4 shadow-studio w-[47%] animate-float-delayed">
        <div className="flex items-center gap-2 text-xs font-bold mb-3"><PenTool size={15} className="text-primary" /> Experiencia</div>
        <div className="grid grid-cols-3 gap-2"><span className="h-12 rounded bg-background/15" /><span className="h-12 rounded bg-background/15" /><span className="h-12 rounded bg-primary" /></div>
      </div>
      <div className="absolute left-[12%] bottom-[14%] bg-card border border-border rounded-lg p-4 shadow-studio w-[49%] animate-float-slow">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mb-3"><Code2 size={15} className="text-primary" /> Desarrollo</div>
        <div className="space-y-2"><div className="h-1.5 w-5/6 rounded bg-accent" /><div className="h-1.5 w-2/3 rounded bg-muted" /><div className="h-1.5 w-4/5 rounded bg-primary" /></div>
      </div>
      <div className="absolute right-[8%] bottom-[7%] bg-primary text-primary-foreground rounded-lg px-4 py-3 shadow-studio flex items-center gap-2 text-xs font-bold"><Check size={16} /> Todo conectado</div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 500" fill="none" aria-hidden="true"><path d="M220 120C350 120 320 220 420 220M420 280C360 330 300 350 220 380" stroke="currentColor" className="text-primary/50" strokeWidth="2" strokeDasharray="6 8" /></svg>
    </div>
  </div>
);

export const PortfolioSection = () => (
  <section id="proyectos" className="py-20 lg:py-28 bg-card">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <AnimatedSection className="grid lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-16 items-end mb-12">
        <p className="section-kicker">Proyectos seleccionados</p>
        <h2 className="text-4xl md:text-6xl font-bold leading-[1.02]">Diseñamos soluciones que ya están trabajando.</h2>
      </AnimatedSection>
      <div className="space-y-14">
        {projects.map((project, index) => (
          <AnimatedSection key={project.name} delay={0.08 * index}>
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
              <div className={`grid lg:grid-cols-12 gap-6 items-center ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="lg:col-span-8 overflow-hidden rounded-lg border border-border bg-muted aspect-[16/9]">
                  <img src={project.image} alt={project.alt} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" />
                </div>
                <div className="lg:col-span-4 lg:px-5">
                  <span className="text-xs font-bold text-primary">0{index + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{project.type}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold">Ver proyecto <ArrowUpRight size={16} /></span>
                </div>
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export const ManifestoSection = () => (
  <section className="py-20 lg:py-32 bg-foreground text-background">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-12 gap-10">
      <AnimatedSection className="lg:col-span-4"><p className="section-kicker text-primary">Nuestra forma de pensar</p></AnimatedSection>
      <AnimatedSection delay={0.1} className="lg:col-span-8">
        <h2 className="text-4xl md:text-6xl font-bold leading-[1.04] mb-8">Cada visita que no encuentra cómo seguir es una oportunidad que se enfría.</h2>
        <p className="text-xl md:text-2xl text-background/70 leading-relaxed max-w-3xl">Tu negocio puede tener una presencia que esté a su altura. Una propuesta clara, una web propia y un camino simple para consultar o comprar. Encontramos con vos el paso que puede hacer la diferencia y lo llevamos a la práctica.</p>
      </AnimatedSection>
    </div>
  </section>
);

export const CapabilitiesSection = () => (
  <section id="soluciones" className="py-20 lg:py-28">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <AnimatedSection className="max-w-3xl mb-12"><p className="section-kicker">Qué hacemos</p><h2 className="text-4xl md:text-6xl font-bold leading-[1.03]">El mensaje y las herramientas para dar el próximo paso.</h2></AnimatedSection>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
        {capabilities.map((item, index) => <AnimatedSection key={item.title} delay={index * 0.05} className="border-r border-b border-border p-7 md:p-9 min-h-[230px]"><item.icon className="text-primary mb-8" size={26} /><h3 className="text-xl font-bold mb-3">{item.title}</h3><p className="text-muted-foreground leading-relaxed">{item.text}</p></AnimatedSection>)}
      </div>
    </div>
  </section>
);

export const ProcessSection = () => (
  <section id="como-trabajamos" className="py-20 lg:py-28 bg-secondary">
    <div className="max-w-7xl mx-auto px-5 sm:px-6">
      <AnimatedSection className="grid lg:grid-cols-2 gap-8 mb-12"><div><p className="section-kicker">Cómo trabajamos</p><h2 className="text-4xl md:text-6xl font-bold">De un problema difuso a una solución clara.</h2></div><p className="text-lg text-muted-foreground lg:self-end lg:pb-2 max-w-xl">Un proceso colaborativo, sin misterio técnico y con decisiones concretas en cada etapa.</p></AnimatedSection>
      <div className="grid md:grid-cols-5 border-t border-border">
        {process.map((step, index) => <AnimatedSection key={step.number} delay={index * 0.06} className="py-7 md:px-5 border-b md:border-r border-border last:border-r-0"><span className="text-xs font-bold text-primary">{step.number}</span><h3 className="text-xl font-bold mt-8 mb-3">{step.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p></AnimatedSection>)}
      </div>
    </div>
  </section>
);

export const ProblemsSection = () => {
  const problems = ["Tu web no explica bien lo que hacés.", "Los contactos se pierden entre mensajes y planillas.", "Tu equipo repite tareas que podrían resolverse mejor.", "Tenés datos, pero no una visión clara para decidir."];
  return <section className="py-20 lg:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20"><AnimatedSection><p className="section-kicker">Si algo no termina de funcionar</p><h2 className="text-4xl md:text-5xl font-bold leading-tight">Probablemente no te falte otra herramienta.</h2></AnimatedSection><div className="border-t border-border">{problems.map((problem, i) => <AnimatedSection key={problem} delay={i * .05} className="flex gap-5 py-6 border-b border-border"><span className="text-primary font-bold">0{i + 1}</span><p className="text-xl md:text-2xl font-medium">{problem}</p></AnimatedSection>)}</div></div></section>;
};

export const PricingSection = CommercialPricing;

export const OfferSection = () => (
  <section className="py-20 lg:py-28 bg-card"><div className="max-w-7xl mx-auto px-5 sm:px-6"><AnimatedSection className="mb-12"><p className="section-kicker">Dos maneras de empezar</p><h2 className="text-4xl md:text-6xl font-bold">Empecemos por lo que hoy tiene sentido.</h2></AnimatedSection><div className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden"><article className="bg-background p-8 md:p-12"><span className="text-sm font-bold text-primary">01</span><h3 className="text-3xl font-bold mt-8 mb-4">Un website que haga su trabajo</h3><p className="text-muted-foreground leading-relaxed mb-8">Para ordenar tu propuesta, generar confianza y convertir visitas en conversaciones reales.</p><Button asChild variant="outline"><a href="/services#base-digital">Conocer la propuesta <ArrowUpRight /></a></Button></article><article className="bg-foreground text-background p-8 md:p-12"><span className="text-sm font-bold text-primary">02</span><h3 className="text-3xl font-bold mt-8 mb-4">Una solución a medida</h3><p className="text-background/70 leading-relaxed mb-8">Para conectar procesos, automatizar tareas o construir una herramienta propia alrededor de tu negocio.</p><Button asChild><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Contanos tu proyecto <MessageCircle /></a></Button></article></div></div></section>
);



export const FinalCTASection = () => (
  <section id="contacto" className="py-20 lg:py-28 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-20"><AnimatedSection><p className="section-kicker">Hablemos</p><h2 className="text-4xl md:text-6xl font-bold leading-[1.03] mb-6">Contanos qué querés resolver.</h2><p className="text-lg text-muted-foreground max-w-xl mb-8">No necesitás llegar con una solución definida. Contanos el problema y pensamos juntos el mejor punto de partida.</p><Button asChild size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Escribinos por WhatsApp <MessageCircle /></a></Button></AnimatedSection><AnimatedSection delay={.1} className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-studio"><AuditForm buttonText="Preparar consulta por WhatsApp" /></AnimatedSection></div></section>
);

export const HomeContent = () => <><ManifestoSection /><SolutionGuide /><PortfolioSection /><PricingSection /><CareSection /><ProcessSection /><SalesFAQ /><CapabilitiesSection /><FinalCTASection /></>;

const SolutionGuide = () => <section className="py-16 bg-secondary"><div className="max-w-7xl mx-auto px-5 sm:px-6"><p className="section-kicker">El próximo paso de tu negocio</p><h2 className="text-3xl md:text-5xl font-bold mb-8">¿Qué querés que pase cuando te encuentran?</h2><div className="grid md:grid-cols-3 gap-6">{[{title:"Que te consulten",text:"Una landing reúne tu oferta y facilita el contacto. Ideal para un servicio, una campaña o un lanzamiento."},{title:"Que entiendan por qué elegirte",text:"Una web profesional presenta tu negocio, tus servicios y tu experiencia. Con panel para editar tu contenido."},{title:"Que compren tus productos",text:"Una tienda organiza tu catálogo, los pedidos y los pagos. Con panel para gestionar tu operación."}].map(item=><article key={item.title} className="bg-card rounded-xl p-6 border border-border"><h3 className="text-xl font-bold mb-3">{item.title}</h3><p className="text-muted-foreground mb-5">{item.text}</p><a href="#precios" className="underline font-bold">Ver opciones y alcance</a></article>)}</div><p className="mt-6 text-muted-foreground">Latam Leap combina estrategia de marketing y desarrollo para negocios en Argentina. Si necesitás una solución diferente, definimos juntos el alcance y el presupuesto.</p></div></section>;
