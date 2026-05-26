import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rose Caterings" },
      {
        name: "description",
        content:
          "Get in touch with Rose Caterings for authentic Pakistani home-cooked catering. Serving the Greater Toronto Area (GTA) and Brant County & Surroundings.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Left: intro */}
        <div className="lg:pr-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Contact
          </p>
          <h1 className="mt-3 font-display text-5xl text-foreground lg:text-6xl">
            Let's plan your event.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Prefer to talk it through? Reach us directly — we typically respond within 24–48 hours.
          </p>
        </div>

        {/* Right: always stacked rows (mobile + desktop) to avoid mid-width squeeze */}
        <div className="grid gap-5 lg:gap-5">
          <a
            href="tel:+14374101212"
            className="rc-lift group flex min-w-0 items-center gap-5 rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg sm:gap-6 sm:p-7"
          >
            <Phone className="h-6 w-6 shrink-0 text-primary sm:h-7 sm:w-7" />
            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <p className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:w-32">
                Phone
              </p>
              <p className="min-w-0 truncate font-display text-foreground underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:decoration-primary [font-size:clamp(1rem,2.4vw,1.5rem)]">
                (437) 410-1212
              </p>
            </div>
          </a>

          <a
            href="mailto:contact.rosecaterings@gmail.com"
            className="rc-lift group flex min-w-0 items-center gap-5 rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg sm:gap-6 sm:p-7"
          >
            <Mail className="h-6 w-6 shrink-0 text-primary sm:h-7 sm:w-7" />
            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <p className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:w-32">
                Email
              </p>
              <p className="min-w-0 truncate whitespace-nowrap font-display text-foreground underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:decoration-primary [font-size:clamp(0.8rem,2vw,1.25rem)]">
                contact.rosecaterings@gmail.com
              </p>
            </div>
          </a>

          <div className="rc-lift flex min-w-0 items-center gap-5 rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg sm:gap-6 sm:p-7">
            <MapPin className="h-6 w-6 shrink-0 text-primary sm:h-7 sm:w-7" />
            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <p className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:w-32">
                Service Area
              </p>
              <div className="min-w-0 text-right">
                <p className="truncate font-display text-foreground [font-size:clamp(0.85rem,1.8vw,1.25rem)]">
                  Greater Toronto Area (GTA)
                  <span className="mx-2 text-muted-foreground">|</span>
                  Brant County &amp; Surroundings
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
                  Travel beyond available on request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}