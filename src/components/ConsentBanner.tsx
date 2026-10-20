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
    <div className="mx-auto max-w-3xl rounded-lg bg-foreground px-3 py-2.5 text-background shadow-studio">
      <p id="consent-title" className="text-sm leading-snug"><Copy es="Si aceptas, medimos las visitas con Google Analytics." en="If you accept, we measure visits with Google Analytics." /> <Link to="/privacy-policy" className="underline"><Copy es="Privacidad" en="Privacy" /></Link></p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-md border border-background/40 px-3 font-bold" onClick={() => {
          const previous = localStorage.getItem(CONSENT_STORAGE_KEY);
          localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
          setVisible(false);
          if (previous === "granted") window.location.reload();
        }}><Copy es="Rechazar" en="Reject" /></button>
        <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-3 font-bold text-primary-foreground" onClick={() => {
          localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
          activateAnalytics();
          setVisible(false);
        }}><Copy es="Aceptar" en="Accept" /></button>
      </div>
    </div>
  </div>;
}
