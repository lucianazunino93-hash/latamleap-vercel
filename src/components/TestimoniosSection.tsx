import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    initials: "MR", name: "María Rodríguez", role: "Consultora de Marketing, Bogotá 🇨🇴",
    text: "Antes perdía consultas porque no llegaba a responder rápido. Ahora todo entra ordenado y yo solo cierro los que ya están listos.",
  },
  {
    initials: "LP", name: "Laura Pacheco", role: "Directora de Academia Online, Buenos Aires 🇦🇷",
    text: "Intenté con otras agencias antes y siempre terminé con un sitio bonito pero que no hacía nada. Acá fue diferente. El sistema trabaja aunque yo no esté.",
  },
  {
    initials: "RM", name: "Roberto Méndez", role: "Fundador de Agencia Inmobiliaria, Salta 🇦🇷",
    text: "Lo que más valoro es que todo funciona conectado. El cliente completa un formulario, cae al CRM, recibe un mensaje y yo veo todo en un panel.",
  },
  {
    initials: "VT", name: "Valentina Torres", role: "Emprendedora, Mendoza 🇦🇷",
    text: "En tres semanas ya tenía el sistema funcionando. Mis ventas se ordenaron solas.",
  },
];


const TestimoniosSection = () => {
  return (
    <section id="testimonios" className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <AnimatedSection>
          <p className="section-kicker">Lo que dicen nuestros clientes</p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight max-w-3xl mb-12">
            El valor aparece cuando todo empieza a funcionar mejor.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {testimonials.map((t) => (
              <article key={t.name} className="bg-card p-7 md:p-8 flex flex-col min-h-[280px]">
                <div className="text-primary text-sm mb-6">★★★★★</div>
                <blockquote className="text-foreground text-base leading-relaxed mb-8 flex-1">“{t.text}”</blockquote>
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">{t.initials}</div><div><div className="text-sm font-bold">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div></div>
              </article>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimoniosSection;
