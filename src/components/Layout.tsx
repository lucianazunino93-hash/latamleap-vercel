import { Text, LocalizedAnchor } from "@/lib/language";
import { Copy } from "@/lib/copy";
import { CALENDAR_URL } from "@/lib/sales";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = () => (<>
  <LocalizedAnchor href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:p-3"><Text value={"Ir al contenido"}/></LocalizedAnchor>
  <Navbar />
  <main id="contenido" tabIndex={-1} className="pt-16 pb-24 lg:pb-0">
    <Outlet />
  </main>
  <Footer />
  <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur">
    <a href={CALENDAR_URL} className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground min-h-11"><Copy es="Agendar 10 minutos" en="Book 10 minutes" /></a>
  </div>
</>);
export default Layout;
