import { useContext } from "react";
import { Check } from "lucide-react";
import offers from "../../shared/offers.json";
import decisions from "../../shared/decisions.json";
import { isBonusActive } from "../../shared/bonus.mjs";
import { Copy } from "@/lib/copy";
import { LanguageContext } from "@/lib/language-context";
import { track } from "@/lib/track";
import { BookButton, WhatsAppLink } from "./SalesActions";
import AnimatedSection from "./AnimatedSection";
const portraitSrcSet = "/luciana-400.webp 400w, /luciana-800.webp 800w";
const portraitAvifSrcSet = "/luciana-400.avif 400w, /luciana-800.avif 800w";
const portraitSizes = "(min-width: 1024px) 384px, calc(100vw - 2.5rem)";

const includes = {
  es: [
    "5 secciones: inicio, servicios, zona, sobre tu negocio y contacto.",
    "Versión en español y en inglés.",
    "Formulario que abre WhatsApp con los datos del pedido y te avisa por email.",
    "Configuración inicial de tu perfil de Google Business.",
    "Dos rondas de cambios.",
    "Publicación en tu dominio.",
  ],
  en: [
    "5 sections: home, services, service area, about and contact.",
    "English and Spanish versions.",
    "A form that opens WhatsApp with the job details and emails you an alert.",
    "Initial Google Business Profile setup.",
    "Two rounds of changes.",
    "Launch on your domain.",
  ],
};

const questions = [
  { id: "pago", esQ: "¿Cómo pago?", enQ: "How do I pay?", esA: "Te enviamos una solicitud de pago de Wise en dólares: 50 % para empezar y 50 % al aprobar la web.", enA: "We send you a Wise payment request in U.S. dollars: 50% to start and 50% when you approve the site." },
  { id: "ciudad", esQ: "¿Trabajan con negocios de mi ciudad?", enQ: "Do you work with businesses in my city?", esA: "Sí. Trabajamos con negocios de todo Estados Unidos y Latinoamérica. Respondemos en tu horario de trabajo.", enA: "Yes. We work with businesses across the United States and Latin America. We reply during your business hours." },
  { id: "tiempo", esQ: "¿Cuánto tarda?", enQ: "How long does it take?", esA: "La primera versión está en 2 días hábiles desde el pago inicial y tus materiales. La mayoría de las webs se publica en 1 a 2 semanas.", enA: "The first version is ready 2 business days after the deposit and your materials. Most sites launch in 1 to 2 weeks." },
  { id: "materiales", esQ: "¿Qué necesito tener listo?", enQ: "What do I need to have ready?", esA: "Tu logo, tus servicios, tu zona, tus horarios y algunas fotos de tus trabajos. Te mandamos la lista completa.", enA: "Your logo, services, service area, hours and a few photos of your work. We'll send you the full list." },
  { id: "cuentas", esQ: "¿De quién son la web y las cuentas?", enQ: "Who owns the site and accounts?", esA: "Tuyas. Dominio, hosting y perfil de Google quedan a tu nombre desde el primer día.", enA: "You do. Domain, hosting and Google profile are in your name from day one." },
  { id: "cuidado", esQ: "¿El plan de cuidado es obligatorio?", enQ: "Is the care plan required?", esA: `Es opcional: USD ${offers.us.maintenance} al mes por soporte, 2 cambios menores y una revisión mensual. Cualquier detalle de lo que entregamos lo corregimos sin costo.`, enA: `It's optional: USD ${offers.us.maintenance}/month for support, 2 minor changes and a monthly check. Anything we delivered that needs fixing, we fix at no cost.` },
  { id: "google", esQ: "¿Me ayudan a aparecer en Google?", enQ: "Will you help me show up on Google?", esA: "Dejamos tu web y tu perfil completos y bien configurados, que es lo que Google recomienda. El orden de los resultados lo define Google según relevancia, distancia y prominencia.", enA: "We set up your site and profile complete and accurate, which is what Google recommends. Google orders results by relevance, distance and prominence." },
  { id: "vista-previa", esQ: "¿Puedo ver cómo quedaría antes de decidir?", enQ: "Can I see how it would look before deciding?", esA: "Sí. En la charla de 10 minutos ves la vista previa con tu negocio, y después tienes dos rondas de cambios.", enA: "Yes. On the 10-minute call you see a preview with your business, and then you get two rounds of changes." },
  { id: "proyectos", esQ: "¿Hacen proyectos más grandes?", enQ: "Do you take on bigger projects?", esA: "Sí: tiendas, sistemas a medida y automatizaciones con IA. Los cotizamos después de la charla.", enA: "Yes: stores, custom systems and AI automations. We quote them after the call." },
  { id: "referidos", esQ: "¿Tienen programa de referidos?", enQ: "Do you have a referral program?", esA: `Sí. Por cada negocio que nos recomiendas y empieza su proyecto, te regalamos un mes de tu plan de cuidado, hasta ${offers.referral.capPerYear} por año.`, enA: `Yes. For every business you refer that starts a project, you get a free month of your care plan, up to ${offers.referral.capPerYear} per year.` },
];

