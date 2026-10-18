import { Check } from "lucide-react";
import offers from "../../shared/offers.json";
import { Copy } from "@/lib/copy";
import { BookButton } from "./SalesActions";
import AnimatedSection from "./AnimatedSection";

const includes = {
  es: [
    "5 secciones: inicio, servicios, zona, sobre tu negocio, contacto.",
    "Versión en español y en inglés.",
    "Formulario que abre WhatsApp con los datos del pedido y te avisa por email.",
    "Configuración inicial de tu perfil de Google Business.",
    "Dos rondas de cambios.",
    "Publicación en tu dominio.",
  ],
  en: [
    "5 sections: home, services, service area, about, contact.",
    "English and Spanish versions.",
    "A form that opens WhatsApp with the job details and emails you an alert.",
    "Initial Google Business Profile setup.",
    "Two rounds of changes.",
    "Launch on your domain.",
  ],
};

const questions: { esQ: string; enQ: string; esA: string; enA: string }[] = [
  {
    esQ: "¿Cómo pago?",
    enQ: "How do I pay?",
    esA: "Te envío una solicitud de pago de Wise en dólares. Pagas con los métodos que te muestre el enlace. Son dos pagos: 50% para empezar y 50% antes de publicar.",
    enA: "I send you a Wise payment request in U.S. dollars. You pay with the options shown in the link. Two payments: 50% to start and 50% before launch.",
  },
  {
    esQ: "¿Dónde estás?",
    enQ: "Where are you based?",
    esA: "En Córdoba, Argentina. Trabajo a distancia con negocios en Estados Unidos y respondo en tu horario de trabajo. No tengo oficina en Estados Unidos.",
    enA: "In Córdoba, Argentina. I work remotely with U.S. businesses and reply during your business hours. I do not have an office in the United States.",
  },
  {
    esQ: "¿Cuánto tarda?",
    enQ: "How long does it take?",
    esA: "Primera versión en 2 días hábiles desde que tengo la seña y todos tus materiales. La segunda revisión, 2 días hábiles desde que recibo los comentarios juntos. Publicación en 1 día hábil desde la aprobación y el saldo. Si respondes rápido, la mayoría de las webs se publica en 1 a 2 semanas.",
    enA: "First version in 2 business days after I receive the deposit and all your materials. The second revision is 2 business days after I receive your comments together. Launch is 1 business day after approval and the final payment. If you reply quickly, most sites launch in 1 to 2 weeks.",
  },
  {
    esQ: "¿Qué necesitas de mí?",
    enQ: "What do you need from me?",
    esA: "Tu logo, tus servicios, la zona donde trabajas, horarios, algunas fotos de tus trabajos y acceso a tu dominio y a tu perfil de Google. Te mando la lista completa.",
    enA: "Your logo, services, service area, hours, a few photos of your work, and access to your domain and Google profile. I'll send you the full list.",
  },
  {
    esQ: "¿De quién son las cuentas?",
    enQ: "Who owns the accounts?",
    esA: "Tuyas. Dominio, hosting, Google y cualquier herramienta están a tu nombre y los pagas tú. Yo trabajo con el acceso que me des.",
    enA: "You do. Domain, hosting, Google and any tools are in your name and paid by you. I work with the access you give me.",
  },
  {
    esQ: "¿Tengo que pagar mantenimiento?",
    enQ: "Do I have to pay for maintenance?",
    esA: "No. Es opcional: USD 49 al mes por soporte técnico, 2 cambios menores y una revisión mensual. Si algo que entregué no funciona como lo aprobaste, lo arreglo sin costo.",
    enA: "No. It's optional: USD 49/month for technical support, 2 minor changes and a monthly check. If something I delivered doesn't work as approved, I fix it at no cost.",
  },
  {
    esQ: "¿Me vas a poner primero en Google?",
    enQ: "Will you get me to the top of Google?",
    esA: "No puedo prometer eso. Dejo la web y tu perfil bien configurados; la posición depende de tu competencia, tus reseñas y otros factores.",
    enA: "I can't promise that. I set up your site and profile properly; ranking depends on competition, reviews and other factors.",
  },
  {
    esQ: "¿Y si no me gusta?",
    enQ: "What if I don't like it?",
    esA: "Antes de pagar ves un ejemplo visual con tu negocio. No es una web que funcione. Después hay dos rondas de cambios incluidas.",
    enA: "Before paying, you see a visual example with your business. It is not a working website. After that, two rounds of changes are included.",
  },
];

