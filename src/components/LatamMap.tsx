import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cities = [
  { name: "Ciudad de México", cx: 148, cy: 178, delay: 0 },
  { name: "Monterrey", cx: 155, cy: 158, delay: 0.3 },
  { name: "Bogotá", cx: 220, cy: 260, delay: 0.6 },
  { name: "Medellín", cx: 212, cy: 248, delay: 0.9 },
  { name: "Lima", cx: 205, cy: 330, delay: 1.2 },
  { name: "São Paulo", cx: 325, cy: 385, delay: 1.5 },
  { name: "Buenos Aires", cx: 280, cy: 455, delay: 1.8 },
  { name: "Santiago", cx: 248, cy: 430, delay: 2.1 },
];

const LatamMap = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [clientCount, setClientCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setClientCount((prev) => (prev >= 7 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const countryStyle = (id: string) => ({
    fill: hoveredCountry === id ? "rgba(0,232,122,0.15)" : "#1a1a1a",
    stroke: hoveredCountry === id ? "#00e87a" : "rgba(0,232,122,0.25)",
    strokeWidth: 0.8,
    transition: "fill 0.3s, stroke 0.3s",
    cursor: "pointer",
  });

  const onEnter = (id: string) => setHoveredCountry(id);
  const onLeave = () => setHoveredCountry(null);

  return (
    <div className="relative flex-1 w-full max-w-lg">
      {/* Live visitors floating bubble */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 bg-card border border-primary/20 rounded-full px-5 py-2 flex items-center gap-2 shadow-[0_0_20px_rgba(0,232,122,0.1)]"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={clientCount}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-foreground font-body font-medium"
          >
            {clientCount} {clientCount === 1 ? "cliente interactuando" : "clientes interactuando"} con Latam Leap
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <div className="relative rounded-[20px] overflow-visible pt-6">
        <svg viewBox="80 100 350 420" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Mexico */}
          <path d="M110,140 L180,130 L195,155 L185,180 L170,200 L155,195 L140,200 L125,185 L110,170 Z"
            style={countryStyle("mx")} onMouseEnter={() => onEnter("mx")} onMouseLeave={onLeave} />
          {/* Guatemala */}
          <path d="M155,195 L170,200 L172,210 L158,212 L152,205 Z"
            style={countryStyle("gt")} onMouseEnter={() => onEnter("gt")} onMouseLeave={onLeave} />
          {/* El Salvador */}
          <path d="M158,212 L172,210 L173,218 L160,218 Z"
            style={countryStyle("sv")} onMouseEnter={() => onEnter("sv")} onMouseLeave={onLeave} />
          {/* Honduras */}
          <path d="M172,210 L190,205 L195,215 L173,218 Z"
            style={countryStyle("hn")} onMouseEnter={() => onEnter("hn")} onMouseLeave={onLeave} />
          {/* Nicaragua */}
          <path d="M173,218 L195,215 L198,232 L178,235 Z"
            style={countryStyle("ni")} onMouseEnter={() => onEnter("ni")} onMouseLeave={onLeave} />
          {/* Costa Rica */}
          <path d="M178,235 L198,232 L200,245 L185,248 Z"
            style={countryStyle("cr")} onMouseEnter={() => onEnter("cr")} onMouseLeave={onLeave} />
          {/* Panama */}
          <path d="M185,248 L200,245 L215,250 L210,258 L195,255 Z"
            style={countryStyle("pa")} onMouseEnter={() => onEnter("pa")} onMouseLeave={onLeave} />
          {/* Colombia */}
          <path d="M195,255 L210,258 L235,250 L250,270 L240,295 L225,310 L210,300 L200,280 L190,270 Z"
            style={countryStyle("co")} onMouseEnter={() => onEnter("co")} onMouseLeave={onLeave} />
          {/* Venezuela */}
          <path d="M250,270 L235,250 L260,230 L290,235 L300,250 L280,265 Z"
            style={countryStyle("ve")} onMouseEnter={() => onEnter("ve")} onMouseLeave={onLeave} />
          {/* Ecuador */}
          <path d="M190,270 L200,280 L210,300 L200,315 L185,310 L180,290 Z"
            style={countryStyle("ec")} onMouseEnter={() => onEnter("ec")} onMouseLeave={onLeave} />
          {/* Peru */}
          <path d="M180,290 L185,310 L200,315 L210,300 L225,310 L230,340 L225,370 L210,380 L195,370 L185,345 L175,320 Z"
            style={countryStyle("pe")} onMouseEnter={() => onEnter("pe")} onMouseLeave={onLeave} />
          {/* Bolivia */}
          <path d="M225,370 L230,340 L250,335 L270,345 L275,375 L260,390 L240,385 Z"
            style={countryStyle("bo")} onMouseEnter={() => onEnter("bo")} onMouseLeave={onLeave} />
          {/* Brazil */}
          <path d="M240,295 L250,270 L280,265 L300,250 L330,260 L360,280 L380,310 L375,350 L360,380 L340,400 L320,410 L300,400 L290,380 L275,375 L270,345 L250,335 L230,340 Z"
            style={countryStyle("br")} onMouseEnter={() => onEnter("br")} onMouseLeave={onLeave} />
          {/* Paraguay */}
          <path d="M290,380 L300,400 L295,415 L275,410 L270,395 L275,375 Z"
            style={countryStyle("py")} onMouseEnter={() => onEnter("py")} onMouseLeave={onLeave} />
          {/* Uruguay */}
          <path d="M295,415 L300,400 L310,415 L305,430 L295,430 Z"
            style={countryStyle("uy")} onMouseEnter={() => onEnter("uy")} onMouseLeave={onLeave} />
          {/* Argentina */}
          <path d="M240,385 L260,390 L270,395 L275,410 L295,415 L295,430 L290,450 L280,470 L270,490 L265,505 L255,500 L250,480 L245,455 L240,430 L235,410 Z"
            style={countryStyle("ar")} onMouseEnter={() => onEnter("ar")} onMouseLeave={onLeave} />
          {/* Chile */}
          <path d="M235,410 L240,385 L230,390 L225,410 L228,435 L232,460 L238,480 L242,500 L248,510 L252,505 L250,480 L245,455 L240,430 Z"
            style={countryStyle("cl")} onMouseEnter={() => onEnter("cl")} onMouseLeave={onLeave} />

          {/* City dots */}
          {cities.map((city) => (
            <g key={city.name} onMouseEnter={() => setHovered(city.name)} onMouseLeave={() => setHovered(null)}>
              <circle cx={city.cx} cy={city.cy} r={6} fill="none" stroke="rgba(0,232,122,0.3)" strokeWidth={1.5}>
                <animate attributeName="r" values="4;10" dur="2s" begin={`${city.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="2s" begin={`${city.delay}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={city.cx} cy={city.cy} r={3} fill="#00e87a" className="cursor-pointer" />

              {hovered === city.name && (
                <foreignObject x={city.cx - 60} y={city.cy - 32} width={120} height={24}>
                  <div className="flex justify-center">
                    <span className="bg-card border border-border rounded-full px-3 py-0.5 text-[10px] text-foreground font-body whitespace-nowrap">
                      {city.name}
                    </span>
                  </div>
                </foreignObject>
              )}
            </g>
          ))}
        </svg>
      </div>

    </div>
  );
};

export default LatamMap;
