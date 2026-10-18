import { Link, useLocation } from "react-router-dom";
import { Copy } from "@/lib/copy";
import { LocalizedAnchor } from "@/lib/language";
import { Instagram } from "lucide-react";
import { INSTAGRAM_URL, whatsAppUrl } from "@/lib/sales";
import { ArgentinaLink } from "./SalesActions";

const usLinks = [
  { es: "Ejemplo", en: "Example", href: "/#ejemplo" },
  { es: "Precio", en: "Price", href: "/#oferta" },
  { es: "Proceso", en: "Process", href: "/#proceso" },
  { es: "Preguntas", en: "Questions", href: "/#preguntas" },
];
const argentinaLinks = [
  { es: "Precio", en: "Precio", href: "#oferta" },
  { es: "Trabajos", en: "Trabajos", href: "#trabajos" },
  { es: "A medida", en: "A medida", href: "#a-medida" },
];
const legalLinks = [
  { es: "Privacidad", en: "Privacy", href: "/privacy-policy" },
  { es: "Términos del servicio", en: "Terms of service", href: "/terms-of-service" },
  { es: "Eliminar datos", en: "Delete data", href: "/data-deletion" },
];

const tap = "inline-flex items-center min-h-11 px-3 text-sm text-background/80 hover:text-primary transition-colors";

const Footer = () => {
  const onArgentina = useLocation().pathname === "/argentina";
  const links = onArgentina ? argentinaLinks : usLinks;
  return (<footer className="bg-foreground text-background pt-12 pb-28 lg:pb-12">
  <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
          <span className="font-display font-bold text-background text-xs">LATAM LEAP</span>
        </div>
        <p className="text-[11px] text-background/60"><Copy es="© 2026 Latam Leap. Estudio en Córdoba, Argentina. Webs para negocios de servicios." en="© 2026 Latam Leap. Studio in Córdoba, Argentina. Websites for service businesses." /></p>
      </div>
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {links.map((l) => onArgentina ? (<a key={l.href} href={l.href} className={tap}><Copy es={l.es} en={l.en} /></a>) : (<LocalizedAnchor key={l.href} href={l.href} className={tap}>
          <Copy es={l.es} en={l.en} />
        </LocalizedAnchor>))}
        <LocalizedAnchor href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${tap} gap-1.5`}>
          <Instagram size={16}/> Instagram
        </LocalizedAnchor>
        <LocalizedAnchor href={whatsAppUrl("es")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-11 text-sm bg-primary text-primary-foreground font-bold px-4 rounded-lg hover:bg-primary-hover transition-all">WhatsApp →</LocalizedAnchor>
      </div>
    </div>
    <div className="border-t border-background/20 pt-4 flex flex-col md:flex-row items-center justify-center gap-x-1 gap-y-1 flex-wrap">
      <ArgentinaLink className={`${tap} underline-offset-4 hover:underline`} />
      {legalLinks.map((l) => (<Link key={l.href} to={l.href} className={tap}>
        <Copy es={l.es} en={l.en} />
      </Link>))}
      <a href="mailto:hola@latamleap.com" className={tap}>hola@latamleap.com</a>
    </div>
  </div>
</footer>);
};
export default Footer;
