import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "./HomeSections";

const links = [
  { label: "Soluciones", href: "/#soluciones" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Precios", href: "/#precios" },
  { label: "Nosotros", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "border-b border-border backdrop-blur-xl bg-background/95" : "bg-background/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-display font-bold text-foreground text-sm">LATAM LEAP</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button asChild><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Contanos tu proyecto</a></Button>
        </div>

        <button
          className="lg:hidden text-foreground p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-card border-t border-border px-6 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-foreground text-base"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="w-full"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Contanos tu proyecto</a></Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
