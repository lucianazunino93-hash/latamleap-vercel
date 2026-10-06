import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const comparisons = [
  {
    problem: "Los leads te entran por WhatsApp, Instagram y formularios, y se pierden entre tanta conversación.",
    solution: "Centralizamos todos los leads en un solo lugar y les respondemos automático al instante.",
  },
  {
    problem: "Tu información vive en planillas de Excel que nadie actualiza a tiempo.",
    solution: "Armamos un panel donde todo se actualiza solo, sin depender de que alguien se acuerde.",
  },
  {
    problem: "Hacés seguimientos manuales que te comen horas y aun así se te escapan clientes.",
    solution: "Programamos recordatorios y mensajes automáticos para que ningún cliente quede colgado.",
  },
  {
    problem: "Si la persona que maneja el sistema no está, el negocio se frena.",
    solution: "Te dejamos un sistema simple que cualquiera del equipo puede usar desde el día uno.",
  },
];

const ProblemSolutionSection = () => (
  <section className="py-24 lg:py-28">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="¿Te suena familiar?" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-4xl lg:text-[44px] leading-[1.1] max-w-3xl mb-4">
          Si manejás un negocio de servicios en LATAM, esto te pasa todas las semanas.
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <p className="text-muted-foreground text-base lg:text-[17px] max-w-2xl leading-relaxed mb-12">
          Leads perdidos, WhatsApp desordenado, planillas que nadie mantiene, tareas repetitivas. Lo arreglamos sin que tengas que aprender nada técnico.
        </p>
      </AnimatedSection>

      <div className="grid gap-4">
        {comparisons.map((c, i) => (
          <AnimatedSection key={i} delay={0.15 + i * 0.08}>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center">
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-error font-semibold">Hoy: </span>
                  {c.problem}
                </p>
              </div>

              <ArrowRight size={20} className="text-primary hidden md:block shrink-0" />

              <div className="bg-card border border-primary/30 rounded-xl p-6">
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="text-primary font-semibold">Con nosotros: </span>
                  {c.solution}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSolutionSection;
