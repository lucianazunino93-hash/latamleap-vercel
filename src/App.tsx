import { LanguageContext } from "./lib/language-context";
import { CurrencyProvider } from "./lib/currency";
import SEO from "./components/SEO";
import { StaticRouter } from "react-router-dom/server";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import CaseStudies from "./pages/CaseStudies";
import Argentina from "./pages/Argentina";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DataDeletion from "./pages/DataDeletion";
import NotFound from "./pages/NotFound";
import Purchase from "./pages/Purchase";

const App = ({ url = "/" }: { url?: string }) => {
 const language = (typeof window === "undefined" ? url : window.location.pathname).match(/^\/en(?:\/|$)/) ? "en" : "es";
 const Router = typeof window === "undefined" ? StaticRouter : BrowserRouter;
 return (
  <LanguageContext.Provider value={language}><CurrencyProvider>
      <Router location={url} basename={language === "en" ? "/en" : "/"}>
        <SEO /><Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/argentina" element={<Argentina />} />
            <Route path="/comprar/:planId" element={<Purchase />} />
            <Route path="/pago" element={<Navigate to="/#oferta" replace />} />
            <Route path="/services" element={<Navigate to="/#oferta" replace />} />
            <Route path="/services/:serviceSlug" element={<Navigate to="/#oferta" replace />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/data-deletion" element={<DataDeletion />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  </CurrencyProvider></LanguageContext.Provider>
 );
};

export default App;
