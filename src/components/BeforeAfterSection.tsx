import { X, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const before = [
  "Llegan leads por Instagram, WhatsApp o Facebook → nadie responde hasta el otro día → la competencia ya los tiene",
  "Info repartida entre WhatsApp + Excel + email → nada conectado entre sí",
  "Tareas manuales que dependen de la memoria → se va una persona, se cae el sistema",
  '"¿Cuántos leads tenemos esta semana?" → nadie sabe',
  "El negocio crece pero la libertad nunca llega",
];

const after = [
  "Entra un lead por Instagram, Facebook o WhatsApp → respuesta automática al instante → lead guardado y calificado en el CRM sin que nadie lo cargue a mano",
  "Pipedrive centraliza toda la info del cliente → cualquiera del equipo puede operar sin depender de una sola persona",
  "Las tareas se asignan solas según la etapa del pipeline → el sistema ejecuta sin que nadie se acuerde",
  "Dashboard semanal con métricas claras: leads, conversiones y actividad del equipo → sabés exactamente qué está pasando",
  "El negocio funciona incluso cuando no estás mirando → eso es libertad",
];

const BeforeAfterSection = () => (
  <section className="py-28 lg:py-32 bg-card">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="La transformación" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-3xl mb-14">
          Antes y después de trabajar con nosotros.
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-4">
        <AnimatedSection delay={0.2}>
          <div className="rounded-xl overflow-hidden border border-border h-full">
            <div className="bg-[#1A0000] px-7 py-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <X size={16} className="text-error" /> Antes
              </h3>
            </div>
            <div className="bg-card p-7 space-y-4">
              {before.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <X size={14} className="text-error mt-1 shrink-0" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="rounded-xl overflow-hidden border border-border h-full">
            <div className="bg-[#001A09] px-7 py-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Check size={16} className="text-primary" /> Después
              </h3>
            </div>
            <div className="bg-card p-7 space-y-4">
              {after.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={14} className="text-primary mt-1 shrink-0" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default BeforeAfterSection;
