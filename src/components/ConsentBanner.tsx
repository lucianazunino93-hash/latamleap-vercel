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
    if (localStorage.getItem(CONSENT_STORAGE_KEY) === "granted") {
      activateAnalytics();
      setVisible(false);
    }
  }, []);
  if (!visible) return null;
  return <div className="fixed inset-x-0 bottom-[4.75rem] lg:bottom-4 z-[60] px-3" role="dialog" aria-labelledby="consent-title">
    <div className="max-w-3xl mx-auto rounded-lg bg-foreground p-4 text-background shadow-studio flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1 text-sm leading-relaxed">
        <p id="consent-title" className="mb-1 font-bold"><Copy es="Medición de visitas" en="Visit measurement" /></p>
        <p><Copy es="Si aceptas, activamos Google Analytics y, cuando haya un identificador, el pixel de Meta." en="If you accept, we turn on Google Analytics and, when an ID is set, the Meta pixel." /> <Link to="/privacy-policy" className="underline"><Copy es="Privacidad" en="Privacy" /></Link></p>
      </div>
      <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 font-bold text-primary-foreground" onClick={() => {
        localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
        activateAnalytics();
        setVisible(false);
      }}><Copy es="Aceptar" en="Accept" /></button>
    </div>
  </div>;
}
