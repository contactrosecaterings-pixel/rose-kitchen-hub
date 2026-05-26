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
    <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        Contact
      </p>
      <h1 className="mt-3 font-display text-5xl text-foreground">Let's plan your event.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Prefer to talk it through? Reach us directly — we typically respond within 24–48 hours.
      </p>

      <div className="mx-auto mt-14 grid w-full max-w-xl gap-6 md:max-w-none md:grid-cols-3">
        <a
          href="tel:+14374101212"
          className="rc-lift group block rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg"
        >
          <Phone className="h-6 w-6 text-primary" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Phone
          </p>
          <p className="mt-2 font-display text-2xl text-foreground underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:decoration-primary">
            (437) 410-1212
          </p>
        </a>

        <a
          href="mailto:contact.rosecaterings@gmail.com"
          className="rc-lift group block rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg"
        >
          <Mail className="h-6 w-6 text-primary" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Email
          </p>
          <p className="mt-2 break-words font-display text-xl text-foreground underline decoration-primary/30 decoration-1 underline-offset-4 transition-colors duration-300 group-hover:text-primary group-hover:decoration-primary">
            contact.rosecaterings@gmail.com
          </p>
        </a>

        <div className="rc-lift min-w-0 rounded-2xl border border-border/70 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-lg">
          <MapPin className="h-6 w-6 text-primary" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Service Area
          </p>
          <p className="mt-2 break-words font-display text-2xl text-foreground">
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
  );
}