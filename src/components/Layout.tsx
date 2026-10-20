import { useContext, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Text, LocalizedAnchor } from "@/lib/language";
import { LanguageContext } from "@/lib/language-context";
import { Copy } from "@/lib/copy";
import { CALENDAR_URL } from "@/lib/sales";
import { track } from "@/lib/track";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConsentBanner from "./ConsentBanner";

function token(value: string | null) {
  const clean = String(value || "").trim().toLowerCase();
  return /^[a-z0-9-]{1,80}$/.test(clean) ? clean : undefined;
}

const Layout = () => {
  const language = useContext(LanguageContext);
  const [params] = useSearchParams();
  const tracked = useRef(false);
  useEffect(() => {
    const preview = params.get("preview");
    const cold = params.get("utm_source") === "cold_email";
    if (!cold && !preview) return;
    if (tracked.current) return;
    tracked.current = true;
    track("preview_landing", {
      preview_slug: preview ? token(preview) || "present" : undefined,
      utm_campaign: token(params.get("utm_campaign")),
    });
  }, [params]);
  return <>
    <LocalizedAnchor href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:p-3"><Text value={"Ir al contenido"}/></LocalizedAnchor>
    <Navbar />
    <main id="contenido" tabIndex={-1} className="pt-16 pb-24 lg:pb-0">
      <Outlet />
    </main>
    <Footer />
    <ConsentBanner />
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur">
      <a href={CALENDAR_URL} onClick={() => track("book_call_click", { cta_location: "sticky_mobile", lang: language, page_path: window.location.pathname })} className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground min-h-11"><Copy es="Agendar 10 minutos" en="Book a 10-minute call" /></a>
    </div>
  </>;
};
export default Layout;
