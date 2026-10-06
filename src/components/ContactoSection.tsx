import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";
import AuditForm from "./AuditForm";

const ContactoSection = () => (
  <section className="relative py-28 lg:py-32 overflow-hidden">
    <div className="absolute inset-0 glow-green" />
    <div className="relative max-w-7xl mx-auto px-6">
      <div className="max-w-xl mx-auto text-center">
        <AnimatedSection>
          <SectionLabel text="Dos formas de empezar. Las dos son gratis." />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight mb-4">
            El primer paso no cuesta nada.<br />
            El sistema que no tenés, sí.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="text-muted-foreground text-[17px] mb-10 leading-relaxed">
            Auditoría gratuita de tu operación. Sin ventas agresivas, sin compromiso. Te contactamos en menos de 24 horas.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <AuditForm buttonText="Agendá una llamada →" />
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default ContactoSection;
