import { Text, LocalizedAnchor } from "@/lib/language";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = () => (<>
    <LocalizedAnchor href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-background focus:p-3"><Text value={"Ir al contenido"}/></LocalizedAnchor>
    <Navbar />
    <main id="contenido" tabIndex={-1}>
      <Outlet />
    </main>
    <Footer />
  </>);
export default Layout;
