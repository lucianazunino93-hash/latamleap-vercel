import { Link } from "react-router-dom";
import { Magnet, MessageCircle, Users, Bell, BarChart3 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const features = [
  {
    icon: Magnet,
    title: "Captación de Leads",
    desc: "Formularios, landing pages y sistemas de contacto que realmente convierten, conectados con todo lo demás.",
  },
  {
    icon: MessageCircle,
    title: "Seguimiento Automático",
    desc: "Respuestas instantáneas por WhatsApp, secuencias de email y recordatorios que corren sin que toques nada.",
  },
  {
    icon: Users,
    title: "CRM Organizado",
    desc: "Todos tus leads y clientes en un solo lugar. Sin buscar en chats ni planillas.",
  },
  {
    icon: Bell,
    title: "Recordatorios Inteligentes",
    desc: "Follow-ups, alertas de tareas y puntos de contacto que se disparan solos en el momento justo.",
  },
  {
    icon: BarChart3,
    title: "Visibilidad del Pipeline",
    desc: "Sabé exactamente en qué estado está cada oportunidad. Sin preguntarle a nadie.",
  },
];

const SolucionSection = () => (
  <section className="py-28 lg:py-32 bg-card">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="Lo que construimos" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-3xl mb-4">
          Un sistema que hace el seguimiento, organiza y cierra por vos.
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <p className="text-muted-foreground text-[17px] max-w-2xl mb-14 leading-relaxed">
          No vendemos herramientas. Implementamos el sistema completo para que tu negocio capte leads, les haga seguimiento y los cierre, sin que nada dependa de que alguien se acuerde.
        </p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {features.map((f, i) => (
          <AnimatedSection key={f.title} delay={0.2 + i * 0.08}>
            <div className="bg-background border border-border rounded-xl p-7 hover:border-ghost-border hover:-translate-y-0.5 transition-all h-full">
              <f.icon size={24} className="text-primary mb-4" />
              <h3 className="font-bold text-foreground text-base mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.6} className="mt-10">
        <Link
          to="/services"
          className="inline-block border border-ghost-border text-foreground font-bold text-base px-8 py-4 rounded-lg hover:border-primary hover:text-primary transition-all"
        >
          Ver nuestros servicios →
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default SolucionSection;
