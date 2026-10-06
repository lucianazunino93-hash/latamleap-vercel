import { Search, Settings, Rocket, TrendingUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";
import CTABlock from "./CTABlock";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Auditamos tu operación",
    desc: "Mapeamos cómo captás leads, cómo hacés el seguimiento y cómo gestionás clientes. Encontramos dónde se te escapan tiempo y dinero.",
  },
  {
    num: "02",
    icon: Settings,
    title: "Construimos tu sistema",
    desc: "Configuramos tu CRM, automatizaciones y captación de leads. Todo conectado y adaptado a cómo trabajás.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Lanzamos y capacitamos",
    desc: "Tenés un sistema funcionando desde el día uno. Le mostramos a tu equipo todo lo que necesita para operarlo sin depender de nadie.",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Nos quedamos y optimizamos",
    desc: "Soporte mensual, revisión de resultados y mejoras continuas para que el sistema crezca con tu negocio.",
  },
];

const HowItWorksSection = () => (
  <section id="proceso" className="py-28 lg:py-32 bg-card">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="Cómo funciona" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-3xl mb-14">
          Cuatro pasos.<br />
          Un sistema que funciona solo.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {steps.map((s, i) => (
          <AnimatedSection key={s.num} delay={0.15 + i * 0.1}>
            <div className="bg-background border border-border rounded-xl p-7 hover:border-ghost-border hover:-translate-y-0.5 transition-all h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-primary font-bold text-2xl">{s.num}</span>
                <s.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.6}>
        <CTABlock primaryText="Agendá una llamada →" />
      </AnimatedSection>
    </div>
  </section>
);

export default HowItWorksSection;
