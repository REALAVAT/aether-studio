import Image from "next/image";
import { cn } from "@/lib/utils";
import headphones from "@/assets/hero/headphones.webp";

/**
 * On phones the object lives in a band between the eyebrow and the headline,
 * clear of the header. Shared by the poster and the WebGL canvas so they line up.
 */
export const heroStage =
  "absolute inset-0 max-md:top-[8.5rem] max-md:bottom-auto max-md:h-[clamp(8rem,calc(100svh-34.5rem),22rem)]";

/**
 * Still render of the hero headphones from the opening pose. Server-rendered and
 * preloaded so it paints immediately; it is also the reduced-motion hero.
 */
export function HeroPoster({ hideSculpture }: { hideSculpture: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_72%_48%,rgb(232_165_75/0.14),transparent_70%),radial-gradient(ellipse_80%_50%_at_10%_110%,rgb(232_165_75/0.08),transparent_70%)] max-md:bg-[radial-gradient(ellipse_90%_30%_at_50%_30%,rgb(232_165_75/0.16),transparent_70%)] md:portrait:bg-[radial-gradient(ellipse_80%_40%_at_50%_28%,rgb(232_165_75/0.14),transparent_70%)]" />

      <div className={heroStage}>
        <Image
          src={headphones}
          alt=""
          preload
          sizes="(max-width: 767px) 100vw, (orientation: portrait) 74vh, 107vh"
          className={cn(
            "absolute top-1/2 left-1/2 aspect-[4/3] h-[115%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[1400ms] ease-out",
            "md:left-[72.5%] md:h-[clamp(60svh,50vw,80svh)] md:portrait:top-[33%] md:portrait:left-1/2 md:portrait:h-[55svh]",
            hideSculpture && "opacity-0",
          )}
        />
      </div>

      <div className="grain absolute inset-0" />
    </div>
  );
}
