import { useEffect } from "react";
import offers from "../../shared/offers.json";
import { CALENDAR_URL, INSTAGRAM_URL, whatsAppUrl } from "@/lib/sales";
import { track } from "@/lib/track";
import vetMavie from "@/assets/projects/vet-mavie-1200.webp";
import vetMavieSmall from "@/assets/projects/vet-mavie-600.webp";
import gonzaloAlvarez from "@/assets/projects/gonzalo-alvarez-1200.webp";
import gonzaloAlvarezSmall from "@/assets/projects/gonzalo-alvarez-600.webp";
import rifaSolidaria from "@/assets/projects/rifa-solidaria-1200.webp";
import rifaSolidariaSmall from "@/assets/projects/rifa-solidaria-600.webp";

const pesos = new Intl.NumberFormat("es-AR").format(offers.ar.price);
const care = new Intl.NumberFormat("es-AR").format(offers.ar.maintenance);

const works = [
  { name: "vet.mavie", text: "Sitio web para especialistas veterinarias.", image: vetMavie, small: vetMavieSmall, href: "https://www.vetmavie.com/", alt: "Sitio web de vet.mavie" },
  { name: "Psicólogo Gonzalo Álvarez", text: "Sitio para un consultorio.", image: gonzaloAlvarez, small: gonzaloAlvarezSmall, href: "https://www.psicogonzaloalvarez.com/", alt: "Sitio web del psicólogo Gonzalo Álvarez" },
];

export default function Argentina() {
  useEffect(() => {
    document.cookie = "latamleap.lang=es; Path=/; Max-Age=31536000; SameSite=Lax";
  }, []);
  return <article className="pb-8">
    <section className="pt-10 pb-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <p className="section-kicker">Argentina</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.02] mb-6">Una web clara para tu negocio, con precio cerrado.</h1>
        <p className="text-lg text-muted-foreground mb-8">Para negocios en Argentina. Trabajo desde Córdoba y la página queda en español, salvo que haga falta inglés. Precio cerrado: ARS {pesos}.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={CALENDAR_URL} onClick={() => track("book_call_click", { cta_location: "argentina", lang: "es", page_path: "/argentina" })} className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 font-bold text-primary-foreground">Agendar 10 minutos</a>
          <a href={whatsAppUrl("es")} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { cta_location: "argentina", lang: "es" })} className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-6 font-bold">Escribir por WhatsApp</a>
        </div>
      </div>
    </section>
    <section id="oferta" className="py-16 bg-secondary scroll-mt-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Qué incluye</h2>
        <article className="bg-card border border-border rounded-xl p-7 md:p-10">
          <h3 className="text-2xl font-bold">{offers.ar.name}</h3>
          <p className="text-4xl font-bold mt-3">ARS {pesos}</p>
          <ul className="list-disc pl-5 space-y-2 my-6 text-muted-foreground">
            <li>5 secciones, en español.</li>
            <li>Formulario que abre WhatsApp y avisa por email.</li>
            <li>Dos rondas de cambios y publicación en tu dominio.</li>
          </ul>
          <p className="font-bold">Seña del 50% para empezar y saldo al publicar.</p>
          <p className="text-muted-foreground mt-3">Coordinamos el pago por transferencia o por un enlace de Mercado Pago. No hay checkout en esta página.</p>
          <p className="text-muted-foreground mt-3">Dominio, hosting y herramientas los pagás en tus propias cuentas.</p>
          <h4 className="text-xl font-bold mt-8">Mantenimiento opcional — ARS {care}/mes</h4>
          <p className="text-muted-foreground mt-2">Soporte técnico, 2 cambios menores por mes y una revisión mensual. Lo cancelás cuando quieras. La web funciona igual sin este plan.</p>
        </article>
      </div>
    </section>
    <section id="trabajos" className="py-16 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Trabajos</h2>
        <p className="text-muted-foreground mb-8 max-w-3xl">Proyectos reales en Argentina. No publicamos testimonios que no tengamos.</p>
        <div className="grid md:grid-cols-2 gap-8">
          {works.map(work => <a key={work.name} href={work.href} target="_blank" rel="noopener noreferrer" className="block">
            <img src={work.image} srcSet={`${work.small} 600w, ${work.image} 1200w`} sizes="(min-width: 768px) 480px, 100vw" width={1200} height={675} alt={work.alt} className="rounded-lg border border-border aspect-video object-cover object-top" />
            <h3 className="text-xl font-bold mt-3">{work.name}</h3>
            <p className="text-muted-foreground">{work.text}</p>
          </a>)}
        </div>
        <figure className="mt-8 max-w-xl">
          <img src={rifaSolidaria} srcSet={`${rifaSolidariaSmall} 600w, ${rifaSolidaria} 1200w`} sizes="(min-width: 768px) 480px, 100vw" width={1200} height={675} alt="Captura de Rifa Solidaria con información de demostración" className="rounded-lg border border-border aspect-video object-cover object-top" />
          <figcaption className="mt-3">
            <h3 className="text-xl font-bold">Rifa Solidaria</h3>
            <p className="text-muted-foreground">Sistema a medida para números, reservas y comprobantes. Esta imagen es una captura. No es un acceso al sistema.</p>
          </figcaption>
        </figure>
      </div>
    </section>
    <section id="a-medida" className="py-16 bg-card scroll-mt-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        <h2 className="text-3xl font-bold mb-3">Proyectos a medida</h2>
        <p className="text-muted-foreground">Tiendas, sistemas y rifas: consultá. Se cotizan aparte y no forman parte de la web de 5 secciones.</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a className="font-bold underline min-h-11 inline-flex items-center" href={whatsAppUrl("es")} onClick={() => track("whatsapp_click", { cta_location: "argentina_custom", lang: "es" })}>WhatsApp</a>
          <a className="font-bold underline min-h-11 inline-flex items-center" href={CALENDAR_URL} onClick={() => track("book_call_click", { cta_location: "argentina_custom", lang: "es", page_path: "/argentina" })}>Agendar</a>
          <a className="font-bold underline min-h-11 inline-flex items-center" href="mailto:hola@latamleap.com">hola@latamleap.com</a>
          <a className="font-bold underline min-h-11 inline-flex items-center" href={INSTAGRAM_URL}>Instagram</a>
        </div>
      </div>
    </section>
  </article>;
}
