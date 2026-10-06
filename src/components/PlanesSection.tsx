import { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const plans = [
  {
    name: "IGNITE",
    badge: "Para negocios que necesitan presencia online profesional",
    priceUsd: 349,
    setup: "Setup único",
    features: [
      "Website One-Page de alta conversión",
      "Formulario de contacto integrado",
      "Diseño responsive y moderno",
      "Optimización SEO básica",
      "Dominio + hosting incluido",
    ],
    cta: "Empezar ahora",
    highlighted: false,
  },
  {
    name: "GROWTH",
    badge: "Para negocios que quieren captar clientes y organizarse",
    priceUsd: 749,
    setup: "Retención mensual",
    popular: true,
    features: [
      "Todo lo de Ignite",
      "Website Multi-página (hasta 5 páginas)",
      "Integración con CRM básico",
      "Automatización de respuestas por email",
      "Bot de WhatsApp básico",
      "Panel de métricas simple",
    ],
    cta: "Quiero crecer",
    highlighted: true,
  },
  {
    name: "SCALE",
    badge: "Para empresas listas para automatizar y escalar sus ventas",
    priceUsd: 1249,
    setup: "Retención mensual",
    features: [
      "Todo lo de Growth",
      "Sistema de automatización avanzado",
      "Bot conversacional con IA",
      "Integración de pagos online (Stripe / Mercado Pago)",
      "Dashboard de métricas avanzado",
      "CRM completo con pipeline de ventas",
      "Soporte prioritario",
    ],
    cta: "Quiero escalar",
    highlighted: false,
  },
];

const currencies = [
  { code: "USD", symbol: "$", label: "USD — Dólar" },
  { code: "MXN", symbol: "MX$", label: "MXN — Peso Mexicano" },
  { code: "COP", symbol: "COL$", label: "COP — Peso Colombiano" },
  { code: "ARS", symbol: "AR$", label: "ARS — Peso Argentino" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
];

const CACHE_KEY = "latam_leap_rates";
const DAY_MS = 24 * 60 * 60 * 1000;

function getCachedRates(): Record<string, number> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { rates, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > DAY_MS) return null;
    return rates;
  } catch {
    return null;
  }
}

function setCachedRates(rates: Record<string, number>) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ rates, timestamp: Date.now() }));
}

const PlanesSection = () => {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [selected, setSelected] = useState("USD");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cached = getCachedRates();
    if (cached) {
      setRates(cached);
      return;
    }
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates) {
          setRates(data.rates);
          setCachedRates(data.rates);
        }
      })
      .catch(() => {});
  }, []);

  const cur = currencies.find((c) => c.code === selected)!;

  const formatConverted = (usd: number) => {
    if (selected === "USD" || !rates?.[selected]) return null;
    const converted = Math.round(usd * rates[selected]);
    return `Equivalente a ~${cur.symbol}${converted.toLocaleString()} ${selected} · Cotización del día`;
  };

  return (
    <section id="planes" className="bg-surface-problem py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
            <span className="text-xs text-muted-foreground font-body tracking-wide uppercase">Planes</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-3">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-tight max-w-3xl">
              Planes diseñados para<br />la etapa de tu negocio.
            </h2>

            {/* Currency selector */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 border border-border bg-card rounded-lg px-4 py-2.5 text-sm font-body text-foreground hover:border-primary transition"
              >
                {cur.label}
                <ChevronDown size={14} className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && (
                <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg py-1 z-50 min-w-[200px] shadow-lg">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setSelected(c.code); setOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-body hover:bg-secondary transition ${
                        c.code === selected ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.25}>
          <p className="text-muted-foreground font-body font-light text-lg mb-14">Inversión clara, resultados medibles.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={0.3 + i * 0.1}>
              <div className={`relative bg-card border rounded-2xl p-8 h-full flex flex-col ${plan.highlighted ? "border-primary" : "border-border"}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold font-display px-4 py-1 rounded-full">
                    Más popular
                  </span>
                )}
                <h3 className="font-display font-bold text-xl text-foreground mb-2">{plan.name}</h3>
                <p className="text-xs text-muted-foreground font-body mb-4">{plan.badge}</p>

                <div className="mb-1">
                  <span className="text-sm text-muted-foreground font-body">Desde </span>
                  {selected === "USD" || !rates?.[selected] ? (
                    <span className="text-2xl font-display font-bold text-foreground">
                      ${plan.priceUsd.toLocaleString()} USD
                    </span>
                  ) : (
                    <span className="text-2xl font-display font-bold text-foreground">
                      {cur.symbol}{Math.round(plan.priceUsd * rates[selected]).toLocaleString()} {selected}
                    </span>
                  )}
                </div>

                {selected !== "USD" && rates?.[selected] && (
                  <span className="text-[11px] text-muted-foreground font-body">
                    {formatConverted(plan.priceUsd)}
                  </span>
                )}

                <span className="text-[10px] text-muted-foreground font-body mb-6 mt-1">{plan.setup}</span>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground font-body font-light">
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollTo("#contacto")}
                  className={`w-full py-3 rounded-lg text-sm font-medium transition ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {plan.cta} →
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.7} className="mt-10">
          <p className="text-xs text-muted-foreground font-body max-w-2xl leading-relaxed">
            * Todos los planes incluyen retención mensual para mantenimiento, soporte y automatizaciones activas.
            Contactanos para recibir una propuesta personalizada con precios en tu moneda local.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PlanesSection;
