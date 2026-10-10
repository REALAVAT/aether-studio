"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { MenuIcon } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { scrollToTarget, useLenis } from "@/components/smooth-scroll";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";

export function Nav() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setOpen(false);
    scrollToTarget(lenis, href);
    history.replaceState(null, "", href === "#top" ? location.pathname : href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-border bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10"
      >
        <a href="#top" onClick={(e) => go(e, "#top")} className="flex items-center gap-2.5" aria-label={`${site.name} — back to top`}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => go(e, item.href)}
                className="group relative text-sm text-cream/75 transition-colors hover:text-cream"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="hidden rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition-[background-color,transform] duration-300 hover:bg-cream active:scale-[0.98] sm:inline-flex"
          >
            Start a project
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center rounded-full border border-border text-cream md:hidden"
              aria-label="Open menu"
            >
              <MenuIcon className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-border bg-ink p-8 sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <ul className="mt-16 flex flex-col gap-6">
                {[...nav, { href: "#contact", label: "Contact" }].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => go(e, item.href)}
                      className="font-display text-5xl text-cream transition-colors hover:text-amber"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-auto text-sm text-muted-foreground">
                Dubai Design District · {site.email}
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