export function TradesSection() {
  const examples = [
    ["electricians", "Electricistas", "Electricians"],
    ["plumbers", "Plomeros", "Plumbers"],
    ["hvac", "HVAC", "HVAC"],
  ];
  return <section id="para-quien" className="py-16 lg:py-20 scroll-mt-24"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <p className="section-kicker"><Copy es="Para quién" en="Who it's for" /></p>
    <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] max-w-3xl"><Copy es="Plomeros, electricistas y técnicos de HVAC que atienden en español y en inglés." en="Plumbers, electricians and HVAC pros who serve customers in Spanish and English." /></h2>
    <p className="text-lg text-muted-foreground max-w-3xl mt-5"><Copy es="El dueño atiende el teléfono. Cuando alguien quiere ver qué haces y en qué zona trabajas, la web lo explica y manda el pedido a WhatsApp." en="The owner answers the phone. When someone wants to see what you do and where you work, the site explains it and sends the request to WhatsApp." /></p>
    <ul className="flex flex-wrap gap-3 mt-6">{examples.map(([id, es, en]) => <li key={id} id={id} className="scroll-mt-24 rounded-full border border-border bg-card px-4 py-2 text-sm font-bold"><Copy es={es} en={en} /></li>)}</ul>
  </div></section>;
}

export function OfferPricing() {
  return <section id="oferta" className="py-20 lg:py-28 bg-secondary scroll-mt-24"><div id="precios" className="max-w-7xl mx-auto px-5 sm:px-6 scroll-mt-24">
    <div className="max-w-3xl mb-10">
      <p className="section-kicker"><Copy es="La oferta" en="The offer" /></p>
      <h2 className="text-4xl md:text-6xl font-bold mb-5"><Copy es="Para que te encuentren y te llamen." en="So you get found and get the call." /></h2>
      <p className="text-lg text-muted-foreground"><Copy es={`Si hoy no tienen dónde verte, llaman a otro. Precio de lanzamiento: USD ${offers.us.price} para mis primeros 5 clientes, a cambio de un testimonio y permiso para mostrar tu sitio. Después, USD ${offers.us.regularPrice}. Sin precios tachados y sin contadores de lugares. Dominio, hosting y herramientas los pagas tú, en tus propias cuentas.`} en={`If they have nowhere to see you today, they call someone else. Launch price: USD ${offers.us.price} for my first 5 clients, in exchange for a testimonial and permission to show your site. After that, USD ${offers.us.regularPrice}. No crossed-out prices and no spot counters. You pay for the domain, hosting and tools yourself, in your own accounts.`} /></p>
    </div>
    <article className="max-w-3xl bg-card border border-border rounded-xl p-7 md:p-10 shadow-studio">
      <h3 className="text-2xl md:text-3xl font-bold"><Copy es={offers.us.name.es} en={offers.us.name.en} /></h3>
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-primary-text mt-4"><Copy es="Precio de lanzamiento" en="Launch price" /></p>
      <p className="text-4xl md:text-5xl font-bold mt-2">USD {offers.us.price}</p>
      <p className="text-base leading-relaxed mt-3"><Copy es={`Para mis primeros 5 clientes, a cambio de un testimonio y permiso para mostrar tu sitio. Después, USD ${offers.us.regularPrice}.`} en={`For my first 5 clients, in exchange for a testimonial and permission to show your site. After that, USD ${offers.us.regularPrice}.`} /></p>
      <ul className="space-y-3 my-6">{includes.es.map((feature, index) => <li key={feature} className="flex gap-2 text-sm md:text-base"><Check size={18} aria-hidden="true" className="text-primary-text shrink-0 mt-0.5" /><Copy es={feature} en={includes.en[index]} /></li>)}</ul>
      <p className="text-base text-foreground leading-relaxed"><Copy es="Alcance del perfil de Google: crear o reclamar la ficha en tu cuenta, categorías, zona de servicio, horarios, descripción en español y en inglés, y el enlace a la web. Las fotos las traes tú. La verificación la haces tú, según lo que pida Google. No garantizo aparecer ni quedar primero." en="Google profile scope: create or claim the listing in your account, categories, service area, hours, an English and Spanish description, and the link to the site. You provide the photos. You complete verification, however Google asks for it. I don't guarantee that you will show up or rank first." /></p>
      <p className="text-sm text-muted-foreground leading-relaxed mt-4"><Copy es="Pagas aparte, en tus propias cuentas: dominio, hosting y cualquier herramienta. Todo queda a tu nombre." en="You pay separately, in your own accounts: domain, hosting and any tools. Everything stays in your name." /></p>
      <p className="font-bold mt-4"><Copy es="Pago: 50% para empezar, 50% antes de publicar, por solicitud de pago de Wise." en="Payment: 50% to start, 50% before launch, by Wise payment request." /></p>
      <div className="mt-8 border-t border-border pt-6">
        <h4 className="text-xl font-bold"><Copy es={`Mantenimiento opcional — USD ${offers.us.maintenance}/mes`} en={`Optional maintenance — USD ${offers.us.maintenance}/month`} /></h4>
        <p className="text-muted-foreground mt-2 leading-relaxed"><Copy es="Soporte técnico, 2 cambios menores por mes y una revisión mensual de que la web, el formulario y el dominio sigan en orden. Lo cancelas cuando quieras. Tu web funciona igual sin este plan." en="Technical support, 2 minor changes per month and a monthly check that the site, the form and the domain are in order. Cancel anytime. Your site works without this plan." /></p>
      </div>
      <p className="mt-6 text-sm font-bold"><Copy es="Recepcionista con IA: próximamente" en="AI receptionist: coming soon" /></p>
      <p className="text-sm text-muted-foreground mt-1"><Copy es="La estamos probando para clientes que ya tienen web. Todavía no está a la venta y no atiende llamadas." en="We're testing it for clients who already have a website. It is not for sale yet and it does not answer calls." /></p>
      <div className="mt-8"><BookButton /></div>
    </article>
  </div></section>;
}

