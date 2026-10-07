import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import SectionLabel from "./SectionLabel";

const CAL_URL = "https://calendar.app.google/2ngzNf9B8zQcUvzu9";
const WA_URL = "https://wa.me/5493512085644?text=Hola!%20Vi%20Latam%20Leap%20y%20me%20gustar%C3%ADa%20contarles%20sobre%20un%20proyecto%20que%20tengo%20en%20mente.";

const services = [
  {
    name: "Base Digital",
    tagline: "Tu negocio online funcionando y conectado desde el día uno",
    price: "Desde $590.000 ARS",
    includes: [
      "Sitio web profesional optimizado para convertir",
      "Formularios de contacto conectados",
      "CRM básico configurado",
      "Integración con Google Business",
      "SEO fundamental",
    ],
    highlighted: false,
    cta: "Ver detalles →",
    ctaLink: "/services#base-digital",
    ghost: true,
  },
  {
    name: "Sistema de Seguimiento",
    tagline: "Respondé a tiempo y no pierdas oportunidades",
    price: "Desde $990.000 ARS",
    includes: [
      "Todo lo de Base Digital",
      "Respuestas automáticas por WhatsApp y email",
      "Secuencias de seguimiento de 3 a 7 días",
      "Recordatorios inteligentes para tu equipo",
      "Cada lead recibe respuesta y seguimiento",
    ],
    highlighted: true,
    popular: true,
    cta: "Solicitar auditoría gratuita →",
    ctaLink: CAL_URL,
    ghost: false,
  },
  {
    name: "Sistema a Medida",
    tagline: "Si tu negocio necesita algo más específico, lo construimos con vos",
    price: "Desde $1.790.000 ARS",
    includes: [
      "Paneles internos con login",
      "Gestión de stock, clientes o servicios",
      "Automatizaciones adaptadas a tu proceso",
      "Conexiones entre sistemas",
      "Web conectada a tus datos en tiempo real",
    ],
    highlighted: false,
    cta: "Ver detalles →",
    ctaLink: "/services#sistema-medida",
    ghost: true,
  },
];

const ServicesPreviewSection = () => (
  <section className="py-28 lg:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection>
        <SectionLabel text="Servicios" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <h2 className="font-extrabold text-3xl md:text-[48px] md:leading-[1.1] leading-tight max-w-3xl mb-4">
          Soluciones según el momento de tu negocio
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <p className="text-muted-foreground text-[17px] max-w-2xl mb-14 leading-relaxed">
          No todos los negocios necesitan lo mismo. Algunos necesitan empezar desde cero. Otros necesitan ordenar lo que ya tienen. Por eso trabajamos en tres niveles.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-4">
        {services.map((svc, i) => (
          <AnimatedSection key={svc.name} delay={0.2 + i * 0.1}>
            <div className={`relative bg-card border rounded-xl p-7 h-full flex flex-col ${svc.highlighted ? "border-primary" : "border-border"}`}>
              {svc.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Más popular
                </span>
              )}
              <h3 className="font-bold text-xl text-foreground mb-1">{svc.name}</h3>
              <p className="text-xs text-primary font-medium mb-3">{svc.tagline}</p>
              <div className="mb-1">
                <span className="text-2xl font-bold text-foreground">{svc.price}</span>
              </div>
              <p className="text-[11px] text-text-muted mb-6">Pagos en ARS o equivalente local</p>

              <ul className="space-y-3 mb-8 flex-1">
                {svc.includes.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {svc.ghost ? (
                <Link
                  to={svc.ctaLink}
                  className="block w-full py-3.5 rounded-lg text-sm font-bold transition-all text-center border border-ghost-border text-foreground hover:border-primary hover:text-primary"
                >
                  {svc.cta}
                </Link>
              ) : (
                <a
                  href={svc.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 rounded-lg text-sm font-bold transition-colors text-center bg-primary text-primary-foreground hover:bg-primary-hover"
                >
                  {svc.cta}
                </a>
              )}
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* WhatsApp CTA intermedio */}
      <AnimatedSection delay={0.6} className="mt-10 text-center">
        <p className="text-muted-foreground text-sm mb-4">
          ¿No sabés cuál es el indicado? Escribinos y te ayudamos.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-ghost-border text-foreground font-bold text-sm px-6 py-3 rounded-lg hover:border-primary hover:text-primary transition-all"
        >
          📱 Escribinos por WhatsApp →
        </a>
      </AnimatedSection>

      <AnimatedSection delay={0.7} className="mt-6 space-y-4 text-center">
        <p className="text-xs text-text-muted max-w-2xl mx-auto leading-relaxed">
          Todos los proyectos arrancan con una auditoría gratuita de tu operación. El precio final se define en la llamada según tu caso. Sin sorpresas.
        </p>
        <Link to="/services" className="inline-block text-primary text-sm font-semibold hover:underline">
          Ver todos los servicios en detalle →
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

export default ServicesPreviewSection;
