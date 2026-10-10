import { services } from "@/lib/site";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-48"
    >
      <Reveal>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="03">Services</SectionLabel>
            <h2
              id="services-title"
              data-reveal
              className="font-display mt-5 text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] text-balance text-cream"
            >
              Four disciplines, <em className="text-amber">one</em> studio.
            </h2>
          </div>
          <p data-reveal className="max-w-md text-base leading-relaxed text-cream/70 md:col-span-5 md:justify-self-end">
            Engage us for a single discipline or the whole arc. Every project is led by a partner and
            staffed from our own team in Dubai — no outsourcing, no relay race.
          </p>
        </div>

        <ul className="mt-16 border-t border-border md:mt-24">
          {services.map((service, i) => (
            <li
              key={service.id}
              data-reveal
              className="group relative grid gap-6 border-b border-border py-10 md:grid-cols-12 md:gap-8 md:py-14"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-amber transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
              />
              <span className="font-display text-xl text-amber md:col-span-1">0{i + 1}</span>
              <h3 className="font-display text-5xl leading-none text-cream transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:col-span-4 md:text-7xl">
                {service.title}
              </h3>
              <div className="md:col-span-4">
                <p className="leading-relaxed text-cream/75">{service.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${service.title} deliverables`}>
                  {service.deliverables.map((d) => (
                    <li key={d} className="rounded-full border border-border px-3 py-1 text-xs text-cream/75">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-cream/65 md:col-span-3 md:text-right">
                Engagements from
                <span className="mt-1 block font-display text-3xl text-cream">AED {service.from.aed}</span>
                <span className="block text-cream/60">≈ USD {service.from.usd}</span>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
