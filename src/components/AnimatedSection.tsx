import { type ReactNode } from "react";

interface Props { children: ReactNode; className?: string; delay?: number; }

// Sections already render visibly in static HTML; no animation runtime is needed.
const AnimatedSection = ({ children, className = "" }: Props) => <div className={className}>{children}</div>;
export default AnimatedSection;
