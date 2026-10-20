import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Copy } from "@/lib/copy";
import { activateAnalytics } from "@/lib/analytics";
import { CONSENT_STORAGE_KEY } from "../../shared/tracking.mjs";
import decisions from "../../shared/decisions.json";

function readConsent() {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(() => decisions.consentBanner && (typeof window === "undefined" || !["granted", "denied"].includes(readConsent() || "")));
  useEffect(() => {
    if (!decisions.consentBanner) return;
    if (readConsent() === "granted") activateAnalytics();
    const open = () => {
      document.documentElement.removeAttribute("data-consent");
      setVisible(true);
    };
    window.addEventListener("latamleap:consent-open", open);
    return () => window.removeEventListener("latamleap:consent-open", open);
  }, []);
  if (!visible) return null;
  return <div data-consent-banner className="fixed inset-x-0 bottom-[4.75rem] lg:bottom-4 z-[60] px-3" role="dialog" aria-labelledby="consent-title">
    <div className="mx-auto max-w-3xl rounded-lg bg-foreground px-3 py-2.5 text-background shadow-studio">
      <p id="consent-title" className="text-sm leading-snug"><Copy es="Si aceptas, medimos las visitas con Google Analytics." en="If you accept, we measure visits with Google Analytics." /> <Link to="/privacy-policy" className="underline"><Copy es="Privacidad" en="Privacy" /></Link></p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-md border border-background/40 px-3 font-bold" onClick={() => {
          const previous = readConsent();
          if (writeConsent("denied")) document.documentElement.setAttribute("data-consent", "denied");
          setVisible(false);
          if (previous === "granted") window.location.reload();
        }}><Copy es="Rechazar" en="Reject" /></button>
        <button type="button" className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-3 font-bold text-primary-foreground" onClick={() => {
          if (writeConsent("granted")) document.documentElement.setAttribute("data-consent", "granted");
          activateAnalytics();
          setVisible(false);
        }}><Copy es="Aceptar" en="Accept" /></button>
      </div>
    </div>
  </div>;
}
