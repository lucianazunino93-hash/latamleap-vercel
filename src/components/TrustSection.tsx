import AnimatedSection from "./AnimatedSection";
import AuditForm from "./AuditForm";

const CAL_URL = "https://calendar.app.google/2ngzNf9B8zQcUvzu9";

const TrustSection = () => (
  <section className="relative py-28 lg:py-32 overflow-hidden">
    <div className="absolute inset-0 glow-green" />
    <div className="relative max-w-7xl mx-auto px-6">
      <div className="max-w-xl mx-auto text-center">
        <AnimatedSection>
          <p className="text-muted-foreground text-[17px] leading-relaxed mb-2">
            No necesitás saber exactamente qué necesitás.
          </p>
          <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight mb-4">
            Nosotros te ayudamos a descubrirlo y armamos la forma más simple de resolverlo.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="text-muted-foreground text-[17px] mb-10 leading-relaxed">
            Auditoría gratuita de tu operación. Sin ventas agresivas, sin compromiso.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <AuditForm buttonText="Pedí tu auditoría gratis →" />
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default TrustSection;
