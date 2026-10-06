import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const TEST_URL = "https://latamleap.com/test";

const TestGratuitoCTA = () => (
  <section className="relative py-20 lg:py-24 overflow-hidden">
    <div className="absolute inset-0 glow-green opacity-60" />
    <div className="relative max-w-5xl mx-auto px-6">
      <AnimatedSection>
        <div className="relative rounded-2xl border border-primary/40 bg-card/60 backdrop-blur-sm p-8 md:p-12 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase">
                Nuevo · 2 minutos
              </span>
              <h2 className="font-extrabold text-3xl md:text-4xl leading-tight">
                Hacé el <span className="text-primary">test gratuito</span> y descubrí qué automatizar primero.
              </h2>
              <p className="text-muted-foreground text-[16px] leading-relaxed">
                Respondé unas preguntas rápidas y te mostramos en qué parte de tu operación estás perdiendo más tiempo.
              </p>
            </div>
            <motion.a
              href={TEST_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="shrink-0 bg-primary text-primary-foreground font-bold text-base px-8 py-5 rounded-lg shadow-[0_0_32px_rgba(124,58,237,0.35)] hover:bg-primary-hover transition-colors text-center"
            >
              Empezar test gratuito →
            </motion.a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default TestGratuitoCTA;
