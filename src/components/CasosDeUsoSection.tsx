import { Zap, MousePointerClick, Settings } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const cases = [
  {
    icon: Zap,
    title: "Lead que no se pierde",
    desc: "Un visitante llena tu formulario a las 11pm. En segundos recibe un WhatsApp automático, queda registrado en tu CRM y tú ves todo en el dashboard al despertar.",
  },
  {
    icon: MousePointerClick,
    title: "Página que convierte sola",
    desc: "Tu landing page está diseñada para guiar, no para confundir. Cada sección tiene un objetivo. Cada CTA tiene un destino. Sin distracciones, sin fugas.",
  },
  {
    icon: Settings,
    title: "Operación sin caos",
    desc: "Propuestas, seguimientos, onboarding de clientes: todo corre con flujos automatizados. Tú apareces donde importa, el sistema hace el resto.",
  },
];

const CasosDeUsoSection = () => (
  <section id="casos" className="py-24 lg:py-28">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
          <span className="text-xs text-muted-foreground font-body tracking-wide uppercase">
            Casos de uso
          </span>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <h2 className="font-display font-extrabold text-3xl md:text-[44px] leading-tight max-w-3xl mb-12">
          Así funciona en la práctica.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-5">
        {cases.map((c, i) => (
          <AnimatedSection key={c.title} delay={0.25 + i * 0.1}>
            <div className="bg-card border border-border rounded-2xl p-7 h-full flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <c.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-3">
                {c.title}
              </h3>
              <p className="text-muted-foreground font-body font-light text-sm leading-relaxed">
                {c.desc}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CasosDeUsoSection;
