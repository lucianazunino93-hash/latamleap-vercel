import { Instagram } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/sales";

export default function SocialLinks() {
  return <div className="flex items-center gap-4 mt-6">
    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram · Latam Leap" className="text-muted-foreground hover:text-primary transition-colors inline-flex min-h-11 min-w-11 items-center"><Instagram size={21}/></a>
  </div>;
}
