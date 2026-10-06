import english from "../../shared/en.json";
import care from "../../shared/care.json";
import { money } from "./money";
const dictionary: Record<string, string> = english;
const phrases = Object.keys(dictionary).filter(key => key.length > 12).sort((a, b) => b.length - a.length);

export function translate(value: string, language: "es" | "en") {
  if (language === "es") return value;
  const key = value.trim().replace(/\s+/g, " ");
  if (dictionary[key]) return value.replace(value.trim(), dictionary[key]);
  if (key.startsWith("Es opcional. Podés elegir entrega independiente")) return `It's optional. Choose independent delivery and pay domain and hosting separately, or add monthly care for ${money(care.price)} ARS starting the month after launch.`;
  if (key.startsWith("El abono es de")) return `Monthly care costs ${money(care.price)} ARS. It includes up to three requests and three total hours per month for changes and technical support, covering text, images, data and adjustments to existing features. Unused hours and requests do not roll over. New pages, redesigns, integrations and extra work are quoted in advance.`;
  if(key.startsWith("Hola, quiero dar el salto con ")) {
    return value.replace("Hola, quiero dar el salto con ", "Hi, I would like to take the leap with ").replace(", desde ", ", starting at ").replace("Me gustaría confirmar el alcance para mi negocio.", "I would like to confirm the scope for my business.").replace("Web profesional", "Business website").replace("Tienda online", "Online store").replace("Landing", "Landing page");
  }
  let result = value;
  for (const phrase of phrases) result = result.split(phrase).join(dictionary[phrase]);
  return result;
}

