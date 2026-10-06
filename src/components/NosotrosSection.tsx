import AnimatedSection from "./AnimatedSection";



const values = [
  { icon: "⚡", title: "Velocidad", desc: "Entregamos en días, no meses" },
  { icon: "🔗", title: "Integración", desc: "Todo conectado, nada suelto" },
  { icon: "🌎", title: "LATAM-first", desc: "Pensado para nuestra región" },
];

const tools = ["N8n", "Supabase", "Webflow", "WhatsApp API", "Claude AI", "Kommo"];

const NosotrosSection = () => (
  <section id="nosotros" className="py-28 lg:py-32" style={{ backgroundColor: "#0a0a0a" }}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
        {/* Left column */}
        <div>
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
              <span className="text-xs text-muted-foreground font-body tracking-wide uppercase">Quiénes somos</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight mb-8">
              Construido desde LATAM,<br />para negocios de LATAM.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <div className="space-y-5 text-muted-foreground font-body font-light text-base leading-relaxed max-w-xl mb-10">
              <p>
                Latam Leap nació de una frustración concreta: ver cómo negocios con
                enorme potencial perdían clientes y oportunidades por no tener las
                herramientas digitales correctas, o por tener herramientas que nadie
                sabía usar.
              </p>
              <p>
                No somos una agencia tradicional. Somos un equipo técnico que entiende
                el contexto latinoamericano: los ritmos de negocio, los canales que
                realmente funcionan (sí, WhatsApp primero), y los presupuestos reales
                de empresas que están creciendo.
              </p>
              <p>
                Cada ecosistema que construimos está pensado para funcionar desde el
                día uno, sin depender de un técnico para operar.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <div className="flex flex-wrap gap-3">
              {values.map((v) => (
                <div key={v.title} className="flex items-center gap-2 border border-border rounded-full px-4 py-2">
                  <span>{v.icon}</span>
                  <span className="text-xs text-foreground font-display font-bold">{v.title}</span>
                  <span className="text-xs text-muted-foreground font-body">{v.desc}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Right column — Tools & values */}
        <AnimatedSection delay={0.3}>
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-display font-bold text-lg text-foreground mb-6">Nuestro stack tecnológico</h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t} className="border border-border bg-secondary rounded-full px-3 py-1.5 text-xs text-muted-foreground font-body">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default NosotrosSection;
