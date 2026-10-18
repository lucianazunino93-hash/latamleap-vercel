import { Copy } from "@/lib/copy";
import offers from "../../shared/offers.json";
import SocialLinks from "./SocialLinks";
import { ConnectedSystem } from "./HomeSections";
import { ArgentinaLink, BookButton, ExampleButton, WhatsAppLink } from "./SalesActions";

const HeroSection = () => (<section className="relative pt-8 lg:pt-12 pb-16 lg:pb-24 overflow-hidden">
  <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
    <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-12 lg:gap-16 items-center lg:min-h-[calc(100svh-7rem)]">
      <div className="max-w-2xl">
        <p className="section-kicker"><Copy es="Estudio en Córdoba, Argentina" en="Studio in Córdoba, Argentina" /></p>
        <h1 className="font-bold text-[42px] sm:text-6xl lg:text-[64px] xl:text-[68px] leading-[.98] mb-5"><Copy es="Te buscan en Google y llaman a otro." en="They search on Google and call someone else." /></h1>
        <p className="text-xl lg:text-2xl font-bold leading-snug mb-8"><Copy es="Para que te encuentren y te llamen." en="So you get found and get the call." /></p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center">
          <BookButton />
          <ExampleButton />
          <WhatsAppLink />
        </div>
        <p className="text-foreground font-medium mt-5"><Copy es={`Lanzamiento: USD ${offers.us.price} para mis primeros 5 clientes.`} en={`Launch: USD ${offers.us.price} for my first 5 clients.`} /></p>
        <p className="mt-6"><ArgentinaLink /></p>
        <SocialLinks />
      </div>
      <div><ConnectedSystem /></div>
    </div>
    <div className="max-w-3xl mt-14 lg:mt-20 space-y-4 text-lg text-muted-foreground leading-relaxed">
      <p><Copy es="Si no te encuentran, o no confían en lo que ven, llaman al competidor que sí tiene una web. Si dependes del boca a boca o de Facebook, el cliente que habla inglés no tiene dónde verte." en="If they don't find you, or they don't trust what they see, they call the competitor who does have a website. If you rely on word of mouth or Facebook, English-speaking customers have nowhere to see you." /></p>
      <p><Copy es="Me mandas el logo y las fotos por WhatsApp: yo hago el resto, incluido tu perfil de Google. Primera versión en 2 días hábiles después de la seña y los materiales completos." en="You send your logo and photos over WhatsApp: I do the rest, including your Google profile. First version in 2 business days after the deposit and the complete materials." /></p>
      <p><Copy es={`Precio de lanzamiento: USD ${offers.us.price} para mis primeros 5 clientes, a cambio de un testimonio y permiso para mostrar tu sitio. Después, USD ${offers.us.regularPrice}. Trabajo a distancia: no tengo oficina en Estados Unidos.`} en={`Launch price: USD ${offers.us.price} for my first 5 clients, in exchange for a testimonial and permission to show your site. After that, USD ${offers.us.regularPrice}. I work remotely: I don't have an office in the United States.`} /></p>
    </div>
  </div>
</section>);
export default HeroSection;
