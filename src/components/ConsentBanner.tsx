import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Copy } from "@/lib/copy";
import { activateAnalytics } from "@/lib/analytics";
import { CONSENT_STORAGE_KEY } from "../../shared/tracking.mjs";
import decisions from "../../shared/decisions.json";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(decisions.consentBanner);
  useEffect(() => {
    if (!decisions.consentBanner) return;
    const choice = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (choice === "granted") activateAnalytics();
    if (choice === "granted" || choice === "denied") setVisible(false);
    const open = () => setVisible(true);
    window.addEventListener("latamleap:consent-open", open);
    return () => window.removeEventListener("latamleap:consent-open", open);
  }, []);
  if (!visible) return null;
  return <div className="fixed inset-x-0 bottom-[4.75rem] lg:bottom-4 z-[60] px-3" role="dialog" aria-labelledby="consent-title">
    <div className="max-w-3xl mx-auto rounded-lg bg-foreground p-4 text-background shadow-studio flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1 text-sm leading-relaxed">
        <p id="consent-title" className="mb-1 font-bold"><Copy es="Medición de visitas" en="Visit measurement" /></p>
        <p><Copy es="Si aceptas, activamos solo Google Analytics. El pixel de Meta queda apagado hasta una elección aparte." en="If you accept, we turn on Google Analytics only. The Meta pixel stays off until a separate choice." /> <Link to="/privacy-policy" className="underline"><Copy es="Privacidad" en="Privacy" /></Link></p>
      </div>
      <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-md border border-background/40 px-5 font-bold" onClick={() => {
        const previous = localStorage.getItem(CONSENT_STORAGE_KEY);
        localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
        setVisible(false);
        if (previous === "granted") window.location.reload();
      }}><Copy es="Rechazar" en="Reject" /></button>
      <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 font-bold text-primary-foreground" onClick={() => {
        localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
        activateAnalytics();
        setVisible(false);
      }}><Copy es="Aceptar" en="Accept" /></button>
    </div>
  </div>;
}
