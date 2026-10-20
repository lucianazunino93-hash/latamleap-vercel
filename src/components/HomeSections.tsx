import { useContext } from "react";
import { LanguageContext } from "@/lib/language-context";
import offers from "../../shared/offers.json";
import decisions from "../../shared/decisions.json";
import { Copy } from "@/lib/copy";
import { LocalizedAnchor } from "@/lib/language";
import { DEMO_URL, INSTAGRAM_URL } from "@/lib/sales";
import { track } from "@/lib/track";
import { OfferFAQ, OfferPricing, FounderSection } from "./OfferSections";
import ReferralSection from "./ReferralSection";
import { BookButton, DemoButton, WhatsAppLink } from "./SalesActions";
import { ArrowUpRight, Check, Code2, PenTool, Search } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import AuditForm from "./AuditForm";
import { portfolioProjects } from "@/lib/portfolio";

const steps = [
  { n: "01", esT: "Hablamos 10 minutos.", enT: "We talk for 10 minutes.", es: "Nos cuentas cómo te encuentran hoy tus clientes.", en: "You tell us how customers find you today." },
  { n: "02", esT: "Ves la vista previa con tu negocio.", enT: "You see a preview with your business.", es: "Tu nombre, tus servicios y tu estilo, para que veas la idea.", en: "Your name, your services and your style, so you can see the idea." },
  { n: "03", esT: "Arrancamos.", enT: "We get started.", es: "Con el 50 % y tus materiales, la primera versión está en 2 días hábiles.", en: "With the 50% deposit and your materials, the first version is ready in 2 business days." },
  { n: "04", esT: "Apruebas y publicamos.", enT: "You approve and we launch.", es: "Dos rondas de cambios, el 50 % restante y tu web en línea en 1 día hábil.", en: "Two rounds of changes, the remaining 50% and your site goes live within 1 business day." },
];

const services = [
  ["tiendas", "Tiendas online", "Online stores"],
  ["sistemas", "Sistemas a medida: reservas, portales de clientes, paneles", "Custom systems: bookings, client portals, dashboards"],
  ["automatizaciones", "Automatizaciones con WhatsApp e IA", "WhatsApp and AI automations"],
  ["recepcion", "Recepcionista con IA para llamadas entrantes", "AI receptionist for incoming calls"],
  ["rediseno", "Rediseño de webs existentes", "Redesigns of existing sites"],
];

export const ConnectedSystem = () => (<div className="relative min-h-[430px] sm:min-h-[500px]" role="group" aria-label="Bilingual service website / Web bilingüe para servicios">
  <div className="absolute inset-0 overflow-hidden rounded-lg border border-border bg-secondary">
    <div className="absolute inset-0 studio-grid opacity-60"/>
    <div className="absolute left-[8%] top-[13%] w-[44%] animate-float rounded-lg border border-border bg-card p-4 shadow-studio">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-muted-foreground"><Search size={15} className="text-primary"/><Copy es="Español e inglés" en="English and Spanish" /></div>
      <div className="mb-2 h-2 rounded bg-muted"/><div className="h-2 w-3/4 rounded bg-muted"/>
    </div>
    <div className="absolute right-[7%] top-[29%] w-[47%] animate-float-delayed rounded-lg bg-foreground p-4 text-background shadow-studio">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold"><PenTool size={15} className="text-primary"/><Copy es="Pedido por WhatsApp" en="Request on WhatsApp" /></div>
      <div className="grid grid-cols-3 gap-2"><span className="h-12 rounded bg-background/15"/><span className="h-12 rounded bg-background/15"/><span className="h-12 rounded bg-primary"/></div>
    </div>
    <div className="absolute bottom-[14%] left-[12%] w-[49%] animate-float-slow rounded-lg border border-border bg-card p-4 shadow-studio">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-muted-foreground"><Code2 size={15} className="text-primary"/><Copy es="Precio fijo" en="Fixed price" /></div>
      <div className="space-y-2"><div className="h-1.5 w-5/6 rounded bg-accent"/><div className="h-1.5 w-2/3 rounded bg-muted"/><div className="h-1.5 w-4/5 rounded bg-primary"/></div>
    </div>
    <div className="absolute bottom-[7%] right-[8%] flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-studio"><Check size={16}/><span>USD {offers.us.price}</span></div>
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 600 500" fill="none" aria-hidden="true"><path d="M220 120C350 120 320 220 420 220M420 280C360 330 300 350 220 380" stroke="currentColor" className="text-primary/50" strokeWidth="2" strokeDasharray="6 8"/></svg>
  </div>
</div>);

