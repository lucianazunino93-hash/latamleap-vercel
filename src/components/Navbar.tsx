import { LanguageContext } from "@/lib/language-context";
import { Copy } from "@/lib/copy";
import { LanguageSwitcher } from "@/lib/language";
import { BookButton } from "./SalesActions";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const usLinks = [
  { es: "Demo", en: "Demo", href: "/#demo" },
  { es: "Precio", en: "Pricing", href: "/#oferta" },
  { es: "Proceso", en: "Process", href: "/#proceso" },
  { es: "Recomienda", en: "Refer", href: "/#referidos" },
  { es: "Preguntas", en: "FAQ", href: "/#preguntas" },
];
const argentinaLinks = [
  { es: "Precio", en: "Precio", href: "#oferta" },
  { es: "Recomendá", en: "Recomendá", href: "#referidos" },
  { es: "Trabajos", en: "Trabajos", href: "#trabajos" },
  { es: "A medida", en: "A medida", href: "#a-medida" },
];

const Navbar = () => {
  const language = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const onArgentina = location.pathname === "/argentina";
  const links = onArgentina ? argentinaLinks : usLinks;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (<nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "border-b border-border backdrop-blur-xl bg-background/95" : "bg-background/70 backdrop-blur-md"}`}>
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2.5">
        <span className="font-display font-bold text-foreground text-xl">Latam<span className="text-primary-text">Leap</span></span>
      </Link>
      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        {links.map((l) => (<a key={l.href} href={onArgentina ? l.href : language === "en" ? `/en${l.href}` : l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Copy es={l.es} en={l.en} />
        </a>))}
        <BookButton ctaLocation="nav" />
      </div>
      <div className="flex items-center gap-3">{onArgentina ? null : <LanguageSwitcher />}<button className="lg:hidden text-foreground p-2 -mr-2 min-h-11 min-w-11 inline-flex items-center justify-center" onClick={() => setOpen(!open)} aria-label={language === "en" ? (open ? "Close menu" : "Open menu") : (open ? "Cerrar menú" : "Abrir menú")} aria-expanded={open}>
        {open ? <X size={24}/> : <Menu size={24}/>}
      </button></div>
    </div>
    {open && (<div className="lg:hidden bg-card border-t border-border px-6 py-6 space-y-4">
      {links.map((l) => (<a key={l.href} href={onArgentina ? l.href : language === "en" ? `/en${l.href}` : l.href} className="inline-flex items-center text-foreground text-base min-h-11" onClick={() => setOpen(false)}>
        <Copy es={l.es} en={l.en} />
      </a>))}
      <BookButton className="w-full" ctaLocation="nav" />
    </div>)}
  </nav>);
};
export default Navbar;
