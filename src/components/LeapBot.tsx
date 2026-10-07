import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Sparkles, Package, CreditCard, ClipboardCheck } from "lucide-react";

const CAL_URL = "https://calendar.app.google/2ngzNf9B8zQcUvzu9";
const WA_URL =
  "https://wa.me/5493512085644?text=Hola!%20Vi%20Latam%20Leap%20y%20me%20gustar%C3%ADa%20contarles%20sobre%20un%20proyecto%20que%20tengo%20en%20mente.";
const TEST_URL = "https://latamleap.com/test";

const actions = [
  { icon: Sparkles, label: "Pedir auditoría gratis", href: CAL_URL, external: true },
  { icon: Package, label: "Ver servicios", href: "/services", external: false },
  { icon: CreditCard, label: "Ver planes", href: "#planes", external: false },
  { icon: ClipboardCheck, label: "Hacer test gratuito", href: TEST_URL, external: true },
  { icon: MessageCircle, label: "Hablar por WhatsApp", href: WA_URL, external: true },
];

const LeapBot = () => {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [dismissedBubble, setDismissedBubble] = useState(false);

  useEffect(() => {
    if (dismissedBubble || open) return;
    const t = setTimeout(() => setBubble(true), 4000);
    return () => clearTimeout(t);
  }, [dismissedBubble, open]);

  const closeBubble = () => {
    setBubble(false);
    setDismissedBubble(true);
  };

  const toggle = () => {
    setOpen((o) => !o);
    closeBubble();
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50">
      {/* Bubble hint (desktop) */}
      <AnimatePresence>
        {bubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex absolute bottom-20 right-0 w-64 items-start gap-2 bg-card border border-border rounded-2xl rounded-br-sm shadow-xl px-4 py-3"
          >
            <p className="text-sm text-foreground leading-snug flex-1">
              ¿Querés saber qué automatizar primero?
            </p>
            <button
              onClick={closeBubble}
              aria-label="Cerrar mensaje"
              className="text-muted-foreground hover:text-foreground shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute bottom-20 right-0 w-[270px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="Menú Leap Bot"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/50">
              <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center">
                <span className="text-primary font-black text-sm">L</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground leading-tight">Leap Bot</p>
                <p className="text-[11px] text-muted-foreground">¿Por dónde empezamos?</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
            <ul className="p-2">
              {actions.map((a) => {
                const className =
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors";
                const inner = (
                  <>
                    <span className="w-7 h-7 rounded-md bg-primary/15 flex items-center justify-center shrink-0">
                      <a.icon size={14} className="text-primary" />
                    </span>
                    <span className="flex-1 text-left">{a.label}</span>
                  </>
                );
                return (
                  <li key={a.label}>
                    <a
                      href={a.href}
                      target={a.external ? "_blank" : undefined}
                      rel={a.external ? "noopener noreferrer" : undefined}
                      className={className}
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bot button */}
      <motion.button
        onClick={toggle}
        aria-label={open ? "Cerrar asistente Leap Bot" : "Abrir asistente Leap Bot"}
        aria-expanded={open}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-border flex items-center justify-center overflow-hidden"
      >
        {/* Soft body */}
        <span className="absolute inset-1 rounded-full bg-gradient-to-b from-white to-[#eef0f7]" />
        {/* Face */}
        <span className="relative flex flex-col items-center justify-center">
          <span className="flex gap-1.5">
            <span className="w-1.5 h-2 rounded-full bg-[hsl(var(--primary))]" />
            <span className="w-1.5 h-2 rounded-full bg-[hsl(var(--primary))]" />
          </span>
          <span className="mt-1 w-3 h-1 rounded-full bg-[hsl(var(--primary))]/80" />
        </span>
        {/* Antenna dot pulse */}
        <span className="absolute -top-0.5 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
      </motion.button>
    </div>
  );
};

export default LeapBot;
