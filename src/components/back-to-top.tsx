"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTarget, useLenis } from "@/components/smooth-scroll";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(lenis, "#top")}
      className="inline-flex items-center gap-2 self-start text-cream/80 transition-colors hover:text-amber md:self-auto"
    >
      Back to top <ArrowUp className="size-3.5" aria-hidden />
    </button>
  );
}
