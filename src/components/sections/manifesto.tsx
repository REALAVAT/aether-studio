"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const manifesto =
  "We are designers, engineers and directors working out of Dubai Design District. We believe the best work happens where craft meets clarity — brands with a spine, products with manners, websites that feel alive. From the Gulf to the world, we make fewer things, better.";

const highlight = new Set(["craft", "clarity", "alive.", "better."]);

const facts = [
  { label: "Headquarters", value: "Dubai Design District", note: "Client lounge in DIFC Gate Village" },
  { label: "Team", value: "24 makers", note: "Design, engineering, motion and strategy in one room" },
  { label: "Clients", value: "Gulf & global", note: "Dubai, Riyadh, Doha, London, Paris, Singapore" },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Dim states stay above 4:1 contrast so the copy is readable before it lights up.
        const scrollTrigger = { trigger: "[data-manifesto]", start: "top 75%", end: "bottom 45%", scrub: true };
        gsap.fromTo(
          "[data-word]:not([data-accent])",
          { color: "#77736c" },
          { color: "#f2ede4", ease: "none", stagger: 0.05, scrollTrigger },
        );
        gsap.fromTo(
          "[data-word][data-accent]",
          { color: "#8f6a35" },
          { color: "#e8a54b", ease: "none", stagger: 0.05, scrollTrigger },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="studio"
      aria-labelledby="studio-title"
      className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-48"
    >
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel index="01">The studio</SectionLabel>
          <h2 id="studio-title" className="sr-only">
            About Aether Studio
          </h2>
        </div>
        <p
          data-manifesto
          className="font-display text-[clamp(2rem,4.4vw,4.4rem)] leading-[1.06] text-balance text-cream md:col-span-9"
        >
          {manifesto.split(" ").map((word, i) => (
            <span
              key={i}
              data-word
              data-accent={highlight.has(word) || undefined}
              className={highlight.has(word) ? "italic text-amber" : undefined}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>

      <Reveal className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-32 md:grid-cols-3">
        {facts.map((f) => (
          <div key={f.label} data-reveal className="bg-ink p-8 md:p-10">
            <p className="text-xs tracking-[0.2em] text-cream/60 uppercase">{f.label}</p>
            <p className="font-display mt-4 text-4xl text-cream">{f.value}</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/65">{f.note}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
