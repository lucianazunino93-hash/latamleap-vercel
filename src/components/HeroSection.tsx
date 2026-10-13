import { Text, LocalizedAnchor } from "@/lib/language";
import SocialLinks from "./SocialLinks";
import { ConnectedSystem } from "./HomeSections";
import { Button } from "@/components/ui/button";

const HeroSection = () => (<section className="relative pt-8 lg:pt-12 pb-16 lg:pb-24 overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
      <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-12 lg:gap-16 items-center">
        <div className="max-w-2xl">
          <p className="section-kicker"><Text value="Negocios de servicios locales en Estados Unidos" /></p>
          <h1 className="font-bold text-[42px] sm:text-6xl lg:text-[64px] xl:text-[72px] leading-[.98] mb-7"><Text value="Más trabajos en la agenda, aunque no puedas atender." /></h1>
          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-8"><Text value="Diseñamos el sitio, tu lugar en Google Maps y la respuesta cuando se te escapa una llamada. Ves la maqueta en 48 horas y no pagás hasta aprobar el diseño." /></p>
          <Button asChild size="lg"><LocalizedAnchor href="/#contacto"><Text value="Pedí tu maqueta gratis en 48 horas" /></LocalizedAnchor></Button>
          <p className="text-sm text-text-muted leading-relaxed mt-6"><Text value="Para electricistas, plomeros, HVAC, limpieza y otros negocios de turnos, en cualquier ciudad de Estados Unidos. El abono, si lo hay, se puede frenar cuando quieras." /></p>
          <SocialLinks />
        </div>
        <div><ConnectedSystem /></div>
      </div>
    </div>
  </section>);
export default HeroSection;
