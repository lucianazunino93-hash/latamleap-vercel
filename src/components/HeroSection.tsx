import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectedSystem, WHATSAPP_URL } from "./HomeSections";

const fadeUp = (delay: number) => ({
  initial: false as const,
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const HeroSection = () => (
  <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
      <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-12 lg:gap-16 items-center">
        <div className="max-w-2xl">
          <motion.div {...fadeUp(0.05)}>
            <p className="section-kicker">Estrategia, marketing y desarrollo</p>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="font-bold text-[42px] sm:text-6xl lg:text-[68px] xl:text-[76px] leading-[.98] mb-7"
          >
            Tu negocio está para más. Da el salto.
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-8"
          >
            Transformá el interés en un próximo paso. Creamos webs, tiendas y soluciones a medida que conectan tu negocio con nuevas oportunidades.
          </motion.p>

          <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg"><a href="#precios">Quiero dar el salto <ArrowDown /></a></Button>
            <Button asChild size="lg" variant="outline"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Necesito orientación <MessageCircle /></a></Button>
          </motion.div>

          <motion.p
            {...fadeUp(0.6)}
            className="text-sm text-text-muted leading-relaxed mt-6"
          >
            Estrategia y desarrollo en Argentina. Un proceso simple, con acompañamiento.
          </motion.p>
        </div>

        <motion.div {...fadeUp(0.25)}><ConnectedSystem /></motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;

