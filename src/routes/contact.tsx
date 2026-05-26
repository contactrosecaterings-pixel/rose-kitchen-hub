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

        {/* Right: stacked rows on desktop, original cards on mobile */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1 lg:gap-5">
          <a
            href="tel:+14374101212"
            className="rc-lift group block rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg lg:flex lg:items-center lg:gap-6 lg:p-7"
          >
            <Phone className="h-6 w-6 shrink-0 text-primary lg:h-7 lg:w-7" />
            <div className="lg:flex lg:flex-1 lg:items-center lg:justify-between lg:gap-6">
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground lg:mt-0 lg:w-32 lg:shrink-0">
                Phone
              </p>
              <p className="mt-2 font-display text-2xl text-foreground underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:decoration-primary lg:mt-0 lg:whitespace-nowrap">
                (437) 410-1212
              </p>
            </div>
          </a>

          <a
            href="mailto:contact.rosecaterings@gmail.com"
            className="rc-lift group block rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg lg:flex lg:items-center lg:gap-6 lg:p-7"
          >
            <Mail className="h-6 w-6 shrink-0 text-primary lg:h-7 lg:w-7" />
            <div className="lg:flex lg:flex-1 lg:items-center lg:justify-between lg:gap-6">
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground lg:mt-0 lg:w-32 lg:shrink-0">
                Email
              </p>
              <p className="mt-2 break-words font-display text-xl text-foreground underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:decoration-primary lg:mt-0 lg:whitespace-nowrap lg:break-normal lg:text-xl">
                contact.rosecaterings@gmail.com
              </p>
            </div>
          </a>

          <div className="rc-lift min-w-0 rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg lg:flex lg:items-center lg:gap-6 lg:p-7">
            <MapPin className="h-6 w-6 shrink-0 text-primary lg:h-7 lg:w-7" />
            <div className="lg:flex lg:flex-1 lg:items-center lg:justify-between lg:gap-6">
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground lg:mt-0 lg:w-32 lg:shrink-0">
                Service Area
              </p>
              <div className="lg:text-right">
                <p className="mt-2 break-words font-display text-2xl text-foreground lg:mt-0 lg:whitespace-nowrap lg:text-xl">
                  Greater Toronto Area (GTA)
                  <span className="mx-2 text-muted-foreground">|</span>
                  Brant County &amp; Surroundings
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
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