export const PainSection = () => {
  const language = useContext(LanguageContext);
  return <section id="dolor" className="scroll-mt-24 py-16 lg:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-6">
    <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] md:text-5xl"><Copy es="Tú estás en el trabajo. Tu próximo cliente te está buscando." en="You're on the job. Your next customer is looking for you." /></h2>
    <p className="mt-5 max-w-3xl text-lg text-muted-foreground"><Copy es="Estás bajo un fregadero, en un ático a 40 grados o cambiando un tablero. En ese momento, alguien busca en Google “plomero cerca de mí”, en inglés o en español, y quiere saber tres cosas: qué haces, si llegas a su zona y cómo pedirte el trabajo." en="You're under a sink, in a 100-degree attic or swapping a panel. Right then, someone searches “plumber near me”, in English or in Spanish, and wants three answers: what you do, whether you cover their area and how to book you." /></p>
    <p className="mt-4 max-w-3xl text-lg"><Copy es="Con tu web, esa respuesta ya está lista, en los dos idiomas, y el pedido te espera en WhatsApp para cuando termines." en="With your website, those answers are ready in both languages, and the job request waits on your WhatsApp for when you're done." /></p>
    {language === "en" && <p className="mt-4 max-w-3xl text-sm text-muted-foreground">In the U.S., more than 43 million people speak Spanish at home.<sup><a className="underline" href="https://data.census.gov/table/ACSDT1Y2023.C16001" target="_blank" rel="noopener noreferrer">1</a></sup></p>}
    <ul className="mt-6 flex flex-wrap gap-3">
      <li id="plumbers" className="scroll-mt-24 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold"><Copy es="Plomeros" en="Plumbers" /></li>
      <li id="electricians" className="scroll-mt-24 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold"><Copy es="Electricistas" en="Electricians" /></li>
      <li id="hvac" className="scroll-mt-24 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold">HVAC</li>
    </ul>
  </div></section>;
};

export const SolutionSection = () => {
  const items = [
    ["idioma", "En su idioma", "In their language", "Tu web en español y en inglés, con tus servicios, tu zona y tus fotos.", "Your site in English and Spanish, with your services, your area and your photos."],
    ["whatsapp", "Directo a tu WhatsApp", "Straight to your WhatsApp", "El cliente elige el trabajo y te llega el pedido a WhatsApp, más un aviso por email.", "Customers pick the job and the request lands on your WhatsApp, plus an email alert."],
    ["google", "Lista en Google", "Ready on Google", "Configuramos tu perfil de Google Business para que te encuentren con la misma información.", "We set up your Google Business Profile so people find the same info everywhere."],
  ];
  return <section id="solucion" className="scroll-mt-24 bg-card py-16 lg:py-20"><div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 md:grid-cols-3">
    {items.map(([id, esT, enT, es, en]) => <article key={id}><h2 className="mb-3 text-2xl font-bold"><Copy es={esT} en={enT} /></h2><p className="leading-relaxed text-muted-foreground"><Copy es={es} en={en} /></p></article>)}
  </div></section>;
};

