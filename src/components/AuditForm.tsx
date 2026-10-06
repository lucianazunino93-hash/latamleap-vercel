import { Text, LocalizedAnchor } from "@/lib/language";
import { LanguageContext } from "@/lib/language-context";
import { translate } from "@/lib/language-copy";
import { useContext, useId, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
interface Props {
    showIndustry?: boolean;
    buttonText?: string;
    showWhatsAppAlt?: boolean;
}
export default function AuditForm({ buttonText = "Preparar consulta", showWhatsAppAlt = true }: Props) {
    const language = useContext(LanguageContext);
    const id = useId();
    const [message, setMessage] = useState("");
    const submit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); const data = new FormData(e.currentTarget); const text = language === "en" ? `Hi, I am ${String(data.get('name')).trim()}. I need: ${translate(String(data.get('solution')), language)}. My project: ${String(data.get('project')).trim()}.` : `Hola, soy ${String(data.get('name')).trim()}. Necesito: ${data.get('solution')}. Mi proyecto: ${String(data.get('project')).trim()}.`; setMessage(text); };
    const cls = "block w-full mt-2 p-3 border border-border rounded-lg bg-card text-foreground";
    return <form onSubmit={submit} className="space-y-5"><label htmlFor={id + 'name'} className="block text-sm"><Text value={"Nombre"}/><input id={id + 'name'} name="name" autoComplete="name" required maxLength={100} className={cls}/></label><label htmlFor={id + 'solution'} className="block text-sm"><Text value={"\u00BFQu\u00E9 necesit\u00E1s?"}/><select id={id + 'solution'} name="solution" className={cls}><option value="Una landing"><Text value={"Una landing"}/></option><option value="Una Web profesional"><Text value={"Una Web profesional"}/></option><option value="Una tienda online"><Text value={"Una tienda online"}/></option><option value="Marketing o marca"><Text value={"Marketing o marca"}/></option><option value="Una solución a medida"><Text value={"Una soluci\u00F3n a medida"}/></option><option value="Necesito orientación"><Text value={"Necesito orientaci\u00F3n"}/></option></select></label><label htmlFor={id + 'project'} className="block text-sm"><Text value={"Contanos sobre tu proyecto"}/><textarea id={id + 'project'} name="project" required maxLength={1500} rows={4} className={cls} placeholder={translate("Qué vendés, qué querés resolver y si ya tenés una web", language)}/></label><p className="text-xs text-muted-foreground"><Text value={"Prepararemos un mensaje para que lo env\u00EDes por WhatsApp. Consult\u00E1 nuestra "}/><Link to="/privacy-policy" className="underline"><Text value={"pol\u00EDtica de privacidad"}/></Link><Text value={"."}/></p><Button type="submit" className="w-full"><Text value={buttonText}/></Button>{message && <div role="status" className="border rounded-lg p-4 space-y-3"><p><Text value={"Tu consulta est\u00E1 preparada. Envi\u00E1 el mensaje para que podamos recibirla."}/></p><LocalizedAnchor className="underline font-bold" href={'https://wa.me/5493512954849?text=' + encodeURIComponent(message)} target="_blank" rel="noopener noreferrer"><Text value={"Enviar consulta por WhatsApp \u2192"}/></LocalizedAnchor></div>}{showWhatsAppAlt && <LocalizedAnchor className="block text-sm underline text-center" href="https://wa.me/5493512954849" target="_blank" rel="noopener noreferrer"><Text value={"Prefiero escribir directamente"}/></LocalizedAnchor>}</form>;
}
