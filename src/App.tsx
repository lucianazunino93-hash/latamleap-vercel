import { LanguageContext } from "./lib/language-context";
import Purchase from "./pages/Purchase";
import PaymentReturn from "./pages/PaymentReturn";
import SEO from "./components/SEO";
import { StaticRouter } from "react-router-dom/server";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DataDeletion from "./pages/DataDeletion";
import NotFound from "./pages/NotFound";

const App = ({ url = "/" }: { url?: string }) => {
 const language = (typeof window === "undefined" ? url : window.location.pathname).match(/^\/en(?:\/|$)/) ? "en" : "es";
 const Router = typeof window === "undefined" ? StaticRouter : BrowserRouter;
 return (
  <LanguageContext.Provider value={language}>
      <Router location={url} basename={language === "en" ? "/en" : "/"}>
        <SEO /><Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/comprar/:planId" element={<Purchase />} /><Route path="/pago" element={<PaymentReturn />} /><Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/data-deletion" element={<DataDeletion />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  </LanguageContext.Provider>
 );
};

export default App;
