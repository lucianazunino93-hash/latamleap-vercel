import { Search, PenTool, Wrench, Rocket } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Auditoría",
    desc: "Revisamos cómo opera tu negocio hoy y dónde se pierde tiempo.",
  },
  {
    num: "02",
    icon: PenTool,
    title: "Diseño",
    desc: "Definimos el sistema más simple que resuelve el problema.",
  },
  {
    num: "03",
    icon: Wrench,
    title: "Construcción",
    desc: "Armamos y conectamos todo para que funcione bien desde el día uno.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Lanzamiento",
    desc: "Empezás a usarlo y lo ajustamos según lo que necesites.",
  },
];

const ProcessSection = () => (
  <section id="proceso" className="py-28 lg:py-32 bg-card">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="Cómo trabajamos" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-3xl mb-14">
          Cuatro pasos. Sin vueltas.
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </div>
  </section>
);

export default ProcessSection;
