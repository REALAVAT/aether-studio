"use client";

import { useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { budgets, services, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionLabel } from "@/components/section-label";

const serviceIds = ["brand", "product", "web", "motion"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name."),
  email: z.email("Enter a valid email address."),
  company: z.string().trim().max(80, "Keep it under 80 characters."),
  services: z.array(z.enum(serviceIds)).min(1, "Pick at least one discipline."),
  budget: z.string().min(1, "Choose a budget range."),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps — at least 20 characters.")
    .max(2000, "Please keep it under 2,000 characters."),
});

type FormValues = z.infer<typeof schema>;

const defaults: FormValues = { name: "", email: "", company: "", services: [], budget: "", message: "" };

const budgetItems = Object.fromEntries(budgets.map((b) => [b.value, b.label]));

const field =
  "h-12 rounded-xl border-border bg-cream/[0.03] px-4 text-base text-cream placeholder:text-cream/40 md:text-sm dark:bg-cream/[0.03]";

function DubaiClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dubai",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive">
      {message}
    </p>
  );
}

export function Contact() {
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    company: `${uid}-company`,
    budget: `${uid}-budget`,
    message: `${uid}-message`,
    services: `${uid}-services`,
  };
  const [sent, setSent] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: defaults, mode: "onTouched" });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 1100));
    setSent(values.name.split(" ")[0]);
    toast.success("Brief received", {
      description: "Demo mode — nothing was sent. In real life we'd reply within one working day.",
    });
    reset(defaults);
  };

  const describe = (key: keyof typeof ids, hasError: boolean) =>
    hasError ? { "aria-invalid": true, "aria-describedby": `${ids[key]}-error` } : {};

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative border-t border-border bg-[radial-gradient(ellipse_60%_50%_at_100%_0%,rgb(232_165_75/0.09),transparent_70%)]"
    >
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 py-28 md:grid-cols-12 md:px-10 md:py-40">
        <div className="md:col-span-5">
          <SectionLabel index="05">Contact</SectionLabel>
          <h2
            id="contact-title"
            className="font-display mt-5 text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] text-balance text-cream"
          >
            Let&apos;s make something <em className="text-amber">luminous.</em>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-cream/70">
            Tell us about the brand, product or launch you have in mind. A partner reads every brief and
            replies within one working day.
          </p>

          <dl className="mt-12 grid max-w-md grid-cols-2 gap-8 text-sm">
            <div>
              <dt className="text-xs tracking-[0.2em] text-cream/60 uppercase">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="text-cream underline decoration-amber/60 underline-offset-4 hover:text-amber">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-cream/60 uppercase">Dubai time</dt>
              <dd className="mt-2 text-cream">
                <DubaiClock /> GST
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs tracking-[0.2em] text-cream/60 uppercase">Visit</dt>
              <dd className="mt-2 text-cream/80">
                {site.address.street}, {site.address.locality}
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-7">
          {sent ? (
            <div
              role="status"
              className="flex min-h-[520px] flex-col items-start justify-center rounded-3xl border border-border bg-card p-8 md:p-14"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-amber text-ink">
                <Check className="size-6" aria-hidden />
              </span>
              <p className="font-display mt-8 text-5xl text-cream">Thank you, {sent}.</p>
              <p className="mt-4 max-w-md leading-relaxed text-cream/70">
                Your brief is in. This is a demo, so nothing left your browser — but this is exactly where a
                partner from our d3 studio would pick it up.
              </p>
              <button
                type="button"
                onClick={() => setSent(null)}
                className="mt-10 rounded-full border border-cream/25 px-6 py-3 text-sm text-cream transition-colors hover:border-cream"
              >
                Send another brief
              </button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              aria-label="Project enquiry"
              className="rounded-3xl border border-border bg-card p-6 md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor={ids.name} className="mb-2.5 text-cream/80">
                    Name
                  </Label>
                  <Input
                    id={ids.name}
                    autoComplete="name"
                    placeholder="Layla Haddad"
                    className={field}
                    {...register("name")}
                    {...describe("name", !!errors.name)}
                  />
                  <FieldError id={`${ids.name}-error`} message={errors.name?.message} />
                </div>
                <div>
                  <Label htmlFor={ids.email} className="mb-2.5 text-cream/80">
                    Email
                  </Label>
                  <Input
                    id={ids.email}
                    type="email"
                    autoComplete="email"
                    placeholder="layla@company.com"
                    className={field}
                    {...register("email")}
                    {...describe("email", !!errors.email)}
                  />
                  <FieldError id={`${ids.email}-error`} message={errors.email?.message} />
                </div>
                <div>
                  <Label htmlFor={ids.company} className="mb-2.5 text-cream/80">
                    Company <span className="font-normal text-cream/60">(optional)</span>
                  </Label>
                  <Input
                    id={ids.company}
                    autoComplete="organization"
                    placeholder="Company or project"
                    className={field}
                    {...register("company")}
                    {...describe("company", !!errors.company)}
                  />
                  <FieldError id={`${ids.company}-error`} message={errors.company?.message} />
                </div>
                <div>
                  <Label htmlFor={ids.budget} className="mb-2.5 text-cream/80">
                    Budget
                  </Label>
                  <Controller
                    control={control}
                    name="budget"
                    render={({ field: f }) => (
                      <Select
                        items={budgetItems}
                        value={f.value || null}
                        onValueChange={(v) => f.onChange(v ?? "")}
                        name={f.name}
                      >
                        <SelectTrigger
                          id={ids.budget}
                          ref={f.ref}
                          onBlur={f.onBlur}
                          className={cn(field, "w-full justify-between data-[size=default]:h-12")}
                          {...describe("budget", !!errors.budget)}
                        >
                          <SelectValue placeholder="Select a range (AED / USD)" />
                        </SelectTrigger>
                        <SelectContent className="border border-border bg-popover">
                          {budgets.map((b) => (
                            <SelectItem key={b.value} value={b.value} className="py-2.5">
                              {b.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError id={`${ids.budget}-error`} message={errors.budget?.message} />
                </div>
              </div>

              <fieldset className="mt-8" {...describe("services", !!errors.services)}>
                <legend className="mb-3 text-sm font-medium text-cream/80">What do you need?</legend>
                <Controller
                  control={control}
                  name="services"
                  render={({ field: f }) => (
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => {
                        const on = f.value.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() =>
                              f.onChange(on ? f.value.filter((v) => v !== s.id) : [...f.value, s.id])
                            }
                            onBlur={f.onBlur}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-300",
                              on
                                ? "border-amber bg-amber text-ink"
                                : "border-border text-cream/80 hover:border-cream/50 hover:text-cream",
                            )}
                          >
                            {on && <Check className="size-3.5" aria-hidden />}
                            {s.title}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
                <FieldError id={`${ids.services}-error`} message={errors.services?.message} />
              </fieldset>

              <div className="mt-8">
                <Label htmlFor={ids.message} className="mb-2.5 text-cream/80">
                  Project details
                </Label>
                <Textarea
                  id={ids.message}
                  rows={5}
                  placeholder="Goals, timeline, links — anything that helps us understand the brief."
                  className={cn(field, "h-auto min-h-36 py-3")}
                  {...register("message")}
                  {...describe("message", !!errors.message)}
                />
                <FieldError id={`${ids.message}-error`} message={errors.message?.message} />
              </div>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-relaxed text-cream/60">
                  Demo form — submissions stay in your browser. No data is stored or sent.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-cream disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                    </>
                  ) : (
                    <>
                      Send brief
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
