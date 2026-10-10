"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { caseStudies } from "@/lib/work";
import { SectionLabel } from "@/components/section-label";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Work() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = section.current?.querySelector<HTMLElement>("[data-pin]");
        const track = section.current?.querySelector<HTMLElement>("[data-track]");
        if (!pin || !track) return;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.to("[data-work-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} id="work" aria-labelledby="work-title" className="relative">
      <div
        data-pin
        className="py-24 md:motion-safe:flex md:motion-safe:h-svh md:motion-safe:flex-col md:motion-safe:justify-center md:motion-safe:overflow-hidden md:motion-safe:py-0 md:motion-safe:pt-20"
      >
        <div className="mx-auto mb-12 flex w-full max-w-[1600px] items-end justify-between gap-8 px-5 md:mb-10 md:px-10">
          <div>
            <SectionLabel index="02">Selected work</SectionLabel>
            <h2 id="work-title" className="font-display mt-5 text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] text-cream">
              Recent <em className="text-amber">launches</em>
            </h2>
          </div>
          <div className="hidden w-56 md:motion-safe:block" aria-hidden>
            <p className="mb-3 text-right text-xs tracking-[0.2em] text-cream/60 uppercase">2024 — 2026</p>
            <div className="h-px bg-cream/15">
              <div data-work-progress className="h-full origin-left scale-x-0 bg-amber" />
            </div>
          </div>
        </div>

        <ul
          data-track
          className="grid gap-x-6 gap-y-14 px-5 sm:grid-cols-2 md:px-10 md:motion-safe:flex md:motion-safe:w-max md:motion-safe:gap-8"
        >
          {caseStudies.map((study, i) => (
            <li key={study.slug} className="md:motion-safe:w-[min(52vw,68vh,820px)] md:motion-safe:shrink-0">
              <article aria-labelledby={`work-${study.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
                  <Image
                    data-parallax
                    src={study.image}
                    alt={study.alt}
                    placeholder="blur"
                    sizes="(min-width: 768px) 52vw, (min-width: 640px) 50vw, 100vw"
                    className="absolute inset-0 h-full w-full scale-[1.14] object-cover transition-[filter] duration-700 group-hover:brightness-110"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs text-cream backdrop-blur-md">
                    {String(i + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-cream/60 uppercase">
                      {study.client} · {study.year}
                    </p>
                    <h3 id={`work-${study.slug}`} className="font-display mt-2 text-3xl leading-tight text-cream md:text-4xl">
                      {study.title}
                    </h3>
                  </div>
                  <p className="hidden shrink-0 pt-1 text-right text-sm text-cream/65 lg:block">
                    {study.discipline}
                    <br />
                    {study.location}
                  </p>
                </div>
                <p className="mt-3 flex items-center gap-2 text-sm text-amber">
                  <span className="inline-block size-1.5 rounded-full bg-amber" aria-hidden />
                  {study.result}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