export function OfferFAQ() {
  return <section id="preguntas" className="py-20 scroll-mt-24"><div className="max-w-4xl mx-auto px-5 sm:px-6">
    <p className="section-kicker"><Copy es="Preguntas" en="Questions" /></p>
    <h2 className="text-4xl font-bold mb-8"><Copy es="Antes de agendar." en="Before you book." /></h2>
    {questions.map(item => <details key={item.esQ} className="border-b border-border py-5"><summary className="font-bold cursor-pointer"><Copy es={item.esQ} en={item.enQ} /></summary><p className="text-muted-foreground leading-relaxed mt-4"><Copy es={item.esA} en={item.enA} /></p></details>)}
  </div></section>;
}

export function FounderSection() {
  return <section className="py-20 lg:py-28"><div className="max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-12 gap-8">
    <AnimatedSection className="lg:col-span-4"><p className="section-kicker"><Copy es="Quién está detrás" en="Who's behind this" /></p></AnimatedSection>
    <AnimatedSection delay={0.05} className="lg:col-span-8">
      <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] mb-6"><Copy es="Hablas con la persona que hace la web." en="You talk to the person who builds the site." /></h2>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl"><Copy es="Soy Luciana Zunino. Trabajo desde Córdoba, Argentina, y hago webs para negocios de servicios. Estudié programación en el INTI y me formé en marketing digital con los cursos de Google, entre otros. Cuando trabajamos juntos, hablas conmigo: yo hago tu web, la configuro en tus cuentas y respondo tus mensajes." en="I'm Luciana Zunino. I work from Córdoba, Argentina, building websites for service businesses. I studied programming at INTI and trained in digital marketing through Google's courses, among others. When we work together, you talk to me: I build your site, set it up in your accounts and answer your messages." /></p>
    </AnimatedSection>
  </div></section>;
}
