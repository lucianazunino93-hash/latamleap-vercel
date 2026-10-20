import { Text, LocalizedAnchor } from "@/lib/language";
import { Copy } from "@/lib/copy";
import care from "../../shared/care.json";
import offers from "../../shared/offers.json";
import { money } from "@/lib/money";
const sections = [
    ['Qué contratás', 'Latam Leap diseña y desarrolla landings, webs profesionales, tiendas online y soluciones digitales a medida. La compra directa cubre únicamente el alcance base indicado en la página del paquete. Incluye una instancia inicial para definir público, oferta y mensaje, y acompañamiento durante el desarrollo. Las ampliaciones se presupuestan por separado antes de realizarlas.'],
    ['Precios y pagos', "No hay checkout en este sitio y no se cobran dólares con Mercado Pago. Los precios de Estados Unidos están en dólares y los de Argentina en pesos. La maqueta y la llamada no se pagan. Si seguimos después de la llamada, los clientes de Estados Unidos pagan con un enlace de Wise que les enviamos. En Argentina coordinamos el pago en pesos por fuera del sitio. El abono mensual, cuando el nivel lo tiene, se acuerda del mismo modo y se puede frenar cuando el cliente quiera. El sitio no guarda datos de tarjeta."],
    ['Entrega independiente', 'No incluye abono de mantenimiento. Dominio y hosting se pagan aparte. Las modificaciones posteriores requieren presupuesto. Web profesional y tienda incluyen panel y capacitación; en la landing, los cambios los realizamos nosotros.'],
    ['Cuidado mensual', `El abono es de ${money(care.price)} ARS por mes. Incluye hasta tres solicitudes y un máximo conjunto de tres horas mensuales entre cambios y soporte técnico. Incluye cambios de textos, imágenes, datos y ajustes sobre funcionalidades existentes. Las horas y solicitudes no se acumulan. Nuevas páginas, rediseños, integraciones y excedentes se presupuestan previamente.`],
    ['Dominio y hosting incluidos', care.domain + ' ' + care.hosting],
    ['Baja del cuidado mensual', care.cancellation + ' Desde la baja, el cliente asume los costos del nuevo proveedor. ' + care.backup],
    ['Otros costos', 'Abonos de plataforma, licencias, comisiones de cobro y publicidad no están incluidos. Identidad visual completa y campañas de marketing requieren una propuesta adicional.'],
    ['Contenido, revisiones y entrega', 'El cliente proporciona la información, los materiales y los accesos necesarios, y confirma que puede utilizarlos. Incluimos dos rondas de ajustes dentro del alcance base. El cronograma se acuerda al recibir los materiales; las ampliaciones de alcance pueden modificarlo.'],
    ['Resultados', 'La configuración SEO inicial prepara el sitio para su rastreo y comprensión. No garantiza posiciones en Google, un volumen de visitas ni resultados de ventas. Las herramientas de terceros tienen sus propias condiciones y costos.'],
    ['Cancelaciones y consultas', 'Para solicitar una cancelación, devolución o ejercer los derechos que correspondan, escribí a hola@latamleap.com e identificá la compra. Estas condiciones no limitan los derechos establecidos por la legislación aplicable.']
];
const referral = offers.referral;
const referralArs = new Intl.NumberFormat("es-AR").format(referral.rewardARS);
const referralArsEn = new Intl.NumberFormat("en-US").format(referral.rewardARS);
const referralRules = {
  es: [
    "Tu mes se acredita cuando tu recomendado paga el 50 % inicial.",
    `Los meses se acumulan: hasta ${referral.capPerYear} por año.`,
    `Si todavía no tienes el plan de cuidado, te guardamos el mes durante ${referral.holdMonths} meses.`,
    "Es un crédito de servicio, personal, para el plan de cuidado de tu web con nosotros.",
    "Si dos personas recomiendan al mismo negocio, vale la primera recomendación que recibimos.",
    "Latam Leap puede actualizar el programa con aviso en esta página; los créditos ya ganados se respetan.",
  ],
  en: [
    "Your month is credited when your referral pays their 50% deposit.",
    `Months stack: up to ${referral.capPerYear} per year.`,
    `If you don't have the care plan yet, we keep your month for ${referral.holdMonths} months.`,
    "It's a personal service credit for the care plan of your website with us.",
    "If two people refer the same business, the first referral we receive counts.",
    "Latam Leap may update the program with notice on this page; credits already earned are kept.",
  ],
};

export default function TermsOfService() { return <section className="pt-32 pb-20 px-6 max-w-3xl mx-auto"><h1 className="text-4xl font-bold mb-8"><Text value={"T\u00E9rminos del servicio"}/></h1><p className="text-muted-foreground mb-8"><Copy es="Actualizados el 20 de octubre de 2026." en="Updated on October 20, 2026." /></p>{sections.map(([title, text]) => <div key={title} className="mb-8"><h2 className="text-2xl font-bold mb-3"><Text value={title}/></h2><p className="text-muted-foreground leading-relaxed"><Text value={text}/></p></div>)}<div className="mb-8"><h2 className="text-2xl font-bold mb-3"><Copy es="Programa de referidos" en="Referral program" /></h2><p className="text-muted-foreground leading-relaxed mb-4"><Copy es={`Por cada negocio que nos recomiendas y que paga el 50 % para empezar, te acreditamos ${referral.rewardMonths} mes de tu plan de cuidado (USD ${referral.rewardUSD}). En Argentina, ese mes es de mantenimiento y vale ARS ${referralArs}. La persona recomendada recibe la optimización completa de su perfil de Google.`} en={`For every business you refer that pays the 50% deposit, we credit you ${referral.rewardMonths} month of your care plan (USD ${referral.rewardUSD}). In Argentina, that month is maintenance and is worth ARS ${referralArsEn}. The person you refer receives a full Google Business Profile optimization.`} /></p><ul className="list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed">{referralRules.es.map((rule, index) => <li key={rule}><Copy es={rule} en={referralRules.en[index]} /></li>)}</ul></div><LocalizedAnchor className="underline" href="mailto:hola@latamleap.com"><Text value={"hola@latamleap.com"}/></LocalizedAnchor></section>; }
