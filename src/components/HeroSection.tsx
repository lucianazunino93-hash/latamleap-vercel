import { Copy } from "@/lib/copy";
import SocialLinks from "./SocialLinks";
import { ConnectedSystem } from "./HomeSections";
import { ArgentinaLink, BookButton, ExampleButton, WhatsAppLink } from "./SalesActions";

const HeroSection = () => (<section className="relative pt-8 lg:pt-12 pb-16 lg:pb-24 overflow-hidden">
  <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
    <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-12 lg:gap-16 items-center">
      <div className="max-w-2xl">
        <p className="section-kicker"><Copy es="Estudio en Córdoba, Argentina" en="Studio in Córdoba, Argentina" /></p>
        <h1 className="font-bold text-[42px] sm:text-6xl lg:text-[64px] xl:text-[68px] leading-[.98] mb-7"><Copy es="Una web en español y en inglés para tu negocio de servicios." en="A website in English and Spanish for your service business." /></h1>
        <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-xl mb-8"><Copy es="Para plomeros, electricistas y técnicos de HVAC. Tus clientes ven qué haces y en qué zona trabajas, y te mandan el pedido por WhatsApp. Precio fijo: USD 597. Trabajo a distancia: no tengo oficina en Estados Unidos." en="For plumbers, electricians and HVAC pros. Customers see what you do and where you work, and send you the job request on WhatsApp. Fixed price: USD 597. I work remotely: I don't have an office in the United States." /></p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center">
          <BookButton />
          <ExampleButton />
          <WhatsAppLink />
        </div>
        <p className="mt-6"><ArgentinaLink /></p>
        <SocialLinks />
      </div>
      <div><ConnectedSystem /></div>
    </div>
  </div>
</section>);
export default HeroSection;