const chips = [
  ["inti", "Formación en programación (INTI)", "Programming training (INTI)"],
  ["analytics", "Marketing digital y analítica web", "Digital marketing & web analytics"],
  ["inc5000", "Experiencia en una empresa de marketing del Inc. 5000", "Experience at an Inc. 5000 marketing company"],
];

export function FounderPortrait() {
  const language = useContext(LanguageContext);
  if (!decisions.showFounderPhoto) return null;
  const alt = language === "en" ? "Luciana, founder of Latam Leap" : "Luciana, fundadora de Latam Leap";
  return <figure>
    <picture>
      <source type="image/avif" srcSet={portraitAvifSrcSet} sizes={portraitSizes} />
      <source type="image/webp" srcSet={portraitSrcSet} sizes={portraitSizes} />
      <img src="/luciana-800.webp" srcSet={portraitSrcSet} sizes={portraitSizes} width={800} height={800} alt={alt} decoding="async" loading="lazy" className="aspect-square w-full max-w-sm rounded-lg border border-border bg-secondary object-cover" />
    </picture>
  </figure>;
}

function Certifications() {
  const language = useContext(LanguageContext);
  if (!decisions.certifications?.enabled) return null;
  const items = decisions.certifications.items;
  if (!items.length) return null;
  return <div className="mt-6">
    <p className="mb-3 text-sm font-bold"><Copy es="Certificaciones" en="Certifications" /></p>
    <ul className="flex flex-wrap gap-2" data-certifications="">
      {items.map(item => {
        const url = item.url.trim();
        return <li key={item.id}>
          {url
            ? <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-bold text-foreground underline-offset-4 hover:underline" aria-label={language === "en" ? `View ${item.label} certificate` : `Ver certificado de ${item.label}`}>{item.label}</a>
            : <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-bold text-foreground">{item.label}</span>}
        </li>;
      })}
    </ul>
  </div>;
}

export function FounderCopy() {
  return <>
    <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground"><Copy es="Latam Leap la fundó Luciana, que une programación, marketing digital y experiencia en una empresa de marketing del Inc. 5000. Hoy lidera proyectos de webs, tiendas online, sistemas a medida y automatización con IA para negocios de servicios. Cuando trabajas con nosotros, hablas directo con quien diseña tu proyecto y respondemos en tu horario de trabajo." en="Latam Leap was founded by Luciana, who brings together software development, digital marketing and experience at an Inc. 5000 marketing company. Today she leads website, online store, custom system and AI automation projects for service businesses. When you work with us, you talk directly to the person designing your project, and we reply during your business hours." /></p>
    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground"><Copy es="Trabajamos con negocios de todo Estados Unidos y Latinoamérica." en="We work with businesses across the United States and Latin America." /></p>
    <ul className="mt-6 flex flex-wrap gap-2">{chips.map(([id, es, en]) => <li key={id} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-bold"><Copy es={es} en={en} /></li>)}</ul>
    <Certifications />
  </>;
}

export function OfferPricing() {
  const bonus = isBonusActive(offers.us.bonus) ? offers.us.bonus : null;
  return <section id="oferta" className="scroll-mt-24 bg-secondary py-20 lg:py-28"><div id="precios" className="mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-6">
    <div className="mb-10 max-w-3xl">
      <p className="section-kicker"><Copy es="La oferta" en="The offer" /></p>
      <h2 className="mb-5 text-4xl font-bold md:text-6xl"><Copy es="Una web bilingüe, lista para recibir pedidos." en="A bilingual website, ready to take job requests." /></h2>
    </div>
    <article className="max-w-3xl rounded-xl border border-border bg-card p-7 shadow-studio md:p-10">
      <h3 className="text-2xl font-bold md:text-3xl"><Copy es={offers.us.name.es} en={offers.us.name.en} /></h3>
      <p className="mt-4 text-sm font-bold uppercase tracking-[0.12em] text-primary-text"><Copy es="Precio fijo" en="Fixed price" /></p>
      <p className="mt-2 text-4xl font-bold md:text-5xl">USD {offers.us.price}</p>
      <ul className="my-6 space-y-3">{includes.es.map((feature, index) => <li key={feature} className="flex gap-2 text-sm md:text-base"><Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-primary-text" /><Copy es={feature} en={includes.en[index]} /></li>)}</ul>
      <p className="text-base leading-relaxed"><Copy es="50 % para empezar y 50 % al aprobar, por Wise. Dominio y hosting quedan a tu nombre, en tus cuentas." en="50% to start and 50% on approval, via Wise. Your domain and hosting stay in your name, in your accounts." /></p>
      {bonus && <p className="mt-4 font-bold" data-bonus-wording={bonus.wordingPending ? "pending" : "confirmed"}><Copy es={bonus.es} en={bonus.en} /></p>}
      <div className="mt-8 border-t border-border pt-6">
        <h4 className="text-xl font-bold"><Copy es={`Plan de cuidado (opcional) · USD ${offers.us.maintenance}/mes`} en={`Care plan (optional) · USD ${offers.us.maintenance}/month`} /></h4>
        <p className="mt-2 leading-relaxed text-muted-foreground"><Copy es="Soporte técnico, 2 cambios menores por mes y una revisión mensual de la web, el formulario y el dominio. Lo cancelas cuando quieras." en="Technical support, 2 minor changes per month and a monthly check of your site, form and domain. Cancel anytime." /></p>
      </div>
      <p className="mt-6 text-sm font-bold">{decisions.robComingSoon
        ? <Copy es="Próximamente para clientes: Rob, recepcionista con IA para tus llamadas entrantes." en="Coming soon for clients: Rob, an AI receptionist for your incoming calls." />
        : <Copy es="Rob, recepcionista con IA para tus llamadas entrantes." en="Rob, an AI receptionist for your incoming calls." />}</p>
      <div className="mt-8 flex flex-col items-start gap-3">
        <BookButton ctaLocation="oferta" />
        <WhatsAppLink id="compra" ctaLocation="purchase"><Copy es="Para el pago, escríbenos por WhatsApp." en="For payment, message us on WhatsApp." /></WhatsAppLink>
      </div>
    </article>
  </div></section>;
}

export function OfferFAQ() {
  return <section id="preguntas" className="scroll-mt-24 py-20"><div className="mx-auto max-w-4xl px-5 sm:px-6">
    <p className="section-kicker"><Copy es="Preguntas" en="Questions" /></p>
    <h2 className="mb-8 text-4xl font-bold"><Copy es="Preguntas" en="FAQ" /></h2>
    {questions.map(item => <details key={item.id} className="border-b border-border py-5" onToggle={event => { if (event.currentTarget.open) track("faq_open", { faq_id: item.id }); }}><summary className="flex min-h-11 cursor-pointer items-center font-bold"><Copy es={item.esQ} en={item.enQ} /></summary><p className="mt-4 leading-relaxed text-muted-foreground"><Copy es={item.esA} en={item.enA} /></p></details>)}
  </div></section>;
}

export function FounderSection() {
  return <section id="equipo" className="scroll-mt-24 py-20 lg:py-28"><div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-12">
    <AnimatedSection className="lg:col-span-4">
      <p className="section-kicker"><Copy es="Quién está detrás" en="Who's behind it" /></p>
      <FounderPortrait />
    </AnimatedSection>
    <AnimatedSection delay={0.05} className="lg:col-span-8">
      <h2 className="mb-6 text-4xl font-bold leading-[1.05] md:text-5xl"><Copy es="Una agencia que trabaja para ti." en="An agency that works for you." /></h2>
      <FounderCopy />
      <div className="mt-8"><BookButton ctaLocation="bio" /></div>
    </AnimatedSection>
  </div></section>;
}
