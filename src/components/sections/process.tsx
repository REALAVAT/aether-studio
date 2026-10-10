"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/section-label";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-process-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 60%", end: "bottom 60%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="process"
      aria-labelledby="process-title"
      className="relative border-t border-border bg-[radial-gradient(ellipse_50%_40%_at_0%_0%,rgb(232_165_75/0.07),transparent_70%)]"
    >
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 py-28 md:grid-cols-12 md:px-10 md:py-48">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <SectionLabel index="04">Process</SectionLabel>
            <h2
              id="process-title"
              className="font-display mt-5 text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.95] text-balance text-cream"
            >
              From first call to <em className="text-amber">launch day.</em>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-cream/70">
              A clear rhythm, weekly reviews in d3 or on call, and one team from kickoff to handover.
              Typical engagements run 10–16 weeks.
            </p>

            <ol className="mt-10 flex flex-wrap items-center gap-2 text-sm" aria-label="Process stages">
              {processSteps.map((s, i) => (
                <li key={s.title} className="flex items-center gap-2">
                  <span
                    aria-current={active === i ? "step" : undefined}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 transition-colors duration-500",
                      active === i ? "border-amber bg-amber text-ink" : "border-border text-cream/70",
                    )}
                  >
                    {s.title}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span aria-hidden className="text-cream/50">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div data-steps className="relative md:col-span-6 md:col-start-7">
          <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-cream/10">
            <div data-process-line className="h-full w-full origin-top bg-amber motion-reduce:scale-y-100" />
          </div>
          <ol className="flex flex-col">
            {processSteps.map((s, i) => (
              <li
                key={s.title}
                data-step
                className="relative flex min-h-[46vh] flex-col justify-center py-10 pl-10 md:pl-16"
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1/2 left-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-500",
                    active >= i ? "border-amber bg-amber" : "border-cream/30 bg-ink",
                  )}
                />
                <p className="font-display text-7xl text-cream/15 md:text-8xl" aria-hidden>
                  {s.step}
                </p>
                <h3 className="font-display -mt-6 text-4xl text-cream md:-mt-8 md:text-5xl">{s.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-cream/70">{s.body}</p>
                <p className="mt-4 text-xs tracking-[0.2em] text-amber uppercase">{s.duration}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
