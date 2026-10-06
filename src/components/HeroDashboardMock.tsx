import { motion } from "framer-motion";
import { UserPlus, MessageCircle, Database, CalendarCheck } from "lucide-react";

const events = [
  { icon: UserPlus, label: "Nuevo lead", detail: "Camila G. · Instagram Ads", time: "ahora" },
  { icon: MessageCircle, label: "WhatsApp enviado", detail: "Mensaje de bienvenida automático", time: "1s" },
  { icon: Database, label: "CRM actualizado", detail: "Etapa: Contacto inicial", time: "2s" },
  { icon: CalendarCheck, label: "Seguimiento programado", detail: "Recordatorio en 24h", time: "3s" },
];

const item = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.6 + i * 0.25, ease: "easeOut" as const },
});

const HeroDashboardMock = () => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
    className="relative w-full max-w-md mx-auto lg:max-w-none"
    aria-hidden="true"
  >
    {/* Glow */}
    <div className="absolute -inset-6 bg-primary/15 blur-3xl rounded-full pointer-events-none" />

    <div className="relative bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-2xl overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[11px] text-muted-foreground font-medium">
          panel.latamleap.com
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-primary font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          en vivo
        </span>
      </div>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
            Actividad reciente
          </p>
          <p className="text-foreground font-bold text-sm mt-0.5">Hoy · 12 leads nuevos</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted-foreground">Respuesta promedio</p>
          <p className="text-primary font-bold text-sm">12 segundos</p>
        </div>
      </div>

      {/* Events */}
      <ul className="px-5 pb-5 space-y-2">
        {events.map((e, i) => (
          <motion.li
            key={e.label}
            {...item(i)}
            className="flex items-center gap-3 bg-background/60 border border-border rounded-xl px-3.5 py-3"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <e.icon size={16} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{e.label}</p>
              <p className="text-[11px] text-muted-foreground truncate">{e.detail}</p>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono shrink-0">{e.time}</span>
          </motion.li>
        ))}
      </ul>

      {/* Footer stat */}
      <div className="grid grid-cols-3 border-t border-border bg-background/40">
        {[
          { k: "Leads", v: "128" },
          { k: "Respondidos", v: "100%" },
          { k: "Ahorro", v: "9h/sem" },
        ].map((s) => (
          <div key={s.k} className="px-3 py-3 text-center border-r border-border last:border-r-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.k}</p>
            <p className="text-sm font-bold text-foreground mt-0.5">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default HeroDashboardMock;
