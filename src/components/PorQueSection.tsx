import { Eye, Globe, Wrench } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const pillars = [
  {
    icon: Eye,
    title: "Experiencia desde adentro",
    desc: "No leímos sobre esto. Lo vivimos, lo construimos y lo vimos escalar. Sabemos qué se rompe en cada etapa.",
  },
  {
    icon: Globe,
    title: "Adaptado a LATAM",
    desc: "No traducimos metodología americana. La adaptamos a cómo funciona el negocio acá: WhatsApp, venta relacional, equipos chicos, ejecución rápida.",
  },
  {
    icon: Wrench,
    title: "Lo dejamos funcionando",
    desc: "No entregamos documentación ni recomendaciones. Entregamos un sistema que funciona desde el día uno.",
  },
];

const PorQueSection = () => (
  <section className="py-28 lg:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="Nuestra diferencia" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-4xl mb-10">
          Aprendimos cómo escalan los negocios digitales en EE.UU. desde adentro.
          Ahora lo construimos para negocios de LATAM.
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="max-w-3xl space-y-6 text-muted-foreground text-[17px] leading-relaxed mb-16">
          <p>
            El equipo de Latam Leap pasó años trabajando dentro de empresas de marketing digital en Estados Unidos. No como consultores externos, sino formando parte de los equipos que construían los sistemas de generación de leads, gestionaban carteras a escala y hacían funcionar las operaciones día a día.
            Vimos de primera mano qué sistemas funcionan, por qué funcionan, y qué se rompe cuando no están.
          </p>
          <p>
            También vimos lo que pasa cuando esos mismos sistemas se instalan sin adaptación en un negocio latinoamericano: no encajan. Porque acá el WhatsApp no es "otra opción", es el canal principal. La venta es relacional, no transaccional. Los equipos son chicos y nadie tiene semanas para aprender una herramienta con un manual de 40 páginas.
          </p>
          <p>
            Las metodologías americanas resuelven problemas americanos. Los negocios de LATAM necesitan sistemas construidos para cómo realmente operan acá.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-4">
        {pillars.map((p, i) => (
          <AnimatedSection key={p.title} delay={0.3 + i * 0.1}>
            <div className="bg-card border border-border rounded-xl p-7 hover:border-ghost-border hover:-translate-y-0.5 transition-all h-full">
              <p.icon size={24} className="text-primary mb-4" />
              <h3 className="font-bold text-foreground text-lg mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default PorQueSection;
