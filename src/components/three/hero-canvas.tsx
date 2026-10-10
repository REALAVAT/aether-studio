"use client";

import { Component, useEffect, useState, type ReactNode, type RefObject } from "react";
import dynamic from "next/dynamic";
import { useIsMobile, useReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

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
      className={cn(
        "absolute inset-0 transition-opacity duration-[1800ms] ease-out",
        ready ? "opacity-100" : "opacity-0",
      )}
    >
      <SilentBoundary>
        <Scene key={lite ? "lite" : "full"} lite={lite} active={active} onReady={onReady} />
      </SilentBoundary>
    </div>
  );
}
