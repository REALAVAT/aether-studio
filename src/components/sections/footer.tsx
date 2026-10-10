import { nav, site } from "@/lib/site";
import { BackToTop } from "@/components/back-to-top";

const year = 2026;

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-[1600px] px-5 pt-20 pb-10 md:px-10 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-4xl leading-tight text-cream md:text-5xl">
              Made in Dubai.
              <br />
              <em className="text-amber">Shipped everywhere.</em>
            </p>
          </div>
          <div className="text-sm leading-relaxed md:col-span-3">
            <h2 className="mb-4 text-xs tracking-[0.2em] text-cream/60 uppercase">Studio</h2>
            <address className="text-cream/80 not-italic">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.countryName}
            </address>
            <p className="mt-3 text-cream/65">Sun–Thu · 9:00–18:00 GST</p>
          </div>
          <div className="text-sm md:col-span-2">
            <h2 className="mb-4 text-xs tracking-[0.2em] text-cream/60 uppercase">Explore</h2>
            <ul className="space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-cream/80 transition-colors hover:text-amber">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm md:col-span-2">
            <h2 className="mb-4 text-xs tracking-[0.2em] text-cream/60 uppercase">Contact</h2>
            <ul className="space-y-2 text-cream/80">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-amber">
                  {site.email}
                </a>
              </li>
              <li>{site.phone}</li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="font-display pointer-events-none mt-20 text-[clamp(5rem,22vw,22rem)] leading-[0.8] tracking-tight text-cream/[0.06] select-none md:mt-28"
        >
          Aether<span className="text-amber/40">.</span>
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 text-xs text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. A fictional studio — all clients and work are illustrative.
          </p>
          <p>
            <a
              href={site.credit.href}
              target="_blank"
              rel="noopener"
              className="text-cream/80 underline decoration-amber/60 underline-offset-4 transition-colors hover:text-amber"
            >
              {site.credit.label}
            </a>
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
