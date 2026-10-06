import { Text, LocalizedAnchor } from "@/lib/language";
import care from "../../shared/care.json";
import { money } from "@/lib/money";
const questions = [
    ["¿Cuál es la diferencia entre una landing y una Web profesional?", "La landing concentra tu oferta en una sola página, con hasta seis secciones. La Web profesional permite explicar distintos servicios en hasta cinco páginas y te da un panel para editar el contenido."],
    ["¿Voy a poder manejarla?", "La Web profesional y la tienda incluyen panel y capacitación para las tareas habituales. En la landing, los cambios los realizamos nosotros: dentro del cuidado mensual o con un presupuesto aparte."],
    ["¿Cómo empezamos?", "Nos contás qué necesitás, confirmamos el alcance y acordamos la contratación y el inicio. Te pedimos la información del negocio, tu marca y contenido, y acordamos el cronograma. Definimos el mensaje, diseñamos, ajustamos y publicamos con vos."],
    ["¿Tengo que contratar mantenimiento?", `Es opcional. Podés elegir entrega independiente y pagar dominio y hosting por separado, o sumar cuidado mensual por ${money(care.price)} ARS desde el mes siguiente a la publicación.`],
    ["¿Incluye identidad visual y marketing mensual?", "Adaptamos el diseño a tu marca y trabajamos el mensaje comercial. Crear una identidad visual completa, gestionar campañas o producir contenido mensual requiere una propuesta adicional."],
    ["¿Y si mi proyecto necesita algo distinto?", "Consultanos antes de comprar si necesitás reservas, portales, rifas, automatizaciones o integraciones especiales. Esas funcionalidades requieren definir su alcance y presupuesto."],
];
export default function SalesFAQ() { return <section className="py-20"><div className="max-w-4xl mx-auto px-5 sm:px-6"><p className="section-kicker"><Text value={"Antes de elegir"}/></p><h2 className="text-4xl font-bold mb-8"><Text value={"Tus dudas, resueltas."}/></h2>{questions.map(([question, answer]) => <details key={question} className="border-b border-border py-5"><summary className="font-bold cursor-pointer"><Text value={question}/></summary><p className="text-muted-foreground leading-relaxed mt-4"><Text value={answer}/></p></details>)}</div></section>; }
