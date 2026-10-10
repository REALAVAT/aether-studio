"use client";

import { Component, useEffect, useState, type ReactNode, type RefObject } from "react";
import dynamic from "next/dynamic";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { heroStage } from "@/components/sections/hero-poster";
import { callouts } from "./callouts";

const Scene = dynamic(() => import("./scene"), { ssr: false, loading: () => null });

class SilentBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

type HeroCanvasProps = {
  sectionRef: RefObject<HTMLElement | null>;
  ready: boolean;
  onReady: () => void;
};

/**
 * Mounts the WebGL scene only after the first interaction (or once the page is
 * idle), so the server-rendered poster and headline own LCP and the main thread
 * stays free during load. Never mounts for reduced motion.
 */
export function HeroCanvas({ sectionRef, ready, onReady }: HeroCanvasProps) {
  const reduced = useReducedMotion();
  const lite = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (reduced) return;
    const events = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const;
    let idle = 0;
    let timer = 0;
    let done = false;

    const start = () => {
      if (done) return;
      done = true;
      cleanup();
      if (supportsWebGL()) setMounted(true);
    };
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(timer);
      if (idle && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
    };

    // First interaction mounts immediately; otherwise wait for the main thread to settle.
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    timer = window.setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(start, { timeout: 1500 });
      } else {
        start();
      }
    }, 4500);

    return cleanup;
  }, [reduced]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "100px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [sectionRef]);

  if (reduced || !mounted) return null;

  return (
    <div
      aria-hidden
      data-hero-stage
      className={cn(
        heroStage,
        "transition-opacity duration-[1800ms] ease-out",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <SilentBoundary>
        <Scene key={lite ? "lite" : "full"} lite={lite} active={active} onReady={onReady} />
      </SilentBoundary>
      {!lite &&
        callouts.map((c, i) => (
          <div
            key={c.label}
            data-callout={i}
            style={{ visibility: "hidden", opacity: 0 }}
            className="pointer-events-none absolute top-0 left-0"
          >
            <div
              className={cn(
                "flex -translate-y-1/2 items-center gap-2 text-[10px] font-medium tracking-[0.22em] whitespace-nowrap text-cream uppercase",
                c.side === "left" && "-translate-x-full flex-row-reverse",
              )}
            >
              <span className="size-1.5 shrink-0 rounded-full bg-amber" />
              <span className="h-px w-10 shrink-0 bg-amber/80" />
              <span>{c.label}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
