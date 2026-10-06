import { Instagram, Music2 } from "lucide-react";

export default function SocialLinks() {
  return <div className="flex items-center gap-4 mt-6">
    <a href="https://www.instagram.com/latam.leap/" target="_blank" rel="noopener noreferrer" aria-label="Instagram · Latam Leap" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={21}/></a>
    <span aria-label="TikTok" aria-disabled="true" className="text-muted-foreground/40"><Music2 size={21}/></span>
  </div>;
}
