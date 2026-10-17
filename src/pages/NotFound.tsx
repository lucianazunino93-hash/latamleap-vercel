import { useContext } from "react";
import { LanguageContext } from "@/lib/language-context";

const NotFound = () => {
  const language = useContext(LanguageContext);
  const english = language === "en";
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p data-nf="msg" className="mb-4 text-xl text-muted-foreground">{english ? "Page not found" : "Página no encontrada"}</p>
        <a data-nf="home" href={english ? "/en" : "/"} className="text-primary underline hover:text-primary/90">
          {english ? "Back to home" : "Volver al inicio"}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
