import { Text, LocalizedAnchor } from "@/lib/language";
import { Link } from "react-router-dom";
import { Instagram, Music2 } from "lucide-react";
import { WHATSAPP_URL } from "./HomeSections";
const links = [
    { label: "Soluciones", href: "/#soluciones" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Precios", href: "/#precios" },
    { label: "Nosotros", href: "/about" },
];
const legalLinks = [
    { label: "Privacidad", href: "/privacy-policy" },
    { label: "Términos del servicio", href: "/terms-of-service" },
    { label: "Eliminar datos", href: "/data-deletion" },
];
const socials = [
    { label: "Instagram", href: "https://www.instagram.com/latam.leap/", Icon: Instagram },
];
const Footer = () => (<footer className="bg-foreground text-background py-12">
    <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
            <span className="font-display font-bold text-background text-xs"><Text value={"LATAM LEAP"}/></span>
          </div>
          <p className="text-[11px] text-background/60"><Text value={" \u00A9 2026 Latam Leap. Soluciones digitales para problemas reales. "}/></p>
        </div>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          {links.map((l) => (<LocalizedAnchor key={l.href} href={l.href} className="text-xs text-background/70 hover:text-primary transition-colors">
              <Text value={l.label}/>
            </LocalizedAnchor>))}
          {socials.map((s) => (<LocalizedAnchor key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-background/70 hover:text-primary transition-colors">
              <s.Icon size={14}/> <Text value={s.label}/>
            </LocalizedAnchor>))}
          <span role="img" aria-label="TikTok" aria-disabled="true" className="text-background/30"><Music2 size={14}/></span>
          <LocalizedAnchor href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xs bg-primary text-primary-foreground font-bold px-4 py-2 rounded-lg hover:bg-primary-hover transition-all"><Text value={" WhatsApp \u2192 "}/></LocalizedAnchor>
        </div>
      </div>

        <div className="border-t border-background/20 pt-6 flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-3 flex-wrap">
        {legalLinks.map((l) => (<Link key={l.href} to={l.href} className="text-[11px] text-background/60 hover:text-primary transition-colors">
            <Text value={l.label}/>
          </Link>))}
        <LocalizedAnchor href="mailto:hola@latamleap.com" className="text-[11px] text-background/60 hover:text-primary transition-colors"><Text value={" hola@latamleap.com "}/></LocalizedAnchor>
      </div>
    </div>
  </footer>);
export default Footer;
