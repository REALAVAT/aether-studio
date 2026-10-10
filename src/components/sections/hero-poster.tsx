import { cn } from "@/lib/utils";

/**
 * Pure-CSS stand-in for the 3D sculpture. Server-rendered, so it paints with the
 * first byte; doubles as the static hero for reduced-motion users.
 */
export function HeroPoster({ hideSculpture }: { hideSculpture: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_70%_45%,rgb(232_165_75/0.16),transparent_70%),radial-gradient(ellipse_80%_50%_at_10%_110%,rgb(232_165_75/0.08),transparent_70%)] max-md:bg-[radial-gradient(ellipse_90%_45%_at_50%_30%,rgb(232_165_75/0.18),transparent_70%)]" />

      <div
        className={cn(
          "absolute top-[30%] left-1/2 size-[78vmin] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[1800ms] md:top-1/2 md:left-[71%] md:size-[58vmin]",
          hideSculpture && "opacity-0",
        )}
      >
        <div className="absolute inset-[14%] animate-[spin_40s_linear_infinite] rounded-full bg-[conic-gradient(from_210deg,#1a1612,#e8a54b_14%,#2b241e_28%,#f2ede4_38%,#1a1612_52%,#8a5a22_68%,#e8a54b_80%,#1a1612)] opacity-90 blur-[1px] [mask:radial-gradient(circle,transparent_38%,#000_40%,#000_62%,transparent_64%)]" />
        <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgb(242_237_228/0.25),transparent_45%)] blur-md" />
        <div className="absolute inset-0 rounded-[50%] border border-amber/80 [transform:rotate(-28deg)_scaleY(0.36)]" />
        <div className="absolute -inset-[9%] rounded-[50%] border border-cream/20 [transform:rotate(-12deg)_scaleY(0.3)]" />
      </div>

      <div className="grain absolute inset-0" />
    </div>
  );
}
