const WA_URL = "https://wa.me/5493512085644?text=Hola!%20Vi%20Latam%20Leap%20y%20me%20gustar%C3%ADa%20contarles%20sobre%20un%20proyecto%20que%20tengo%20en%20mente.";
const CAL_URL = "https://calendar.app.google/2ngzNf9B8zQcUvzu9";

interface Props {
  primaryText?: string;
  primaryHref?: string;
  showWhatsApp?: boolean;
  whatsAppText?: string;
  trustText?: string;
  className?: string;
}

const CTABlock = ({
  primaryText = "Agendá una llamada →",
  primaryHref = CAL_URL,
  showWhatsApp = true,
  whatsAppText = "📱 Escribinos por WhatsApp →",
  trustText = "Sin compromiso. Te contactamos en menos de 24 horas.",
  className = "",
}: Props) => (
  <div className={`flex flex-col gap-4 ${className}`}>
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary text-primary-foreground font-bold text-base px-8 py-4 rounded-lg hover:bg-primary-hover transition-colors text-center"
      >
        {primaryText}
      </a>
      {showWhatsApp && (
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-ghost-border text-foreground font-bold text-base px-8 py-4 rounded-lg hover:border-primary hover:text-primary transition-all text-center"
        >
          {whatsAppText}
        </a>
      )}
    </div>
    {trustText && (
      <p className="text-xs text-text-muted">{trustText}</p>
    )}
  </div>
);

export default CTABlock;
