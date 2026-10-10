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
 * Mounts the WebGL scene only after first paint and idle time, so the
 * server-rendered poster and headline own LCP. Never mounts for reduced motion.
 */
export function HeroCanvas({ sectionRef, ready, onReady }: HeroCanvasProps) {
  const reduced = useReducedMotion();
  const lite = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (reduced) return;
    let idle = 0;
    let timer = 0;
    const start = () => {
      if (supportsWebGL()) setMounted(true);
    };
    if (typeof window.requestIdleCallback === "function") {
      idle = window.requestIdleCallback(start, { timeout: 1500 });
    } else {
      timer = globalThis.setTimeout(start, 600) as unknown as number;
    }
    return () => {
      if (idle) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
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
