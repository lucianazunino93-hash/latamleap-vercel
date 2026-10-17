import { useContext, type ReactNode } from "react";
import { LanguageContext } from "./language-context";

export function Copy({ es, en }: { es: ReactNode; en: ReactNode }) {
  const language = useContext(LanguageContext);
  return <>{language === "en" ? en : es}</>;
}
