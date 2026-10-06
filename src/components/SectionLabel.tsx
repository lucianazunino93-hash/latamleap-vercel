interface Props {
  text: string;
}

const SectionLabel = ({ text }: Props) => (
  <div className="inline-flex items-center gap-2 mb-6">
    <span className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
    <span className="text-[11px] text-muted-foreground font-semibold tracking-[0.15em] uppercase">
      {text}
    </span>
  </div>
);

export default SectionLabel;