export const DemoSection = () => {
  const language = useContext(LanguageContext);
  const rob = decisions.robComingSoon
    ? { es: "y Rob, nuestra recepcionista con IA para llamadas entrantes (disponible pronto para clientes).", en: "and Rob, the AI receptionist for incoming calls (coming soon for clients)." }
    : { es: "y Rob, la recepcionista con IA que atiende las llamadas entrantes.", en: "and Rob, the AI receptionist who answers incoming calls." };
  return <section id="demo" className="scroll-mt-24 py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 sm:px-6">
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <AnimatedSection>
        <p className="section-kicker"><Copy es="Demo" en="Demo" /></p>
        <h2 className="mb-5 text-4xl font-bold leading-[1.02] md:text-6xl"><Copy es="Mira una web de servicios del hogar en acción." en="See a home-services website in action." /></h2>
        <p className="mb-6 leading-relaxed text-muted-foreground"><Copy es={`Prime Home Solutions: plomería, electricidad, calefacción y aire. Servicios claros, pedido por WhatsApp, calendario para agendar visitas ${rob.es}`} en={`Prime Home Solutions: plumbing, electrical, heating and air. Clear services, job requests on WhatsApp, a calendar to book visits ${rob.en}`} /></p>
        <DemoButton ctaLocation="demo" />
        <p className="mt-4 text-sm text-muted-foreground"><Copy es={`Tu web de USD ${offers.us.price} incluye las 5 secciones y el pedido a WhatsApp. El calendario y Rob se suman como extras.`} en={`Your USD ${offers.us.price} site includes the 5 sections and the WhatsApp request form. The calendar and Rob are add-ons.`} /></p>
      </AnimatedSection>
      <figure className="mx-auto w-full max-w-sm">
        <div className="overflow-hidden rounded-[2rem] border-8 border-foreground bg-background shadow-studio">
          <iframe title={language === "en" ? "Prime Home Solutions demo" : "Demo de Prime Home Solutions"} src={DEMO_URL} className="h-[34rem] w-full bg-card" loading="lazy" />
        </div>
      </figure>
    </div>
  </div></section>;
};

export const PortfolioSection = () => {
  const language = useContext(LanguageContext);
  if (!decisions.showPortfolioOnHome) return null;
  return <section id="proyectos" className="scroll-mt-24 bg-card py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-5 sm:px-6">
      <AnimatedSection className="mb-8 max-w-3xl">
        <h2 className="text-4xl font-bold leading-[1.02] md:text-6xl"><Copy es="Y cuando tu negocio necesita más que una web." en="And when your business needs more than a website." /></h2>
      </AnimatedSection>
      <ul className="mb-6 max-w-3xl space-y-2">{services.map(([id, es, en]) => <li key={id} className="font-bold"><Copy es={es} en={en} /></li>)}</ul>
      <p className="mb-10 max-w-3xl text-muted-foreground"><Copy es="Cada proyecto a medida se cotiza después de una charla de 10 minutos." en="Every custom project is quoted after a 10-minute call." /></p>
      <div className="space-y-14">
        {portfolioProjects.map((project, index) => <AnimatedSection key={project.name} delay={0.08 * index}>
          <ProjectCard project={project} index={index} language={language} />
        </AnimatedSection>)}
      </div>
      <div className="mt-10"><BookButton ctaLocation="proyectos" /></div>
    </div>
  </section>;
};

