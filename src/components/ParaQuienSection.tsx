import { Shield, Briefcase, Users, Heart, Scale, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const industries = [
  {
    icon: Shield,
    name: "Agencias de Seguros",
    desc: "¿Gestionás decenas de pólizas y renovaciones a mano? Automatizá los seguimientos y no pierdas una renovación más por olvido.",
  },
  {
    icon: Briefcase,
    name: "Consultores y Asesores",
    desc: "¿Dedicás más tiempo a lo administrativo que a tus clientes? Construimos un sistema para traerlos, recibirlos y convertirlos.",
  },
  {
    icon: Users,
    name: "Agencias Pequeñas",
    desc: "¿Gestionás proyectos de clientes en planillas y grupos de chat? Centralizá todo y dejá de perder información en conversaciones.",
  },
  {
    icon: Heart,
    name: "Clínicas y Consultorios",
    desc: "¿Perdés pacientes por falta de seguimiento post-consulta? Tu sistema se acuerda por vos.",
  },
  {
    icon: Scale,
    name: "Estudios Profesionales",
    desc: "¿Abogados, contadores, arquitectos trabajando a demanda? Organizá tu pipeline y no pierdas una oportunidad más por mal seguimiento.",
  },
  {
    icon: GraduationCap,
    name: "Academias Online",
    desc: "¿Te llegan leads por redes pero nadie los convierte? Automatizá la respuesta y el seguimiento desde el primer contacto.",
  },
];

const ParaQuienSection = () => (
  <section className="py-28 lg:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="Para quién es" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-3xl mb-4">
          Si ya tenés clientes pero el día a día te consume, esto es para vos.
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <p className="text-muted-foreground text-[17px] max-w-2xl mb-14 leading-relaxed">
          La industria no importa. Si tu negocio funciona haciendo seguimiento a personas y hoy lo hacés todo manual, te podemos ayudar.
        </p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {industries.map((ind, i) => (
          <AnimatedSection key={ind.name} delay={0.2 + i * 0.08}>
            <div className="bg-card border border-border rounded-xl p-7 hover:border-ghost-border hover:-translate-y-0.5 transition-all h-full">
              <ind.icon size={24} className="text-primary mb-4" />
              <h3 className="font-bold text-foreground text-base mb-2">{ind.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{ind.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ParaQuienSection;
