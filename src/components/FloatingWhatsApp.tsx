import { MessageCircle } from "lucide-react";

const WA_URL = "https://wa.me/5493512954849?text=Hola!%20Vi%20Latam%20Leap%20y%20me%20gustar%C3%ADa%20contarles%20sobre%20un%20proyecto%20que%20tengo%20en%20mente.";

const FloatingWhatsApp = () => (
  <a
    href={WA_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary-hover transition-all hover:scale-105"
    aria-label="WhatsApp"
  >
    <MessageCircle size={24} className="text-primary-foreground" />
  </a>
);

export default FloatingWhatsApp;
