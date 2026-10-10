export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="flex items-center gap-3 text-xs tracking-[0.25em] text-cream/65 uppercase">
      <span className="text-amber">({index})</span>
      {children}
    </p>
  );
}
