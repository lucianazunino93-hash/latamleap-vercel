import { Text, LocalizedAnchor } from "@/lib/language";
import SocialLinks from "./SocialLinks";
import { ArrowDown, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectedSystem } from "./HomeSections";
const HeroSection = () => (<section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
      <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-12 lg:gap-16 items-center">
        <div className="max-w-2xl">
          <div>
            <p className="section-kicker"><Text value="Para clínicas, veterinarias, estudios y oficios" /></p>
          </div>

          <h1 className="font-bold text-[42px] sm:text-6xl lg:text-[68px] xl:text-[76px] leading-[.98] mb-7"><Text value="Que ninguna consulta se pierda." /></h1>

          <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-8"><Text value="Una web que aparece en Google, respuestas por WhatsApp y turnos que quedan agendados. Para negocios locales en Estados Unidos y en Argentina." /></p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg"><LocalizedAnchor href="/#contacto"><Text value="Reservar una llamada" /><CalendarCheck /></LocalizedAnchor></Button>
            <Button asChild size="lg" variant="outline"><LocalizedAnchor href="/#precios"><Text value="Ver precios" /><ArrowDown /></LocalizedAnchor></Button>
          </div>

          <p className="text-sm text-text-muted leading-relaxed mt-6"><Text value="Desde Argentina. Precios en dólares para Estados Unidos y en pesos para Argentina." /></p>
          <SocialLinks />
        </div>

        <div><ConnectedSystem /></div>
      </div>
    </div>
  </section>);
export default HeroSection;
