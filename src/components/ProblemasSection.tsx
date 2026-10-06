import { X } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const problems = [
  "Perdés leads porque tardás demasiado en responder.",
  "La información de tus clientes está repartida entre WhatsApp, emails, planillas y notas sueltas.",
  "Tu equipo repite las mismas tareas manuales todos los días.",
  "No tenés visibilidad clara de tu pipeline ni de qué se cierra esta semana.",
  "Todo depende de que una o dos personas se acuerden de hacer las cosas.",
  "Probaste herramientas, pero ninguna está conectada ni te ahorra tiempo realmente.",
];

const ProblemasSection = () => (
  <section className="py-28 lg:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="El problema" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-4xl mb-12">
          La mayoría de los negocios de servicios no tienen un problema de tecnología.
          Tienen un problema de seguimiento y organización.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-4">
        {problems.map((p, i) => (
          <AnimatedSection key={i} delay={0.15 + i * 0.08}>
            <div className="bg-card border border-border rounded-xl p-7 flex items-start gap-4 hover:border-ghost-border hover:-translate-y-0.5 transition-all">
              <X size={18} className="text-error mt-0.5 shrink-0" />
              <p className="text-muted-foreground text-[15px] leading-relaxed">{p}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.7} className="mt-8">
        <a href="#proceso" className="text-primary text-sm font-semibold hover:underline">
          Mirá cómo lo resolvemos →
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default ProblemasSection;
