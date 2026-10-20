import { useContext } from "react";
import { Copy } from "@/lib/copy";
import { LanguageContext } from "@/lib/language-context";
import { LocalizedAnchor } from "@/lib/language";
import { ArrowUpRight } from "lucide-react";
import { FinalCTASection } from "@/components/HomeSections";
import { portfolioProjects } from "@/lib/portfolio";

const descriptions: Record<string, { es: string; en: string; siteInSpanish?: boolean; capture?: boolean }> = {
  "vet.mavie": {
    es: "Especialistas veterinarias a domicilio. Servicios claros, consultas a domicilio y virtuales, y turnos que llegan directo a WhatsApp.",
    en: "Home-visit veterinary specialists. Clear services, home and virtual consultations, and appointment requests that go straight to WhatsApp.",
    siteInSpanish: true,
  },
  "Gonzalo Álvarez": {
    es: "Consultorio de psicoterapia online. Un sitio sereno y claro que explica cada servicio y lleva las consultas a WhatsApp.",
    en: "An online psychotherapy practice. A calm, clear site that explains each service and sends first-session requests to WhatsApp.",
    siteInSpanish: true,
  },
  "Rifa Solidaria": {
    es: "Sistema a medida para números, reservas y comprobantes.",
    en: "A custom system for raffle numbers, reservations and receipts.",
    capture: true,
  },
};

export default function CaseStudies() {
  const language = useContext(LanguageContext);
  return <>
    <section className="mx-auto max-w-7xl px-6 pt-32">
      <h1 className="text-4xl font-bold md:text-6xl"><Copy es="Proyectos reales, en línea hoy." en="Real projects, live today." /></h1>
      <p className="mt-5 max-w-3xl text-lg text-muted-foreground"><Copy es="Nuestro foco son las webs para negocios de servicios. Cada proyecto sigue la misma idea: que el cliente correcto te contacte fácil." en="Our focus is websites for service businesses. Every project follows the same idea: make it easy for the right customer to reach out." /></p>
    </section>
    <section className="mx-auto max-w-7xl px-6 py-16">
      <p className="section-kicker"><Copy es="Otros proyectos" en="Other projects" /></p>
      <h2 className="mb-10 max-w-3xl text-4xl font-bold md:text-5xl"><Copy es="Rubros distintos, el mismo enfoque." en="Different industries, the same approach." /></h2>
      <div className="space-y-14">
        {portfolioProjects.map(project => {
          const text = descriptions[project.name];
          if (!text) return null;
          const media = <div className="aspect-[16/9] overflow-hidden rounded-lg border border-border bg-muted lg:col-span-8">
            <img src={project.image} srcSet={`${project.smallImage} 600w, ${project.mediumImage} 800w, ${project.image} 1200w`} sizes="(min-width: 1024px) 800px, calc(100vw - 48px)" width={1200} height={675} decoding="async" alt={language === "en" ? project.altEn : project.altEs} loading="lazy" className="h-full w-full object-cover object-top" />
          </div>;
          const body = <div className="lg:col-span-4 lg:px-5">
            <h3 className="mb-3 text-2xl font-bold md:text-3xl">{language === "en" ? project.nameEn : project.name}</h3>
            <p className="leading-relaxed text-muted-foreground"><Copy es={text.es} en={text.en} /></p>
            {text.siteInSpanish && language === "en" && <p className="mt-3 text-sm italic text-muted-foreground">Site in Spanish.</p>}
            {text.capture && <p className="mt-3 text-sm italic text-muted-foreground"><Copy es="Captura." en="Screenshot." /></p>}
            {project.href && <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold"><Copy es="Ver proyecto" en="View project" /><ArrowUpRight size={16} /></span>}
          </div>;
          const grid = <div className="grid items-center gap-6 lg:grid-cols-12">{media}{body}</div>;
          if (!project.href) return <article key={project.name}>{grid}</article>;
          return <LocalizedAnchor key={project.name} href={project.href} target="_blank" rel="noopener noreferrer" className="group block">{grid}</LocalizedAnchor>;
        })}
      </div>
      <p className="mt-12 max-w-3xl text-lg"><Copy es="¿Tienes otro tipo de proyecto? Hacemos webs, tiendas online, sistemas a medida y automatizaciones con IA." en="Have a different kind of project? We build websites, online stores, custom systems and AI automations." /></p>
    </section>
    <FinalCTASection />
  </>;
}
