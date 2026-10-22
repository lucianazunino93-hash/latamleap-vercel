import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Copy } from "@/lib/copy";
import { LanguageContext } from "@/lib/language-context";
import { ConnectedSystem } from "./HomeSections";
import { BookButton, DemoButton, WhatsAppLink } from "./SalesActions";

function previewSlug(value: string | null) {
  const slug = String(value || "").trim().toLowerCase();
  return /^[a-z0-9-]{1,80}$/.test(slug) ? slug : "";
}

const HeroSection = () => {
  const language = useContext(LanguageContext);
  const [params] = useSearchParams();
  const fromPreview = params.get("utm_source") === "cold_email" || Boolean(params.get("preview"));
  const slug = previewSlug(params.get("preview"));
  return <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
    <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
      <div className="grid items-center gap-12 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="section-kicker"><Copy es="Webs, IA y automatización para tu negocio" en="Websites, AI and automation for your business" /></p>
          <h1 className="mb-5 font-bold text-[42px] leading-[.98] sm:text-6xl lg:text-[64px] xl:text-[68px]">
            {fromPreview
              ? <Copy es="¿Ya viste la vista previa de tu negocio?" en="Saw the preview of your business?" />
              : <Copy es="Mientras trabajas, tu web recibe al próximo cliente." en="While you're on the job, your website welcomes the next customer." />}
          </h1>
          <p className="mb-3 text-xl font-bold leading-snug lg:text-2xl">
            {fromPreview
              ? <Copy es="Agenda 10 minutos y la terminamos juntos." en="Book 10 minutes and we'll finish it together." />
              : <Copy es="Diseñamos webs en español y en inglés que trabajan por tu negocio: muestran lo que haces, generan confianza y te traen pedidos por WhatsApp." en="We design websites in English and Spanish that work for your business: they show what you do, build trust and bring you requests on WhatsApp." />}
          </p>
          <p className="mb-8 text-lg leading-snug">
            <Copy es="Trabajamos con negocios de todo Estados Unidos y Latinoamérica." en="We work with businesses across the United States and Latin America." />
          </p>
          {slug && <img src={`/previews/${slug}.webp`} alt={language === "en" ? "Your preview" : "Tu vista previa"} width={640} height={360} className="mb-6 w-full max-w-md rounded-lg border border-border" onError={event => { event.currentTarget.remove(); }} />}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <BookButton ctaLocation="hero" />
            <DemoButton ctaLocation="hero" />
            <WhatsAppLink ctaLocation="hero" />
          </div>
        </div>
        <div><ConnectedSystem /></div>
      </div>
    </div>
  </section>;
};

export default HeroSection;
