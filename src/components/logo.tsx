export function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="flex items-center gap-2.5">
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
          <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeOpacity="0.35" />
          <ellipse cx="16" cy="16" rx="14.5" ry="5.5" fill="none" stroke="var(--amber)" strokeWidth="1.4" transform="rotate(-28 16 16)" />
          <circle cx="16" cy="16" r="3.2" fill="var(--amber)" />
        </svg>
        <span className="font-display text-2xl leading-none tracking-tight text-cream">
          Aether<span className="text-amber">.</span>
        </span>
      </span>
    </span>
  );
}
