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

        {/*
          Right side:
          - Mobile (< lg): original vertical card layout, single column, icon-on-top — untouched.
          - Desktop (lg+): full-width stacked rows with icon | label | value.
          Skipping the md 3-column variant — it was the source of the email wrap/overflow at intermediate widths.
        */}
        <div className="grid gap-6 lg:gap-5">
          {/* Phone */}
          <a
            href="tel:+14374101212"
            className="rc-lift group block min-w-0 rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg lg:flex lg:items-center lg:gap-6 lg:p-7"
          >
            <Phone className="h-6 w-6 shrink-0 text-primary lg:h-7 lg:w-7" />
            <div className="lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-between lg:gap-4">
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground lg:mt-0 lg:w-24 lg:shrink-0 xl:w-32">
                Phone
              </p>
              <p className="mt-2 font-display text-2xl text-foreground underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:decoration-primary lg:mt-0 lg:whitespace-nowrap lg:[font-size:clamp(0.95rem,1.6vw,1.4rem)]">
              (437) 410-1212
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:contact.rosecaterings@gmail.com"
            className="rc-lift group block min-w-0 rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg lg:flex lg:items-center lg:gap-6 lg:p-7"
          >
            <Mail className="h-6 w-6 shrink-0 text-primary lg:h-7 lg:w-7" />
            <div className="lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-between lg:gap-4">
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground lg:mt-0 lg:w-24 lg:shrink-0 xl:w-32">
                Email
              </p>
              <p className="mt-2 break-words [overflow-wrap:anywhere] font-display text-foreground underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors duration-300 [font-size:clamp(0.875rem,3.6vw,1.25rem)] group-hover:text-primary group-hover:decoration-primary lg:mt-0 lg:whitespace-nowrap lg:break-normal lg:text-right lg:[font-size:clamp(0.72rem,1.45vw,1.15rem)]">
                contact.rosecaterings@gmail.com
              </p>
            </div>
          </a>

          {/* Service Area */}
          <div className="rc-lift block min-w-0 rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg lg:flex lg:items-center lg:gap-6 lg:p-7">
            <MapPin className="h-6 w-6 shrink-0 text-primary lg:h-7 lg:w-7" />
            <div className="lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-between lg:gap-4">
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground lg:mt-0 lg:w-24 lg:shrink-0 xl:w-32">
                Service Area
              </p>
              <div className="lg:min-w-0 lg:flex-1 lg:text-right">
                <p className="mt-2 break-words font-display text-2xl text-foreground lg:mt-0 lg:[font-size:clamp(0.85rem,1.35vw,1.15rem)] lg:leading-snug">
                  Greater Toronto Area (GTA)
                  <span className="mx-2 text-muted-foreground">|</span>
                  Brant County &amp; Surroundings
                </p>
                <p className="mt-2 text-sm text-muted-foreground lg:mt-1">
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