import AnimatedSection from "./AnimatedSection";

const guarantees = [
  {
    icon: "🛡️",
    title: "Garantía de satisfacción",
    desc: "Si en los primeros 7 días no estás conforme, te devolvemos el setup fee sin preguntas.",
  },
  {
    icon: "⚡",
    title: "Entrega garantizada",
    desc: "Tu ecosistema activo en 7 días hábiles o te descontamos una semana de retención.",
  },
  {
    icon: "🤝",
    title: "Soporte en español",
    desc: "Siempre. Sin bots, sin tickets, sin esperas de 48 horas.",
  },
];

const GarantiaBanner = () => (
  <div className="bg-surface-problem border-t border-b border-primary/15 py-10 lg:py-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        {guarantees.map((g, i) => (
          <AnimatedSection key={g.title} delay={i * 0.1} className="text-center">
            <div className="text-3xl mb-3">{g.icon}</div>
            <h3 className="font-display font-bold text-base text-foreground mb-2">{g.title}</h3>
            <p className="text-[13px] text-muted-foreground font-body font-light leading-relaxed">{g.desc}</p>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </div>
);

export default GarantiaBanner;
