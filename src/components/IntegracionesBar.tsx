import AnimatedSection from "./AnimatedSection";

const integrations = ["WhatsApp", "Instagram", "Stripe", "Mercado Pago", "Google Calendar", "Notion", "Gmail", "Zapier"];

const IntegracionesBar = () => (
  <div className="py-16 lg:py-20">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <p className="text-center text-[12px] text-muted-foreground font-body tracking-widest uppercase mb-6">
          Integraciones que incluye tu ecosistema
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.15}>
        <div className="flex flex-wrap justify-center gap-3">
          {integrations.map((name) => (
            <span
              key={name}
              className="border border-border bg-card rounded-full px-4 py-2 text-[13px] text-muted-foreground font-body hover:border-primary hover:text-foreground transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </AnimatedSection>
    </div>
  </div>
);

export default IntegracionesBar;
