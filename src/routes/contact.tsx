import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rose Caterings" },
      {
        name: "description",
        content:
          "Get in touch with Rose Caterings for authentic Pakistani home-cooked catering. Serving Paris, Brantford, and the GTA.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        Contact
      </p>
      <h1 className="mt-3 font-display text-5xl text-foreground">Let's plan your event.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Prefer to talk it through? Reach us directly — we typically respond within 24–48 hours.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <a
          href="tel:+14374101212"
          className="group rounded-2xl border border-border/70 bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md"
        >
          <Phone className="h-6 w-6 text-primary" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Phone
          </p>
          <p className="mt-2 font-display text-2xl text-foreground">(437) 410-1212</p>
        </a>

        <a
          href="mailto:contact.rosecaterings@gmail.com"
          className="group rounded-2xl border border-border/70 bg-card p-8 transition-all hover:border-primary/50 hover:shadow-md"
        >
          <Mail className="h-6 w-6 text-primary" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Email
          </p>
          <p className="mt-2 break-words font-display text-xl text-foreground">
            contact.rosecaterings@gmail.com
          </p>
        </a>

        <div className="rounded-2xl border border-border/70 bg-card p-8">
          <MapPin className="h-6 w-6 text-primary" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Service Area
          </p>
          <p className="mt-2 font-display text-2xl text-foreground">Paris · Brantford · GTA</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Travel beyond available on request.
          </p>
        </div>
      </div>
    </div>
  );
}