"use client";

import { useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight } from "lucide-react";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { HeroPoster } from "@/components/sections/hero-poster";
import { scrollToTarget, useLenis } from "@/components/smooth-scroll";
import { scrollState } from "@/lib/scroll-store";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { value: "140+", label: "Launches" },
  { value: "14", label: "Countries" },
  { value: "11", label: "Years in d3" },
];

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const trigger = { trigger: section.current, start: "top top", end: "bottom bottom" };

        ScrollTrigger.create({
          ...trigger,
          onUpdate: (self) => {
            scrollState.hero = self.progress;
          },
        });

        gsap
          .timeline({ scrollTrigger: { ...trigger, scrub: 0.6 }, defaults: { ease: "power2.inOut" } })
          .to("[data-chapter='1']", { autoAlpha: 0, y: -60, duration: 1 }, 0.5)
          .fromTo("[data-chapter='2']", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.2)
          .to("[data-chapter='2']", { autoAlpha: 0, y: -60, duration: 1 }, 2.6)
          .fromTo("[data-chapter='3']", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 1 }, 3.2)
          .fromTo("[data-hero-progress]", { scaleX: 0 }, { scaleX: 1, duration: 5, ease: "none" }, 0)
          .to("[data-scroll-cue]", { autoAlpha: 0, duration: 0.4 }, 0.2);

        return () => {
          scrollState.hero = 0;
        };
      });
      // The side scrim only protects the opening headline; lift it so the exploded view stays lit.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px) and (orientation: landscape)", () => {
        gsap.to("[data-hero-scrim]", {
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: section.current, start: "8% top", end: "28% top", scrub: 0.6 },
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    scrollToTarget(lenis, href);
  };

  return (
    <section
      ref={section}
      id="top"
      aria-labelledby="hero-title"
      className="relative h-[320vh] motion-reduce:h-svh motion-reduce:min-h-[640px]"
    >
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden">
        <HeroPoster hideSculpture={ready} />
        <HeroCanvas sectionRef={section} ready={ready} onReady={() => setReady(true)} />

        <div
          aria-hidden
          data-hero-scrim
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_0%,rgb(10_9_8/0.6)_35%,transparent_65%)] max-md:bg-[linear-gradient(0deg,var(--ink)_10%,rgb(10_9_8/0.7)_38%,transparent_50%)] md:portrait:bg-[linear-gradient(0deg,var(--ink)_15%,rgb(10_9_8/0.7)_40%,transparent_55%)]"
        />

        <div className="relative mx-auto h-full max-w-[1600px] px-5 md:px-10">
          {/* Chapter 1 */}
          <div
            data-chapter="1"
            className="absolute inset-x-5 top-[5.25rem] bottom-12 flex flex-col md:inset-x-10 md:top-1/2 md:bottom-auto md:block md:-translate-y-1/2 md:portrait:top-auto md:portrait:bottom-20 md:portrait:translate-y-0"
          >
            <p className="flex items-center gap-3 text-xs leading-5 tracking-[0.25em] text-cream/70 uppercase md:mb-6">
              <span className="inline-block size-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
              Independent studio · Dubai Design District
            </p>
            <div aria-hidden className="min-h-4 flex-1 md:hidden" />
            <h1
              id="hero-title"
              className="font-display max-w-[13ch] text-[clamp(3.2rem,8.5vw,8.75rem)] leading-[0.92] text-balance text-cream"
            >
              We shape brands, products &amp; worlds <em className="text-amber">of light.</em>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/70 md:mt-7 md:text-lg">
              Aether is a creative and product studio in Dubai. We design and build the things people
              remember — for founders across the Gulf and the world.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-9">
              <a
                href="#contact"
                onClick={(e) => go(e, "#contact")}
                className="group inline-flex items-center gap-2 rounded-full bg-amber px-7 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-cream"
              >
                Start a project
                <ArrowDownRight
                  className="size-4 transition-transform duration-300 group-hover:-rotate-45"
                  aria-hidden
                />
              </a>
              <a
                href="#work"
                onClick={(e) => go(e, "#work")}
                className="inline-flex items-center rounded-full border border-cream/25 px-7 py-4 text-sm font-medium text-cream transition-colors duration-300 hover:border-cream hover:bg-cream/5"
              >
                View work
              </a>
            </div>
          </div>

          {/* Chapter 2 */}
          <div
            data-chapter="2"
            className="invisible absolute inset-x-5 bottom-16 opacity-0 motion-reduce:hidden md:inset-x-auto md:top-1/2 md:right-10 md:bottom-auto md:max-w-lg md:-translate-y-1/2 md:text-right md:portrait:top-auto md:portrait:bottom-20 md:portrait:left-10 md:portrait:max-w-none md:portrait:translate-y-0"
          >
            <p className="mb-6 text-xs tracking-[0.25em] text-amber uppercase">02 — Craft</p>
            <p className="font-display text-[clamp(2.6rem,5.2vw,5.5rem)] leading-[0.95] text-balance text-cream">
              Every surface considered. Every frame <em className="text-amber">engineered.</em>
            </p>
            <p className="mt-6 text-base leading-relaxed text-cream/70 md:ml-auto md:max-w-sm">
              Strategy, design and engineering under one roof in d3 — so nothing gets lost in hand-off.
            </p>
          </div>

          {/* Chapter 3 */}
          <div
            data-chapter="3"
            className="invisible absolute inset-x-5 bottom-16 text-center opacity-0 motion-reduce:hidden md:inset-x-10 md:bottom-20"
          >
            <p className="mb-5 text-xs tracking-[0.25em] text-amber uppercase">03 — Reach</p>
            <p className="font-display mx-auto max-w-4xl text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[0.95] text-balance text-cream">
              Dubai HQ. <em className="text-amber">Global</em> reach.
            </p>
            <dl className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs tracking-[0.2em] text-cream/60 uppercase">{s.label}</dt>
                  <dd className="font-display mt-1 text-4xl text-cream md:text-5xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            data-scroll-cue
            aria-hidden
            className="absolute right-10 bottom-10 hidden items-center gap-3 text-xs tracking-[0.25em] text-cream/60 uppercase motion-reduce:hidden md:flex"
          >
            Scroll to explore
            <span className="relative block h-10 w-px overflow-hidden bg-cream/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-amber" />
            </span>
          </div>

          <p
            aria-hidden
            className="absolute top-24 right-10 hidden text-xs tracking-[0.2em] text-cream/50 uppercase md:block"
          >
            25.18° N · 55.30° E
          </p>
        </div>

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-cream/10 motion-reduce:hidden">
          <div data-hero-progress className="h-full origin-left scale-x-0 bg-amber" />
        </div>
      </div>
    </section>
  );
}
