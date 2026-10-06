import { Users, Package, Cog, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const solutions = [
  {
    icon: Users,
    label: "Ventas",
    title: "Organizá tus leads y seguimientos",
    desc: "Dejá de perder oportunidades porque todo está desparramado.",
    includes: [
      "CRM simple configurado a tu medida",
      "Integraciones con WhatsApp o email",
      "Automatizaciones básicas de seguimiento",
    ],
    result: "Cada lead en un solo lugar. Fácil de ver, fácil de seguir.",
  },
  {
    icon: Package,
    label: "Operaciones",
    title: "Gestioná tu stock o servicios en tiempo real",
    desc: "Actualizá tu negocio en segundos, sin depender de nadie.",
    includes: [
      "Panel privado con login",
      "Agregar, editar y eliminar productos o servicios",
      "Tu web se actualiza automáticamente",
    ],
    result: "Lo actualizás una vez y se refleja en todos lados.",
  },
  {
    icon: Cog,
    label: "Admin",
    title: "Reducí el trabajo manual repetitivo",
    desc: "Automatizá tareas que te sacan tiempo y organizá todo mejor.",
    includes: [
      "Flujos de trabajo automatizados",
      "Integraciones entre herramientas",
      "Simplificación de procesos",
    ],
    result: "Menos trabajo manual, menos errores.",
  },
];

const CoreSolutionsSection = () => (
  <section id="soluciones" className="py-28 lg:py-32 bg-card">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="Lo que resolvemos" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-3xl mb-4">
          Tres problemas concretos. Tres sistemas que los resuelven.
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <p className="text-muted-foreground text-[17px] max-w-2xl mb-14 leading-relaxed">
          No vendemos tecnología. Armamos lo justo para que tu negocio funcione mejor desde el primer día.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-4">
        {solutions.map((s, i) => (
          <AnimatedSection key={s.label} delay={0.2 + i * 0.1}>
            <div className="bg-background border border-border rounded-xl p-7 h-full flex flex-col hover:border-ghost-border hover:-translate-y-0.5 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon size={20} className="text-primary" />
                </div>
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">{s.label}</span>
              </div>

              <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm mb-5">{s.desc}</p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-foreground font-medium">{s.result}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CoreSolutionsSection;