function ProjectCard({ project, index, language }: { project: typeof portfolioProjects[number]; index: number; language: "es" | "en" }) {
  const media = <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted lg:col-span-8">
    <img src={project.image} srcSet={`${project.smallImage} 600w, ${project.image} 1200w`} sizes="(min-width: 1024px) 800px, calc(100vw - 40px)" width={1200} height={675} decoding="async" alt={language === "en" ? project.altEn : project.altEs} loading="lazy" className="h-full w-full object-cover object-top" />
  </div>;
  const copy = <div className="lg:col-span-4 lg:px-5">
    <span className="text-xs font-bold text-primary-text">0{index + 1}</span>
    <h3 className="mb-3 mt-3 text-2xl font-bold md:text-3xl">{language === "en" ? project.nameEn : project.name}</h3>
    <p className="leading-relaxed text-muted-foreground"><Copy es={project.es} en={project.en} /></p>
  </div>;
  if (!project.href) return <figure className={`grid items-center gap-6 lg:grid-cols-12 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>{media}{copy}</figure>;
  return <LocalizedAnchor href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
    <div className={`grid items-center gap-6 lg:grid-cols-12 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
      {media}
      <div className="lg:col-span-4 lg:px-5">
        <span className="text-xs font-bold text-primary-text">0{index + 1}</span>
        <h3 className="mb-3 mt-3 text-2xl font-bold transition-colors group-hover:text-primary-text md:text-3xl">{language === "en" ? project.nameEn : project.name}</h3>
        <p className="mb-5 leading-relaxed text-muted-foreground"><Copy es={project.es} en={project.en} /></p>
        <span className="inline-flex items-center gap-2 text-sm font-bold"><Copy es="Ver proyecto" en="View project" /><ArrowUpRight size={16}/></span>
      </div>
    </div>
  </LocalizedAnchor>;
}

export const ProcessSection = () => (<section id="proceso" className="scroll-mt-24 bg-secondary py-20 lg:py-28">
  <div className="mx-auto max-w-7xl px-5 sm:px-6">
    <AnimatedSection className="mb-12 max-w-3xl">
      <h2 className="mb-4 text-4xl font-bold md:text-6xl"><Copy es="De la primera charla a tu web publicada." en="From our first chat to your site going live." /></h2>
      <p className="text-lg text-muted-foreground"><Copy es="Si recibimos todo a tiempo, la mayoría de las webs se publica en 1 a 2 semanas." en="If we get everything on time, most sites launch in 1 to 2 weeks." /></p>
    </AnimatedSection>
    <div className="grid border-t border-border md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => <AnimatedSection key={step.n} delay={index * 0.04} className="border-b border-border py-7 md:border-r md:px-5"><span className="text-xs font-bold text-primary-text">{step.n}</span><h3 className="mb-3 mt-8 text-xl font-bold"><Copy es={step.esT} en={step.enT} /></h3><p className="text-sm leading-relaxed text-muted-foreground"><Copy es={step.es} en={step.en} /></p></AnimatedSection>)}
    </div>
    <div className="mt-8"><BookButton ctaLocation="proceso" /></div>
  </div>
</section>);

export const FinalCTASection = () => {
  const language = useContext(LanguageContext);
  return <section id="contacto" className="scroll-mt-24 py-20 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
    <AnimatedSection>
      <h2 className="mb-6 text-4xl font-bold leading-[1.03] md:text-6xl"><Copy es="¿Vemos cómo quedaría tu negocio?" en="Shall we see how your business could look?" /></h2>
      <p className="mb-8 max-w-xl text-lg text-muted-foreground"><Copy es="Agenda 10 minutos y te mostramos la vista previa. Si prefieres, escríbenos por WhatsApp o déjanos tus datos." en="Book 10 minutes and we'll show you the preview. Or message us on WhatsApp, or leave your details." /></p>
      <div className="flex flex-col items-start gap-3">
        <BookButton ctaLocation="final" />
        <WhatsAppLink ctaLocation="final" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">WhatsApp</WhatsAppLink>
        <a className="inline-flex min-h-11 items-center font-bold underline underline-offset-4" href="mailto:hola@latamleap.com" onClick={() => track("email_click", { cta_location: "final", lang: language })}>hola@latamleap.com</a>
        <a className="inline-flex min-h-11 items-center font-bold underline underline-offset-4" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("instagram_click", { cta_location: "final" })}>Instagram @latam.leap</a>
      </div>
    </AnimatedSection>
    <AnimatedSection delay={.1} className="rounded-lg border border-border bg-card p-6 shadow-studio md:p-8">
      <h3 className="mb-2 text-2xl font-bold"><Copy es="Te escribimos nosotros" en="We'll reach out" /></h3>
      <p className="mb-5 text-sm text-muted-foreground"><Copy es="Te respondemos para coordinar la charla de 10 minutos." en="We'll reply to set up the 10-minute call." /></p>
      <AuditForm />
    </AnimatedSection>
  </div></section>;
};

export const HomeContent = () => <>
  <PainSection />
  <SolutionSection />
  <DemoSection />
  <OfferPricing />
  <ProcessSection />
  <ReferralSection />
  <FounderSection />
  <PortfolioSection />
  <OfferFAQ />
  <FinalCTASection />
</>;
