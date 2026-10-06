import { useState, useEffect } from "react";
import { UserPlus, MessageCircle, Database, LayoutDashboard } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  { icon: UserPlus, label: "Lead entra" },
  { icon: MessageCircle, label: "WhatsApp responde" },
  { icon: Database, label: "CRM se actualiza" },
  { icon: LayoutDashboard, label: "Lo ves en tu panel" },
];

const FlowAnimationSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a + 1) % (steps.length + 1));
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <div className="bg-card border border-border rounded-2xl p-5 sm:p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold text-center mb-2">
              Tu flujo automático
            </p>
            <h3 className="font-bold text-lg md:text-xl text-center text-foreground mb-8">
              Un lead entra y todo pasa solo.
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-4 relative">
              {steps.map((step, i) => {
                const isActive = active >= i && active < steps.length;
                return (
                  <div
                    key={step.label}
                    className="flex flex-col items-center relative z-10"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                        isActive
                          ? "bg-primary/20 border-primary shadow-[0_0_24px_hsl(var(--primary)/0.35)]"
                          : "bg-secondary border-border"
                      }`}
                    >
                      <step.icon
                        size={22}
                        className={`transition-colors duration-500 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <span
                      className={`mt-3 text-[11px] sm:text-xs md:text-sm text-center leading-tight transition-colors duration-500 ${
                        isActive ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FlowAnimationSection;
