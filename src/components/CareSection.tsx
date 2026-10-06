import care from "../../shared/care.json";
import { money } from "@/lib/money";

export default function CareSection() {
  return <section id="cuidado" className="py-20 bg-card"><div className="max-w-7xl mx-auto px-5 sm:px-6">
    <p className="section-kicker">Después del lanzamiento</p>
    <h2 className="text-4xl md:text-5xl font-bold mb-5">Elegís cómo seguir.</h2>
    <p className="text-lg text-muted-foreground max-w-3xl mb-10">Te acompañamos durante el desarrollo en ambas opciones. Al comprar, elegís si querés sumar el cuidado de tu web después de publicarla.</p>
    <div className="grid md:grid-cols-2 gap-6">
      <article className="border border-border rounded-xl p-7"><h3 className="text-2xl font-bold mb-4">Entrega independiente</h3><p className="font-bold mb-4">Sin abono de acompañamiento</p><p className="text-muted-foreground mb-5">Recibís tu web y una guía para dar los próximos pasos. Dominio y hosting se pagan aparte. Las modificaciones posteriores llevan un presupuesto propio.</p><p className="text-sm text-muted-foreground">Web profesional y tienda incluyen panel y capacitación. En la landing, los cambios los realizamos nosotros bajo presupuesto.</p></article>
      <article className="border border-primary rounded-xl p-7"><h3 className="text-2xl font-bold mb-4">Cuidado mensual</h3><p className="text-3xl font-bold mb-2">{money(care.price)} ARS/mes</p><p className="text-sm text-muted-foreground mb-5">Adicional al desarrollo. Comienza el mes siguiente a la publicación.</p><ul className="space-y-3"><li>Hosting y dominio estándar incluidos.</li><li>Hasta {care.requestsPerMonth} solicitudes y {care.hoursPerMonth} horas en total al mes, entre cambios y soporte técnico.</li><li>Textos, imágenes, datos y ajustes sobre lo que ya existe.</li><li>Cancelación sin permanencia y traspaso estándar incluidos.</li></ul><p className="text-sm text-muted-foreground mt-5">Horas y solicitudes no acumulables. Nuevas páginas, rediseños, integraciones y excedentes se presupuestan antes de realizarse.</p></article>
    </div>
    <details className="mt-7 border border-border rounded-xl p-5"><summary className="font-bold cursor-pointer">Dominio, hosting y condiciones de salida</summary><div className="space-y-4 text-sm text-muted-foreground mt-5"><p>{care.domain}</p><p>{care.hosting}</p><p>{care.cancellation} Desde la baja, los costos del nuevo proveedor quedan a tu cargo.</p><p>{care.backup}</p></div></details>
  </div></section>;
}
